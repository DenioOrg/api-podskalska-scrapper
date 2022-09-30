const puppeteer = require('puppeteer');
const htmltabletojson = require('html-table-to-json');

let request = "";

console.log("Starting...");
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    request = await page.goto('https://www.podskalska.cz/vossupl/su221007.htm', { waitUntil: 'domcontentloaded' });
    request = await request.text();
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
