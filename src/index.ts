// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'scrapper'.
const scrapper = require('./main');

scrapper().then((response: any) => process.exit(), (e: any) => process.exit(1));
