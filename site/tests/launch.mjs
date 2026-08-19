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

const chromePath = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const launchOpts = { headless: true };
if (fs.existsSync(chromePath)) launchOpts.executablePath = chromePath;

const browser = await chromium.launch(launchOpts);
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

async function mustHaveLangSwitch(where) {
  const n = await page.locator("#lang-switch .lang-btn").count();
  if (n < 2) throw new Error(where + " missing FR/EN switch (btns=" + n + ")");
}

try {
  await open("index.html");
  await mustHaveLangSwitch("home");
  const homeText = await page.locator("#main").innerText();
  if (homeText.length < 200) throw new Error("home surface too thin: " + homeText.length);
  if (!/Raisonnement|Instruction/i.test(homeText)) {
    throw new Error("home missing construct labels after JS");
  }
  if (!/Comment ça marche|salle de crise/i.test(homeText)) {
    throw new Error("home missing how-it-works: " + homeText.slice(0, 300));
  }
  if (!/République du Cèdre|Île de Jade|Combinat/i.test(homeText)) {
    throw new Error("home missing twin map names");
  }
  say("home filled chars=" + homeText.length);

  await page.locator('[data-lang="en"]').click();
  await page.waitForTimeout(150);
  const enH1 = await page.locator("h1").innerText();
  if (!/third country/i.test(enH1)) throw new Error("EN toggle failed, h1=" + enH1);
  const htmlLang = await page.locator("html").getAttribute("lang");
  if (htmlLang !== "en") throw new Error("html lang not en: " + htmlLang);
  const enMain = await page.locator("#main").innerText();
  if (!/How it works/i.test(enMain) || !/Cedar Republic/i.test(enMain)) {
    throw new Error("EN body missing how/twin: " + enMain.slice(0, 400));
  }
  say("home EN h1=" + enH1);

  await page.locator('a[data-nav="research"]').click();
  await page.waitForTimeout(250);
  await mustHaveLangSwitch("research");
  const research = await page.locator("#main").innerText();
  if (!/CivBench|nuke|Jacquelyn/i.test(research)) {
    throw new Error("research nav did not reveal labeled research: " + research.slice(0, 400));
  }
  const researchLang = await page.locator("html").getAttribute("lang");
  if (researchLang !== "en") throw new Error("lang did not persist to research: " + researchLang);
  say("research via nav chars=" + research.length + " lang=" + researchLang);

  await page.locator('a[data-nav="protocol"]').click();
  await page.waitForTimeout(250);
  await mustHaveLangSwitch("protocol");
  const proto = await page.locator("#main").innerText();
  if (!/Condition A|Condition B|Condition C/i.test(proto)) {
    throw new Error("protocol nav missing A/B/C: " + proto.slice(0, 400));
  }
  say("protocol via nav chars=" + proto.length);

  await page.screenshot({ path: path.join(scratch, "protocol.png"), fullPage: true });

  await page.locator('a[data-nav="scenario"]').click();
  await page.waitForTimeout(250);
  await mustHaveLangSwitch("scenario");
  const pack = await page.locator("#scenario-pack").innerText();
  if (!/Cedar Republic|Jade Isle|Taiwan/i.test(pack)) {
    throw new Error("scenario pack missing skins: " + pack.slice(0, 400));
  }
  await page.screenshot({ path: path.join(scratch, "scenario.png"), fullPage: true });
  say("scenario via nav chars=" + pack.length);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(scratch, "scenario-mobile.png"), fullPage: true });

  await open("research.html");
  await page.locator('[data-lang="fr"]').click();
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(scratch, "research.png"), fullPage: true });
  await open("index.html");
  await page.locator('[data-lang="fr"]').click();
  await page.waitForTimeout(150);
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.screenshot({ path: path.join(scratch, "home.png"), fullPage: true });
  await page.locator('[data-lang="en"]').click();
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(scratch, "home-en.png"), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: path.join(scratch, "home-en-mobile.png"), fullPage: true });

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
