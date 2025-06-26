import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, showBackButton = false, title }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation Header */}
      {showBackButton && (
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
                {title && (
                  <h1 className="text-xl font-semibold text-white">{title}</h1>
                )}
              </div>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </div>
          </div>
        </motion.header>
      )}
      
      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
};