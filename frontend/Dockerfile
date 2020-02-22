# Testing Dockerfile

FROM node:12.16.1-stretch

ARG npmrepo=https://registry.npm.taobao.org

ARG aliyunmirror=1

WORKDIR /app

# Installing dependencies early to leverage caching
COPY package*.json ./
COPY ./scripts/aliyun.sources.list ./scripts/

RUN if [ ${aliyunmirror} -eq 1 ]; then \
    rm /etc/apt/sources.list && \
    cp ./scripts/aliyun.sources.list /etc/apt/sources.list; \
    fi && \
    apt-get update && \
    apt-get install -y libnss3 libgconf-2-4 && \
    npm install --registry=${npmrepo}

# Copying project files
COPY . .

RUN rm ./vue.config.js && \
    cp ./scripts/vue.config.testing.js ./vue.config.js && \
    cp ./scripts/nightwatch.json ./nightwatch.json && \
    chmod +x ./scripts/wait-for-it.sh

RUN npm run test:unit

CMD [ "npm", "run", "test:e2e" ]
