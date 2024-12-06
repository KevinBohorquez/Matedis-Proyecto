from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas

@app.route('/random-number', methods=['GET'])
def random_number():
    number = random.randint(1, 100)
    return jsonify({"random_number": number})

if __name__ == '__main__':
    app.run(debug=True, port=8080)  # El puerto 8080 debería ser el usado en Railway
