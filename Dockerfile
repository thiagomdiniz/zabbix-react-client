# build stage
FROM node:13-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
#RUN CI=true npm test
RUN npm run build

# production stage
FROM nginx:1.17-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf