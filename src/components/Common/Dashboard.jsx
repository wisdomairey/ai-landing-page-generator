import { Link } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';
import { motion } from 'framer-motion';
import { AnimatedSection, AnimatedCard, fadeInUp, staggerContainer, slideInFromTop, bounceIn } from '../../utils/animations.jsx';

const Dashboard = () => {
  const { state } = useApp();

  const recentProjects = state.projects.slice(0, 3);
  const totalProjects = state.projects.length;

  const stats = [
    {
      label: 'Total Projects',
      value: totalProjects,
      icon: '📁',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      label: 'Active Templates',
      value: '12+',
      icon: '🎨',
      color: 'bg-green-100 text-green-700'
    },
    {
      label: 'AI Generations',
      value: state.projects.reduce((total, project) => total + (project.aiGenerations || 1), 0),
      icon: '🤖',
      color: 'bg-purple-100 text-purple-700'
    },
    {
      label: 'Exports',
      value: state.projects.filter(p => p.exported).length,
      icon: '📤',
      color: 'bg-orange-100 text-orange-700'
    }
  ];

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Welcome Section */}
      <AnimatedSection animation={slideInFromTop}>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
          <motion.h1 
            className="text-3xl font-bold mb-2"
            variants={fadeInUp}
          >
            Welcome to Pagify
          </motion.h1>
          <motion.p 
            className="text-blue-100 mb-6"
            variants={fadeInUp}
          >
            Create stunning landing pages powered by artificial intelligence in minutes, not hours.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4"
            variants={fadeInUp}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/builder/business-info"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
              >
                🚀 Create New Project
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/projects"
                className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-colors inline-block"
              >
                📁 View All Projects
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Stats Grid */}
      <AnimatedSection>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <AnimatedCard key={index} delay={index * 0.1}>
              <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <motion.p 
                      className="text-2xl font-bold text-gray-900"
                      variants={bounceIn}
                    >
                      {stat.value}
                    </motion.p>
                  </div>
                  <motion.div 
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-xl">{stat.icon}</span>
                  </motion.div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </motion.div>
      </AnimatedSection>

      {/* Recent Projects */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
            <Link
              to="/projects"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All →
            </Link>
          </div>
        </div>
        
        <div className="p-6">
          {recentProjects.length > 0 ? (
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {(project.name || 'Untitled').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{project.name || 'Untitled Project'}</h3>
                      <p className="text-sm text-gray-600">
                        {project.businessInfo?.industry || 'No industry specified'} • 
                        Created {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {project.template && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {project.template.name}
                      </span>
                    )}
                    <Link
                      to={`/projects/${project.id}/edit`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first AI-powered landing page to get started.
              </p>
              <Link
                to="/builder/business-info"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Create First Project
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">🎯 Quick Start</h3>
          <p className="text-sm text-gray-600 mb-4">
            Jump right into creating a new landing page with our guided builder.
          </p>
          <Link
            to="/builder/business-info"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Start Building →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">📚 Templates</h3>
          <p className="text-sm text-gray-600 mb-4">
            Browse our collection of professionally designed templates.
          </p>
          <Link
            to="/builder/templates"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Browse Templates →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">💡 AI Content</h3>
          <p className="text-sm text-gray-600 mb-4">
            Let our AI generate compelling copy for your landing page.
          </p>
          <Link
            to="/builder/content"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Generate Content →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
