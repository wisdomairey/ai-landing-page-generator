import ExportOptions from './ExportOptions';
import { useApp } from '../../hooks/useApp';

const ExportOptionsWrapper = () => {
  const { state } = useApp();
  
  return (
    <ExportOptions 
      businessData={state.businessInfo}
      generatedContent={state.aiContent}
      designSettings={state.designSettings}
      selectedTemplate={state.selectedTemplate}
    />
  );
};

export default ExportOptionsWrapper;
