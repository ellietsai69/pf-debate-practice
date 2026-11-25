const boxes=[...document.querySelectorAll('[data-k]')];
const saved=S.get('plan',{});
function draw(){
  const n=boxes.filter(b=>b.checked).length;
  $('#bar').style.width=n/boxes.length*100+'%';
  $('#pct').textContent=`完成 ${n} / ${boxes.length} 項`;
  document.querySelectorAll('.week').forEach(w=>w.classList.toggle('done',[...w.querySelectorAll('[data-k]')].every(b=>b.checked)));
}
boxes.forEach(b=>{b.checked=!!saved[b.dataset.k];b.onchange=()=>{saved[b.dataset.k]=b.checked;S.set('plan',saved);draw()}});
draw();
const next=[...document.querySelectorAll('.week')].find(w=>!w.classList.contains('done'));
if(next)next.open=true;
$('#openall').onclick=e=>{const ws=[...document.querySelectorAll('.week')],o=!ws.every(w=>w.open);ws.forEach(w=>w.open=o);e.target.textContent=o?'全部收起':'全部展開'};
$('#print').onclick=()=>{document.querySelectorAll('.week').forEach(w=>w.open=true);window.print()};
