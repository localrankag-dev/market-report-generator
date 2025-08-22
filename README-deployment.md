# 🚀 Market Report Generator - Vercel Deployment

Sistema automatizado de generación de informes de mercado digital desplegado en Vercel.

## 🌐 Live Demo

**URL Production**: https://market-report-generator.vercel.app

## 🔧 Local Development

```bash
# Instalar dependencias
npm install

# Desarrollo local con Vercel
npm run dev

# O usar Vercel CLI directamente
vercel dev
```

## 📁 Estructura del Proyecto

```
market-report/
├── api/                          # Serverless Functions
│   ├── health.js                 # Health check endpoint
│   └── generate-market-report.js # Main API endpoint
├── public/                       # Static files
│   └── index.html               # Frontend application
├── vercel.json                  # Vercel configuration
├── package.json                 # Dependencies
└── README-deployment.md         # This file
```

## 🛠️ Vercel Configuration

- **Framework**: Vanilla HTML/JS
- **Build Command**: `echo 'Build successful'`
- **Output Directory**: `public`
- **Functions**: Node.js serverless functions in `/api`

## 📊 API Endpoints

- `GET /api/health` - Health check
- `POST /api/generate-market-report` - Generate market report

## 🔧 Environment Variables

No required environment variables for basic functionality.

## 🚀 Deployment Steps

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push to main

## 📈 Features

- ✅ Responsive design
- ✅ Serverless functions
- ✅ Form validation
- ✅ CSV file upload
- ✅ Print functionality
- ✅ Auto-deployment

## 🔗 Related Links

- [Vercel Documentation](https://vercel.com/docs)
- [LOCAL RANK Website](#)

---

© 2025 LOCAL RANK - Market Report Generator