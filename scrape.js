const { chromium } = require("playwright");

const urls = [
  "https://sanand0.github.io/tdsdata/js_table/?seed=54",
  "https://sanand0.github.io/tdsdata/js_table/?seed=55",
  "https://sanand0.github.io/tdsdata/js_table/?seed=56",
  "https://sanand0.github.io/tdsdata/js_table/?seed=57",
  "https://sanand0.github.io/tdsdata/js_table/?seed=58",
  "https://sanand0.github.io/tdsdata/js_table/?seed=59",
  "https://sanand0.github.io/tdsdata/js_table/?seed=60",
  "https://sanand0.github.io/tdsdata/js_table/?seed=61",
  "https://sanand0.github.io/tdsdata/js_table/?seed=62",
  "https://sanand0.github.io/tdsdata/js_table/?seed=63",
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url, { waitUntil: "networkidle" });

    // Wait for the table to appear
    await page.waitForSelector("table");

    // Grab all cell text from the table, parse as numbers, sum them
    const pageSum = await page.evaluate(() => {
      const cells = document.querySelectorAll("table td");
      let sum = 0;
      cells.forEach((cell) => {
        const num = parseFloat(cell.innerText.trim());
        if (!isNaN(num)) sum += num;
      });
      return sum;
    });

    console.log(`Seed ${url.split("seed=")[1]}: ${pageSum}`);
    grandTotal += pageSum;
  }

  console.log(`Total sum across all pages: ${grandTotal}`);
  await browser.close();
})();
