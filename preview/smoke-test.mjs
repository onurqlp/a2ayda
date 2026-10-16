import { chromium } from "playwright";
import fs from "node:fs";
const base = "http://127.0.0.1:8765/preview/?preview=1";
const sizes=[{w:360,h:780},{w:390,h:844},{w:768,h:1024},{w:1280,h:800}];
const browser=await chromium.launch({headless:true});
const issues=[];
fs.mkdirSync("preview/test-results",{recursive:true});
const check=(result,message)=>{if(!result)throw Error(message)};
try {
 for(const {w,h} of sizes) {
  const context=await browser.newContext({viewport:{width:w,height:h},isMobile:w<768,hasTouch:w<768});
  const page=await context.newPage();
  const errors=[];
  page.on("pageerror",error=>errors.push(error.message));
  await page.goto(base+"#units",{waitUntil:"domcontentloaded",timeout:45000});
  await page.locator(".unit-card").first().waitFor({timeout:15000});
  check(await page.locator(".unit-card").count()===24,"24 unit cards missing");
  await page.screenshot({path:"preview/test-results/a2-units-"+w+".png",fullPage:true});
  await page.goto(base+"#unit-1",{waitUntil:"domcontentloaded",timeout:45000});
  await page.locator(".ayda-group-progress").waitFor({timeout:12000});
  check(await page.locator(".ayda-group-tabs button").count()===4,"Four lesson stages missing");
  check(await page.locator(".question-dot:visible").count()===6,"Must display six question selectors");
  check(await page.locator(".unit-video-tab").count()===3,"Videos missing");
  const video=await page.locator("#unitVideoHub iframe").getAttribute("src");
  check(video?.startsWith("https://drive.google.com/file/d/"),"Video iframe URL incorrect");
  check(await page.locator(".summary-content .example-list li").count()===3,"German examples lost");
  check(await page.locator(".ayda-study-dock [data-ayda-stage]").count()===3,"Mobile stage navigation missing");
  const overflow=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,inner:window.innerWidth}));
  check(overflow.scroll<=overflow.inner+2, "Horizontal overflow "+JSON.stringify(overflow));
  const index=await page.evaluate(()=>window.AYDA_UNITS[0].exercises[0].answer);
  await page.locator('[data-practice-choice="'+index+'"]').click();
  await page.locator("[data-check-question]").click();
  check(await page.locator(".practice-feedback.good").count()===1,"Answer checking failed");
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("ayda_a2_progress_v2")||"{}")?.[1]?.responses?.q01);
  check(saved?.correct===true,"Original progress record not saved");
  await page.locator('[data-ayda-group="2"]').click();
  await page.waitForFunction(() => document.querySelectorAll(".question-dot:not([hidden])").length === 6 && document.querySelector(".practice-counter")?.textContent?.includes("13"), {timeout:5000});
  check(await page.locator(".question-dot:visible").count()===6,"Six-question group switching failed");
  check((await page.locator(".practice-counter").textContent())?.includes("13"),"Wrong third-group start");
  await page.reload({waitUntil:"domcontentloaded"});
  await page.locator(".ayda-group-progress").waitFor({timeout:12000});
  const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem("ayda_a2_progress_v2")||"{}")?.[1]?.responses?.q01);
  check(restored?.correct===true,"Saved answer lost after reload");
  await page.screenshot({path:"preview/test-results/a2-unit1-"+w+".png",fullPage:true});
  check(errors.length===0,"Page errors: "+errors.join(" | "));
  await context.close();
  console.log("PASS "+w+"x"+h+" / cards 24 / groups 4x6 / video / progress / no overflow");
 }
 // A1/B1 design parity must be real and clickable, not just cosmetic styling.
 {
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const page=await context.newPage();
  const errors=[];
  page.on("pageerror",error=>errors.push(error.message));
  await page.goto(base+"#home",{waitUntil:"domcontentloaded"});
  await page.locator("#a2B1Grid .a2-b1-unit-card").first().waitFor({timeout:16000});
  check(await page.locator("#a2B1Grid .a2-b1-unit-card").count()===24,
    "A2 homepage must show all 24 A2 units directly, like B1.");
  check(JSON.stringify(await page.locator(".a2-shared-nav>button").allTextContents())===
    JSON.stringify(["Video + Alıştırma","AYDA Kaynakları","İlerleme"]),
    "Top navigation should exactly match A1/B1 labels and order.");
  check(await page.locator("#a2AYDABrand").count()===1,"AYDA original logo not mounted.");
  check(await page.locator("#a2SharedPill").textContent()==="24 Ünite",
    "A2 shared level pill missing.");
  check(await page.locator("#kaynaklar .home-resource-card").count()===3,
    "The three AYDA resource destinations must remain visible on homepage.");
  check(await page.locator(".bottom-nav").evaluate(el=>getComputedStyle(el).display)==="none",
    "Original separate bottom navigation should not conflict with common top navigation.");
  await page.locator('[data-a2-filter="A2.2"]').click();
  check(await page.locator("#a2B1Grid .a2-b1-unit-card").count()===12,
    "A2.2 catalog must contain 12 units.");
  const ids=await page.locator("#a2B1Grid .a2-b1-unit-card").evaluateAll(els=>els.map(n=>Number(n.dataset.unit)));
  check(ids.every((id,i)=>id===i+13),"A2.2 must show exactly units 13–24.");
  await page.locator('[data-a2-filter="all"]').click();
  check(await page.locator("#a2B1Grid .a2-b1-unit-card").count()===24,
    "All-unit filter must restore 24 cards.");
  await page.screenshot({path:"preview/test-results/a2-b1-home-390.png",fullPage:false});
  await page.locator('#a2B1Grid .a2-b1-unit-card[data-unit="13"] button').click();
  await page.locator('.unit-page[data-unit-id="13"] #a2B1DetailTop').waitFor({timeout:12000});
  check((await page.locator(".unit-page .unit-video-tab").count())===3,
    "A2 lesson 13 lost its three original video choices.");
  check((await page.locator(".unit-page .question-dot").count())===24,
    "A2 lesson 13 lost an original question.");
  check((await page.locator(".unit-page .ayda-flowbar").count())===1,
    "A2 must keep the visible B1-style Learn/Video/Practice controls.");
  await page.locator("#a2B1DetailTop .a2-b1-back").click();
  await page.waitForURL(/#units$/);
  await page.waitForFunction(()=>document.querySelectorAll("#app .unit-card").length===24,
    {timeout:8000});
  check(await page.locator(".unit-card").count()===24,"Original 8-module catalog no longer available.");
  await page.locator(".a2-more summary").click();
  await page.locator(".a2-more-items button:nth-child(2)").click();
  await page.waitForURL(/#help$/);
  await page.locator("#helpTitle").waitFor({timeout:8000});
  check(await page.locator("#helpTitle").count()===1,"Original help resources lost.");
  await page.locator(".a2-more summary").click();
  await page.locator(".a2-more-items button:nth-child(1)").click();
  await page.waitForURL(/#resources$/);
  await page.locator("#resourcesTitle").waitFor({timeout:8000});
  check(await page.locator("#resourcesTitle").count()===1,"Original A2 resources lost.");
  await page.locator("#homeButton").click();
  await page.waitForURL(/#home$/);
  await page.locator("#a2B1Grid .a2-b1-unit-card").first().waitFor();
  await page.locator('[data-shared-link="uniteler"]').click();
  const inView=await page.locator("#uniteler").evaluate(el=>{const r=el.getBoundingClientRect();return r.bottom>100&&r.top<innerHeight});
  check(inView,"Main Video + Alıştırma shortcut did not scroll to catalog.");
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+2),
    "Shared B1-style A2 page overflows mobile viewport.");
  check(errors.length===0,"New A2 navigation errors: "+errors.join(" | "));
  await context.close();
  console.log("PASS shared A1/B1/A2 menu · 24 cards · filters · A2 resources · mobile layout");
 }
 // Confirm that the public GitHub Pages preview resolves and renders the A2 app.
 const live=await browser.newPage({viewport:{width:390,height:844}});
 const liveURL="https://onurqlp.github.io/a2ayda/preview/?v=20261016-a2u1#unit-1";
 const publicResponse=await live.goto(liveURL,{waitUntil:"domcontentloaded",timeout:45000});
 check(publicResponse?.status()===200,"Public preview HTTP status "+publicResponse?.status());
 await live.locator(".ayda-group-progress").waitFor({state:"attached",timeout:20000});
 // Student authentication remains unchanged. Show the already-rendered
 // app only inside this isolated test browser context for UI inspection.
 await live.evaluate(()=>{
   document.getElementById("aydaLoginBox").style.display="none";
   document.getElementById("aydaProtectedContent").style.display="block";
 });
 await live.locator(".ayda-group-progress").waitFor({state:"visible",timeout:10000});
 check(await live.locator(".question-dot:visible").count()===6,"Public preview group layout not visible");
 const checkOverflow=await live.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2);
 check(checkOverflow,"Public preview mobile horizontal overflow");
 await live.screenshot({path:"preview/test-results/a2-live-390.png",fullPage:true});
 console.log("PASS public GitHub Pages preview HTTP 200 / A2 groups / 390px responsive");
 await live.close();
} catch(error) {
 issues.push(error.stack||error.message||String(error));
 console.error(issues.join("\n"));
 process.exitCode=1;
} finally {await browser.close();}
