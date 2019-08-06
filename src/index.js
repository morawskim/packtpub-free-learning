const scrapper = require('./scrapper');

scrapper().then(book => console.log(book)).catch(e => console.error(e));
