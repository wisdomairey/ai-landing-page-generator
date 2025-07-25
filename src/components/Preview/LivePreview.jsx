import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LivePreview = ({ businessData, selectedTemplate, generatedContent, designSettings }) => {
  const navigate = useNavigate();
  const [previewMode, setPreviewMode] = useState('desktop');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedTemplate]);

  const PreviewHeader = () => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
      <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
      
      <div className="flex items-center space-x-2">
        {/* Device Toggle */}
        <div className="flex bg-gray-200 rounded-lg p-1">
          <button
            onClick={() => setPreviewMode('desktop')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              previewMode === 'desktop' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🖥️ Desktop
          </button>
          <button
            onClick={() => setPreviewMode('tablet')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              previewMode === 'tablet' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📱 Tablet
          </button>
          <button
            onClick={() => setPreviewMode('mobile')}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              previewMode === 'mobile' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📱 Mobile
          </button>
        </div>

        {/* Actions */}
        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
          🔄 Refresh
        </button>
      </div>
    </div>
  );

  const getPreviewWidth = () => {
    switch (previewMode) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-2xl';
      default: return 'max-w-6xl';
    }
  };

  const PreviewContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-4">⚡</div>
            <p className="text-gray-600">Loading preview...</p>
          </div>
        </div>
      );
    }

    const businessName = businessData?.businessName || 'Your Business';
    const headline = generatedContent?.headline || generatedContent?.headlines?.[0] || `Welcome to ${businessName}`;
    const subheadline = generatedContent?.subheadline || generatedContent?.subheadlines?.[0] || 'Transform your business with our innovative solutions';
    const description = generatedContent?.description || generatedContent?.descriptions?.[0] || 'Discover how we can help you achieve your goals.';
    const cta = generatedContent?.callToAction || generatedContent?.ctas?.[0] || 'Get Started';

    // Apply design settings
    const primaryColor = designSettings?.primaryColor || '#3B82F6';
    const secondaryColor = designSettings?.secondaryColor || '#8B5CF6';
    const fontFamily = designSettings?.fontFamily || 'Inter';
    const borderRadius = designSettings?.borderRadius === 'none' ? '0px' : 
                        designSettings?.borderRadius === 'small' ? '4px' :
                        designSettings?.borderRadius === 'large' ? '16px' : '8px';

    // Get template-specific sections
    const templateFeatures = selectedTemplate?.features || ['Hero Section', 'Features Grid', 'CTA Section'];
    const templateId = selectedTemplate?.id || 'modern-saas';

    // Template-specific rendering functions
    const renderHeroSection = () => (
      <section 
        className="relative text-white"
        style={{ 
          background: templateId === 'agency-portfolio' 
            ? `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})` 
            : templateId === 'ecommerce-hero'
            ? `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
            : `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})` 
        }}
      >
        <div className="container mx-auto px-6 py-20">
          <div className={`text-center ${templateId === 'startup-pitch' ? 'max-w-5xl' : 'max-w-4xl'} mx-auto`}>
            <h1 className={`font-bold mb-6 leading-tight ${
              templateId === 'startup-pitch' ? 'text-5xl md:text-7xl' : 'text-4xl md:text-6xl'
            }`}>
              {headline}
            </h1>
            <p className={`opacity-90 mb-8 ${
              templateId === 'ecommerce-hero' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
            }`}>
              {subheadline}
            </p>
            <p className="text-lg mb-10 opacity-80">
              {description}
            </p>
            {renderHeroCTA()}
          </div>
        </div>
      </section>
    );

    const renderHeroCTA = () => {
      if (templateId === 'ecommerce-hero') {
        return (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-white font-semibold text-lg px-10 py-5 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              style={{ color: primaryColor, borderRadius }}
            >
              🛒 {cta}
            </button>
            <button 
              className="border-2 border-white text-white font-semibold text-lg px-8 py-4 hover:bg-white transition-colors"
              style={{ borderRadius }}
            >
              View Demo
            </button>
          </div>
        );
      } else if (templateId === 'startup-pitch') {
        return (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-white font-semibold text-lg px-12 py-5 shadow-lg"
              style={{ color: primaryColor, borderRadius }}
            >
              💡 {cta}
            </button>
            <button 
              className="border-2 border-white text-white font-semibold text-lg px-8 py-4 hover:bg-white transition-colors"
              style={{ borderRadius }}
            >
              Watch Pitch
            </button>
          </div>
        );
      } else {
        return (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-white font-semibold text-lg hover:bg-gray-100 transition-colors px-8 py-4"
              style={{ color: primaryColor, borderRadius }}
            >
              {cta}
            </button>
            <button 
              className="border-2 border-white text-white font-semibold text-lg hover:bg-white transition-colors px-8 py-4"
              style={{ borderRadius }}
            >
              Learn More
            </button>
          </div>
        );
      }
    };

    const renderFeaturesSection = () => {
      if (!templateFeatures.includes('Features Grid') && !templateFeatures.includes('Product Showcase')) {
        return null;
      }

      const sectionTitle = templateId === 'ecommerce-hero' ? 'Why Choose Our Products?' :
                          templateId === 'agency-portfolio' ? 'Our Services' :
                          templateId === 'startup-pitch' ? 'Why We\'re Different' :
                          `Why Choose ${businessName}?`;

      return (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {sectionTitle}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {templateId === 'ecommerce-hero' ? 'Discover the features that make our products stand out' :
                 templateId === 'agency-portfolio' ? 'Professional services tailored to your needs' :
                 'Discover what makes us the perfect choice for your business'}
              </p>
            </div>
            
            <div className={`grid gap-8 ${
              templateId === 'agency-portfolio' ? 'grid-cols-1 md:grid-cols-3' : 
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            }`}>
              {(generatedContent?.features || [
                { title: 'Advanced Analytics', description: 'Get deep insights into your business performance' },
                { title: 'Seamless Integration', description: 'Connect with your existing tools and workflows' },
                { title: '24/7 Support', description: 'Our dedicated support team is always here to help' },
                { title: 'Scalable Solution', description: 'Grow your business with confidence' }
              ]).map((feature, index) => (
                <div key={index} className={`text-center p-6 bg-white shadow-sm border border-gray-200 ${
                  templateId === 'agency-portfolio' ? 'hover:shadow-lg transition-shadow' : ''
                }`} style={{ borderRadius }}>
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ 
                      backgroundColor: `${primaryColor}20`,
                      borderRadius: '50%'
                    }}
                  >
                    <span className="text-2xl">
                      {templateId === 'ecommerce-hero' ? '⭐' :
                       templateId === 'agency-portfolio' ? '🎨' :
                       templateId === 'startup-pitch' ? '🚀' : '✨'}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    };

    const renderPricingSection = () => {
      if (!templateFeatures.includes('Pricing Table')) {
        return null;
      }

      return (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Plan
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Select the perfect plan for your business needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {['Basic', 'Pro', 'Enterprise'].map((plan, index) => (
                <div key={plan} className={`p-8 border-2 ${
                  index === 1 ? 'border-blue-500 relative' : 'border-gray-200'
                }`} style={{ borderRadius }}>
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-1 text-sm font-medium" style={{ borderRadius }}>
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan}</h3>
                  <div className="text-4xl font-bold mb-6" style={{ color: primaryColor }}>
                    ${index === 0 ? '29' : index === 1 ? '79' : '199'}
                    <span className="text-lg text-gray-600">/month</span>
                  </div>
                  <button 
                    className={`w-full py-3 px-6 font-semibold transition-colors ${
                      index === 1 ? 'text-white' : 'border-2 text-gray-700 hover:bg-gray-50'
                    }`}
                    style={{ 
                      backgroundColor: index === 1 ? primaryColor : 'transparent',
                      borderColor: index === 1 ? primaryColor : '#e5e7eb',
                      borderRadius 
                    }}
                  >
                    Choose {plan}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    };

    return (
      <div 
        className={`mx-auto bg-white transition-all duration-300 ${getPreviewWidth()}`}
        style={{ fontFamily }}
      >
        {/* Hero Section */}
        <section 
          className="relative text-white"
          style={{ 
            background: `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})` 
          }}
        >
          <div className="container mx-auto px-6 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {headline}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {subheadline}
              </p>
              <p className="text-lg mb-10 opacity-80">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="bg-white font-semibold text-lg hover:bg-gray-100 transition-colors px-8 py-4"
                  style={{ 
                    color: primaryColor, 
                    borderRadius 
                  }}
                >
                  {cta}
                </button>
                <button 
                  className="border-2 border-white text-white font-semibold text-lg hover:bg-white transition-colors px-8 py-4"
                  style={{ 
                    borderRadius,
                    '&:hover': { color: primaryColor }
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full"></div>
            <div className="absolute top-20 right-20 w-32 h-32 bg-white opacity-5 rounded-full"></div>
            <div className="absolute bottom-10 left-20 w-16 h-16 bg-white opacity-10 rounded-full"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose {businessName}?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the features that make us the perfect choice for your business
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(generatedContent?.features || [
                { title: 'Feature 1', description: 'Amazing feature description' },
                { title: 'Feature 2', description: 'Another great feature' },
                { title: 'Feature 3', description: 'One more awesome feature' },
                { title: 'Feature 4', description: 'The best feature yet' }
              ]).map((feature, index) => (
                <div key={index} className="text-center p-6 bg-white shadow-sm border border-gray-200" style={{ borderRadius }}>
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ 
                      backgroundColor: `${primaryColor}20`,
                      borderRadius: '50%'
                    }}
                  >
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-20 text-white"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {templateId === 'startup-pitch' ? 'Ready to Disrupt?' :
               templateId === 'ecommerce-hero' ? 'Start Shopping Today!' :
               'Ready to Get Started?'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {templateId === 'agency-portfolio' ? 'Let\'s create something amazing together' :
               templateId === 'startup-pitch' ? 'Join the revolution and be part of the future' :
               'Join thousands of satisfied customers today'}
            </p>
            <button 
              className="bg-white font-semibold text-lg hover:bg-gray-100 transition-colors px-8 py-4"
              style={{ 
                color: primaryColor,
                borderRadius
              }}
            >
              {cta} →
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">{businessName}</h3>
              <p className="text-gray-400 mb-6">
                {businessData?.description || 'Building the future, one solution at a time.'}
              </p>
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white">Contact</a>
              </div>
              {selectedTemplate && (
                <div className="mt-4 text-sm text-gray-500">
                  Template: {selectedTemplate.name} • Category: {selectedTemplate.category}
                </div>
              )}
            </div>
          </div>
        </footer>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <PreviewHeader />
      <div className="p-4 bg-gray-100 min-h-screen">
        <PreviewContent />
      </div>
      
      {/* Navigation Button */}
      <div className="p-6 border-t border-gray-200 bg-white">
        <button 
          onClick={() => navigate('/builder/export')}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium transition-colors flex items-center justify-center"
        >
          Continue to Export & Deploy
          <span className="ml-2">→</span>
        </button>
      </div>
    </div>
  );
};

export default LivePreview;
