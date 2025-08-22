// Health check endpoint para Vercel
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    platform: 'vercel',
    claudeCodeStatus: 'ready'
  });
}