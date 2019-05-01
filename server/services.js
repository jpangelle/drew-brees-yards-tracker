const puppeteer = require('puppeteer');

module.exports = async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto('http://www.espn.com/nfl/player/_/id/2580/drew-brees', {
    waitUntil: 'domcontentloaded',
  });
  const yardsPassing = await page.evaluate(
    () => document.querySelector('[data-idx="2"] td:nth-child(4)').innerText,
  );
  await browser.close();
  return yardsPassing;
};
