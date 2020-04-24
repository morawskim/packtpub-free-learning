FROM morawskim/node10-google-chrome:78.0

RUN mkdir -p /home/chrome/app/
WORKDIR /home/chrome/app/
COPY --chown=chrome:chrome package*.json ./
RUN npm ci --production
COPY --chown=chrome:chrome src src
CMD ["node", "src/cron.js"]
