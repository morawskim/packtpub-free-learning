FROM morawskim/node12-google-chrome:81.0

RUN mkdir -p /home/node/app/
WORKDIR /home/node/app/
COPY --chown=node:node package*.json ./
RUN npm ci --production
COPY --chown=node:node src src
CMD ["node", "src/cron.js"]
