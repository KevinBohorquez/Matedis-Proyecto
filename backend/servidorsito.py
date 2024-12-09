from flask import Flask
import os

app = Flask(__name__)

@app.route('/prueba')
def hola_mundo():
    return 'Hola Mundo desde /prueba'

if __name__ == '__main__':
    # Railway establece el puerto a través de la variable de entorno PORT
    port = int(os.environ.get("PORT", 8080))  # Usa 5000 por defecto si no se encuentra la variable
    app.run(debug=True, host="0.0.0.0", port=port)
