import scrapper from './scrapper';
import ScrapperError from './scrapperError';
import webhooks from './webhooks';

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

export default run;
