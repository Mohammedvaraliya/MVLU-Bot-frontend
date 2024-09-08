FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn run build


FROM nginx:alpine

COPY --from=builder /usr/src/app/out /usr/share/nginx/html


COPY ./.config/nginx.conf /etc/nginx/nginx.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]