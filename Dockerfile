FROM node:12-slim as build
USER node
RUN mkdir -p /home/node/app/
WORKDIR /home/node/app/
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src src
RUN npx tsc

FROM morawskim/node12-google-chrome:81.0
RUN mkdir -p /home/node/app/
WORKDIR /home/node/app/
COPY package*.json ./
RUN npm ci --production
COPY --from=build /home/node/app/build/src ./src/
CMD ["node", "src/cron.js"]
