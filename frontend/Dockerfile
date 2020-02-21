
# Building & Testing stage
FROM node:12.16.1-alpine as build-stage

WORKDIR /app

# Installing dependencies early to leverage caching
COPY package*.json ./

RUN npm install --registry=https://registry.npm.taobao.org

# Copying project files
COPY . .

RUN npm run test:unit

RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
