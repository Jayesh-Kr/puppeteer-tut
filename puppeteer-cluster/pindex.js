import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    headless : false,
    defaultViewport : false,
    userDataDir : './temp'
});
const page = await browser.newPage();
const items = [];
await page.goto('https://www.amazon.in/gp/bestsellers/electronics/ref=zg_bs_nav_electronics_0');
const products = await page.$$('[data-a-card-type="basic"]');
console.log(products);

for(const product of products) {
    const title = await page.evaluate(el => el.querySelector('div > div > a > span > div').textContent , product);
      const price = await page.evaluate(el => el.querySelector('div > div > a > div > span > span').textContent , product);
      const imgUrl = await page.evaluate(el => el.querySelector('a > div > img').getAttribute('src') , product);
      if(title !== null)
        items.push({title,price,imgUrl})
}

console.log(items.length);
console.log([...items]);