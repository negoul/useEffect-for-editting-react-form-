# Step 1

FROM registry.efarda.ir/node:10 as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
COPY .npmrc .
#COPY package-lock.json /app
RUN npm i --package-lock-only
#RUN npm audit fix
RUN npm install
COPY . /app
RUN npm run build:production
# Stage 2

FROM registry.efarda.ir/nginx:1.17.1-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY --from=build-step /app/nginx.conf /etc/nginx

