import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'

// Test1 --> Without StealthPlugin
// Test2 --> With StealthPlugin
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

puppeteer.launch({ 
    headless: true,
    executablePath : "C:/Program Files/Google/Chrome/Application/chrome.exe",
    userDataDir : "C:/Users/HP/AppData/Local/Google/Chrome/User Data"
 }).then(async browser => {
  const page = await browser.newPage()
//   await page.setViewport({ width: 800, height: 600 })

  console.log(`Testing the stealth plugin..`)
  await page.goto('https://bot.sannysoft.com')
//   await page.waitForTimeout(5000)
  await page.screenshot({ path: 't4_stealth.png', fullPage: true })

  console.log(`All done, check the screenshots. ✨`)
  await browser.close()
})