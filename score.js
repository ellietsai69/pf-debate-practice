const qs=['Summary：只留 1–2 點','Summary：回應了對方的攻擊','Summary：有比較影響（weighing）','Final Focus：一句話說出為何贏','Final Focus：沒有新論點','Final Focus：和 Summary 一致'];
qs.forEach((q,i)=>{
  const s=el('select',{id:'q'+i},...['0 還沒做到','1 做到一半','2 做到了'].map((t,v)=>el('option',{value:v,textContent:t})));
  s.onchange=tot;
  $('#qs').append(el('p',{},el('label',{htmlFor:'q'+i,textContent:q}),s));
});
function tot(){const t=qs.reduce((a,_,i)=>a+ +$('#q'+i).value,0);$('#tot').textContent=t;return t}
tot();
function list(key,id,fmt){
  const a=S.get(key,[]),u=$(id);u.replaceChildren();
  if(!a.length)u.append(el('li',{textContent:'還沒有紀錄'}));
  a.forEach((x,i)=>{
    const b=el('button',{textContent:'刪除'});let arm=false;
    b.onclick=()=>{if(!arm){arm=true;b.textContent='再按一次刪除';return}a.splice(i,1);S.set(key,a);list(key,id,fmt)};
    u.append(el('li',{},fmt(x)+' ',b));
  });
}
const fs=x=>`第 ${x.w} 週：${x.t} / 12 分`;
const fm=x=>`【${x.a}】${x.b} → 下次說：「${x.c}」`;
for(let i=1;i<=12;i++)$('#wk').append(el('option',{value:i,textContent:`第 ${i} 週`}));
$('#save').onclick=()=>{
  const a=S.get('scores',[]).filter(x=>x.w!=$('#wk').value);
  a.push({w:+$('#wk').value,t:tot()});a.sort((x,y)=>x.w-y.w);
  const ok=S.set('scores',a);list('scores','#scores',fs);
  $('#msg').textContent=ok?'已存在這個瀏覽器':'這個瀏覽器不允許儲存';
};
$('#mf').onsubmit=e=>{
  e.preventDefault();
  const a=S.get('errs',[]);a.unshift({a:$('#ma').value,b:$('#mb').value,c:$('#mc').value});
  S.set('errs',a);e.target.reset();list('errs','#errs',fm);
};
list('scores','#scores',fs);list('errs','#errs',fm);
