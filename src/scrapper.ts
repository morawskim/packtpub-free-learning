import puppeteer from 'puppeteer-core';
import ScrapperError from './scrapperError';

async function scrapper() {
    const selector = '#app div.product__info div.grid.product-info.main-product h3';
    const imgSelector = '#app div.product__info div.product-info__image img';
    let browser, page;
    try {
        browser = await puppeteer.launch({
            headless: true,
            executablePath: '/usr/bin/google-chrome',
            args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-dev-shm-usage'],
            defaultViewport: {width: 1920, height: 1080}
        });
        page = await browser.newPage();
        await page.goto('https://www.packtpub.com/free-learning', {timeout: 45000});
        await page.waitForSelector(selector, {timeout: 10000});
        const bookTitle = await page.evaluate( (selector: any) => {
            return document.querySelector(selector).innerHTML;
        }, selector);
        const bookImageUrl = await page.evaluate( (selector: any) => {
            return document.querySelector(selector).src;
        }, imgSelector);

        return {'title': bookTitle, 'imageUrl': bookImageUrl};
    } catch (e: any) {
        if (page) {
            let img: string;
            const screenshot = await page.screenshot({fullPage: true, type: 'png', encoding: "base64"});

            if (screenshot) {
                img = screenshot.toString();
                const error = new ScrapperError(e.message);
                error.screenshot = img;

                throw error;
            }
        }
        throw e;
    } finally {
        browser && browser.close();
    }
}

export default scrapper;

// vim:set ft=puppeteer.javascript:
