import { Link } from 'react-router-dom';
import { useApp } from '../../hooks/useApp';

const ProjectManager = () => {
  const { state, dispatch } = useApp();

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch({ type: 'DELETE_PROJECT', payload: projectId });
    }
  };

  const handleDuplicateProject = (project) => {
    const duplicatedProject = {
      ...project,
      id: Date.now().toString(),
      name: `${project.name || 'Untitled'} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    dispatch({ type: 'SAVE_PROJECT', payload: duplicatedProject });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
          <p className="text-gray-600">Manage and organize your landing page projects</p>
        </div>
        <Link
          to="/builder/business-info"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          + New Project
        </Link>
      </div>

      {/* Projects Grid */}
      {state.projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Project Preview */}
              <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-3xl mb-2">🚀</div>
                  <div className="text-sm font-medium">{project.template?.name || 'Custom'}</div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {project.name || 'Untitled Project'}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {project.businessInfo?.industry || 'No industry specified'}
                </p>
                
                <div className="flex items-center text-xs text-gray-500 mb-4">
                  <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                  {project.updatedAt && project.updatedAt !== project.createdAt && (
                    <span className="ml-2">• Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>

                {/* Status Indicators */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.businessInfo && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      Business Info
                    </span>
                  )}
                  {project.template && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Template
                    </span>
                  )}
                  {project.aiContent && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      AI Content
                    </span>
                  )}
                  {project.exported && (
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                      Exported
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Link
                      to={`/projects/${project.id}/edit`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/projects/${project.id}/preview`}
                      className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1 rounded text-sm font-medium transition-colors"
                    >
                      Preview
                    </Link>
                  </div>
                  
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleDuplicateProject(project)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                      title="Duplicate project"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-gray-400 hover:text-red-600 p-1"
                      title="Delete project"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🎨</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No projects yet</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start creating amazing landing pages with our AI-powered generator. 
            Your projects will appear here.
          </p>
          <Link
            to="/builder/business-info"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Create Your First Project
          </Link>
        </div>
      )}

      {/* Project Stats */}
      {state.projects.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Project Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{state.projects.length}</div>
              <div className="text-sm text-gray-600">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {state.projects.filter(p => p.template).length}
              </div>
              <div className="text-sm text-gray-600">With Templates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {state.projects.filter(p => p.aiContent).length}
              </div>
              <div className="text-sm text-gray-600">AI Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {state.projects.filter(p => p.exported).length}
              </div>
              <div className="text-sm text-gray-600">Exported</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
