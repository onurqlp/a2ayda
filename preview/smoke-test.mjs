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
