import LivePreview from './LivePreview';
import { useApp } from '../../hooks/useApp';

const LivePreviewWrapper = () => {
  const { state } = useApp();
  
  return (
    <LivePreview 
      businessData={state.businessInfo}
      selectedTemplate={state.selectedTemplate}
      generatedContent={state.aiContent}
      designSettings={state.designSettings}
    />
  );
};

export default LivePreviewWrapper;
