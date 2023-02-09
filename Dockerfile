# ====== build layer ======
FROM node:18 AS build

WORKDIR /usr/src/build

COPY . .

RUN npm install

RUN npm run build

# ====== app layer ======
FROM node:18 AS app

WORKDIR /usr/src/app

RUN npm install -g http-server

COPY --from=build /usr/src/build/dist .

EXPOSE 8080

# Start server using production build
CMD [ "http-server" ]


