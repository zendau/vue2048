FROM node:14 AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM nginx as prod-stage
COPY --from=frontend /app/dist /usr/share/nginx/html