import React from 'react';
import { Shield, Brain, FileText } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-hero py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center items-center gap-3 mb-6">
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
            <FileText className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          FakeorFact - AI News
          <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            {" "}Analyzer
          </span>
        </h1>
        
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Harness the power of AI to summarize news articles and detect misinformation. 
          Get instant insights with advanced natural language processing.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 text-white/80">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <span>AI-Powered Summarization</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span>Fake News Detection</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span>Word Highlighting</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;