// server/services/gptService.js
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateAudit = async (url, psiData) => {
   const { scores, metrics, topOpportunities } = psiData;
 
   const prompt = `
   Act as a principal conversion optimization architect analyzing ${url}. 
   Conduct a multi-layered audit using this framework:
 
   **Strategic Foundation**
   - Apply Fogg Behavior Model (Motivation + Ability + Prompt)
   - Use RICE prioritization (Reach, Impact, Confidence, Effort)
   - Reference Hicks Law for decision complexity analysis
 
   **Data Synthesis Requirements**
   1. Performance Diagnostics:
   - LCP: ${metrics.lcp} | Target: <2.5s
   - CLS: [Add if available] | Target: <0.1
   - TTI: ${metrics.interactive || 'N/A'} | Target: <3.8s
   - Memory Usage: ${metrics.observedDeviceMemory || 'N/A'}
 
   2. Behavioral Economics Check:
   - Scarcity triggers
   - Social proof implementation
   - Authority indicators
   - Commitment devices
 
   **Adaptive Output Structure**
 
   ## Performance Impact Analysis
   $$\\text{Conversion Risk} = \\frac{\\text{Traffic} \\times \\Delta_{\\text{perf}}}{\\text{Benchmark}} \\times 0.18$$
   _Where Δₚᵣf = Current metric - Target metric_
 
   | Metric | Current | Target | Gap | Priority |
   |--------|---------|--------|-----|----------|
   | LCP | ${metrics.lcp} | 2.5s | ${(metrics.lcp - 2.5).toFixed(1)}s | P0 |
   | TBT | ${metrics.tbt} | 300ms | ${metrics.tbt - 300}ms | P1 |
 
   ## UX Optimization Matrix
   ${topOpportunities.slice(0,5).map(o => `
   **${o.title}**  
   ${o.description}  
   $$\\text{ICE Score}$$: ${(o.impact * o.confidence * (1/o.effort)).toFixed(1)}`).join('\n\n')}
 
   ## Technical Enhancement Kit
   \`\`\`html
   <!-- Core Web Vitals Optimization -->
   <link rel="preload" href="critical-resource" as="script">
   <script defer src="non-critical.js"></script>
   
   <!-- Progressive Loading -->
   <img src="hero.jpg" loading="lazy" alt="...">
   \`\`\`
 
   ## Universal Conversion Drivers
   1. **Value Communication**
      - Above-fold value proposition clarity
      - Benefit-focused microcopy
      - Visual hierarchy audit
 
   2. **Decision Architecture**
      - Choice paralysis analysis
      - Default option optimization
      - Cognitive load assessment
 
   3. **Friction Audit**
      - Form field analysis
      - Guest checkout availability
      - Cross-device continuity
 
   ## Implementation Roadmap
   Phase | Focus Area | Success Metrics
   ------|------------|-----------------
   0-2 Weeks | Critical Rendering Path | LCP ≤3s
   2-4 Weeks | Conversion Flow | CVR +12% 
   4-8 Weeks | Retention Systems | RPV +18%
 
   **Incorporate 3 benchmarks from:**
   - Baymard Institute
   - Nielsen Norman Group
   - Google HEART Framework
   `;
 
   const response = await openai.chat.completions.create({
     model: 'gpt-4',
     messages: [{ role: 'user', content: prompt }],
     temperature: 0.3,
     max_tokens: 1500
   });
 
   return response.choices[0].message.content;
 };
 

module.exports = { generateAudit };
