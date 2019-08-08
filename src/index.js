const axios = require('axios');
const scrapper = require('./scrapper');
const ScrapperError = require('./scrapperError')

axios.defaults.headers.post['Content-Type'] = 'application/json';

scrapper()
    .then(book => {
        return axios.post(process.env.ROCKETCHAT_WEBHOOK_URL, {
            text:`Dziś za darmo książka: ${book.title}. Do dodania do konta na https://www.packtpub.com/free-learning`,
            attachments: [
                {title: book.title, image_url: book.imageUrl}
            ]
        });
    })
    .catch(e => {
        console.error(e);
        if (e instanceof ScrapperError) {
            return axios.post(process.env.ROCKETCHAT_WEBHOOK_URL, {
                text:`Nie mogę pobrać informacji o dzisiejszej darmowej książce.`,
                attachments: [
                    {title: "Screenshot", image_url: `data:image/png;base64,${e.screenshot}`}
                ]
            });
        }
        return axios.post(process.env.ROCKETCHAT_WEBHOOK_URL, {
                text:`Błąd ${e.message}`,
                attachments: [
                    {title: "Exception", text: e.toString()}
                ]
            });
    }).then(response => process.exit(), e => process.exit(1));
