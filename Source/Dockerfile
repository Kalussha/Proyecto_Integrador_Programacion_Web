FROM node:18-alpine

LABEL maintainer="Instituto Tecnológico - Proyecto Integrador"
LABEL description="MecánicaTec Web API - Puerto 3000"

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias primero (cacheo de capas)
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --production

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto de la API
EXPOSE 3000

# Variable de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3000

# Comando de inicio
CMD ["node", "server.js"]
