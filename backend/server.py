from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
import aiohttp
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
import uuid
from datetime import datetime
import json

# External API clients
from googleapiclient.discovery import build
from github import Github
import requests
import firebase_admin
from firebase_admin import credentials, firestore

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize Firebase (Simple setup for demo)
# Firebase integration will be implemented separately
firebase_db = None
try:
    # For production, use proper Firebase credentials
    # firebase_admin.initialize_app()
    # firebase_db = firestore.client()
    print("Firebase setup skipped for demo - using MongoDB for data storage")
except Exception as e:
    print(f"Firebase initialization failed: {e}")

# Initialize external API clients
youtube = build('youtube', 'v3', developerKey=os.environ['YOUTUBE_API_KEY'])
github_client = Github(os.environ['GITHUB_TOKEN'])

# Create the main app
app = FastAPI(title="OmniSearch API", description="Multi-Modal Knowledge Discovery Platform")
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Test GitHub connection
try:
    github_user = github_client.get_user()
    logger.info(f"GitHub API connected successfully for user: {github_user.login}")
except Exception as e:
    logger.error(f"GitHub API connection failed: {e}")

# Data Models
class SearchQuery(BaseModel):
    query: str
    content_types: Optional[List[str]] = ["code", "videos", "papers", "datasets"]
    limit: Optional[int] = 10

class SearchResult(BaseModel):
    id: str
    title: str
    description: str
    url: str
    thumbnail_url: Optional[str] = None
    source_type: str  # "code", "video", "paper", "dataset"
    metadata: Dict[str, Any] = {}
    relevance_score: float = 0.0

class UniversalSearchResponse(BaseModel):
    query: str
    total_results: int
    results: List[SearchResult]
    results_by_type: Dict[str, List[SearchResult]]

# External API Services
class YouTubeService:
    @staticmethod
    async def search(query: str, max_results: int = 10) -> List[SearchResult]:
        try:
            search_response = youtube.search().list(
                q=query,
                part='id,snippet',
                maxResults=max_results,
                type='video'
            ).execute()

            results = []
            for item in search_response['items']:
                result = SearchResult(
                    id=item['id']['videoId'],
                    title=item['snippet']['title'],
                    description=item['snippet']['description'][:200] + "...",
                    url=f"https://www.youtube.com/watch?v={item['id']['videoId']}",
                    thumbnail_url=item['snippet']['thumbnails']['medium']['url'],
                    source_type="video",
                    metadata={
                        'channel': item['snippet']['channelTitle'],
                        'published_at': item['snippet']['publishedAt']
                    }
                )
                results.append(result)
            return results
        except Exception as e:
            logger.error(f"YouTube search error: {e}")
            return []

class GitHubService:
    @staticmethod
    async def search(query: str, max_results: int = 10) -> List[SearchResult]:
        try:
            repositories = github_client.search_repositories(query=query)
            results = []
            
            for repo in repositories[:max_results]:
                result = SearchResult(
                    id=str(repo.id),
                    title=repo.full_name,
                    description=repo.description or "No description available",
                    url=repo.html_url,
                    source_type="code",
                    metadata={
                        'language': repo.language,
                        'stars': repo.stargazers_count,
                        'forks': repo.forks_count,
                        'updated_at': repo.updated_at.isoformat() if repo.updated_at else None
                    }
                )
                results.append(result)
            return results
        except Exception as e:
            logger.error(f"GitHub search error: {e}")
            return []

class KaggleService:
    @staticmethod
    async def search(query: str, max_results: int = 10) -> List[SearchResult]:
        try:
            import asyncio
            import concurrent.futures
            
            def sync_kaggle_search():
                # Import kaggle api
                from kaggle.api.kaggle_api_extended import KaggleApi
                
                # Initialize and authenticate Kaggle API
                api = KaggleApi()
                api.authenticate()
                
                # Search datasets
                datasets = api.dataset_list(search=query, max_size=max_results)
                results = []
                
                for dataset in datasets:
                    result = SearchResult(
                        id=dataset.ref,
                        title=dataset.title,
                        description=dataset.subtitle or "No description available",
                        url=f"https://www.kaggle.com/datasets/{dataset.ref}",
                        source_type="dataset",
                        metadata={
                            'size': getattr(dataset, 'totalBytes', 0),
                            'files': getattr(dataset, 'fileTypes', []),
                            'updated_at': str(dataset.lastUpdated) if hasattr(dataset, 'lastUpdated') and dataset.lastUpdated else None,
                            'download_count': getattr(dataset, 'downloadCount', 0),
                            'votes': getattr(dataset, 'voteCount', 0),
                            'creator': getattr(dataset, 'creatorName', 'Unknown')
                        }
                    )
                    results.append(result)
                return results
            
            # Run the synchronous Kaggle API call in a thread pool
            loop = asyncio.get_event_loop()
            with concurrent.futures.ThreadPoolExecutor() as executor:
                results = await loop.run_in_executor(executor, sync_kaggle_search)
                return results
                
        except Exception as e:
            logger.error(f"Kaggle search error: {e}")
            return []

