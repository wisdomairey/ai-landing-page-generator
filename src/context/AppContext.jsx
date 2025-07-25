import { createContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  currentProject: null,
  projects: [],
  currentStep: 'business-info',
  businessInfo: null,
  selectedTemplate: null,
  aiContent: null,
  designSettings: {
    primaryColor: '#3B82F6',
    secondaryColor: '#1F2937',
    fontFamily: 'Inter',
    spacing: 'normal'
  }
};

// Action types
export const ActionTypes = {
  SET_BUSINESS_INFO: 'SET_BUSINESS_INFO',
  SET_TEMPLATE: 'SET_TEMPLATE',
  SET_AI_CONTENT: 'SET_AI_CONTENT',
  SET_DESIGN_SETTINGS: 'SET_DESIGN_SETTINGS',
  SET_CURRENT_STEP: 'SET_CURRENT_STEP',
  CREATE_PROJECT: 'CREATE_PROJECT',
  SAVE_PROJECT: 'SAVE_PROJECT',
  LOAD_PROJECT: 'LOAD_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  LOAD_PROJECTS: 'LOAD_PROJECTS',
  RESET_BUILDER: 'RESET_BUILDER'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_BUSINESS_INFO:
      return {
        ...state,
        businessInfo: action.payload,
        currentProject: {
          ...state.currentProject,
          businessInfo: action.payload,
          updatedAt: new Date().toISOString()
        }
      };

    case ActionTypes.SET_TEMPLATE:
      return {
        ...state,
        selectedTemplate: action.payload,
        currentProject: {
          ...state.currentProject,
          template: action.payload,
          updatedAt: new Date().toISOString()
        }
      };

    case ActionTypes.SET_AI_CONTENT:
      return {
        ...state,
        aiContent: action.payload,
        currentProject: {
          ...state.currentProject,
          aiContent: action.payload,
          updatedAt: new Date().toISOString()
        }
      };

    case ActionTypes.SET_DESIGN_SETTINGS:
      return {
        ...state,
        designSettings: { ...state.designSettings, ...action.payload },
        currentProject: {
          ...state.currentProject,
          designSettings: { ...state.designSettings, ...action.payload },
          updatedAt: new Date().toISOString()
        }
      };

    case ActionTypes.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload
      };

    case ActionTypes.CREATE_PROJECT: {
      const newProject = {
        id: Date.now().toString(),
        name: action.payload.name || 'Untitled Project',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        businessInfo: action.payload.businessInfo || null,
        template: null,
        aiContent: null,
        designSettings: { ...initialState.designSettings },
        exported: false
      };
      return {
        ...state,
        currentProject: newProject,
        businessInfo: newProject.businessInfo,
        selectedTemplate: null,
        aiContent: null,
        designSettings: { ...initialState.designSettings }
      };
    }

    case ActionTypes.SAVE_PROJECT: {
      const projectToSave = action.payload;
      const existingIndex = state.projects.findIndex(p => p.id === projectToSave.id);
      let updatedProjects;
      
      if (existingIndex >= 0) {
        updatedProjects = [...state.projects];
        updatedProjects[existingIndex] = projectToSave;
      } else {
        updatedProjects = [projectToSave, ...state.projects];
      }

      return {
        ...state,
        projects: updatedProjects,
        currentProject: projectToSave
      };
    }

    case ActionTypes.LOAD_PROJECT: {
      const project = action.payload;
      return {
        ...state,
        currentProject: project,
        businessInfo: project.businessInfo,
        selectedTemplate: project.template,
        aiContent: project.aiContent,
        designSettings: project.designSettings || { ...initialState.designSettings }
      };
    }

    case ActionTypes.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(p => p.id !== action.payload),
        currentProject: state.currentProject?.id === action.payload ? null : state.currentProject
      };

    case ActionTypes.LOAD_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };

    case ActionTypes.RESET_BUILDER:
      return {
        ...state,
        currentProject: null,
        businessInfo: null,
        selectedTemplate: null,
        aiContent: null,
        designSettings: { ...initialState.designSettings },
        currentStep: 'business-info'
      };

    default:
      return state;
  }
};

// Create context
export const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('pagifyProjects');
    if (savedProjects) {
      try {
        const projects = JSON.parse(savedProjects);
        dispatch({ type: ActionTypes.LOAD_PROJECTS, payload: projects });
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    if (state.projects.length > 0) {
      localStorage.setItem('pagifyProjects', JSON.stringify(state.projects));
    }
  }, [state.projects]);

  // Auto-save current project
  useEffect(() => {
    if (state.currentProject && (state.businessInfo || state.selectedTemplate || state.aiContent)) {
      const updatedProject = {
        ...state.currentProject,
        businessInfo: state.businessInfo,
        template: state.selectedTemplate,
        aiContent: state.aiContent,
        designSettings: state.designSettings,
        updatedAt: new Date().toISOString()
      };
      
      dispatch({ type: ActionTypes.SAVE_PROJECT, payload: updatedProject });
    }
  }, [state.businessInfo, state.selectedTemplate, state.aiContent, state.designSettings]);

  const value = {
    state,
    dispatch,
    ActionTypes
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
