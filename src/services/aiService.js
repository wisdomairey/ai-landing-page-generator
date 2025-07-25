import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for client-side usage
});

// AI Content Generation Service
export class AIContentService {
  
  // Generate landing page content based on business info
  static async generateLandingPageContent(businessInfo) {
    try {
      const prompt = this.createContentPrompt(businessInfo);
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert copywriter specializing in high-converting landing pages. Generate compelling, conversion-focused content that speaks directly to the target audience."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      });

      const content = completion.choices[0].message.content;
      return this.parseGeneratedContent(content);
      
    } catch (error) {
      console.error('Error generating AI content:', error);
      
      // Check if it's a quota/rate limit error
      if (error.status === 429 || error.message?.includes('quota') || error.message?.includes('rate limit')) {
        console.log('OpenAI quota exceeded, returning demo content...');
        return this.getDemoContent(businessInfo);
      }
      
      throw new Error('Failed to generate content. Please check your API key and try again.');
    }
  }

  // Generate specific section content
  static async generateSection(sectionType, businessInfo, tone = 'professional') {
    try {
      const prompt = this.createSectionPrompt(sectionType, businessInfo, tone);
      
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a professional copywriter. Generate ${tone} content for a ${sectionType} section of a landing page.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      return completion.choices[0].message.content.trim();
      
    } catch (error) {
      console.error('Error generating section content:', error);
      
      // Check if it's a quota/rate limit error
      if (error.status === 429 || error.message?.includes('quota') || error.message?.includes('rate limit')) {
        console.log('OpenAI quota exceeded for section, returning fallback...');
        return this.getFallbackSection(sectionType, businessInfo, tone);
      }
      
      throw new Error('Failed to generate section content.');
    }
  }

  // Create main content prompt
  static createContentPrompt(businessInfo) {
    return `
Create compelling landing page content for the following business:

Business Name: ${businessInfo.businessName}
Industry: ${businessInfo.industry}
Description: ${businessInfo.description}
Target Audience: ${businessInfo.targetAudience}
Goals: ${businessInfo.goals}
Tone: ${businessInfo.tone}

Please generate content for these sections (return as JSON):
{
  "headline": "Main headline (10-15 words)",
  "subheadline": "Supporting subheadline (20-30 words)",
  "heroDescription": "Hero section description (50-80 words)",
  "features": [
    {
      "title": "Feature 1 title",
      "description": "Feature 1 description (30-40 words)"
    },
    {
      "title": "Feature 2 title", 
      "description": "Feature 2 description (30-40 words)"
    },
    {
      "title": "Feature 3 title",
      "description": "Feature 3 description (30-40 words)"
    }
  ],
  "benefits": [
    "Benefit 1 (10-15 words)",
    "Benefit 2 (10-15 words)",
    "Benefit 3 (10-15 words)"
  ],
  "callToAction": "Primary CTA button text (2-5 words)",
  "testimonial": {
    "quote": "Customer testimonial (40-60 words)",
    "author": "Customer Name",
    "title": "Customer Title/Company"
  }
}
    `;
  }

  // Create section-specific prompt
  static createSectionPrompt(sectionType, businessInfo, tone) {
    const prompts = {
      headline: `Create a compelling headline for ${businessInfo.businessName} in the ${businessInfo.industry} industry. Target audience: ${businessInfo.targetAudience}. Tone: ${tone}. Keep it under 15 words.`,
      
      features: `List 3 key features for ${businessInfo.businessName} (${businessInfo.industry}). Each feature should have a title and 30-40 word description. Target audience: ${businessInfo.targetAudience}. Tone: ${tone}.`,
      
      benefits: `List 3 main benefits customers get from ${businessInfo.businessName}. Each benefit should be 10-15 words. Industry: ${businessInfo.industry}. Target: ${businessInfo.targetAudience}. Tone: ${tone}.`,
      
      testimonial: `Create a realistic customer testimonial for ${businessInfo.businessName} in ${businessInfo.industry}. Include customer name and title. 40-60 words. Tone: ${tone}.`,
      
      callToAction: `Create a compelling call-to-action button text for ${businessInfo.businessName}. Industry: ${businessInfo.industry}. Goals: ${businessInfo.goals}. Keep it 2-5 words. Tone: ${tone}.`
    };

    return prompts[sectionType] || `Generate ${sectionType} content for ${businessInfo.businessName}`;
  }

