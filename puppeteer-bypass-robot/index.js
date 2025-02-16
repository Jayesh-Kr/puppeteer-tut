import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'

// Test1 --> Without StealthPlugin

// puppeteer.use(StealthPlugin())
// puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

puppeteer.launch({ headless: true }).then(async browser => {
  const page = await browser.newPage()
  await page.setViewport({ width: 800, height: 600 })

  console.log(`Testing adblocker plugin..`)
  await page.goto('https://www.vanityfair.com')
//   await page.waitForTimeout(1000)
  await page.screenshot({ path: 't1_adblocker.png', fullPage: true })

  console.log(`Testing the stealth plugin..`)
  await page.goto('https://bot.sannysoft.com')
//   await page.waitForTimeout(5000)
  await page.screenshot({ path: 't1_stealth.png', fullPage: true })

  console.log(`All done, check the screenshots. ✨`)
  await browser.close()
})