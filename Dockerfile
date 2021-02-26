FROM node:14-alpine

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY package*.json ./

USER node

RUN npm i

COPY --chown=node:node . .

EXPOSE 3001

ENTRYPOINT ["npm", "run", "dev"]