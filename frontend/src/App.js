import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Search Context
const SearchContext = React.createContext();

// Evolving Canvas Component - The "Nebula" Homepage
const EvolvingCanvas = ({ onSearch, onConceptClick }) => {
  const [concepts, setConcepts] = useState([]);
  const [hoveredConcept, setHoveredConcept] = useState(null);

  useEffect(() => {
    // Initialize concept nebulas
    const initialConcepts = [
      { id: 1, name: 'Machine Learning', x: 20, y: 30, type: 'code', intensity: 0.8 },
      { id: 2, name: 'React Tutorials', x: 60, y: 20, type: 'videos', intensity: 0.9 },
      { id: 3, name: 'Climate Data', x: 80, y: 60, type: 'datasets', intensity: 0.7 },
      { id: 4, name: 'Deep Learning', x: 30, y: 70, type: 'papers', intensity: 0.85 },
      { id: 5, name: 'FastAPI', x: 70, y: 40, type: 'code', intensity: 0.6 },
      { id: 6, name: 'Data Science', x: 15, y: 60, type: 'videos', intensity: 0.75 },
      { id: 7, name: 'COVID Research', x: 50, y: 80, type: 'papers', intensity: 0.9 },
      { id: 8, name: 'Financial Markets', x: 90, y: 25, type: 'datasets', intensity: 0.8 }
    ];
    setConcepts(initialConcepts);
  }, []);

  const getConceptIcon = (type) => {
    const icons = {
      code: '{ }',
      videos: '▶',
      papers: '📜',
      datasets: '📊'
    };
    return icons[type] || '◦';
  };

  const getConceptColor = (type) => {
    const colors = {
      code: 'from-blue-400 to-cyan-400',
      videos: 'from-red-400 to-pink-400',
      papers: 'from-green-400 to-emerald-400',
      datasets: 'from-purple-400 to-indigo-400'
    };
    return colors[type] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className="evolving-canvas relative w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Ambient Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse top-1/4 left-1/4"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse bottom-1/4 right-1/4 delay-1000"></div>
      </div>

      {/* Main Title */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center z-20">
        <h1 className="text-6xl font-light text-white mb-4 tracking-wide">
          Omni<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Search</span>
        </h1>
        <p className="text-xl text-slate-300 font-light">Multi-Modal Knowledge Discovery Platform</p>
      </div>

      {/* Search Bar */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-8 z-20">
        <div className="relative">
          <input
            type="text"
            placeholder="Search across code, videos, papers, and datasets..."
            className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all duration-300"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                onSearch(e.target.value.trim());
              }
            }}
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            <span className="text-sm">Press Enter</span>
          </div>
        </div>
      </div>

      {/* Concept Nebulas */}
      <div className="absolute inset-0 z-10">
        {concepts.map((concept) => (
          <div
            key={concept.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 hover:scale-125"
            style={{ left: `${concept.x}%`, top: `${concept.y}%` }}
            onMouseEnter={() => setHoveredConcept(concept)}
            onMouseLeave={() => setHoveredConcept(null)}
            onClick={() => onConceptClick(concept.name)}
          >
            {/* Concept Glow */}
            <div 
              className={`absolute inset-0 w-24 h-24 bg-gradient-to-r ${getConceptColor(concept.type)} rounded-full blur-xl opacity-60 animate-pulse`}
              style={{ 
                animationDuration: `${2 + concept.intensity}s`,
                transform: 'scale(1.5)'
              }}
            ></div>
            
            {/* Concept Core */}
            <div className={`relative w-16 h-16 bg-gradient-to-r ${getConceptColor(concept.type)} rounded-full flex items-center justify-center text-white font-bold shadow-2xl border border-white/30`}>
              {getConceptIcon(concept.type)}
            </div>

            {/* Concept Label */}
            {hoveredConcept?.id === concept.id && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-black/80 backdrop-blur-sm rounded-lg text-white text-sm whitespace-nowrap border border-white/20">
                {concept.name}
                <div className="text-xs text-slate-300 mt-1 capitalize">{concept.type}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Search Suggestions */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center z-20">
        <p className="text-slate-400 mb-4">Or explore trending topics:</p>
        <div className="flex flex-wrap gap-3 justify-center max-w-4xl">
          {['Machine Learning', 'React Hooks', 'Climate Change', 'Quantum Computing', 'Web3'].map((topic) => (
            <button
              key={topic}
              onClick={() => onSearch(topic)}
              className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-sm"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Dynamic Discovery Grid Component
const DynamicDiscoveryGrid = ({ searchResults, onResultClick, onFilterChange, activeFilters }) => {
  const resultsByType = useMemo(() => {
    const grouped = {
      code: [],
      videos: [],
      papers: [],
      datasets: []
    };
    
    searchResults.results?.forEach(result => {
      if (grouped[result.source_type]) {
        grouped[result.source_type].push(result);
      }
    });
    
    return grouped;
  }, [searchResults]);

  const getTypeIcon = (type) => {
    const icons = {
      code: '{ }',
      videos: '▶',
      papers: '📜', 
      datasets: '📊'
    };
    return icons[type] || '◦';
  };

  const getTypeColor = (type) => {
    const colors = {
      code: 'border-blue-400 bg-blue-400/10',
      videos: 'border-red-400 bg-red-400/10',
      papers: 'border-green-400 bg-green-400/10',
      datasets: 'border-purple-400 bg-purple-400/10'
    };
    return colors[type] || 'border-gray-400 bg-gray-400/10';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-light text-slate-800 dark:text-white">
                Search Results for "{searchResults.query}"
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Found {searchResults.total_results} results across {Object.keys(resultsByType).length} content types
              </p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex gap-2">
              {['all', 'code', 'videos', 'papers', 'datasets'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => onFilterChange(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeFilters.includes(filter)
                      ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-800'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {filter === 'all' ? 'All' : `${getTypeIcon(filter)} ${filter.charAt(0).toUpperCase() + filter.slice(1)}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.results?.map((result) => (
            <div
              key={result.id}
              onClick={() => onResultClick(result)}
              className={`group cursor-pointer rounded-2xl border-2 ${getTypeColor(result.source_type)} backdrop-blur-sm p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white/60 dark:bg-slate-800/60`}
            >
              {/* Content Type Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${getTypeColor(result.source_type)} flex items-center justify-center text-xl font-bold`}>
                  {getTypeIcon(result.source_type)}
                </div>
                <div className="text-xs px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 capitalize">
                  {result.source_type}
                </div>
              </div>

              {/* Thumbnail for videos */}
              {result.thumbnail_url && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={result.thumbnail_url} 
                    alt={result.title}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <h3 className="font-semibold text-slate-800 dark:text-white mb-2 line-clamp-2 text-lg">
                {result.title}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4">
                {result.description}
              </p>

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  {result.metadata.stars && (
                    <span className="flex items-center gap-1">
                      ⭐ {result.metadata.stars}
                    </span>
                  )}
                  {result.metadata.channel && (
                    <span>{result.metadata.channel}</span>
                  )}
                  {result.metadata.authors && (
                    <span>{result.metadata.authors[0]}</span>
                  )}
                </div>
                <div className="text-right">
                  <div className="w-16 bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                    <div 
                      className="h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                      style={{ width: `${Math.max(20, result.relevance_score * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Focus Viewport Component
const FocusViewport = ({ content, onBack }) => {
  const getViewportContent = () => {
    switch (content.source_type) {
      case 'video':
        return (
          <div className="space-y-6">
            <div className="aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${content.id}`}
                title={content.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{content.title}</h2>
                <p className="text-slate-600 dark:text-slate-300">{content.description}</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4">
                <h3 className="font-semibold mb-3 text-slate-800 dark:text-white">Video Info</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Channel:</span> {content.metadata.channel}</p>
                  <p><span className="font-medium">Published:</span> {new Date(content.metadata.published_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'code':
        return (
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl p-6 text-green-400 font-mono">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-white">{content.title}</h2>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">{content.metadata.language}</span>
                  <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded">⭐ {content.metadata.stars}</span>
                </div>
              </div>
              <p className="text-slate-300 mb-4">{content.description}</p>
              <div className="text-sm">
                <p># Repository: {content.title}</p>
                <p># Language: {content.metadata.language}</p>
                <p># Stars: {content.metadata.stars} | Forks: {content.metadata.forks}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href={content.url} target="_blank" rel="noopener noreferrer" 
                 className="bg-slate-800 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors text-center">
                View on GitHub
              </a>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                Clone Repository
              </button>
            </div>
          </div>
        );
      
      case 'paper':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">{content.title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {content.metadata.authors?.map((author, index) => (
                  <span key={index} className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-sm">
                    {author}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 mb-6 text-sm text-slate-600 dark:text-slate-400">
                <span>📅 {content.metadata.year}</span>
                <span>📈 {content.metadata.citations} citations</span>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <h3>Abstract</h3>
                <p>{content.description}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <a href={content.url} target="_blank" rel="noopener noreferrer"
                 className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors">
                Read Full Paper
              </a>
              <button className="bg-slate-600 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors">
                Save to Library
              </button>
            </div>
          </div>
        );
      
      case 'dataset':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">{content.title}</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">{content.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-4">
                  <h3 className="font-semibold mb-2">Dataset Info</h3>
                  <div className="text-sm space-y-1">
                    <p>Size: {(content.metadata.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p>Files: {content.metadata.files?.length || 'Multiple'}</p>
                    <p>Updated: {new Date(content.metadata.updated_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-4">
                  <h3 className="font-semibold mb-2">File Types</h3>
                  <div className="flex flex-wrap gap-1">
                    {(content.metadata.files || ['CSV', 'JSON']).map((type, index) => (
                      <span key={index} className="text-xs bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-4">
                  <h3 className="font-semibold mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-xs bg-blue-600 text-white py-2 rounded">Preview Data</button>
                    <button className="w-full text-xs bg-green-600 text-white py-2 rounded">Download</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <a href={content.url} target="_blank" rel="noopener noreferrer"
                 className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors">
                View on Kaggle
              </a>
              <button className="bg-slate-600 text-white px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors">
                Add to Workspace
              </button>
            </div>
          </div>
        );
      
      default:
        return <div>Content type not supported</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              ← Back to Results
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold">
                {content.source_type === 'code' ? '{}' : content.source_type === 'video' ? '▶' : content.source_type === 'paper' ? '📜' : '📊'}
              </div>
              <span className="text-lg font-medium text-slate-800 dark:text-white capitalize">
                {content.source_type} Focus Viewport
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {getViewportContent()}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState('canvas'); // 'canvas', 'results', 'focus'
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ results: [], total_results: 0, query: '' });
  const [focusContent, setFocusContent] = useState(null);
  const [activeFilters, setActiveFilters] = useState(['all']);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setSearchQuery(query);
    
    try {
      const response = await axios.post(`${API}/search/universal`, {
        query: query,
        content_types: ['code', 'videos', 'papers', 'datasets'],
        limit: 20
      });
      
      setSearchResults(response.data);
      setCurrentView('results');
    } catch (error) {
      console.error('Search error:', error);
      // Mock data for demo
      setSearchResults({
        query: query,
        total_results: 8,
        results: [
          {
            id: '1',
            title: `${query} - Complete Tutorial`,
            description: `Learn everything about ${query} in this comprehensive guide...`,
            url: '#',
            source_type: 'video',
            thumbnail_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
            metadata: { channel: 'Tech Channel', published_at: new Date().toISOString() },
            relevance_score: 0.95
          },
          {
            id: '2', 
            title: `${query.toLowerCase()}-framework`,
            description: `A powerful framework for ${query} development...`,
            url: '#',
            source_type: 'code',
            metadata: { language: 'Python', stars: 1234, forks: 567 },
            relevance_score: 0.88
          }
        ]
      });
      setCurrentView('results');
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (result) => {
    setFocusContent(result);
    setCurrentView('focus');
  };

  const handleFilterChange = (filter) => {
    if (filter === 'all') {
      setActiveFilters(['all']);
    } else {
      setActiveFilters(prev => 
        prev.includes('all') ? [filter] : 
        prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
      );
    }
  };

  return (
    <SearchContext.Provider value={{ searchQuery, searchResults, handleSearch }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
                {loading && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center">
                      <div className="animate-spin w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-slate-600 dark:text-slate-300">Searching across all content types...</p>
                    </div>
                  </div>
                )}
                
                {currentView === 'canvas' && (
                  <EvolvingCanvas 
                    onSearch={handleSearch}
                    onConceptClick={handleSearch}
                  />
                )}
                
                {currentView === 'results' && (
                  <DynamicDiscoveryGrid
                    searchResults={searchResults}
                    onResultClick={handleResultClick}
                    onFilterChange={handleFilterChange}
                    activeFilters={activeFilters}
                  />
                )}
                
                {currentView === 'focus' && focusContent && (
                  <FocusViewport
                    content={focusContent}
                    onBack={() => setCurrentView('results')}
                  />
                )}
              </>
            } />
          </Routes>
        </BrowserRouter>
      </div>
    </SearchContext.Provider>
  );
}

export default App;