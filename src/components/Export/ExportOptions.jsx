import React from 'react';

const ExportOptions = ({ businessData, generatedContent, designSettings, selectedTemplate }) => {
  const [exportFormat, setExportFormat] = React.useState('html');
  const [includeAnalytics, setIncludeAnalytics] = React.useState(true);
  const [isExporting, setIsExporting] = React.useState(false);

  const exportFormats = [
    {
      id: 'html',
      name: 'HTML + CSS + JS',
      description: 'Complete standalone website files',
      icon: '🌐',
      size: '~50KB'
    },
    {
      id: 'react',
      name: 'React Component',
      description: 'Reusable React component code',
      icon: '⚛️',
      size: '~25KB'
    },
    {
      id: 'wordpress',
      name: 'WordPress Theme',
      description: 'WordPress compatible theme files',
      icon: '📝',
      size: '~100KB'
    },
    {
      id: 'figma',
      name: 'Figma Design',
      description: 'Design file for further customization',
      icon: '🎨',
      size: '~15KB'
    }
  ];

  const hostingOptions = [
    {
      id: 'vercel',
      name: 'Vercel',
      description: 'Deploy instantly to Vercel',
      icon: '▲',
      free: true
    },
    {
      id: 'netlify',
      name: 'Netlify',
      description: 'Host on Netlify with CI/CD',
      icon: '🌊',
      free: true
    },
    {
      id: 'github',
      name: 'GitHub Pages',
      description: 'Free hosting on GitHub',
      icon: '🐙',
      free: true
    },
    {
      id: 'download',
      name: 'Download Files',
      description: 'Download and host anywhere',
      icon: '💾',
      free: true
    }
  ];

  const handleExport = async (format, hosting) => {
    setIsExporting(true);
    
    try {
      if (hosting === 'download') {
        // Generate and download files
        const htmlContent = generateCompleteHTML();
        downloadFile(htmlContent, `${businessData?.businessName || 'landing-page'}.html`, 'text/html');
        
        // Also generate CSS file if needed
        if (format === 'html') {
          const cssContent = generateCSS();
          downloadFile(cssContent, 'styles.css', 'text/css');
        }
        
        setIsExporting(false);
        alert(`Successfully downloaded ${format} files!`);
      } else {
        // Simulate deployment process
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // In a real implementation, this would:
        // 1. Generate the code based on the selected format
        // 2. Include analytics if requested
        // 3. Deploy to selected hosting platform (Vercel, Netlify, etc.)
        // 4. Return deployment URL
        
        setIsExporting(false);
        alert(`Successfully exported as ${format} and deployed to ${hosting}! (Demo mode - real deployment coming soon)`);
      }
    } catch (error) {
      console.error('Export error:', error);
      setIsExporting(false);
      alert('Export failed. Please try again.');
    }
  };

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateCompleteHTML = () => {
    const primaryColor = designSettings?.primaryColor || '#3B82F6';
    const secondaryColor = designSettings?.secondaryColor || '#8B5CF6';
    const fontFamily = designSettings?.fontFamily || 'Inter';
    
    // Template-specific variables
    const templateId = selectedTemplate?.id || 'startup-pitch';
    const templateName = selectedTemplate?.name || 'Startup Pitch';
    
    // Template-specific hero styling
    const getHeroClasses = () => {
      switch (templateId) {
        case 'startup-pitch':
          return 'primary-gradient text-white py-24';
        case 'ecommerce-hero':
          return 'bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20';
        case 'agency-portfolio':
          return 'bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20';
        case 'saas-product':
          return 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-22';
        default:
          return 'primary-gradient text-white py-20';
      }
    };
    
    // Template-specific CTA text
    const getCTAText = () => {
      switch (templateId) {
        case 'startup-pitch':
          return 'Ready to Disrupt?';
        case 'ecommerce-hero':
          return 'Start Shopping Today!';
        case 'agency-portfolio':
          return 'View Our Work';
        case 'saas-product':
          return 'Start Your Free Trial';
        default:
          return 'Ready to Get Started?';
      }
    };
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessData?.businessName || 'Your Business'}</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: '${fontFamily}', sans-serif; }
        .primary-bg { background-color: ${primaryColor}; }
        .secondary-bg { background-color: ${secondaryColor}; }
        .primary-text { color: ${primaryColor}; }
        .primary-gradient { background: linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor}); }
    </style>
    ${includeAnalytics ? `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    </script>` : ''}
