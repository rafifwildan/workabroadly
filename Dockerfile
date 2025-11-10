# Tahap 1: Membangun kode
FROM node:18-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Ganti "npm run build" jika skrip Anda berbeda
RUN npm run build

# Tahap 2: Menyajikan kode
FROM nginx:stable-alpine
# Ganti "/app/build" jika folder output build Anda berbeda (misal: /app/dist)
COPY --from=build /app/build /usr/share/nginx/html

# PENTING: Cloud Run butuh ini
# Kita memberitahu server untuk berjalan di port 8080
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]