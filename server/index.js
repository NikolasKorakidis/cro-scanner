// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Confirm environment variables loaded
if (!process.env.PSI_API_KEY || !process.env.OPENAI_API_KEY) {
  console.error("❌ Missing API keys in .env");
  process.exit(1);
}

console.log("✅ PSI KEY loaded:", process.env.PSI_API_KEY.slice(0, 10) + '...');
console.log("✅ OPENAI KEY loaded:", process.env.OPENAI_API_KEY.slice(0, 10) + '...');

// Test route
app.get('/', (req, res) => {
  res.send('🚀 Server is alive and ready');
});

// Main audit route
const auditRoute = require('./routes/audit');
app.use('/generate-audit', auditRoute);

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Uncaught Error:", err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🟢 Server running on http://localhost:${PORT}`);
});