class SemanticScholarService:
    @staticmethod
    async def search(query: str, max_results: int = 10) -> List[SearchResult]:
        try:
            url = "https://api.semanticscholar.org/graph/v1/paper/search"
            params = {
                'query': query,
                'limit': max_results,
                'fields': 'paperId,title,abstract,authors,year,citationCount,url'
            }
            
            async with aiohttp.ClientSession() as session:
                async with session.get(url, params=params) as response:
                    if response.status == 200:
                        data = await response.json()
                        results = []
                        
                        for paper in data.get('data', []):
                            authors = [author['name'] for author in paper.get('authors', [])]
                            result = SearchResult(
                                id=paper['paperId'],
                                title=paper['title'],
                                description=paper.get('abstract', 'No abstract available')[:200] + "...",
                                url=paper.get('url', f"https://www.semanticscholar.org/paper/{paper['paperId']}"),
                                source_type="paper",
                                metadata={
                                    'authors': authors,
                                    'year': paper.get('year'),
                                    'citations': paper.get('citationCount', 0)
                                }
                            )
                            results.append(result)
                        return results
            return []
        except Exception as e:
            logger.error(f"Semantic Scholar search error: {e}")
            return []

# Universal Search Orchestrator
class UniversalSearchOrchestrator:
    def __init__(self):
        self.services = {
            'code': GitHubService,
            'videos': YouTubeService,
            'datasets': KaggleService,
            'papers': SemanticScholarService
        }

    async def search(self, query: str, content_types: List[str], limit: int = 10) -> UniversalSearchResponse:
        """Orchestrate search across multiple content types"""
        tasks = []
        
        for content_type in content_types:
            if content_type in self.services:
                service = self.services[content_type]
                task = service.search(query, limit)
                tasks.append((content_type, task))

        # Execute all searches concurrently
        results_by_type = {}
        all_results = []

        for content_type, task in tasks:
            try:
                results = await task
                results_by_type[content_type] = results
                all_results.extend(results)
            except Exception as e:
                logger.error(f"Error searching {content_type}: {e}")
                results_by_type[content_type] = []

        # Simple relevance scoring (can be enhanced with ML models)
        for result in all_results:
            result.relevance_score = self._calculate_relevance(query, result)

        # Sort by relevance
        all_results.sort(key=lambda x: x.relevance_score, reverse=True)

        return UniversalSearchResponse(
            query=query,
            total_results=len(all_results),
            results=all_results[:limit],
            results_by_type=results_by_type
        )

    def _calculate_relevance(self, query: str, result: SearchResult) -> float:
        """Simple relevance scoring based on keyword matching"""
        query_terms = query.lower().split()
        title_score = sum(1 for term in query_terms if term in result.title.lower())
        desc_score = sum(0.5 for term in query_terms if term in result.description.lower())
        return (title_score + desc_score) / len(query_terms)

# Initialize orchestrator
search_orchestrator = UniversalSearchOrchestrator()

# API Endpoints
@api_router.get("/")
async def root():
    return {"message": "OmniSearch API - Multi-Modal Knowledge Discovery Platform"}

@api_router.post("/search/universal", response_model=UniversalSearchResponse)
async def universal_search(search_query: SearchQuery):
    """Universal search across all content types"""
    try:
        response = await search_orchestrator.search(
            query=search_query.query,
            content_types=search_query.content_types,
            limit=search_query.limit
        )
        
        # Cache the search results in Firebase/MongoDB
        search_record = {
            "query": search_query.query,
            "timestamp": datetime.utcnow(),
            "results_count": response.total_results,
            "content_types": search_query.content_types
        }
        await db.search_history.insert_one(search_record)
        
        return response
    except Exception as e:
        logger.error(f"Universal search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/search/suggestions")
async def get_search_suggestions(q: str):
    """Get search suggestions based on query"""
    try:
        # Simple suggestions - can be enhanced with ML
        suggestions = [
            f"{q} tutorial",
            f"{q} example",
            f"{q} documentation",
            f"{q} implementation",
            f"{q} research"
        ]
        return {"suggestions": suggestions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/content/{content_type}/{content_id}")
async def get_content_details(content_type: str, content_id: str):
    """Get detailed content information"""
    try:
        # This would fetch detailed information about specific content
        # Implementation depends on the content type
        return {
            "id": content_id,
            "type": content_type,
            "message": "Detailed content retrieval - to be implemented"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/trending")
async def get_trending_content():
    """Get trending/popular content across all types"""
    try:
        # Mock trending data - would be populated from analytics
        trending = {
            "code": ["FastAPI", "React", "Python", "Machine Learning"],
            "videos": ["AI Tutorial", "Web Development", "Data Science"],
            "papers": ["Deep Learning", "Neural Networks", "Computer Vision"], 
            "datasets": ["COVID-19", "Climate Data", "Financial Markets"]
        }
        return {"trending": trending}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Include router in main app
app.include_router(api_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)