#!/usr/bin/env python3
"""
Servidor web simple para servir la aplicación de informes de mercado
Uso: python3 start-frontend.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Agregar headers de seguridad básicos
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        super().end_headers()

def main():
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"🚀 Servidor frontend ejecutándose en puerto {PORT}")
            print(f"🔗 Abrir en navegador: http://localhost:{PORT}/app-standalone.html")
            print(f"📁 Sirviendo archivos desde: {DIRECTORY}")
            print("💡 Presiona Ctrl+C para detener el servidor\n")
            
            # Intentar abrir el navegador automáticamente
            try:
                webbrowser.open(f'http://localhost:{PORT}/app-standalone.html')
                print("✅ Navegador abierto automáticamente")
            except Exception as e:
                print(f"⚠️  No se pudo abrir el navegador automáticamente: {e}")
                print(f"   Por favor abra manualmente: http://localhost:{PORT}/app-standalone.html")
            
            print("\n" + "="*60)
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Servidor detenido por el usuario")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Error iniciando servidor: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()