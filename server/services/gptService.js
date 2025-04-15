// server/services/gptService.js
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateAudit = async (url, psiData) => {
  const { scores, metrics, topOpportunities } = psiData;

  const opportunityText = topOpportunities.map((item, i) =>
    `• ${item.title}: ${item.description}`
  ).join('\n');

  const prompt = `
You are a website CRO expert. Based on the following performance data and recommendations for ${url}, write a concise and actionable 5-point CRO audit.

Use a professional tone and structure your response in this format:
1. Homepage/User Flow
2. CTAs & Navigation
3. Mobile Optimization
4. Page Speed & Technical Issues
5. Trust & Visual Hierarchy

End with a brief conclusion and 2 Quick Win recommendations.

Here is the data:

PageSpeed Scores:
- Performance: ${scores.performance}
- Accessibility: ${scores.accessibility}
- SEO: ${scores.seo}
- Best Practices: ${scores.bestPractices}

Core Web Vitals:
- LCP: ${metrics.lcp}
- FCP: ${metrics.fcp}
- TBT: ${metrics.tbt}
- Speed Index: ${metrics.speedIndex}

Top Opportunities:
${opportunityText}
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
};

module.exports = { generateAudit };
