import puppeteer from 'puppeteer-core';
import ScrapperError from './scrapperError';

async function scrapper() {
    const selector = '#free-learning-dropin div.product > div.product__info h1';
    const imgSelector = '#free-learning-dropin div.product div.product__cover img';
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
        await page.waitFor((selector: any) => !!document.querySelector(selector), {timeout: 10000}, selector);
        const bookTitle = await page.evaluate( (selector: any) => {
            return document.querySelector(selector).innerHTML;
        }, selector);
        const bookImageUrl = await page.evaluate( (selector: any) => {
            return document.querySelector(selector).src;
        }, imgSelector);

        return {'title': bookTitle, 'imageUrl': bookImageUrl};
    } catch (e) {
        if (page) {
            const img = await page.screenshot({fullPage: true, type: 'png', encoding: "base64"});
            const error = new ScrapperError(e.message);
            error.screenshot = img;
            throw error;
        }
        throw e;
    } finally {
        browser && browser.close();
    }
}

export default scrapper;

// vim:set ft=puppeteer.javascript:
