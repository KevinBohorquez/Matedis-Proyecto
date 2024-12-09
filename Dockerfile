# Usa una imagen oficial de Python como base
FROM python:3.9-slim

# Establece el directorio de trabajo para el backend
WORKDIR /app

# Copia el archivo requirements.txt
COPY requirements.txt /app/

# Instala las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia el código del backend
COPY backend /app/backend

# Expón el puerto que Flask va a usar
EXPOSE 5000

# Comando para ejecutar la aplicación Flask
CMD ["python", "backend/chatbot.py"]
