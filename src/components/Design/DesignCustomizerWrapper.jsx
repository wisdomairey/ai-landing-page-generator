import DesignCustomizer from './DesignCustomizer';
import { useApp } from '../../hooks/useApp';
import { ActionTypes } from '../../context/AppContext';

const DesignCustomizerWrapper = () => {
  const { dispatch } = useApp();
  
  const handleDesignChange = (designSettings) => {
    dispatch({
      type: ActionTypes.SET_DESIGN_SETTINGS,
      payload: designSettings
    });
  };
  
  return (
    <DesignCustomizer 
      onDesignChange={handleDesignChange}
    />
  );
};

export default DesignCustomizerWrapper;
