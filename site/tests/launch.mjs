import { chromium } from "playwright";
import { pathToFileURL } from "url";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const site = path.join(__dirname, "..");
const scratch = process.env.SCRATCH;
if (!scratch) {
  console.error("SCRATCH required");
  process.exit(1);
}

const log = [];
function say(m) {
  log.push(m);
  console.log(m);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push("console: " + msg.text());
});

async function open(name) {
  const url = pathToFileURL(path.join(site, name)).href;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(200);
}

try {
  await open("index.html");
  const homeText = await page.locator("#main").innerText();
  if (homeText.length < 200) throw new Error("home surface too thin: " + homeText.length);
  if (!/Raisonnement|Alignment|Instruction/i.test(homeText)) {
    throw new Error("home missing construct labels after JS");
  }
  say("home filled chars=" + homeText.length);

  await page.locator('a[data-nav="research"]').click();
  await page.waitForTimeout(200);
  const research = await page.locator("#main").innerText();
  if (!/CivBench|nuke|Jacquelyn/i.test(research)) {
    throw new Error("research nav did not reveal labeled research: " + research.slice(0, 400));
  }
  say("research via nav chars=" + research.length);

  await page.locator('a[data-nav="protocol"]').click();
  await page.waitForTimeout(200);
  const proto = await page.locator("#main").innerText();
  if (!/Condition A|Condition B|Condition C|Wood Country|acteur C/i.test(proto)) {
    throw new Error("protocol nav missing A/B/C: " + proto.slice(0, 400));
  }
  say("protocol via nav chars=" + proto.length);

  await page.screenshot({ path: path.join(scratch, "protocol.png"), fullPage: true });
  await open("research.html");
  await page.screenshot({ path: path.join(scratch, "research.png"), fullPage: true });
  await open("index.html");
  await page.screenshot({ path: path.join(scratch, "home.png"), fullPage: true });

  if (errors.length) throw new Error("page errors: " + errors.join(" | "));
  say("zero page errors");
  say("PASS=true");
} catch (e) {
  say("FAIL " + e);
  say("errors=" + JSON.stringify(errors));
  process.exitCode = 1;
} finally {
  fs.writeFileSync(path.join(scratch, "launch.txt"), log.join("\n") + "\n");
  await browser.close();
}
