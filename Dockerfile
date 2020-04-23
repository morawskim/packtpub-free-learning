FROM morawskim/node10-google-chrome:78.0

COPY --chown=chrome:chrome node_modules/ /home/chrome/app/node_modules
COPY --chown=chrome:chrome src/ /home/chrome/app/src
WORKDIR /home/chrome/app/
