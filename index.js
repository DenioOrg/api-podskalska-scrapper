const puppeteer = require('puppeteer');
const moment = require('moment');
const htmltabletojson = require('html-table-to-json');

let request = "";

console.log("Starting...");
for (let i = 0; i < 5; i++) {
    console.log(moment().add(i, 'days').format('YYMMDD'));
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        request = await page.goto('https://www.podskalska.cz/vossupl/' + moment().add(i, 'days').format('YYMMDD') + '.htm', { waitUntil: 'domcontentloaded' });
        request = await request.text();
        if (!request.includes("Změny v rozvrzích tříd")) return;
        await browser.close();

        let jsonTables = htmltabletojson.parse(request);
        //console.log(jsonTables.results);

        let classA = null;
        let hour = null
        let subject = null
        let action = null
        let teacher = null
        for (let i = 0; i < jsonTables.results[0].length; i++) {
            if (jsonTables.results[0][i]["Změny v rozvrzích tříd:"] != "") {
                classA = jsonTables.results[0][i]["Změny v rozvrzích tříd:"];
            }
            else {

            }
            hour = jsonTables.results[0][i]["2"];
            subject = jsonTables.results[0][i]["3"];
            group = jsonTables.results[0][i]["4"];
            action = jsonTables.results[0][i]["6"];
            teacher = jsonTables.results[0][i]["8"];

            console.log(classA + hour + subject + group + action + teacher);
        }
    })();
}
