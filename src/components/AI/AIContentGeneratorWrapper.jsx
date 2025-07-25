import { useApp } from '../../hooks/useApp';
import AIContentGenerator from './AIContentGenerator';

const AIContentGeneratorWrapper = () => {
  const { state, dispatch } = useApp();

  const handleContentGenerated = (content) => {
    console.log('Saving AI content to context:', content);
    dispatch({ 
      type: 'SET_AI_CONTENT', 
      payload: content 
    });
  };

  return (
    <AIContentGenerator 
      businessData={state.businessInfo}
      onContentGenerated={handleContentGenerated}
    />
  );
};

export default AIContentGeneratorWrapper;
