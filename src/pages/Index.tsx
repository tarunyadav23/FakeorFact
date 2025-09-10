import React from 'react';
import Header from '@/components/Header';
import NewsAnalyzer from '@/components/NewsAnalyzer';
import Features from '@/components/Features';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-inter">
      {/* Main site header */}
      <Header />

      <main className="max-w-5xl mx-auto px-8 py-16">
        {/* Highlight section with a subtle shadow and rounded card */}
        <section className="bg-white shadow-md rounded-xl p-8 mb-12">
          <NewsAnalyzer />
        </section>
      </main>

      {/* Core features section */}
      <Features />

      <footer className="bg-gradient-to-r from-purple-600 to-blue-500 py-12 px-6 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/90 mb-4 font-medium">
             Helping users identify real news quickly and reliably
          </p>
          <p className="text-white/70 text-sm">
            Designed and developed by Tarun – bringing clarity to digital news
          </p>
           <p className="text-white/50 text-xs mt-4 font-bold">
      ©2025 Tarun Yadav. All rights reserved.
    </p>
        </div>
      </footer>

      {/* Page signature */}
      {/* Crafted personally by Tarun, 2025 */}
    </div>
  );
};

export default Index;
