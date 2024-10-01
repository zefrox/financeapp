# Usa una imagen base oficial de Node.js (ajusta la versión según tus necesidades)
FROM node:18

# Define el directorio de trabajo en el contenedor
WORKDIR /app

# Instala git para clonar el repositorio
RUN apt-get update && apt-get install -y git

# Clona el repositorio desde GitHub (reemplaza con tu propio repositorio)
RUN git clone https://github.com/usuario/proyecto-nextjs.git /app

# Instala las dependencias del proyecto
RUN npm install

# Compila la aplicación Next.js para producción
RUN npm run build

# Define las variables de entorno
ENV NODE_ENV=production

# Expone el puerto por defecto de Next.js
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "start"]
