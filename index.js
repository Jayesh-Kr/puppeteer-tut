import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Navigate the page to a URL.
console.log("started");
await page.goto('https://developer.chrome.com/');
console.log("step 1");

// Set screen size.
await page.setViewport({width: 1080, height: 1024});
console.log("step 2");

// Type into search box.
await page.locator('.devsite-search-field').fill('automate beyond recorder');
console.log("step 3");

// Wait and click on first result.
await page.locator('.devsite-result-item-link').click();
console.log("step 4");

// Locate the full title with a unique string.
const textSelector = await page
  .locator('text/Customize and automate')
  .waitHandle();
const fullTitle = await textSelector?.evaluate(el => el.textContent);

// Print the full title.
console.log('The title of this blog post is "%s".', fullTitle);

await browser.close();