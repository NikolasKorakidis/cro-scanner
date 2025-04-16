// server/services/gptService.js
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateAudit = async (url, psiData) => {
  const { scores, metrics, topOpportunities } = psiData;

  const opportunityText = topOpportunities.map((item, i) =>
    `• ${item.title}: ${item.description}`
  ).join('\n');

  const prompt = `
  You are a senior CRO (Conversion Rate Optimization) strategist and UX consultant with expertise in website performance, user behavior, and technical optimization.
  
  Based on the PageSpeed Insights data and technical audit results below, write a **comprehensive CRO audit report** for the website: ${url}.
  
  🎯 Your goals:
  - Translate technical metrics into **business impact**
  - Identify CRO issues affecting **conversion rate, UX, and trust**
  - Provide **clear, structured, and actionable recommendations**
  
  📄 **Output Format**:
  
  1. **Executive Summary**
     - Brief overview of key issues and risks to conversions
     - Site’s performance status and business-level impact
  
  2. **Core Web Vitals Analysis**
     - Interpret LCP, FCP, TBT, and Speed Index
     - Explain how each affects user experience and conversions
  
  3. **Homepage & First Impressions**
     - Evaluate hero section, visual hierarchy, CTA visibility
     - If data is missing, use CRO best practices and assumptions
  
  4. **Call-to-Action (CTA) Strategy**
     - Analyze CTA strength, placement, copy, and intent
     - Recommend ideal positioning and design tips
  
  5. **Navigation & Site Architecture**
     - Identify friction or confusion
     - Suggest streamlined user flows and menu structures
  
  6. **Mobile Experience**
     - Discuss layout clarity, touch optimization, load time
     - Mention mobile usage trends and CRO expectations
  
  7. **Trust Signals & Brand Credibility**
     - Look for missing testimonials, partner logos, secure UX
     - Recommend ways to build immediate user confidence
  
  8. **Technical Performance Recommendations**
     - List top 3–5 dev-focused tasks from PageSpeed (e.g., minify JS, preload LCP image)
     - Use bullet points with explanations
  
  9. **Quick Win Recommendations**
     - List 3–5 easy, high-impact fixes for short-term improvement
     - Be specific and result-driven
  
  📊 Use this data:
  
  Performance Score: ${psiData.scores.performance ?? 'N/A'}
  Accessibility Score: ${psiData.scores.accessibility ?? 'N/A'}
  SEO Score: ${psiData.scores.seo ?? 'N/A'}
  Best Practices Score: ${psiData.scores.bestPractices ?? 'N/A'}
  
  Core Web Vitals:
  - LCP: ${psiData.metrics.lcp}
  - FCP: ${psiData.metrics.fcp}
  - TBT: ${psiData.metrics.tbt}
  - Speed Index: ${psiData.metrics.speedIndex}
  
  Top PageSpeed Opportunities:
  ${psiData.topOpportunities.map((o, i) => `${i + 1}. ${o.title}: ${o.description}`).join('\n')}
  
  📢 Write in a confident, business-savvy tone. Avoid repeating “no data available” — use expert judgment where direct data is missing.
  `;
   

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
};

module.exports = { generateAudit };
