import puppeteer from "puppeteer";

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
    console.log("Scrolling start.....");
    await autoScroll(page);
    console.log("Scrolling ended....");
    await page.waitForSelector('._cDEzb_grid-row_3Cywl > ._cDEzb_grid-column_2hIsc');
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
console.log(items.length);
console.log([...items]);


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