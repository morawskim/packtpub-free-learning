const scrapper = require('./scrapper');
const ScrapperError = require('./scrapperError')
const webhooks = require('./webhooks');

const run = () => {
    return scrapper()
    .then(book => webhooks.newBookNotify(book))
    .catch(e => {
        console.error(e);
        if (e instanceof ScrapperError) {
            return webhooks.noFreeBookNotify(e);
        }
        return webhooks.errorNotify(e);
    });
};

module.exports = run;
