import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Settings, BookOpen, ChevronDown, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { Button } from '../ui/Button';
import logo from '../../assets/logo .jpg'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Blog', href: '#blog' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    // Close mobile menu first
    setIsMobileMenuOpen(false);
    
    // If we're not on the home page, go to home first
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
      return;
    }
    
    // Find the target element
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Get the header height to offset scroll position
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowUserMenu(false);
  };

  const handleAdminClick = () => {
    navigate('/admin');
    setShowUserMenu(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-700'
            : 'bg-gray-900/80 backdrop-blur-sm'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => {
                navigate('/');
                setTimeout(() => scrollToSection('#home'), 100);
              }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <img src={logo} alt="Marzelet Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <span className="text-3xl font-bold text-white">
                Marzelet
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navigation.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-300 hover:text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-800"
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-lg bg-gray-800 text-blue-400 hover:bg-gray-700 transition-colors"
                  >
                    <User size={18} />
                    <span className="hidden sm:block text-sm font-medium">
                      {user.user_metadata?.username || user.email?.split('@')[0]}
                    </span>
                    <ChevronDown size={16} />
                  </motion.button>

                  {/* User Menu */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2"
                      >
                        <div className="px-4 py-2 border-b border-gray-700">
                          <p className="text-sm font-medium text-white">
                            {user.user_metadata?.username || 'User'}
                          </p>
                          <p className="text-xs text-gray-400">
                            {user.email}
                          </p>
                          {isAdmin && (
                            <span className="inline-block mt-1 px-2 py-1 bg-red-900/30 text-red-400 text-xs rounded-full">
                              Admin
                            </span>
                          )}
                        </div>
                        
                        <button 
                          onClick={handleProfileClick}
                          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                        >
                          <Settings size={16} className="mr-2" />
                          Profile Settings
                        </button>
                        
                        {isAdmin && (
                          <button 
                            onClick={handleAdminClick}
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
                          >
                            <Shield size={16} className="mr-2" />
                            Admin Dashboard
                          </button>
                        )}
                        
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 flex items-center"
                        >
                          <LogOut size={16} className="mr-2" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAuthClick('signin')}
                  >
                    Login
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <div className="md:hidden">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg bg-gray-800 text-gray-300"
                >
                  {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.button>
              </div>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden"
          >
            <div className="bg-gray-900/95 backdrop-blur-lg border-b border-gray-700 shadow-lg">
              <div className="px-6 py-4 space-y-1">
                {navigation.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    whileHover={{ x: 8 }}
                    className="block w-full text-left px-4 py-3 text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    {item.name}
                  </motion.button>
                ))}
                
                {!user && (
                  <div className="pt-4 border-t border-gray-700">
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => handleAuthClick('signin')}
                    >
                      Login
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};