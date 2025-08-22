#!/usr/bin/env node
/**
 * Servidor web simple para servir la aplicación de informes de mercado
 * Uso: node start-frontend.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8080;
const DIRECTORY = __dirname;

// MIME types para archivos estáticos
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Agregar headers CORS y seguridad
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    
    let filePath = path.join(DIRECTORY, req.url === '/' ? 'app-standalone.html' : req.url);
    
    // Prevenir acceso fuera del directorio
    if (!filePath.startsWith(DIRECTORY)) {
        res.writeHead(403);
        res.end('Prohibido');
        return;
    }
    
    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || 'text/plain';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('Archivo no encontrado');
            } else {
                res.writeHead(500);
                res.end(`Error del servidor: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor frontend ejecutándose en puerto ${PORT}`);
    console.log(`🔗 Abrir en navegador: http://localhost:${PORT}/app-standalone.html`);
    console.log(`📁 Sirviendo archivos desde: ${DIRECTORY}`);
    console.log('💡 Presiona Ctrl+C para detener el servidor\\n');
    
    // Intentar abrir el navegador automáticamente
    const url = `http://localhost:${PORT}/app-standalone.html`;
    const platform = process.platform;
    
    let command;
    if (platform === 'win32') {
        command = `start ${url}`;
    } else if (platform === 'darwin') {
        command = `open ${url}`;
    } else {
        command = `xdg-open ${url}`;
    }
    
    exec(command, (error) => {
        if (error) {
            console.log(`⚠️  No se pudo abrir el navegador automáticamente: ${error.message}`);
            console.log(`   Por favor abra manualmente: ${url}`);
        } else {
            console.log('✅ Navegador abierto automáticamente');
        }
    });
    
    console.log('\\n' + '='.repeat(60));
});

// Manejo de errores y cierre
process.on('SIGINT', () => {
    console.log('\\n🛑 Servidor detenido por el usuario');
    process.exit(0);
});

server.on('error', (error) => {
    console.error(`❌ Error del servidor: ${error.message}`);
    process.exit(1);
});