</head>
<body>
    <!-- Hero Section - ${templateName} Template -->
    <section class="${getHeroClasses()}">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                ${generatedContent?.headline || generatedContent?.headlines?.[0] || 'Welcome to Your Business'}
            </h1>
            <p class="text-xl md:text-2xl mb-8 opacity-90">
                ${generatedContent?.subheadline || generatedContent?.subheadlines?.[0] || 'Transform your business today'}
            </p>
            <p class="text-lg mb-10 opacity-80">
                ${generatedContent?.description || generatedContent?.descriptions?.[0] || 'Discover how we can help you achieve your goals.'}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button class="bg-white primary-text px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                    ${generatedContent?.callToAction || generatedContent?.ctas?.[0] || 'Get Started'}
                </button>
                <button class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                    Learn More
                </button>
            </div>
        </div>
    </section>
    
    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-6">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Why Choose ${businessData?.businessName || 'Us'}?
                </h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover the features that make us the perfect choice for your business
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                ${(generatedContent?.features || [
                  { title: 'Advanced Analytics', description: 'Get deep insights into your business performance' },
                  { title: 'Seamless Integration', description: 'Connect with your existing tools and workflows' },
                  { title: '24/7 Support', description: 'Our dedicated support team is always here to help' },
                  { title: 'Scalable Solution', description: 'Grow your business with confidence' }
                ]).map(feature => `
                <div class="text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div class="w-16 h-16 primary-bg opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl">✨</span>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">
                        ${feature.title}
                    </h3>
                    <p class="text-gray-600">
                        ${feature.description}
                    </p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 primary-bg text-white">
        <div class="container mx-auto px-6 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
                ${getCTAText()}
            </h2>
            <p class="text-xl mb-8 opacity-90">
                Join thousands of satisfied customers today
            </p>
            <button class="bg-white primary-text px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                ${generatedContent?.callToAction || generatedContent?.ctas?.[0] || 'Get Started'} →
            </button>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-6">
            <div class="text-center">
                <h3 class="text-2xl font-bold mb-4">${businessData?.businessName || 'Your Business'}</h3>
                <p class="text-gray-400 mb-6">
                    ${businessData?.description || 'Building the future, one solution at a time.'}
                </p>
                <p class="text-sm text-gray-500 mb-4">
                    Generated using ${templateName} template
                </p>
                <div class="flex justify-center space-x-6">
                    <a href="#" class="text-gray-400 hover:text-white">Privacy</a>
                    <a href="#" class="text-gray-400 hover:text-white">Terms</a>
                    <a href="#" class="text-gray-400 hover:text-white">Contact</a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>`;
  };

  const generateCSS = () => {
    const primaryColor = designSettings?.primaryColor || '#3B82F6';
    const secondaryColor = designSettings?.secondaryColor || '#8B5CF6';
    const fontFamily = designSettings?.fontFamily || 'Inter';
    
    return `
/* Custom CSS for ${businessData?.businessName || 'Your Business'} */
:root {
  --primary-color: ${primaryColor};
  --secondary-color: ${secondaryColor};
  --font-family: '${fontFamily}', sans-serif;
}

body {
  font-family: var(--font-family);
}

.primary-bg {
  background-color: var(--primary-color);
}

.secondary-bg {
  background-color: var(--secondary-color);
}

.primary-text {
  color: var(--primary-color);
}

.primary-gradient {
  background: linear-gradient(to bottom right, var(--primary-color), var(--secondary-color));
}

/* Additional custom styles can be added here */
.container {
  max-width: 1200px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
}
`;
  };

  const generatePreviewCode = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessData?.businessName || 'Your Business'}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    ${includeAnalytics ? `
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    </script>` : ''}
</head>
<body>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-5xl font-bold mb-6">
                ${generatedContent?.headlines?.[0] || 'Welcome to Your Business'}
            </h1>
            <p class="text-xl mb-8">
                ${generatedContent?.subheadlines?.[0] || 'Transform your business today'}
            </p>
            <button class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold">
                ${generatedContent?.ctas?.[0] || 'Get Started'}
            </button>
        </div>
    </section>
    
    <!-- Add more sections here -->
</body>
</html>`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Export & Deploy</h2>
      
      {/* Export Format Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Export Format</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exportFormats.map((format) => (
            <div
              key={format.id}
              onClick={() => setExportFormat(format.id)}
              className={`cursor-pointer p-4 border rounded-lg transition-all ${
                exportFormat === format.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{format.icon}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{format.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{format.description}</p>
                  <span className="text-xs text-gray-500">{format.size}</span>
                </div>
                {exportFormat === format.id && (
                  <div className="text-blue-600 font-medium">✓</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Options */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Options</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeAnalytics}
              onChange={(e) => setIncludeAnalytics(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Include Google Analytics tracking</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Optimize for search engines (SEO)</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Include mobile optimizations</span>
          </label>
        </div>
      </div>

      {/* Hosting Options */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Deploy To</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hostingOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleExport(exportFormat, option.id)}
              disabled={isExporting}
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{option.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900">{option.name}</h4>
                    {option.free && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        Free
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Code Preview */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Code Preview</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">
            <code>{generatePreviewCode()}</code>
          </pre>
        </div>
      </div>

      {/* Export Status */}
      {isExporting && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="animate-spin text-2xl">⚡</div>
            <div>
              <h4 className="font-medium text-blue-900">Exporting your landing page...</h4>
              <p className="text-sm text-blue-700">This may take a few moments</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Your Landing Page</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">98</div>
            <div className="text-sm text-gray-600">Performance Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">100</div>
            <div className="text-sm text-gray-600">SEO Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">95</div>
            <div className="text-sm text-gray-600">Accessibility</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">1.2s</div>
            <div className="text-sm text-gray-600">Load Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;
