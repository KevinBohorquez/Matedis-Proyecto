from flask import Flask

app = Flask(__name__)

@app.route('/prueba')
def hola_mundo():
    return 'Hola Mundo desde /prueba'

if __name__ == '__main__':
    app.run(debug=True)
