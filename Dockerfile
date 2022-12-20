FROM node:16-alpine as builder
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm i -g @angular/cli
RUN npm install
RUN npm run build --prod

FROM nginxinc/nginx-unprivileged
COPY --from=builder /app/dist/Tools-project-phase1-angular /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
