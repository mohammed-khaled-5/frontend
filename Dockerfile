FROM node:16.17.0-alpine3.16 
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4200
ENTRYPOINT [ "npm","start" ]
