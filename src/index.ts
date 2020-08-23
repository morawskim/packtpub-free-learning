const scrapper = require('./main');

scrapper().then(response => process.exit(), e => process.exit(1));
