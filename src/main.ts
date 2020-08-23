// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'scrapper'.
const scrapper = require('./scrapper');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ScrapperEr... Remove this comment to see the full error message
const ScrapperError = require('./scrapperError');
const webhooks = require('./webhooks');

const run = () => {
    return scrapper()
    .then((book: any) => webhooks.newBookNotify(book))
    .catch((e: any) => {
        console.error(e);
        if (e instanceof ScrapperError) {
            return webhooks.noFreeBookNotify(e);
        }
        return webhooks.errorNotify(e);
    });
};

module.exports = run;
