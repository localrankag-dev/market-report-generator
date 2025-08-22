# 🚀 GUÍA DE DEPLOYMENT - Sistema Completo en Hostinger

## 📋 Overview del Sistema

Tu sistema ahora incluye:

### **🔧 Backend (Claude Code + Subagentes)**
- Sistema de 9 subagentes especializados
- Comando `/generate-market-report`
- Procesamiento automático de datos

### **🌐 Frontend (React + Tailwind)**
- Mini aplicación web responsive
- Interfaz intuitiva para usuarios
- Integración completa con backend

### **🔗 Integración**
- API Express.js que conecta frontend con subagentes
- Procesamiento de CSV en tiempo real
- Generación de informes profesionales

## 📁 ESTRUCTURA FINAL DEL PROYECTO

```
market-report/
├── .claude/                           # Sistema de subagentes Claude Code
│   ├── agents/                        # 9 subagentes especializados
│   └── commands/                      # Comando principal
├── frontend-react/                    # Aplicación React
│   ├── src/                          # Código fuente
│   ├── public/                       # Assets públicos
│   └── build/                        # Build optimizado
├── backend-integration/               # Backend API
│   ├── server.js                     # Servidor Express
│   └── package.json                  # Dependencias
├── PRD_Market_Report_Generator.md     # Documentación producto
├── DOCUMENTACION_TECNICA.md          # Specs técnicas
└── DEPLOYMENT_GUIDE.md              # Esta guía
```

## 🎯 DEPLOYMENT EN HOSTINGER

### **OPCIÓN 1: Frontend Solo (Más Simple)**

Si quieres empezar solo con el frontend y usar simulaciones:

#### **Pasos:**
1. **Build del frontend**
```bash
cd frontend-react
npm install
npm run build
```

2. **Subir a Hostinger**
```bash
# Subir contenido de la carpeta build/ a public_html/
build/
├── static/
├── index.html
└── otros archivos...
```

3. **Configurar .htaccess**
```apache
# En public_html/.htaccess
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QR,L]

# Cache
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
ExpiresActive On
ExpiresDefault "access plus 1 month"
</FilesMatch>

# Compresión
<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/javascript
</IfModule>
```

4. **Resultado**
- ✅ Aplicación web funcional
- ✅ Procesamiento de CSV
- ✅ Generación de informes (con datos simulados)
- ✅ Interfaz profesional

### **OPCIÓN 2: Sistema Completo (Frontend + Backend + Subagentes)**

Para funcionalidad completa con datos reales:

#### **Parte A: Backend en Hostinger**

1. **Subir archivos backend**
```bash
# En carpeta separada (ej: /api/)
backend-integration/
├── server.js
├── package.json
└── temp/ (crear carpeta)
```

2. **Instalar dependencias**
```bash
# Via SSH en Hostinger
cd /path/to/api/
npm install
```

3. **Configurar Node.js en Hostinger**
- Activar Node.js en panel de control
- Configurar startup file: `server.js`
- Puerto: 3001 (o el asignado por Hostinger)

#### **Parte B: Claude Code en Servidor**

1. **Instalar Claude Code CLI**
```bash
# Via SSH
npm install -g @anthropic/claude-cli
```

2. **Configurar subagentes**
```bash
# Copiar estructura .claude/
.claude/
├── agents/ (9 archivos .md)
└── commands/ (1 archivo .md)
```

3. **Testing**
```bash
# Probar comando
claude task --agent market-orchestrator --prompt "test"
```

#### **Parte C: Frontend con Backend Real**

1. **Configurar variables de entorno**
```javascript
// En build del frontend
REACT_APP_API_URL=https://tudominio.com/api
```

2. **Build y deploy**
```bash
cd frontend-react
REACT_APP_API_URL=https://tudominio.com/api npm run build
# Subir build/ a public_html/
```

## ⚡ CONFIGURACIÓN RÁPIDA (RECOMENDADA)

### **Para Testing Inmediato:**

1. **Solo Frontend (5 minutos)**
```bash
cd frontend-react
npm install
npm run build
# Subir build/ a Hostinger
```

