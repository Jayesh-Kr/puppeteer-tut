import puppeteer from "puppeteer";
import fs from 'fs';
const browser = await puppeteer.launch({
    headless : false,
    userDataDir : './tmp',
    defaultViewport : false
});
const page = await browser.newPage();

await page.goto("https://www.amazon.in/gp/bestsellers/amazon-renewed/ref=zg_bs_nav_amazon-renewed_0");

// const products = await page.$$("._cDEzb_card_1L-Yx > ._cDEzb_grid-cell_1uMOS");
let items = [];
let isNextBtn = true;
let pageNo = 0;
while(isNextBtn) {
    pageNo++;
    await page.waitForSelector('._cDEzb_grid-row_3Cywl > ._cDEzb_grid-column_2hIsc');
    console.log("Scrolling start.....");
    await autoScroll(page);
    console.log("Scrolling ended....");
    // console.log("Fetching products.....")
    const products = await page.$$("._cDEzb_grid-row_3Cywl > ._cDEzb_grid-column_2hIsc");
    // console.log("Products fetched..");
    for(const product of products) {
        try {
            const title = await page.evaluate(el => el.querySelector("._cDEzb_p13n-sc-css-line-clamp-3_g3dy1").textContent, product);
            const price = await page.evaluate(el => el.querySelector("._cDEzb_p13n-sc-price_3mJ9Z").textContent , product);
            const imgUrl = await page.evaluate(el => el.querySelector(".a-dynamic-image").getAttribute("src"), product);

                
                if(title !== null)
                    items.push({title:title,price:price,imgUrl:imgUrl,pageNo})
                // items.push({pageNo,price:price})

                // Creating CSV file....
            fs.appendFile('results.csv',`${title}, ${price}, ${imgUrl}, ${pageNo}\n`,(err)=> {
                if(err)
                    throw err;
            })
        } catch(err) {
            console.log(err.message);
        }
    }
    isNextBtn = (await page.$('div.a-text-center > ul > li.a-disabled.a-last')) === null;
    console.log(isNextBtn);
    if(isNextBtn) {
        console.log("Clicking next btn")
        await page.click('.a-last');
        console.log("Next btn clicked");
    }
}
console.log("CSV file created");
console.log(items.length);
// console.log([...items]);

await browser.close();

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}