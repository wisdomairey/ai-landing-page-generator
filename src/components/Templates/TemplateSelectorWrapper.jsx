import TemplateSelector from './TemplateSelector';
import { useApp } from '../../hooks/useApp';
import { ActionTypes } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const TemplateSelectorWrapper = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  
  // Check if business info is complete
  const hasBusinessInfo = state.businessInfo?.businessName && state.businessInfo?.description;
  
  const handleTemplateSelect = (template) => {
    dispatch({
      type: ActionTypes.SET_TEMPLATE,
      payload: template
    });
    
    // Navigate to content step after selecting template
    setTimeout(() => {
      navigate('/builder/content');
    }, 500);
  };
  
  // If no business info, show guidance message
  if (!hasBusinessInfo) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose a Template</h2>
        
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Business Information Required</h3>
          <p className="text-gray-600 mb-6">
            Please complete your business information first to help us suggest the best templates for your needs.
          </p>
          <button
            onClick={() => navigate('/builder/business-info')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors"
          >
            Complete Business Info
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <TemplateSelector 
      onTemplateSelect={handleTemplateSelect}
      selectedTemplate={state.selectedTemplate}
    />
  );
};

export default TemplateSelectorWrapper;
