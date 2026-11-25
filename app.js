// 所有紀錄只存在這個瀏覽器，不會送到任何地方
const S={get(k,d){try{const v=JSON.parse(localStorage.getItem('pf.'+k));return v??d}catch{return d}},set(k,v){try{localStorage.setItem('pf.'+k,JSON.stringify(v));return true}catch{return false}}};
const $=(s,r=document)=>r.querySelector(s);
const el=(t,p={},...k)=>{const e=document.createElement(t);Object.assign(e,p);e.append(...k);return e};
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
function star(n=1){S.set('stars',S.get('stars',0)+n);showStars();confetti(n)}
function showStars(){document.querySelectorAll('[data-stars]').forEach(e=>e.textContent=S.get('stars',0))}
showStars();
// 答對特效（尊重「減少動態效果」設定）
function confetti(n){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches||!document.body.animate)return;
  const r=$('#game')?.getBoundingClientRect(),x=r?r.left+r.width/2:innerWidth/2,y=Math.max(90,Math.min(innerHeight*.5,r?r.top+120:300));
  for(let i=0;i<14+n*8;i++){
    const b=el('i',{className:'bit',ariaHidden:'true'});b.style.cssText=`left:${x}px;top:${y}px;background:${['#ffd84d','#35c4c0','#ff7fa8','#a98bff'][i%4]}`;document.body.append(b);
    const a=Math.random()*6.28,d=80+Math.random()*190,q=b.animate([{transform:'none',opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d+90}px) rotate(${Math.random()*720}deg)`,opacity:0}],{duration:900,easing:'cubic-bezier(.1,.7,.4,1)'});
    q.onfinish=()=>b.remove();
  }
}
