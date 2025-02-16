import {Cluster} from 'puppeteer-cluster'
import puppeteer from 'puppeteer';

const urls = ['https://www.amazon.in/gp/bestsellers/electronics/ref=zg_bs_nav_electronics_0' , 'https://www.amazon.in/gp/bestsellers/apparel/ref=zg_bs_nav_apparel_0'];
const items = [];
(async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_PAGE,
    maxConcurrency: 2,
    // monitor : true,
    puppeteerOptions : {
      headless : false,
      defaultViewport : false,
      userDataDir : './tmp'
    }
  });

  cluster.on('taskerror', (err, data) => {
    console.log(`Error crawling ${data}: ${err.message}`);
});

  await cluster.task(async ({ page, data: url }) => {
    try {
      await page.goto(url);
      await autoScroll(page);
    const products = await page.$$('[data-a-card-type="basic"] > ._cDEzb_iveVideoWrapper_JJ34T');
    for(const product of products) {
      const title = await page.evaluate(el => el.querySelector('a > span > div').textContent , product);
      const price = await page.evaluate(el => el.querySelector('div > span > span').textContent , product);
      const imgUrl = await page.evaluate(el => el.querySelector('a > div > img').getAttribute('src') , product);
      if(title !== null)
        items.push({title,price,imgUrl,url:url==urls[0] ? 1 : 2})
    }
    console.log([...items]);
    console.log(items.length);
  } catch(err) {
    console.log("Error occured");
  }
  });

  // cluster.queue('http://www.google.com/');
  // cluster.queue('http://www.wikipedia.org/');
  // many more pages

  for(const url of urls) {
    await cluster.queue(url);
  }
  
  await cluster.idle();
  await cluster.close();
})();


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

// https://www.npmjs.com/package/puppeteer-cluster