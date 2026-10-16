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
} catch(error) {
 issues.push(error.stack||error.message||String(error));
 console.error(issues.join("\n"));
 process.exitCode=1;
} finally {await browser.close();}