### **Para Producción (30 minutos)**
```bash
# 1. Frontend
cd frontend-react && npm run build

# 2. Backend
cd ../backend-integration && npm install

# 3. Subir todo a Hostinger
# 4. Configurar Node.js
# 5. Configurar Claude Code CLI
```

## 🔧 CONFIGURACIONES ESPECÍFICAS HOSTINGER

### **Panel de Control Hostinger:**

1. **Activar Node.js**
- Panel → Advanced → Node.js
- Versión: 18.x o superior
- Startup File: `server.js`

2. **Variables de Entorno**
```
FRONTEND_URL=https://tudominio.com
PORT=3001
NODE_ENV=production
```

3. **Subdominios (Opcional)**
```
app.tudominio.com → Frontend
api.tudominio.com → Backend
```

### **Estructura en Hostinger:**
```
public_html/
├── index.html              # Frontend React
├── static/                 # Assets React
├── .htaccess              # Configuración SPA
└── api/                   # Backend (opcional)
    ├── server.js
    ├── package.json
    └── .claude/           # Subagentes
```

## 🧪 TESTING DEL DEPLOYMENT

### **Checklist Frontend:**
- [ ] Aplicación carga correctamente
- [ ] Formulario acepta datos
- [ ] Upload de CSV funciona
- [ ] Interfaz responsive en móvil
- [ ] Botones y navegación funcional

### **Checklist Backend (si aplicable):**
- [ ] API responde en `/api/health`
- [ ] Endpoint `/api/claude-agent` funcional
- [ ] Subagentes se ejecutan sin errores
- [ ] Logs muestran actividad correcta

### **Checklist Integración:**
- [ ] Frontend conecta con backend
- [ ] Generación de informes funcional
- [ ] Datos CSV se procesan correctamente
- [ ] Competidores se identifican (reales vs simulados)
- [ ] PDF se genera correctamente

## 🚨 TROUBLESHOOTING

### **Error: "Failed to fetch"**
```
Causa: CORS o URL incorrecta
Solución: Verificar REACT_APP_API_URL y configuración CORS
```

### **Error: "CSV no se procesa"**
```
Causa: Formato de archivo no compatible
Solución: Verificar encoding UTF-8 y separadores
```

### **Error: "Agente no encontrado"**
```
Causa: Claude Code CLI no configurado
Solución: Instalar CLI y copiar archivos .claude/
```

### **Error: "Node.js not working"**
```
Causa: Configuración incorrecta en Hostinger
Solución: Panel → Node.js → Verificar startup file
```

## 📈 OPTIMIZACIÓN PERFORMANCE

### **Frontend:**
- Build optimizado (React production)
- Compresión GZIP habilitada
- Cache de assets configurado
- Lazy loading implementado

### **Backend:**
- Rate limiting configurado
- Timeout apropiados
- Memory management optimizado
- Error handling robusto

## 💰 COSTOS ESTIMADOS HOSTINGER

### **Plan Mínimo Recomendado:**
- **Business Hosting**: ~$3-5 USD/mes
- **Node.js**: Incluido
- **SSL**: Incluido
- **Bandwidth**: Suficiente para la app

### **Escalabilidad:**
- **VPS**: Si necesitas más recursos (~$10-20 USD/mes)
- **CDN**: Para mejor performance global
- **Backup**: Recomendado para producción

## 🎯 PRÓXIMOS PASOS

### **Inmediato (Hoy):**
1. Build y deploy del frontend
2. Testing de funcionalidad básica
3. Configuración de dominio

### **Esta Semana:**
1. Setup del backend completo
2. Integración con Claude Code
3. Testing con datos reales

### **Próximas Semanas:**
1. Optimización de performance
2. Analytics y monitoring
3. Feedback de usuarios reales

---

## 📞 SOPORTE

Si tienes problemas durante el deployment:

1. **Revisa logs** de Hostinger (Panel → Errors)
2. **Verifica configuración** de Node.js
3. **Testea endpoints** individualmente
4. **Consulta documentación** de Hostinger

**Tu sistema está listo para ser deployado y generar informes profesionales en producción! 🚀**

---

*Guía actualizada: 2025-08-21*
*Sistema versión: 1.0.0*