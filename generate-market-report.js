// Serverless function para generar informes de mercado
export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { ciudad, rubro, ticketPromedio, csvData } = req.body;

    // Validar entrada
    if (!ciudad || !rubro || !ticketPromedio) {
      return res.status(400).json({
        error: 'Faltan parámetros requeridos: ciudad, rubro, ticketPromedio'
      });
    }

    console.log(`🚀 INICIANDO GENERACIÓN EN VERCEL`);
    console.log(`📍 Ciudad: ${ciudad} | 🏢 Rubro: ${rubro} | 💰 Ticket: ${ticketPromedio}`);

    // Para Vercel, necesitamos una implementación simplificada
    // Ya que las herramientas Task de Claude Code no están disponibles en serverless
    const mockReport = await generateMockReport({
      ciudad,
      rubro,
      ticketPromedio,
      csvData: csvData || []
    });

    res.status(200).json({
      status: 'success',
      report: mockReport,
      timestamp: new Date().toISOString(),
      platform: 'vercel'
    });

  } catch (error) {
    console.error('❌ Error en Vercel function:', error);
    res.status(500).json({
      error: 'Error generando informe',
      message: error.message,
      platform: 'vercel'
    });
  }
}

// Función mock para generar informe básico
async function generateMockReport(inputData) {
  return {
    titulo: `Análisis de Mercado Digital - ${inputData.rubro.charAt(0).toUpperCase() + inputData.rubro.slice(1)} en ${inputData.ciudad}`,
    fecha: new Date().toLocaleDateString('es-CL'),
    resumen_ejecutivo: `Análisis de mercado digital para ${inputData.rubro} en ${inputData.ciudad}. Se identificaron oportunidades de crecimiento mediante estrategias de marketing digital optimizadas.`,
    competidores: [
      {
        name: `Competidor Principal ${inputData.ciudad}`,
        url: "https://ejemplo.com",
        description: `Negocio local de ${inputData.rubro} con presencia digital establecida`
      }
    ],
    oportunidad_oro: `Oportunidad principal identificada en el mercado de ${inputData.rubro} en ${inputData.ciudad} con potencial de crecimiento significativo.`,
    metricas_clave: {
      total_searches: 5000,
      main_keyword_searches: 2500,
      competitors_found: 3,
      market_share_opportunity: "15%",
      estimated_monthly_revenue: Math.floor(2500 * 0.03 * parseInt(inputData.ticketPromedio)),
      annual_revenue_potential: Math.floor(2500 * 0.03 * parseInt(inputData.ticketPromedio) * 12)
    },
    recomendaciones: [
      "Optimizar presencia digital local",
      "Implementar estrategia SEO focalizada",
      "Desarrollar propuesta de valor diferenciada",
      "Crear contenido especializado para keywords principales"
    ],
    metadata: {
      generated_on: 'vercel',
      note: 'Informe demo - Para informe completo con datos reales, contactar al equipo.'
    }
  };
}