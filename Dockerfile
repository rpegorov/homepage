FROM node:18-alpine

WORKDIR /app

# Установка дополнительных зависимостей для sharp
RUN apk add --no-cache python3 make g++

# Копирование файлов package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей, включая sharp
RUN npm install
RUN npm install sharp

# Копирование остальных файлов проекта
COPY . .

# Увеличение памяти для Node.js при сборке
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Сборка приложения
RUN npm run build

EXPOSE 8080

# Запуск приложения
CMD ["npm", "start"] 