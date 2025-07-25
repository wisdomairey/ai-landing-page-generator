// Utility functions for AI content generation
export const generateBusinessPrompt = (businessData) => {
  return `
Generate compelling landing page content for a ${businessData.industry} business called "${businessData.businessName}".

Business Description: ${businessData.description}
Target Audience: ${businessData.targetAudience}
Goals: ${businessData.goals}
Brand Tone: ${businessData.tone}

Please create:
1. 3 headline variations
2. 3 subheadline variations  
3. 3 description variations
4. 5 call-to-action button texts
5. 4 feature sections with titles and descriptions

Make the content ${businessData.tone} in tone and optimized for conversion.
`;
};

// Mock AI service (replace with actual AI API)
export const mockAIService = {
  generateContent: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return mock content (replace with actual AI API call)
    return {
      headlines: [
        "Transform Your Business Today",
        "Revolutionize Your Workflow", 
        "Achieve Remarkable Results"
      ],
      subheadlines: [
        "Streamline operations with cutting-edge solutions",
        "Join thousands of satisfied customers",
        "Experience the difference with our platform"
      ],
      descriptions: [
        "Our comprehensive solution helps businesses achieve remarkable results through innovative technology.",
        "Discover how our platform can transform your operations and drive sustainable growth.",
        "Built for professionals, our solution delivers unmatched performance and reliability."
      ],
      ctas: [
        "Get Started Today",
        "Start Free Trial", 
        "Book a Demo",
        "Learn More",
        "Join Now"
      ],
      features: [
        {
          title: "Advanced Analytics", 
          description: "Get deep insights with real-time reporting"
        },
        {
          title: "Seamless Integration",
          description: "Connect with existing tools effortlessly"  
        },
        {
          title: "24/7 Support",
          description: "Dedicated support team always available"
        },
        {
          title: "Scalable Solution", 
          description: "Grow with confidence using our infrastructure"
        }
      ]
    };
  }
};

// Color palette generator
export const generateColorPalette = (industry) => {
  const palettes = {
    'Technology/SaaS': { primary: '#3B82F6', secondary: '#8B5CF6' },
    'E-commerce': { primary: '#10B981', secondary: '#059669' },
    'Healthcare': { primary: '#06B6D4', secondary: '#0891B2' },
    'Finance': { primary: '#1F2937', secondary: '#374151' },
    'Education': { primary: '#F59E0B', secondary: '#D97706' },
    'Real Estate': { primary: '#EF4444', secondary: '#DC2626' },
    'Food & Restaurant': { primary: '#EC4899', secondary: '#DB2777' },
    'Fitness/Wellness': { primary: '#84CC16', secondary: '#65A30D' }
  };
  
  return palettes[industry] || palettes['Technology/SaaS'];
};

// Template recommendations based on business data
export const recommendTemplate = (businessData) => {
  const { industry, goals } = businessData;
  
  if (industry?.includes('SaaS') || industry?.includes('Technology')) {
    return 'modern-saas';
  }
  
  if (industry?.includes('E-commerce')) {
    return 'ecommerce-hero';
  }
  
  if (industry?.includes('Agency') || industry?.includes('Marketing')) {
    return 'agency-portfolio';
  }
  
  if (goals?.toLowerCase().includes('funding') || goals?.toLowerCase().includes('investor')) {
    return 'startup-pitch';
  }
  
  return 'modern-saas'; // Default
};

// SEO optimization
export const generateSEOTags = (businessData, content) => {
  const title = content?.headlines?.[0] || `${businessData.businessName} - ${businessData.industry}`;
  const description = content?.descriptions?.[0] || businessData.description;
  
  return {
    title: title.length > 60 ? title.substring(0, 57) + '...' : title,
    description: description.length > 160 ? description.substring(0, 157) + '...' : description,
    keywords: [
      businessData.businessName,
      businessData.industry,
      businessData.targetAudience,
      'landing page',
      'business solution'
    ].filter(Boolean).join(', ')
  };
};

// Performance optimization
export const optimizeImages = (images) => {
  // Mock image optimization (replace with actual service)
  return images.map(img => ({
    ...img,
    optimized: true,
    webp: img.url.replace(/\.(jpg|jpeg|png)$/, '.webp'),
    sizes: ['320w', '640w', '1024w', '1280w']
  }));
};

// Export code generation
export const generateHTMLCode = (businessData, content, template, design) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessData?.businessName || 'Your Business'}</title>
    <meta name="description" content="${content?.descriptions?.[0] || businessData?.description || ''}">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --primary-color: ${design?.primaryColor || '#3B82F6'};
            --secondary-color: ${design?.secondaryColor || '#8B5CF6'};
            --font-family: ${design?.fontFamily || 'Inter'}, sans-serif;
        }
        body {
            font-family: var(--font-family);
        }
    </style>
</head>
<body>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div class="container mx-auto px-6 text-center">
            <h1 class="text-5xl font-bold mb-6">
                ${content?.headlines?.[0] || 'Welcome to Your Business'}
            </h1>
            <p class="text-xl mb-8">
                ${content?.subheadlines?.[0] || 'Transform your business today'}
            </p>
            <button class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                ${content?.ctas?.[0] || 'Get Started'}
            </button>
        </div>
    </section>
    
    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold text-center mb-16">Features</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                ${content?.features?.map(feature => `
                <div class="text-center p-6 bg-white rounded-lg shadow-sm">
                    <h3 class="text-xl font-semibold mb-2">${feature.title}</h3>
                    <p class="text-gray-600">${feature.description}</p>
                </div>
                `).join('') || ''}
            </div>
        </div>
    </section>
    
    <!-- CTA Section -->
    <section class="py-20 bg-blue-600 text-white text-center">
        <div class="container mx-auto px-6">
            <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p class="text-xl mb-8">Join thousands of satisfied customers today</p>
            <button class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                ${content?.ctas?.[0] || 'Get Started'} →
            </button>
        </div>
    </section>
</body>
</html>`;
};

// Analytics tracking
export const generateAnalyticsCode = (trackingId) => {
  return `
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${trackingId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${trackingId}');
</script>

<!-- Custom Event Tracking -->
<script>
  // Track CTA clicks
  document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
      gtag('event', 'click', {
        event_category: 'CTA',
        event_label: e.target.textContent || 'Button Click'
      });
    }
  });
  
  // Track scroll depth
  let maxScroll = 0;
  window.addEventListener('scroll', function() {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      if (scrollPercent >= 25 && scrollPercent < 50) {
        gtag('event', 'scroll', { event_category: 'Engagement', event_label: '25%' });
      } else if (scrollPercent >= 50 && scrollPercent < 75) {
        gtag('event', 'scroll', { event_category: 'Engagement', event_label: '50%' });
      } else if (scrollPercent >= 75) {
        gtag('event', 'scroll', { event_category: 'Engagement', event_label: '75%' });
      }
    }
  });
</script>
`;
};
