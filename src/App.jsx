import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Common/Dashboard';
import NotFound from './components/Common/NotFound';
import ProjectManager from './components/Common/ProjectManager';
import BusinessInfoFormWrapper from './components/Forms/BusinessInfoFormWrapper';
import TemplateSelectorWrapper from './components/Templates/TemplateSelectorWrapper';
import AIContentGeneratorWrapper from './components/AI/AIContentGeneratorWrapper';
import DesignCustomizerWrapper from './components/Design/DesignCustomizerWrapper';
import LivePreviewWrapper from './components/Preview/LivePreviewWrapper';
import ExportOptionsWrapper from './components/Export/ExportOptionsWrapper';
import FloatingActionButton from './components/Common/FloatingActionButton';
import NotificationSystem from './components/Common/NotificationSystem';

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Layout Routes */}
          <Route path="/" element={<Layout />}>
            {/* Dashboard */}
            <Route index element={<Dashboard />} />
            
            {/* Builder Flow */}
            <Route path="builder">
              <Route index element={<Navigate to="/builder/business-info" replace />} />
              <Route path="business-info" element={<BusinessInfoFormWrapper />} />
              <Route path="templates" element={<TemplateSelectorWrapper />} />
              <Route path="content" element={<AIContentGeneratorWrapper />} />
              <Route path="design" element={<DesignCustomizerWrapper />} />
              <Route path="preview" element={<LivePreviewWrapper />} />
              <Route path="export" element={<ExportOptionsWrapper />} />
            </Route>
            
            {/* Project Management */}
            <Route path="projects" element={<ProjectManager />} />
            <Route path="projects/:projectId">
              <Route path="edit" element={<BusinessInfoFormWrapper />} />
              <Route path="templates" element={<TemplateSelectorWrapper />} />
              <Route path="content" element={<AIContentGeneratorWrapper />} />
              <Route path="design" element={<DesignCustomizerWrapper />} />
              <Route path="preview" element={<LivePreviewWrapper />} />
              <Route path="export" element={<ExportOptionsWrapper />} />
            </Route>
          </Route>
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Global Components */}
        <FloatingActionButton />
        <NotificationSystem />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
