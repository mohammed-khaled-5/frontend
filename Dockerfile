FROM node:16-alpine as builder
RUN mkdir -p /app
WORKDIR /usr/src/app
COPY . .
RUN npm i -g @angular/cli
RUN npm install
RUN npm run build 

FROM nginxinc/nginx-unprivileged
COPY --from=builder /usr/src/app/dist/Tools-project-phase1-angular /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
