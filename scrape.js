const { chromium } = require("playwright");

const urls = [
  "https://sanand0.github.io/tdsdata/js_table/?seed=6",
  "https://sanand0.github.io/tdsdata/js_table/?seed=7",
  "https://sanand0.github.io/tdsdata/js_table/?seed=8",
  "https://sanand0.github.io/tdsdata/js_table/?seed=9",
  "https://sanand0.github.io/tdsdata/js_table/?seed=10",
  "https://sanand0.github.io/tdsdata/js_table/?seed=11",
  "https://sanand0.github.io/tdsdata/js_table/?seed=12",
  "https://sanand0.github.io/tdsdata/js_table/?seed=13",
  "https://sanand0.github.io/tdsdata/js_table/?seed=14",
  "https://sanand0.github.io/tdsdata/js_table/?seed=15",
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const url of urls) {
    // Go to the page and wait until the network is idle (page fully loaded)
    await page.goto(url, { waitUntil: "networkidle" });

    // Wait until a <table> tag appears on the page
    await page.waitForSelector("table");

    // Run JavaScript inside the browser to grab all table cell values and sum them
    const pageSum = await page.evaluate(() => {
      const cells = document.querySelectorAll("table td");
      let sum = 0;
      cells.forEach((cell) => {
        const value = parseFloat(cell.innerText.trim());
        if (!isNaN(value)) sum += value;
      });
      return sum;
    });

    const seed = url.split("seed=")[1];
    console.log(`Seed ${seed}: ${pageSum}`);
    grandTotal += pageSum;
  }

  console.log(`\n✅ TOTAL SUM: ${grandTotal}`);
  await browser.close();
})();
