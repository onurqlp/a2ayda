/* AYDA A2 ana sayfası: reklam içermeyen kurumsal Komple Alıştırmalar geçişi. */
(()=>{"use strict";
const ID="ayda-a2-express-card";
const style=document.createElement("style");style.textContent=`
#${ID}{display:flex;align-items:center;justify-content:space-between;gap:18px;width:100%;margin:19px 0 23px;padding:22px 24px;border:1px solid #dbe3ea;border-left:5px solid #e8c37b;border-radius:14px;background:#fff;color:#142b44;text-decoration:none;box-shadow:0 8px 25px #0b1b310a;transition:box-shadow .15s,border-color .15s}
#${ID}:hover{border-color:#a9bac9;box-shadow:0 12px 30px #0b1b3114}
#${ID}:focus-visible{outline:3px solid #214d75;outline-offset:3px}
#${ID} .express-card-heading{display:block;font-weight:850;font-size:clamp(17px,2vw,20px);color:#102541;line-height:1.3}
#${ID} .express-card-copy{display:block;font-size:13px;color:#536779;margin-top:5px;line-height:1.6}
#${ID} .express-card-go{display:inline-flex;align-items:center;justify-content:center;border-radius:9px;background:#102541;padding:11px 15px;min-height:44px;white-space:nowrap;color:white;font-weight:750;font-size:13px}
@media(max-width:640px){#${ID}{flex-direction:column;align-items:stretch;padding:17px 16px;gap:12px}#${ID} .express-card-go{width:100%}}
@media(prefers-reduced-motion:reduce){#${ID}{transition:none}}
`;document.head.append(style);
function mount(){
 const protectedArea=document.getElementById("aydaProtectedContent");
 if(!protectedArea||getComputedStyle(protectedArea).display==="none")return;
 const hero=document.querySelector("#app .dashboard-hero");
 if(!hero||document.getElementById(ID))return;
 const card=document.createElement("a");card.id=ID;card.href="./express/";
 card.setAttribute("aria-label","A2 Komple Alıştırmalar akıllı çalışma kitabını aç");
 const text=document.createElement("span");const heading=document.createElement("strong");heading.className="express-card-heading";heading.textContent="A2 Komple Alıştırmalar";
 const copy=document.createElement("span");copy.className="express-card-copy";copy.textContent="24 ünite · 576 özgün soru · Türkçe açıklamalar · Cevap kontrolü ve tekrar";
 text.append(heading,copy);
 const go=document.createElement("span");go.className="express-card-go";go.textContent="Çalışmaya başla →";card.append(text,go);
 hero.insertAdjacentElement("afterend",card);
}
let queued=false;
const observer=new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;mount()})});
observer.observe(document.getElementById("aydaProtectedContent")||document.body,{childList:true,subtree:true});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount,{once:true});else mount();
})();