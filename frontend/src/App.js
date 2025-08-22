import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Search Context
const SearchContext = React.createContext();

// Enhanced Evolving Canvas Component
const EvolvingCanvas = ({ onSearch, onConceptClick }) => {
  const [concepts, setConcepts] = useState([]);
  const [hoveredConcept, setHoveredConcept] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // Initialize concept nebulas with more variety
    const initialConcepts = [
      { id: 1, name: 'Machine Learning', x: 15, y: 25, type: 'code', intensity: 0.9, size: 'large' },
      { id: 2, name: 'React Tutorials', x: 70, y: 15, type: 'videos', intensity: 0.8, size: 'medium' },
      { id: 3, name: 'Climate Data', x: 85, y: 55, type: 'datasets', intensity: 0.7, size: 'small' },
      { id: 4, name: 'Deep Learning', x: 25, y: 70, type: 'papers', intensity: 0.95, size: 'large' },
      { id: 5, name: 'FastAPI', x: 60, y: 35, type: 'code', intensity: 0.6, size: 'small' },
      { id: 6, name: 'Data Science', x: 10, y: 55, type: 'videos', intensity: 0.75, size: 'medium' },
      { id: 7, name: 'COVID Research', x: 45, y: 80, type: 'papers', intensity: 0.85, size: 'medium' },
      { id: 8, name: 'Housing Data', x: 90, y: 30, type: 'datasets', intensity: 0.8, size: 'small' },
      { id: 9, name: 'Python', x: 35, y: 20, type: 'code', intensity: 0.9, size: 'medium' },
      { id: 10, name: 'AI Ethics', x: 55, y: 60, type: 'papers', intensity: 0.7, size: 'small' }
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
      code: 'from-blue-400 via-cyan-400 to-blue-500',
      videos: 'from-red-400 via-pink-400 to-red-500',
      papers: 'from-green-400 via-emerald-400 to-green-500',
      datasets: 'from-purple-400 via-indigo-400 to-purple-500'
    };
    return colors[type] || 'from-gray-400 to-gray-600';
  };

  const getConceptSize = (size) => {
    const sizes = {
      small: 'w-12 h-12',
      medium: 'w-16 h-16',
      large: 'w-20 h-20'
    };
    return sizes[size] || 'w-16 h-16';
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  return (
    <div className="evolving-canvas relative w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Ambient Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-slow top-1/4 left-1/4"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse-slow bottom-1/4 right-1/4 delay-1000"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse-slow top-1/3 right-1/3 delay-2000"></div>
      </div>

      {/* Main Title with Enhanced Typography */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center z-20">
        <h1 className="text-7xl font-light text-white mb-4 tracking-wide animate-fade-in">
          Omni<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient-x">Search</span>
        </h1>
        <p className="text-xl text-slate-300 font-light animate-fade-in-delay">
          Multi-Modal Knowledge Discovery Platform
        </p>
        <div className="flex justify-center mt-4 space-x-6 text-sm text-slate-400 animate-fade-in-delay-2">
          <span className="flex items-center gap-2"><span className="text-blue-400">{ }</span> Code</span>
          <span className="flex items-center gap-2"><span className="text-red-400">▶</span> Videos</span>
          <span className="flex items-center gap-2"><span className="text-green-400">📜</span> Papers</span>
          <span className="flex items-center gap-2"><span className="text-purple-400">📊</span> Datasets</span>
        </div>
      </div>

      {/* Enhanced Search Bar */}
      <div className="absolute top-36 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-8 z-20">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <input
            type="text"
            placeholder="Search across code, videos, papers, and datasets..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleSearch}
            className="relative w-full px-8 py-5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all duration-300 text-lg"
          />
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-400 flex items-center gap-2">
            <span className="text-sm">Press Enter</span>
            <div className="w-6 h-6 rounded bg-white/20 flex items-center justify-center text-xs">⏎</div>
          </div>
        </div>
      </div>

      {/* Enhanced Concept Nebulas */}
      <div className="absolute inset-0 z-10">
        {concepts.map((concept) => (
          <div
            key={concept.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-30"
            style={{ 
              left: `${concept.x}%`, 
              top: `${concept.y}%`,
              animation: `float ${6 + concept.intensity * 2}s ease-in-out infinite`
            }}
            onMouseEnter={() => setHoveredConcept(concept)}
            onMouseLeave={() => setHoveredConcept(null)}
            onClick={() => onConceptClick(concept.name)}
          >
            {/* Concept Glow with Pulsing Animation */}
            <div 
              className={`absolute inset-0 ${getConceptSize(concept.size)} bg-gradient-to-r ${getConceptColor(concept.type)} rounded-full blur-2xl opacity-60 animate-pulse-glow`}
              style={{ 
                animationDuration: `${2 + concept.intensity}s`,
                transform: 'scale(1.8)'
              }}
            ></div>
            
            {/* Concept Core with Enhanced Design */}
            <div className={`relative ${getConceptSize(concept.size)} bg-gradient-to-r ${getConceptColor(concept.type)} rounded-full flex items-center justify-center text-white font-bold shadow-2xl border-2 border-white/30 backdrop-blur-sm`}>
              <span className="text-lg filter drop-shadow-lg">{getConceptIcon(concept.type)}</span>
            </div>

            {/* Enhanced Concept Label */}
            {hoveredConcept?.id === concept.id && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 px-6 py-3 bg-black/90 backdrop-blur-sm rounded-xl text-white text-sm whitespace-nowrap border border-white/20 shadow-2xl animate-fade-in">
                <div className="font-semibold">{concept.name}</div>
                <div className="text-xs text-slate-300 mt-1 capitalize flex items-center gap-1">
                  <span>{getConceptIcon(concept.type)}</span>
                  {concept.type}
                </div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black/90 rotate-45 border-l border-t border-white/20"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced Floating Search Suggestions */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center z-20 animate-fade-in-delay-3">
        <p className="text-slate-400 mb-6 text-lg">Or explore trending topics:</p>
        <div className="flex flex-wrap gap-4 justify-center max-w-5xl">
          {[
            { name: 'Machine Learning', type: 'code' },
            { name: 'React Hooks', type: 'videos' },
            { name: 'Climate Change', type: 'papers' },
            { name: 'Housing Data', type: 'datasets' },
            { name: 'AI Ethics', type: 'papers' },
            { name: 'Web3', type: 'code' }
          ].map((topic, index) => (
            <button
              key={topic.name}
              onClick={() => onSearch(topic.name)}
              className={`px-6 py-3 bg-gradient-to-r ${getConceptColor(topic.type)} bg-opacity-10 backdrop-blur-sm rounded-full border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all duration-300 text-sm font-medium hover:scale-105 animate-fade-in-stagger`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="mr-2">{getConceptIcon(topic.type)}</span>
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced Dynamic Discovery Grid Component
const DynamicDiscoveryGrid = ({ searchResults, onResultClick, onFilterChange, activeFilters }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [animatedResults, setAnimatedResults] = useState([]);

  const resultsByType = useMemo(() => {
    const grouped = {
      code: [],
      videos: [],
      papers: [],
      datasets: []
    };
    
    searchResults.results?.forEach(result => {
      const type = result.source_type === 'video' ? 'videos' : result.source_type;
      if (grouped[type]) {
        grouped[type].push(result);
      }
    });
    
    return grouped;
  }, [searchResults]);

  const filteredResults = useMemo(() => {
    if (activeFilters.includes('all') || activeFilters.length === 0) {
      return searchResults.results || [];
    }
    
    return (searchResults.results || []).filter(result => {
      const type = result.source_type === 'video' ? 'videos' : result.source_type;
      return activeFilters.includes(type);
    });
  }, [searchResults.results, activeFilters]);

  useEffect(() => {
    // Animate results appearing
    setIsLoading(true);
    const timer = setTimeout(() => {
      setAnimatedResults(filteredResults);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [filteredResults]);

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
      code: 'from-blue-400 to-cyan-400',
      videos: 'from-red-400 to-pink-400',
      papers: 'from-green-400 to-emerald-400',
      datasets: 'from-purple-400 to-indigo-400'
    };
    return colors[type] || 'from-gray-400 to-gray-600';
  };

  const getTypeBorder = (type) => {
    const borders = {
      code: 'border-blue-400/30 hover:border-blue-400/60',
      videos: 'border-red-400/30 hover:border-red-400/60',
      papers: 'border-green-400/30 hover:border-green-400/60',
      datasets: 'border-purple-400/30 hover:border-purple-400/60'
    };
    return borders[type] || 'border-gray-400/30 hover:border-gray-400/60';
  };

  const totalByType = Object.entries(resultsByType).map(([type, results]) => ({
    type,
    count: results.length,
    icon: getTypeIcon(type)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Enhanced Header */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-light text-slate-800 dark:text-white mb-2">
                Search Results for <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">"{searchResults.query}"</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Found <span className="font-semibold text-cyan-600 dark:text-cyan-400">{searchResults.total_results}</span> results across multiple content types
              </p>
            </div>
            
            {/* Enhanced Filter Pills */}
            <div className="flex flex-wrap gap-3 animate-slide-in-right">
              <button
                onClick={() => onFilterChange('all')}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  activeFilters.includes('all') || activeFilters.length === 0
                    ? 'bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg dark:from-white dark:to-gray-100 dark:text-slate-800'
                    : 'bg-slate-200/70 text-slate-600 hover:bg-slate-300/70 dark:bg-slate-700/70 dark:text-slate-300 dark:hover:bg-slate-600/70'
                }`}
              >
                All Results ({searchResults.total_results})
              </button>
              
              {totalByType.map(({ type, count, icon }) => (
                <button
                  key={type}
                  onClick={() => onFilterChange(type)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
                    activeFilters.includes(type)
                      ? `bg-gradient-to-r ${getTypeColor(type)} text-white shadow-lg`
                      : 'bg-slate-200/70 text-slate-600 hover:bg-slate-300/70 dark:bg-slate-700/70 dark:text-slate-300 dark:hover:bg-slate-600/70'
                  }`}
                >
                  <span className="text-lg">{icon}</span>
                  {type.charAt(0).toUpperCase() + type.slice(1)} ({count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Results Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          // Enhanced Loading State
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/60 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-slate-300 dark:bg-slate-600 rounded-xl"></div>
                    <div className="w-16 h-6 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                  </div>
                  <div className="w-full h-32 bg-slate-300 dark:bg-slate-600 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="w-3/4 h-4 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    <div className="w-full h-4 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    <div className="w-1/2 h-4 bg-slate-300 dark:bg-slate-600 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {animatedResults.map((result, index) => {
              const displayType = result.source_type === 'video' ? 'videos' : result.source_type;
              
              return (
                <div
                  key={result.id}
                  onClick={() => onResultClick(result)}
                  className={`group cursor-pointer rounded-2xl border-2 ${getTypeBorder(displayType)} backdrop-blur-sm p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white/80 dark:bg-slate-800/80 animate-slide-in-up hover:-translate-y-2`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Content Type Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${getTypeColor(displayType)} flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {getTypeIcon(displayType)}
                    </div>
                    <div className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getTypeColor(displayType)} text-white font-medium shadow-sm`}>
                      {displayType.charAt(0).toUpperCase() + displayType.slice(1)}
                    </div>
                  </div>

                  {/* Thumbnail for videos */}
                  {result.thumbnail_url && (
                    <div className="mb-4 rounded-xl overflow-hidden shadow-lg">
                      <img 
                        src={result.thumbnail_url} 
                        alt={result.title}
                        className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 rounded-xl"></div>
                    </div>
                  )}

                  {/* Content */}
                  <h3 className="font-semibold text-slate-800 dark:text-white mb-3 line-clamp-2 text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-500 transition-all duration-300">
                    {result.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {result.description}
                  </p>

                  {/* Enhanced Metadata */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-3">
                        {result.metadata.stars && (
                          <span className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
                            ⭐ {result.metadata.stars.toLocaleString()}
                          </span>
                        )}
                        {result.metadata.language && (
                          <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                            {result.metadata.language}
                          </span>
                        )}
                        {result.metadata.channel && (
                          <span className="bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                            📺 {result.metadata.channel}
                          </span>
                        )}
                        {result.metadata.citations && (
                          <span className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                            📄 {result.metadata.citations.toLocaleString()} citations
                          </span>
                        )}
                        {result.metadata.authors && result.metadata.authors.length > 0 && (
                          <span className="bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                            👥 {result.metadata.authors[0]} {result.metadata.authors.length > 1 ? `+${result.metadata.authors.length - 1}` : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Relevance Score Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <span>Relevance</span>
                        <span>{Math.round(result.relevance_score * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 bg-gradient-to-r ${getTypeColor(displayType)} rounded-full transition-all duration-1000 ease-out`}
                          style={{ 
                            width: `${Math.max(10, result.relevance_score * 100)}%`,
                            animationDelay: `${index * 0.1 + 0.5}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Button */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className={`w-full py-2 px-4 rounded-lg bg-gradient-to-r ${getTypeColor(displayType)} text-white font-medium text-sm hover:shadow-lg transition-shadow duration-300`}>
                      {displayType === 'code' && 'View Repository'}
                      {displayType === 'videos' && 'Watch Video'}
                      {displayType === 'papers' && 'Read Paper'}
                      {displayType === 'datasets' && 'Explore Dataset'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* No Results State */}
        {!isLoading && animatedResults.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-slate-400 to-slate-600 flex items-center justify-center text-white text-3xl">
              🔍
            </div>
            <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">No results found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Focus Viewport Component (Enhanced)
const FocusViewport = ({ content, onBack }) => {
  const displayType = content.source_type === 'video' ? 'videos' : content.source_type;
  
  const getTypeColor = (type) => {
    const colors = {
      code: 'from-blue-400 to-cyan-400',
      videos: 'from-red-400 to-pink-400',
      papers: 'from-green-400 to-emerald-400',
      datasets: 'from-purple-400 to-indigo-400'
    };
    return colors[type] || 'from-gray-400 to-gray-600';
  };

  const getViewportContent = () => {
    switch (content.source_type) {
      case 'video':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${content.id}`}
                title={content.title}
                frameBorder="0"
                allowFullScreen
                className="rounded-2xl"
              ></iframe>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-4xl font-bold text-slate-800 dark:text-white leading-tight">{content.title}</h2>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">{content.description}</p>
                
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium">
                    📺 Video Content
                  </span>
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                    🎬 {content.metadata.channel}
                  </span>
                </div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 h-fit">
                <h3 className="font-semibold mb-4 text-slate-800 dark:text-white text-xl">Video Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Channel:</span>
                    <span className="font-medium text-slate-800 dark:text-white">{content.metadata.channel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Published:</span>
                    <span className="font-medium text-slate-800 dark:text-white">{new Date(content.metadata.published_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Relevance:</span>
                    <span className="font-medium text-slate-800 dark:text-white">{Math.round(content.relevance_score * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'code':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-900 rounded-2xl p-8 text-green-400 font-mono shadow-2xl border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white font-bold">{content.title}</h2>
                <div className="flex gap-3">
                  {content.metadata.language && (
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full font-medium">
                      {content.metadata.language}
                    </span>
                  )}
                  <span className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-full font-medium flex items-center gap-1">
                    ⭐ {content.metadata.stars?.toLocaleString()}
                  </span>
                  <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full font-medium">
                    🍴 {content.metadata.forks?.toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">{content.description}</p>
              <div className="text-sm space-y-2 bg-slate-800 p-4 rounded-lg">
                <p className="text-green-400"># Repository: {content.title}</p>
                <p className="text-cyan-400"># Language: {content.metadata.language || 'Multiple'}</p>
                <p className="text-yellow-400"># Stars: {content.metadata.stars?.toLocaleString()} | Forks: {content.metadata.forks?.toLocaleString()}</p>
                <p className="text-purple-400"># Updated: {new Date(content.metadata.updated_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href={content.url} target="_blank" rel="noopener noreferrer" 
                 className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-8 py-4 rounded-xl hover:from-slate-700 hover:to-slate-600 transition-all duration-300 text-center font-medium shadow-lg hover:shadow-xl hover:scale-105">
                <span className="mr-2">🔗</span>View on GitHub
              </a>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                <span className="mr-2">📥</span>Clone Repository
              </button>
              <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                <span className="mr-2">⭐</span>Add to Favorites
              </button>
            </div>
          </div>
        );
      
      case 'paper':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 shadow-2xl border border-slate-200 dark:border-slate-700">
              <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">{content.title}</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {content.metadata.authors?.map((author, index) => (
                  <span key={index} className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                    {author}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-6 mb-8 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                  📅 {content.metadata.year}
                </span>
                <span className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                  📈 {content.metadata.citations?.toLocaleString()} citations
                </span>
                <span className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                  🎯 {Math.round(content.relevance_score * 100)}% relevance
                </span>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-2xl font-semibold mb-4">Abstract</h3>
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">{content.description}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <a href={content.url} target="_blank" rel="noopener noreferrer"
                 className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                <span className="mr-2">📖</span>Read Full Paper
              </a>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                <span className="mr-2">💾</span>Save to Library
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                <span className="mr-2">📎</span>Generate Citation
              </button>
            </div>
          </div>
        );
      
      case 'dataset':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 shadow-2xl border border-slate-200 dark:border-slate-700">
              <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">{content.title}</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg leading-relaxed">{content.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                  <h3 className="font-semibold mb-4 text-purple-800 dark:text-purple-300 text-lg">Dataset Info</h3>
                  <div className="text-sm space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Size:</span>
                      <span className="font-medium text-slate-800 dark:text-white">
                        {content.metadata.size ? `${(content.metadata.size / 1024 / 1024).toFixed(2)} MB` : 'Unknown'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Files:</span>
                      <span className="font-medium text-slate-800 dark:text-white">
                        {content.metadata.files?.length || 'Multiple'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Updated:</span>
                      <span className="font-medium text-slate-800 dark:text-white">
                        {content.metadata.updated_at ? new Date(content.metadata.updated_at).toLocaleDateString() : 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold mb-4 text-blue-800 dark:text-blue-300 text-lg">File Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {(content.metadata.files || ['CSV', 'JSON']).map((type, index) => (
                      <span key={index} className="text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full font-medium">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold mb-4 text-green-800 dark:text-green-300 text-lg">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium">
                      📊 Preview Data
                    </button>
                    <button className="w-full text-sm bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium">
                      📥 Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-6">
              <a href={content.url} target="_blank" rel="noopener noreferrer"
                 className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                <span className="mr-2">🔗</span>View on Kaggle
              </a>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                <span className="mr-2">➕</span>Add to Workspace
              </button>
              <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                <span className="mr-2">🔍</span>Analyze Data
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
      {/* Enhanced Header */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="flex items-center gap-3 px-6 py-3 bg-slate-200 dark:bg-slate-700 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-300 hover:scale-105 font-medium shadow-lg"
            >
              ← Back to Results
            </button>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${getTypeColor(displayType)} rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                {displayType === 'code' ? '{}' : displayType === 'videos' ? '▶' : displayType === 'papers' ? '📜' : '📊'}
              </div>
              <div>
                <span className="text-xl font-semibold text-slate-800 dark:text-white capitalize">
                  {displayType.slice(0, -1)} Focus Viewport
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Deep dive into this content</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {getViewportContent()}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState('canvas');
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
        limit: 50
      });
      
      setSearchResults(response.data);
      setCurrentView('results');
      setActiveFilters(['all']); // Reset filters when new search
    } catch (error) {
      console.error('Search error:', error);
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
      if (activeFilters.includes('all')) {
        setActiveFilters([filter]);
      } else if (activeFilters.includes(filter)) {
        const newFilters = activeFilters.filter(f => f !== filter);
        setActiveFilters(newFilters.length === 0 ? ['all'] : newFilters);
      } else {
        setActiveFilters([...activeFilters, filter]);
      }
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
                  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center shadow-2xl border border-slate-200 dark:border-slate-700 max-w-md mx-4">
                      <div className="relative mb-6">
                        <div className="animate-spin w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-purple-400/30 rounded-full mx-auto animate-ping"></div>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Searching Knowledge Universe</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">Discovering content across all platforms...</p>
                      <div className="flex justify-center space-x-4 text-sm">
                        <span className="flex items-center gap-1 text-blue-600"><span>{ }</span> Code</span>
                        <span className="flex items-center gap-1 text-red-600"><span>▶</span> Videos</span>
                        <span className="flex items-center gap-1 text-green-600"><span>📜</span> Papers</span>
                        <span className="flex items-center gap-1 text-purple-600"><span>📊</span> Data</span>
                      </div>
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