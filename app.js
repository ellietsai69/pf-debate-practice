// 所有紀錄只存在這個瀏覽器，不會送到任何地方
const S={get(k,d){try{const v=JSON.parse(localStorage.getItem('pf.'+k));return v??d}catch{return d}},set(k,v){try{localStorage.setItem('pf.'+k,JSON.stringify(v));return true}catch{return false}}};
const $=(s,r=document)=>r.querySelector(s);
const el=(t,p={},...k)=>{const e=document.createElement(t);Object.assign(e,p);e.append(...k);return e};
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
function star(n=1){S.set('stars',S.get('stars',0)+n);showStars()}
function showStars(){document.querySelectorAll('[data-stars]').forEach(e=>e.textContent=S.get('stars',0))}
showStars();
