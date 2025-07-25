import React from 'react';
import { useNavigate } from 'react-router-dom';

const DesignCustomizer = ({ onDesignChange }) => {
  const navigate = useNavigate();
  const [design, setDesign] = React.useState({
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    fontFamily: 'Inter',
    spacing: 'normal',
    borderRadius: 'medium'
  });

  const colorPresets = [
    { name: 'Blue & Purple', primary: '#3B82F6', secondary: '#8B5CF6' },
    { name: 'Green & Teal', primary: '#10B981', secondary: '#14B8A6' },
    { name: 'Orange & Red', primary: '#F59E0B', secondary: '#EF4444' },
    { name: 'Pink & Purple', primary: '#EC4899', secondary: '#8B5CF6' },
    { name: 'Indigo & Blue', primary: '#6366F1', secondary: '#3B82F6' }
  ];

  const fontOptions = [
    { value: 'Inter', label: 'Inter (Modern)' },
    { value: 'Roboto', label: 'Roboto (Clean)' },
    { value: 'Poppins', label: 'Poppins (Friendly)' },
    { value: 'Playfair Display', label: 'Playfair (Elegant)' },
    { value: 'Montserrat', label: 'Montserrat (Bold)' }
  ];

  const handleColorPresetSelect = (preset) => {
    const updatedDesign = {
      ...design,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary
    };
    setDesign(updatedDesign);
    onDesignChange(updatedDesign);
  };

  const handleChange = (key, value) => {
    const updatedDesign = { ...design, [key]: value };
    setDesign(updatedDesign);
    onDesignChange(updatedDesign);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Design Customization</h2>
      
      {/* Color Presets */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Color Schemes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {colorPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => handleColorPresetSelect(preset)}
              className="p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-left"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: preset.primary }}
                ></div>
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: preset.secondary }}
                ></div>
              </div>
              <p className="text-sm font-medium text-gray-900">{preset.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Colors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={design.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={design.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={design.secondaryColor}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={design.secondaryColor}
                onChange={(e) => handleChange('secondaryColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Typography</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Family
          </label>
          <select
            value={design.fontFamily}
            onChange={(e) => handleChange('fontFamily', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Spacing & Borders */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Layout</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spacing
            </label>
            <select
              value={design.spacing}
              onChange={(e) => handleChange('spacing', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="compact">Compact</option>
              <option value="normal">Normal</option>
              <option value="spacious">Spacious</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Border Radius
            </label>
            <select
              value={design.borderRadius}
              onChange={(e) => handleChange('borderRadius', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">None</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Style Preview</h4>
        <div className="space-y-3">
          <div 
            className="px-4 py-2 rounded text-white font-medium"
            style={{ 
              backgroundColor: design.primaryColor,
              fontFamily: design.fontFamily,
              borderRadius: design.borderRadius === 'none' ? '0px' : 
                          design.borderRadius === 'small' ? '4px' :
                          design.borderRadius === 'medium' ? '8px' : '16px'
            }}
          >
            Primary Button
          </div>
          <div 
            className="px-4 py-2 border-2 font-medium"
            style={{ 
              borderColor: design.secondaryColor,
              color: design.secondaryColor,
              fontFamily: design.fontFamily,
              borderRadius: design.borderRadius === 'none' ? '0px' : 
                          design.borderRadius === 'small' ? '4px' :
                          design.borderRadius === 'medium' ? '8px' : '16px'
            }}
          >
            Secondary Button
          </div>
        </div>
      </div>

      {/* Navigation Button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button 
          onClick={() => navigate('/builder/preview')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center"
        >
          Continue to Preview
          <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
};

export default DesignCustomizer;
