# Usa una imagen oficial de Python como base
FROM python:3.9-slim

# Instala dependencias para el frontend (React)
RUN apt-get update && apt-get install -y \
  nodejs \
  npm

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo requirements.txt y otros archivos necesarios
COPY requirements.txt /app/

# Instala las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto de tu código (backend) al contenedor
COPY ./backend /app/backend

# Instala las dependencias de React (frontend)
COPY ./src /app/src
WORKDIR /app/src
RUN npm install

# Construye el proyecto de React
RUN npm run build

# Vuelve al directorio principal para configurar Flask
WORKDIR /app

# Expón el puerto que usarás para Flask y el frontend
EXPOSE 5000
EXPOSE 3000

# Copia el código de React construido al directorio de Flask
COPY /app/src/build /app/backend/static

# Comando para ejecutar la aplicación Flask
CMD ["python", "backend/chatbot.py"]
