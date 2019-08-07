const axios = require('axios');
const scrapper = require('./scrapper');

axios.defaults.headers.post['Content-Type'] = 'application/json';

scrapper()
    .then(book => {
        axios.post(process.env.ROCKETCHAT_WEBHOOK_URL, {
            text:`Dziś za darmo książka: ${book.title}. Do pobrania z https://www.packtpub.com/free-learning`,
            attachments: [
                {title: book.title, image_url: book.imageUrl}
            ]
        });
    })
    .catch(e => console.error(e));

