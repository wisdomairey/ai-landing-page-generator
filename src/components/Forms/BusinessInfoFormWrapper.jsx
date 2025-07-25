import { useApp } from '../../hooks/useApp';
import BusinessInfoForm from './BusinessInfoForm';

const BusinessInfoFormWrapper = () => {
  const { state, dispatch } = useApp();

  const handleDataChange = (formData) => {
    dispatch({ 
      type: 'SET_BUSINESS_INFO', 
      payload: formData 
    });
  };

  return (
    <BusinessInfoForm 
      initialData={state.businessInfo || {}}
      onDataChange={handleDataChange}
    />
  );
};

export default BusinessInfoFormWrapper;
