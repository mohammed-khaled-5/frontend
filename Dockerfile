FROM node:16-alpine as builder
RUN mkdir -p /app
WORKDIR /usr/src/app
COPY . .
RUN npm i -g @angular/cli
RUN npm install
RUN set NODE_OPTIONS=--max_old_space_size=8192
RUN npm run build --prod

FROM nginxinc/nginx-unprivileged
COPY --from=builder /usr/src/app/dist/tools-project-phase1-angular /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
