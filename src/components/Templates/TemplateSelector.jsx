import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TemplateSelector = ({ onTemplateSelect, selectedTemplate: initialSelectedTemplate }) => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(initialSelectedTemplate?.id || null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'saas', label: 'SaaS' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'agency', label: 'Agency' },
    { id: 'startup', label: 'Startup' },
    { id: 'portfolio', label: 'Portfolio' }
  ];

  const templates = [
    {
      id: 'modern-saas',
      name: 'Modern SaaS',
      category: 'saas',
      description: 'Clean and professional design perfect for SaaS products',
      image: '🚀',
      features: ['Hero Section', 'Features Grid', 'Pricing Table', 'Testimonials']
    },
    {
      id: 'ecommerce-hero',
      name: 'E-commerce Hero',
      category: 'ecommerce',
      description: 'Conversion-focused template for product launches',
      image: '🛍️',
      features: ['Product Showcase', 'Social Proof', 'CTA Buttons', 'Reviews']
    },
    {
      id: 'agency-portfolio',
      name: 'Agency Portfolio',
      category: 'agency',
      description: 'Showcase your work with this creative agency template',
      image: '🎨',
      features: ['Portfolio Grid', 'Team Section', 'Case Studies', 'Contact Form']
    },
    {
      id: 'startup-pitch',
      name: 'Startup Pitch',
      category: 'startup',
      description: 'Bold design to present your startup vision',
      image: '💡',
      features: ['Vision Statement', 'Problem/Solution', 'Team Bios', 'Funding CTA']
    },
    {
      id: 'minimal-portfolio',
      name: 'Minimal Portfolio',
      category: 'portfolio',
      description: 'Clean and minimal design for personal portfolios',
      image: '📱',
      features: ['About Section', 'Skills', 'Projects', 'Contact']
    },
    {
      id: 'tech-startup',
      name: 'Tech Startup',
      category: 'startup',
      description: 'Modern tech-focused template with animations',
      image: '⚡',
      features: ['Animated Hero', 'Tech Stack', 'Metrics', 'Demo Section']
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
    onTemplateSelect(template);
  };

  const handleUseTemplate = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    if (template && onTemplateSelect) {
      onTemplateSelect(template);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose a Template</h2>
      
      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleTemplateSelect(template)}
            className={`cursor-pointer p-4 border rounded-lg transition-all hover:shadow-md ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-center mb-3">
              <div className="text-4xl mb-2">{template.image}</div>
              <h3 className="font-semibold text-gray-900">{template.name}</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{template.description}</p>
            
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Includes:
              </p>
              {template.features.map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-gray-600">
                  <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                  {feature}
                </div>
              ))}
            </div>

            {selectedTemplate === template.id && (
              <div className="mt-3 pt-3 border-t border-blue-200">
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <span className="mr-2">✓</span>
                  Selected
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedTemplate && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button 
            onClick={handleUseTemplate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
          >
            Use This Template
          </button>
        </div>
      )}
      
      {/* Skip Templates Option */}
      <div className="mt-4">
        <button 
          onClick={() => navigate('/builder/content')}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium transition-colors"
        >
          Skip Templates & Continue
        </button>
      </div>
    </div>
  );
};

export default TemplateSelector;
