import scrapper from "./main";

(function() {
    scrapper().then((response: any) => process.exit(), (e: any) => process.exit(1));
})()
