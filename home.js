const LV=[[0,'新手發言人'],[10,'反駁小將'],[30,'Summary 高手'],[60,'Final Focus 高手'],[100,'舞台傳奇']];
const st=S.get('stars',0),li=LV.findLastIndex(x=>st>=x[0]),nx=LV[li+1];
$('#lv').textContent=li+1;$('#lvname').textContent=LV[li][1];
$('#lvnext').textContent=nx?`再 ${nx[0]-st} 顆升到「${nx[1]}」`:'最高等級！';
$('#lvbar').style.width=(nx?(st-LV[li][0])/(nx[0]-LV[li][0])*100:100)+'%';
const pd=S.get('plan',{});let found=false;
document.querySelectorAll('#map li').forEach(x=>{const w=x.dataset.w,d=['a','b','c'].every(k=>pd[w+k]);x.classList.toggle('done',d);if(d)x.querySelector('b').textContent='✓';else if(!found){found=true;x.classList.add('now');x.querySelector('a').setAttribute('aria-current','step')}});
