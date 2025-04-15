// server/routes/audit.js
const express = require('express');
const router = express.Router();
const { getPageSpeedData } = require('../services/psiService');
const { generateAudit } = require('../services/gptService');

router.post('/', async (req, res) => {
  const { url } = req.body;

  try {
    const psiData = await getPageSpeedData(url);
    const auditText = await generateAudit(url, psiData);
    res.json({ audit: auditText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;
