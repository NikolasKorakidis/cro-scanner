const axios = require('axios');

const getPageSpeedData = async (url) => {
  const apiKey = process.env.PSI_API_KEY;

  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
    url
  )}&key=${apiKey}&strategy=mobile`;

  const { data } = await axios.get(endpoint);

  if (!data.lighthouseResult || !data.lighthouseResult.categories) {
    console.error("❌ Invalid PageSpeed response:", JSON.stringify(data, null, 2));
    throw new Error("Invalid PageSpeed response: no lighthouseResult found.");
  }

  const lighthouse = data.lighthouseResult;
  const categories = lighthouse.categories || {};

  const scores = {
    performance: categories.performance?.score ? Math.round(categories.performance.score * 100) : null,
    accessibility: categories.accessibility?.score ? Math.round(categories.accessibility.score * 100) : null,
    seo: categories.seo?.score ? Math.round(categories.seo.score * 100) : null,
    bestPractices: categories['best-practices']?.score ? Math.round(categories['best-practices'].score * 100) : null,
  };

  const metrics = {
    lcp: lighthouse.audits?.['largest-contentful-paint']?.displayValue || 'N/A',
    tbt: lighthouse.audits?.['total-blocking-time']?.displayValue || 'N/A',
    speedIndex: lighthouse.audits?.['speed-index']?.displayValue || 'N/A',
    fcp: lighthouse.audits?.['first-contentful-paint']?.displayValue || 'N/A',
  };

  const opportunities = lighthouse.audits || {};
  const topOpportunities = Object.values(opportunities)
    .filter((item) => item.score !== null && item.details?.type === 'opportunity')
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((item) => ({
      title: item.title,
      description: item.description,
    }));

  console.log("✅ PSI Scores:", scores);
  console.log("✅ PSI Metrics:", metrics);

  return {
    scores,
    metrics,
    topOpportunities,
  };
};

module.exports = { getPageSpeedData };
