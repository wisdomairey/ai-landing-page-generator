import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';
import { motion } from 'framer-motion';

const Header = () => {
  const { state } = useApp();
  const location = useLocation();
  
  const isBuilderActive = location.pathname.includes('/builder');
  const isProjectsActive = location.pathname.includes('/projects');

  return (
    <motion.header 
      className="bg-white border-b border-gray-200 px-6 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="text-2xl font-bold text-blue-600 hover-lift">
              Pagify
            </Link>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/builder"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isBuilderActive 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Create New
            </Link>
            <Link
              to="/projects"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isProjectsActive 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              My Projects
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {state.currentProject && (
            <div className="hidden md:block text-sm text-gray-600">
              Project: <span className="font-medium">{state.currentProject.name || 'Untitled'}</span>
            </div>
          )}
          
          <motion.div 
            className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center animate-pulse-glow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-white text-sm font-medium">U</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;