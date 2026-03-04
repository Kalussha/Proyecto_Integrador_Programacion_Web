FROM node:18-alpine

LABEL maintainer="Instituto Tecnológico - Proyecto Integrador"
LABEL description="MecánicaTec Microservicio Ingenieros - Puerto 4000"

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias primero (optimizar caché de capas)
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --production

# Copiar código fuente
COPY . .

# Exponer puerto del microservicio
EXPOSE 4000

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=4000

# Comando de inicio
CMD ["node", "server.js"]
