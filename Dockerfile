# build a state
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# prod stage
FROM node:18-alpine

WORKDIR /usr/src/app

ARG DB_URI=$DB_URI
ARG JWT_SECTER = $JWT_SECTER

ENV DB_URI=$DB_URI
ENV JWT_SECTER=$JWT_SECTER

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

RUN rm package*.json

EXPOSE 8000

CMD ["node", "dist/main.js"]

