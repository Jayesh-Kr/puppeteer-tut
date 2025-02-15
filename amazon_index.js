import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    defaultViewport : false,
    headless : false,
    userDataDir : './tmp'   // Stores the user details after logging in... Try running without this :)
});
const page = await browser.newPage();

await page.goto("https://www.amazon.in/gp/browse.html?node=1388921031&ref_=nav_em_sbc_tvelec_headphones_0_2_9_4");

console.log("Getting all items data");
const products = await page.$$("._octopus-search-result-card_style_apbSearchResultsContainer__bCqjb > ._octopus-search-result-card_style_apbSearchResultItem__2-mx4");
console.log("Got all data items");
// console.log([...products])
let items = [];
for(const product of products) {
    // console.log("Printing.....")
    try {
        const title = await page.evaluate(el => el.querySelector(" a > h2 > span").textContent, product);
        // console.log(title);
        const price = await page.evaluate(el => el.querySelector("span.a-price-whole").textContent, product);
        // console.log(price);
        const imgUrl = await page.evaluate(el => el.querySelector(".s-image").getAttribute("src"), product);
        // console.log(imgUrl+"\n");
        items.push({title,price,imgUrl});
    } catch(err) {
        console.log(err);
    }
}
console.log(items.length);
console.log([...items]);