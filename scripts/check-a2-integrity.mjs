import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import {createHash} from "node:crypto";
function read(p){return fs.readFileSync(p)}
function sha(bytes){return createHash("sha1").update("blob "+bytes.length+"\0").update(bytes).digest("hex")}
const original={
 "app.js":"a1bd372d2b068fbf2743d42e77d5ddcf8d9b165d",
 "data.js":"79c6d457bf491d6cdeaeb004e6db2668fe19967b",
 "practice-data.js":"93895914bab26f5a374cd64a15985afac59ff908",
 "styles.css":"4ef32291665f539e3c9d37ce922674365e0b1978",
 "og.png":"57926b49d1fb6afd8a6c13b7dba127c9628ac481",
 "preview/learning.js":"2770ec66e0ca01d5063e93359612e663ca8a99c8",
 "preview/learning.css":"ef9f06456db8202d49962733d1f94df8b3bb074a"
};
for(const [path,expected] of Object.entries(original)){
 assert.equal(sha(read(path)),expected,
   "Original AYDA A2 content or functionality was changed: "+path);
}
const context={window:{},console};
vm.createContext(context);
vm.runInContext(read("data.js").toString("utf8"),context,{timeout:5000});
vm.runInContext(read("practice-data.js").toString("utf8"),context,{timeout:5000});
const units=context.window.AYDA_UNITS;
assert.equal(units?.length,24,"A2 must retain 24 course units");
assert.equal(units?.reduce((n,u)=>n+u.exercises.length,0),576,"A2 must retain 576 exercises");
assert.equal(units?.reduce((n,u)=>n+u.videos.length,0),72,"A2 must retain 72 video records");
for(let i=0;i<24;i++){
 assert.equal(units[i].id,i+1,"A2 original unit order changed");
 assert.equal(units[i].exercises.length,24,"A2 lesson "+(i+1)+" missing exercises");
 assert.equal(units[i].videos.length,3,"A2 lesson "+(i+1)+" missing videos");
}
const originalRootSha="229b53b077eca09b1c12133bbd13626f580bfe9f";
const approvedHtml=read("preview/index.html").toString("utf8");
assert.ok(approvedHtml.includes('noindex,nofollow'),"Preview should not appear in search");
const previewOnly=read("preview/parity.js").toString("utf8");
const parityCss=read("preview/parity.css").toString("utf8");
assert.ok(previewOnly.includes("a2B1Grid"),"Shared 24-unit catalog missing");
assert.ok(previewOnly.includes("ayda_a2_progress_v2"),"Old student progress must remain");
for(const name of ["#a2B1DetailTop",".a2-shared-nav",".a2-b1-grid"]){
 assert.ok(parityCss.includes(name),"Missing B1-style shared component "+name);
}
for(const filename of ["learning.js","learning.css","parity.js","parity.css","ayda-brand.js"]){
 assert.ok(approvedHtml.includes("./"+filename),"Preview missing "+filename);
}
assert.ok(approvedHtml.includes("https://onurqlp.github.io/ayda-pass/access-control.js"),
 "Original AYDA password service was removed");
const root=read("index.html").toString("utf8");
const expressLink='    <script defer src="./a2-express-shortcut.js"></script>\n';
assert.equal(root.split(expressLink).length,2,"A2 Express shortcut must appear exactly once.");
const normalizedOfficialRoot=root
 .replace('<title>AYDA A2 | Öğren · Video · Alıştırma</title>','<title>AYDA A2 | Öğren · Video · Alıştırma · Önizleme</title>')
 .replace(/\s*<style id="a2-canonical-brand-fix">[\s\S]*?<\/style>/,"\n  ")
 .replace(/<span class="brand-mark( small)?" aria-hidden="true"><img [^>]+><\/span>/g,
   (_,suffix)=>'<span class="brand-mark'+(suffix||'')+'" aria-hidden="true">AY</span>');
assert.ok(root.includes('ayda-home-v89-baa791945bb954a30b.png'),"Live A2 approved official logo missing");
const approvedRoot=normalizedOfficialRoot.replace(expressLink,"");
if(sha(read("index.html"))!==originalRootSha){
 const expected=approvedHtml.replace('      <meta name="robots" content="noindex,nofollow" />\n',"")
  .replaceAll("../data.js","./data.js")
  .replaceAll("../practice-data.js","./practice-data.js")
  .replaceAll("../app.js","./app.js")
  .replaceAll("../styles.css","./styles.css")
  .replaceAll("../og.png","./og.png")
  .replaceAll("./learning.css?v=20261016-a2u1","./learning.css?v=20261016-a2u1")
  .replaceAll("./learning.js?v=20261016-a2u1","./learning.js?v=20261016-a2u1");
 assert.equal(approvedRoot,expected,"Published A2 must match approved preview except the Express link");
 assert.equal(sha(read("backups/index-before-shared-ui-20261016.html")),originalRootSha,
  "Original A2 live index backup missing");
 for(const path of ["learning.js","learning.css","parity.js","parity.css"])
  assert.deepEqual(read(path),read("preview/"+path),"Live UI and tested preview differ: "+path);
 const canonicalBrand=read("ayda-brand.js").toString("utf8");
 assert.ok(canonicalBrand.includes("https://www.aydadil.com/wp-content/uploads/2026/10/ayda-home-v89-baa791945bb954a30b.png"),"Live A2 official logo data missing");
}
console.log("PASS: original A2 course, 24 units, 576 questions, 72 videos, passwords, progress are protected.");
console.log("PASS: shared AYDA A1/B1 design files and safe preview verified.");
// Express: uses the approved A2 dataset and does not duplicate or mutate the course.
for(const file of ["express/index.html","express/express.css","express/express.js","a2-express-shortcut.js"])assert.ok(fs.existsSync(file),"A2 Express file missing: "+file);
const expressHtml=read("express/index.html").toString("utf8");
for(const source of ["../data.js","../practice-data.js","./express.js","./express.css"])assert.ok(expressHtml.includes(source),"Express missing source "+source);
assert.ok(read("express/express.js").toString("utf8").includes("ayda_a2_express_progress_v1"),"Express progress storage must be separate.");
console.log("PASS: A2 Express page references original 576 question dataset and isolated progress.");