  // Parse the JSON response from OpenAI
  static parseGeneratedContent(content) {
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback: return structured content
      return {
        headline: this.extractSection(content, 'headline') || 'Transform Your Business Today',
        subheadline: this.extractSection(content, 'subheadline') || 'Discover the power of innovation',
        heroDescription: this.extractSection(content, 'description') || 'We help businesses like yours achieve exceptional results through our proven solutions.',
        features: [
          { title: 'Feature 1', description: 'Amazing feature that solves your problems' },
          { title: 'Feature 2', description: 'Another great feature for your success' },
          { title: 'Feature 3', description: 'The final feature that seals the deal' }
        ],
        benefits: [
          'Increase efficiency by 50%',
          'Save time and money',
          'Get results fast'
        ],
        callToAction: 'Get Started',
        testimonial: {
          quote: 'This service transformed our business completely. Highly recommended!',
          author: 'Jane Smith',
          title: 'CEO, TechCorp'
        }
      };
    } catch (error) {
      console.error('Error parsing AI content:', error);
      return this.getFallbackContent();
    }
  }

  // Extract specific sections from text
  static extractSection(content, sectionName) {
    const regex = new RegExp(`${sectionName}[:\\s]+"([^"]+)"`, 'i');
    const match = content.match(regex);
    return match ? match[1] : null;
  }

  // Fallback content if AI fails
  static getFallbackContent() {
    return {
      headline: 'Transform Your Business Today',
      subheadline: 'Discover the power of innovation and growth',
      heroDescription: 'We help businesses like yours achieve exceptional results through our proven solutions and expert guidance.',
      features: [
        { title: 'Expert Solutions', description: 'Get access to industry-leading solutions designed for your success' },
        { title: 'Fast Results', description: 'See measurable improvements in your business within days, not months' },
        { title: '24/7 Support', description: 'Our dedicated team is here to help you every step of the way' }
      ],
      benefits: [
        'Increase efficiency by 50%',
        'Save time and money',
        'Get results fast'
      ],
      callToAction: 'Get Started',
      testimonial: {
        quote: 'This service transformed our business completely. The results exceeded our expectations!',
        author: 'Jane Smith',
        title: 'CEO, TechCorp'
      }
    };
  }

  // Get demo content when quota is exceeded
  static getDemoContent(businessInfo) {
    const businessName = businessInfo?.businessName || 'Your Business';
    const industry = businessInfo?.industry || 'your industry';
    
    return {
      headline: `Transform Your ${industry} Business with ${businessName}`,
      subheadline: `Professional solutions designed specifically for ${industry} leaders`,
      heroDescription: `${businessName} provides cutting-edge solutions that help businesses in ${industry} achieve outstanding results. Our proven methods and expert team ensure your success.`,
      features: [
        { title: 'Industry Expertise', description: `Deep knowledge and experience in ${industry} best practices` },
        { title: 'Proven Results', description: 'Track record of delivering measurable business outcomes' },
        { title: 'Custom Solutions', description: 'Tailored approaches designed for your specific needs' },
        { title: '24/7 Support', description: 'Dedicated support team available whenever you need assistance' }
      ],
      benefits: [
        'Increase operational efficiency by up to 40%',
        'Reduce costs while improving quality',
        'Scale your business with confidence',
        'Stay ahead of industry trends'
      ],
      callToAction: 'Start Your Transformation',
      testimonial: {
        quote: `Working with ${businessName} was a game-changer for our ${industry} business. The results speak for themselves!`,
        author: 'Alex Johnson',
        title: `Director of Operations, ${industry} Solutions Inc.`
      }
    };
  }

  // Get fallback content for individual sections
  static getFallbackSection(sectionType, businessInfo, tone) {
    const businessName = businessInfo?.businessName || 'Your Business';
    const industry = businessInfo?.industry || 'your industry';
    
    const fallbacks = {
      headline: {
        bold: `Revolutionize ${industry} with ${businessName}`,
        friendly: `Welcome to ${businessName} - Your ${industry} Partner`,
        professional: `Leading ${industry} Solutions by ${businessName}`
      },
      subheadline: {
        bold: `Cutting-edge solutions that drive results`,
        friendly: `We're here to help you succeed`,
        professional: `Professional excellence in ${industry}`
      },
      description: {
        bold: `Transform your ${industry} operations with our powerful, proven solutions.`,
        friendly: `Let us help you achieve your goals with our friendly, expert approach.`,
        professional: `Delivering professional ${industry} services with measurable results.`
      }
    };
    
    return fallbacks[sectionType]?.[tone] || fallbacks[sectionType]?.professional || `Professional ${sectionType} content for ${businessName}`;
  }

  // Check if API key is configured
  static isConfigured() {
    return !!import.meta.env.VITE_OPENAI_API_KEY && import.meta.env.VITE_OPENAI_API_KEY !== 'your_openai_api_key_here';
  }
}

export default AIContentService;
