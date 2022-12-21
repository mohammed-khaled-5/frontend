FROM node:16-alpine as builder
RUN mkdir -p /app
WORKDIR /usr/src/app
COPY . .
RUN node --max_old_space_size=8192 node_modules/@angular/cli build client --prod


FROM nginxinc/nginx-unprivileged
COPY --from=builder /usr/src/app/dist/tools-project-phase1-angular /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
