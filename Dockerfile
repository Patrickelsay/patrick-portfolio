# Build: static Vite bundle. public/media (derived web assets) is committed,
# so the image builds without portfolio-assets/ or any transcoding tools.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

# Serve: nginx with gzip, immutable caching for hashed assets, SPA fallback
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK CMD wget -qO- http://localhost/ >/dev/null || exit 1
