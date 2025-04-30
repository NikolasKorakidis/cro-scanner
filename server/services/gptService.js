// server/services/gptService.js
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateAudit = async (url, psiData) => {
    const { scores, metrics, topOpportunities } = psiData;
    
    // Construct dynamic and detailed prompt
    const prompt = `
    Act as a principal conversion optimization architect analyzing ${url}. 
    Conduct a multi-layered audit using this framework:

    **Strategic Foundation**
    - Apply Fogg Behavior Model (Motivation + Ability + Prompt):
        - The page has a clear **CTA** ("Add to Basket"), but could benefit from **social proof** (reviews, testimonials) and **scarcity triggers** ("Only 5 left in stock").
        - Motivation: Can be enhanced with trust signals and urgency elements.
        - Ability: The price and availability are clearly displayed, but simplifying the user journey can increase ability.
        - Prompt: Strong, but could be more persuasive with a visual cue or button that pops on scroll.
    - Use RICE prioritization (Reach, Impact, Confidence, Effort):
        - Reach is high (being a product page), but Impact depends on conversion improvements.
        - Confidence: Medium, as there are clear opportunities, but impact is uncertain without testing.
        - Effort: Medium, as development resources are needed to streamline design and implement performance improvements.
    - Reference Hicks Law for decision complexity analysis:
        - The page has relatively low decision complexity, but a more **streamlined design** could reduce decision fatigue (e.g., simplify choices, make CTA more visible).

    **Data Synthesis Requirements**
    1. **Performance Diagnostics**:
        - LCP: ${metrics.lcp} | Target: < 2.5s
            - **LCP** is above target, meaning the page takes too long to load. Consider **image optimization**, **lazy loading**, or reducing **server response time**.
        - CLS: ${metrics.cls || 'N/A'} | Target: < 0.1
            - If CLS is above 0.1, it indicates **layout shifts**, which can disrupt user experience and lower conversion rates. Ensure **elements are stable** as they load.
        - TTI: ${metrics.tti || 'N/A'} | Target: < 3.8s
            - **TTI** above the target might be hindering interaction. Optimize JavaScript and CSS to ensure faster interactivity.
        - Memory Usage: ${metrics.deviceMemory || 'N/A'}
            - High memory usage on mobile can slow down performance, leading to increased bounce rates.

    2. **Behavioral Economics Check**:
        - **Scarcity triggers**: Add elements like “Only X items left” to increase urgency.
        - **Social proof**: Introduce **reviews**, **testimonials**, and **real-time usage stats** (e.g., "5,000+ happy customers").
        - **Authority indicators**: Add trust badges, certifications, or affiliate endorsements.
        - **Commitment devices**: Encourage users to save their cart or sign up for a newsletter for discounts.

    **Adaptive Output Structure**

    ## Performance Impact Analysis
    The high **LCP** is a **major conversion risk**, as users are likely to abandon the page before it finishes loading. Optimizing this could lead to improved engagement and retention.
    - **TBT** (Total Blocking Time) is also slightly above target, suggesting **interaction delays** that could harm the overall experience.

    **Conversion Risk Formula:**
    $$\text{Conversion Risk} = \frac{\text{Traffic} \times \Delta_{\text{perf}}}{\text{Benchmark}} \times 0.18$$
    _Where Δₚᵣf = Current metric - Target metric_

    | Metric          | Current    | Target  | Gap    | Priority |
    |-----------------|------------|---------|--------|----------|
    | LCP             | ${metrics.lcp} s | < 2.5s   | ${(metrics.lcp - 2.5).toFixed(1)} s | P0       |
    | TBT             | ${metrics.tbt} ms | < 300ms  | ${(metrics.tbt - 300)} ms | P1       |
    | Speed Index     | ${metrics.speedIndex} s | < 3s     | ${(metrics.speedIndex - 3).toFixed(1)} s | P2       |
    | FCP             | ${metrics.fcp} s | < 1.8s   | ${(metrics.fcp - 1.8).toFixed(1)} s | P1       |

    ## UX Optimization Matrix
    The page could benefit from several optimizations:
    - **Minify CSS/JS**, enable **text compression**, and **optimize image loading** (use next-gen formats like WebP).
    - **Video**: If you're using animated content, consider switching to **video formats** for better performance.
    - **Progressive loading**: Consider loading **critical resources first** and deferring non-essential ones.

    ## Technical Enhancement Kit
    Below is a sample code to improve performance and implement progressive loading:
    \`\`\`html
    <!-- Core Web Vitals Optimization -->
    <link rel="preload" href="critical-resource" as="script">
    <script defer src="non-critical.js"></script>
    
    <!-- Progressive Loading -->
    <img src="hero.jpg" loading="lazy" alt="Product Image">
    \`\`\`

    ## Universal Conversion Drivers
    1. **Value Communication**:
        - Above-the-fold value proposition clarity: Ensure that users understand the **benefits** of the product immediately.
        - Benefit-focused **microcopy**: Use simple, concise text that focuses on the user’s **needs**.
    2. **Decision Architecture**:
        - Review **choice paralysis**: Simplify the process (e.g., reduce the number of options or use defaults).
        - **Cognitive load**: Ensure that decisions are easy, making the purchase process **frictionless**.
    3. **Friction Audit**:
        - **Form fields**: Minimize the number of fields in the checkout.
        - **Guest checkout**: Enable guest checkout to reduce barriers for users.
        - **Cross-device continuity**: Ensure users can seamlessly transition between devices.

    ## Implementation Roadmap
    Phase | Focus Area        | Success Metrics
    ------|-------------------|-----------------
    0-2 Weeks | Critical Rendering Path | LCP ≤ 3s
    2-4 Weeks | Conversion Flow | CVR +12%
    4-8 Weeks | Retention Systems | RPV +18%

    **Benchmarks**:
    - **Baymard Institute**: Use their e-commerce usability research to guide improvements.
    - **Nielsen Norman Group**: Use their usability heuristics to evaluate the page.
    - **Google HEART Framework**: Measure user experience on the page.
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
