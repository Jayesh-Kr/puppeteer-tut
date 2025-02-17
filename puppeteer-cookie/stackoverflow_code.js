// import puppeteer from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

puppeteer.launch({
  headless: false,
  defaultViewport: false,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  userDataDir: "C:/Users/HP/AppData/Local/Google/Chrome/User Data",
}).then(async browser => {


const page = await browser.newPage();

const navigationPromise = page.waitForNavigation();

await page.goto("https://accounts.google.com/signin/v3/identifier");   // ???  below or this ??
// await page.goto("https://accounts.google.com/signin/v3/identifier"); 

await navigationPromise;

await page.waitForSelector('input[type="email"]');
await page.click('input[type="email"]');

await navigationPromise;

//TODO : change to your email
await page.type('input[type="email"]', "krishna.jayesh1505");

await page.waitForSelector("#identifierNext");
await page.click("#identifierNext");

await page.waitForSelector('input[type="password"]');
await page.click('input[type="email"]');

//TODO : change to your password
await page.type('input[type="password"]', "yourpassword");

await page.waitForSelector("#passwordNext");
await page.click("#passwordNext");

await navigationPromise;

}).catch((err) => {
    console.log(err.message);
})
