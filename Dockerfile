# Usa una imagen oficial de Python como base
FROM python:3.9-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo requirements.txt y otros archivos necesarios
COPY requirements.txt /app/

# Instala las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto de tu código al contenedor
COPY . /app/

# Expón el puerto que usarás para Flask
EXPOSE 5000

# Comando para ejecutar la aplicación Flask
CMD ["python", "backend/chatbot.py"]
