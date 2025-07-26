import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';

const Sidebar = () => {
  const { state } = useApp();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Auto-open sidebar on desktop by default
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/',
      icon: '🏠',
      description: 'Overview and analytics'
    },
    {
      label: 'Business Info',
      path: '/builder/business-info',
      icon: '🏢',
      description: 'Company details'
    },
    {
      label: 'Templates',
      path: '/builder/templates',
      icon: '🎨',
      description: 'Choose design'
    },
    {
      label: 'AI Content',
      path: '/builder/content',
      icon: '🤖',
      description: 'Generate copy'
    },
    {
      label: 'Customize',
      path: '/builder/design',
      icon: '✨',
      description: 'Styling options'
    },
    {
      label: 'Preview',
      path: '/builder/preview',
      icon: '👁️',
      description: 'Live preview'
    },
    {
      label: 'Export',
      path: '/builder/export',
      icon: '📤',
      description: 'Download files'
    },
    {
      label: 'My Projects',
      path: '/projects',
      icon: '📁',
      description: 'Saved projects'
    }
  ];

  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-4 z-50 bg-white p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-all hover:scale-105"
      >
        <span className="text-lg">{isOpen ? '✕' : '☰'}</span>
      </button>

      {/* Sidebar */}
      {(isOpen || !isMobile) && (
        <aside
          className={`
            fixed lg:relative z-40 
            bg-white border-l lg:border-l-0 lg:border-r border-gray-200 transition-all duration-300 
            transform overflow-hidden
            ${isMobile 
              ? `inset-y-0 right-0 top-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'} w-64`
              : 'inset-y-0 left-0 top-0 translate-x-0 w-64'
            }
          `}
        >
        <div className={`flex flex-col h-full ${isMobile && !isOpen ? 'pointer-events-none' : ''}`}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
            {state.currentProject && (
              <p className="text-sm text-gray-600 mt-1 truncate">
                {state.currentProject.name || 'Current Project'}
              </p>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                  isActiveLink(item.path)
                    ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => {
                  // Close sidebar on mobile after clicking
                  if (isMobile) {
                    setIsOpen(false);
                  }
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              AI Landing Page Generator v1.0
            </div>
          </div>
        </div>
        </aside>
      )}

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;