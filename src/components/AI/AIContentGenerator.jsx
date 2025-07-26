import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AIContentService } from '../../services/aiService';
import { AIProcessingAnimation } from '../Common/LoadingSpinner';

const AIContentGenerator = ({ businessData, onContentGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [selectedVariations, setSelectedVariations] = useState({});
  const [error, setError] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const navigate = useNavigate();

  // Real AI content generation using OpenAI
  const generateContent = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Check if API is configured
      if (!AIContentService.isConfigured()) {
        throw new Error('OpenAI API key not configured. Please add your API key to the .env file.');
      }

      // Generate content using OpenAI
      const aiContent = await AIContentService.generateLandingPageContent(businessData);
      
      // Generate additional headline variations
      let additionalHeadlines = [];
      try {
        const boldHeadline = await AIContentService.generateSection('headline', businessData, 'bold');
        const friendlyHeadline = await AIContentService.generateSection('headline', businessData, 'friendly');
        additionalHeadlines = [boldHeadline, friendlyHeadline];
      } catch (error) {
        console.log('Using fallback headlines due to generation error');
        additionalHeadlines = [
          `Transform Your Business with ${businessData?.businessName || 'Our Solutions'}`,
          `Welcome to ${businessData?.businessName || 'Your Success Partner'}`
        ];
      }

      // Format content for the component
      const content = {
        headlines: [
          aiContent.headline,
          ...additionalHeadlines
        ],
        subheadlines: [
          aiContent.subheadline,
          `Streamline your operations and boost productivity with our cutting-edge ${businessData?.industry || 'solutions'}`,
          `Experience the difference with our award-winning ${businessData?.industry || 'technology'}`
        ],
        descriptions: [
          aiContent.heroDescription,
          `Discover how ${businessData?.businessName || 'our platform'} can transform your ${businessData?.industry || 'business'} operations and drive sustainable growth.`,
          `Built for ${businessData?.targetAudience || 'professionals'}, our solution delivers unmatched performance and reliability.`
        ],
        ctas: [
          aiContent.callToAction,
          'Start Your Free Trial',
          'Book a Demo',
          'Learn More',
          'Join Now'
        ],
        features: aiContent.features || [
          {
            title: 'Advanced Analytics',
            description: 'Get deep insights into your business performance with real-time analytics and reporting.'
          },
          {
            title: 'Seamless Integration',
            description: 'Connect with your existing tools and workflows without any disruption.'
          },
          {
            title: '24/7 Support',
            description: 'Our dedicated support team is always here to help you succeed.'
          },
          {
            title: 'Scalable Solution',
            description: 'Grow your business with confidence using our scalable infrastructure.'
          }
        ]
      };
      
      setGeneratedContent(content);
      onContentGenerated(content);
      
    } catch (err) {
      console.error('AI Content Generation Error:', err);
      
      // Set user-friendly error message
      if (err.message?.includes('quota') || err.status === 429) {
        setError('OpenAI quota exceeded. Using demo content instead.');
      } else {
        setError('AI generation temporarily unavailable. Using demo content instead.');
      }
      
      // Fallback to mock content if API fails
      const content = {
        headlines: [
          `Transform Your Business with ${businessData?.businessName || 'Our Solution'}`,
          `${businessData?.businessName || 'Your Business'} - Leading the Future`,
          `Revolutionize Your Workflow with ${businessData?.businessName || 'Innovation'}`
        ],
        subheadlines: [
          `Streamline your operations and boost productivity with our cutting-edge ${businessData?.industry || 'solutions'}`,
          `Join thousands of satisfied customers who trust ${businessData?.businessName || 'our platform'}`,
          `Experience the difference with our award-winning ${businessData?.industry || 'technology'}`
        ],
        descriptions: [
          `${businessData?.description || 'Our comprehensive solution'} helps businesses like yours achieve remarkable results through innovative technology and exceptional service.`,
          `Discover how ${businessData?.businessName || 'our platform'} can transform your ${businessData?.industry || 'business'} operations and drive sustainable growth.`,
          `Built for ${businessData?.targetAudience || 'professionals'}, our solution delivers unmatched performance and reliability.`
        ],
        ctas: [
          'Get Started Today',
          'Start Your Free Trial',
          'Book a Demo',
          'Learn More',
          'Join Now'
        ],
        features: [
          {
            title: 'Advanced Analytics',
            description: 'Get deep insights into your business performance with real-time analytics and reporting.'
          },
          {
            title: 'Seamless Integration',
            description: 'Connect with your existing tools and workflows without any disruption.'
          },
          {
            title: '24/7 Support',
            description: 'Our dedicated support team is always here to help you succeeded.'
          },
          {
            title: 'Scalable Solution',
            description: 'Grow your business with confidence using our scalable infrastructure.'
          }
        ]
      };
      
      setGeneratedContent(content);
      onContentGenerated(content);
    } finally {
      setIsGenerating(false);
    }
  };

  const selectVariation = (type, index) => {
    setSelectedVariations(prev => ({
      ...prev,
      [type]: index
    }));
  };

  const applySelectedContent = () => {
    if (!generatedContent) return;

    setIsApplying(true);

    // Create final content object with selected variations
    const finalContent = {
      headline: generatedContent.headlines[selectedVariations.headlines || 0],
      subheadline: generatedContent.subheadlines[selectedVariations.subheadlines || 0],
      description: generatedContent.descriptions[selectedVariations.descriptions || 0],
      callToAction: generatedContent.ctas[selectedVariations.ctas || 0],
      features: generatedContent.features,
      // Include all variations for future reference
      allVariations: generatedContent
    };

    // Call the callback to save content to context
    onContentGenerated(finalContent);
    
    console.log('Applied selected content:', finalContent);
    
    // Navigate to the templates step after a short delay
    setTimeout(() => {
      setIsApplying(false);
      navigate('/builder/templates');
    }, 1500);
  };

  const ContentVariations = ({ title, items, type }) => (
    <div className="mb-6">
      <h4 className="font-medium text-gray-900 mb-3">{title}</h4>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => selectVariation(type, index)}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedVariations[type] === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="text-gray-800">{item}</p>
            {selectedVariations[type] === index && (
              <div className="mt-2 text-sm text-blue-600 font-medium">
                ✓ Selected
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const FeatureCard = ({ feature }) => (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h5 className="font-medium text-gray-900 mb-2">{feature.title}</h5>
      <p className="text-sm text-gray-600">{feature.description}</p>
    </div>
  );

  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Content Generator</h2>
      
      {/* Error Display */}
      {error && (
        <motion.div 
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center">
            <span className="text-red-500 text-xl mr-3">⚠️</span>
            <div>
              <h4 className="text-red-800 font-medium">AI Generation Failed</h4>
              <p className="text-red-600 text-sm mt-1">{error}</p>
              <p className="text-red-600 text-sm">Using fallback content instead.</p>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Loading State */}
      {isGenerating && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AIProcessingAnimation />
          <p className="text-gray-600 mt-4">
            {AIContentService.isConfigured() 
              ? 'Generating AI-powered content...' 
              : 'Loading demo content...'}
          </p>
        </motion.div>
      )}
      
      {!generatedContent && !isGenerating && (
        <motion.div 
          className="text-center py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate Content</h3>
          <p className="text-gray-600 mb-6">
            {AIContentService.isConfigured() 
              ? 'Our AI will create compelling copy based on your business information'
              : 'Demo mode - Click to see sample AI-generated content'}
          </p>
          <motion.button
            onClick={generateContent}
            disabled={!businessData?.businessName || !businessData?.description}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-6 rounded-md font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Generate Content with AI
          </motion.button>
          {(!businessData?.businessName || !businessData?.description) && (
            <p className="text-sm text-red-500 mt-2">
              Please fill in business name and description first
            </p>
          )}
        </motion.div>
      )}

      {isGenerating && (
        <div className="text-center py-8">
          <div className="animate-spin text-4xl mb-4">⚡</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Generating Content...</h3>
          <p className="text-gray-600">
            Our AI is crafting the perfect copy for your landing page
          </p>
        </div>
      )}

      {generatedContent && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Generated Content</h3>
            <button
              onClick={generateContent}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              🔄 Regenerate
            </button>
          </div>

          <ContentVariations 
            title="Headlines" 
            items={generatedContent.headlines} 
            type="headlines"
          />

          <ContentVariations 
            title="Subheadlines" 
            items={generatedContent.subheadlines} 
            type="subheadlines"
          />

          <ContentVariations 
            title="Descriptions" 
            items={generatedContent.descriptions} 
            type="descriptions"
          />

          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Call-to-Action Buttons</h4>
            <div className="flex flex-wrap gap-2">
              {generatedContent.ctas.map((cta, index) => (
                <button
                  key={index}
                  onClick={() => selectVariation('ctas', index)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedVariations.ctas === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cta}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Feature Sections</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedContent.features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button 
              onClick={applySelectedContent}
              disabled={isApplying}
              className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                isApplying 
                  ? 'bg-green-500 text-white cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isApplying ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⏳</span>
                  Applying & Redirecting...
                </span>
              ) : (
                'Apply Selected Content'
              )}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AIContentGenerator;
