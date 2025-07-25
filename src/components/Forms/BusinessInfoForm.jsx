import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AnimatedSection } from '../../utils/animations.jsx';

const BusinessInfoForm = ({ onDataChange, initialData }) => {
  const navigate = useNavigate();
  // Ensure initialData is an object, even if null or undefined is passed
  const safeInitialData = initialData || {};
  
  const [formData, setFormData] = useState({
    businessName: safeInitialData.businessName || '',
    industry: safeInitialData.industry || '',
    description: safeInitialData.description || '',
    targetAudience: safeInitialData.targetAudience || '',
    goals: safeInitialData.goals || '',
    tone: safeInitialData.tone || 'professional'
  });

  const industries = [
    'Technology/SaaS',
    'E-commerce',
    'Healthcare',
    'Education',
    'Finance',
    'Real Estate',
    'Marketing/Agency',
    'Consulting',
    'Food & Restaurant',
    'Fitness/Wellness',
    'Other'
  ];

  const tones = [
    { value: 'professional', label: 'Professional' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'bold', label: 'Bold & Confident' },
    { value: 'creative', label: 'Creative' },
    { value: 'trustworthy', label: 'Trustworthy' },
    { value: 'innovative', label: 'Innovative' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  const handleGenerateContent = () => {
    // Ensure data is saved before navigating
    onDataChange(formData);
    navigate('/builder/content');
  };

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatedSection>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Business Information</h2>
      </AnimatedSection>
      
      <form className="space-y-6">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your business name"
          />
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
            Industry *
          </label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select an industry</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Business Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe what your business does, your main products/services..."
          />
        </div>

        <div>
          <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700 mb-2">
            Target Audience
          </label>
          <input
            type="text"
            id="targetAudience"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Who are your ideal customers? (e.g., small business owners, students)"
          />
        </div>

        <div>
          <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-2">
            Landing Page Goals
          </label>
          <input
            type="text"
            id="goals"
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What do you want visitors to do? (e.g., sign up, purchase, contact)"
          />
        </div>

        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700 mb-2">
            Brand Tone
          </label>
          <select
            id="tone"
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {tones.map((tone) => (
              <option key={tone.value} value={tone.value}>
                {tone.label}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4">
          <motion.button
            type="button"
            onClick={handleGenerateContent}
            disabled={!formData.businessName || !formData.description}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md font-medium transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Generate AI Content ✨
          </motion.button>
          {(!formData.businessName || !formData.description) && (
            <p className="text-sm text-red-500 mt-2 text-center">
              Please fill in business name and description first
            </p>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default BusinessInfoForm;
