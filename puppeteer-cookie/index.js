import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    headless : false,
    defaultViewport : false
});
const page = await browser.newPage();
try {
await page.goto("https://accounts.google.com/v2/identifier" , {
    waitUntil : 'networkidle2'
});
await page.type("#identifierId", "krishna.jayesh15");
await page.click("#identifierNext > div > button > span");
await page.waitForNavigation({
    waitUntil : 'load'
})

const cookies = await page.cookies();
console.log(cookies);
} catch(err) {
    console.log(err.message);
}

// await browser.close();


// import puppeteer from 'puppeteer';

// const browser = await puppeteer.launch();

// const page = await browser.newPage();

// await page.goto('https://example.com');

// await page.evaluate(() => {
//   document.cookie = 'myCookie = MyCookieValue';
// });

// console.log(await browser.cookies()); 