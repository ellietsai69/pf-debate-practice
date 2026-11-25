const box=$('#game');
let stop=()=>{};

function quiz(data,intro){
  let i=0,ok=0;const order=shuffle(data);
  function show(){
    const d=order[i],fb=el('div',{className:'fb',role:'status'});
    const next=el('button',{className:'go',textContent:i+1<order.length?'下一題':'看結果',disabled:true});
    const opts=el('div',{className:'opts'});
    shuffle(d.o).forEach(t=>{
      const b=el('button',{textContent:t});
      b.onclick=()=>{
        [...opts.children].forEach(x=>{x.disabled=true;if(x.textContent===d.a)x.classList.add('right')});
        const good=t===d.a;
        if(good){ok++;star()}else b.classList.add('wrong');
        fb.textContent=(good?'答對了！⭐ ':'再想想看：')+d.why;
        next.disabled=false;next.focus();
      };
      opts.append(b);
    });
    next.onclick=()=>{
      if(++i<order.length)return show();
      box.replaceChildren(el('h3',{textContent:`完成！答對 ${ok} / ${order.length} 題`}),el('p',{textContent:ok===order.length?'全對！請把其中一題用英文完整講給家人聽。':'挑一題答錯的，大聲說出「因為…」再玩一次。'}),el('button',{className:'go',textContent:'再玩一次',onclick:()=>quiz(data,intro)}));
    };
    const ctx=el('div');(d.ctx||[]).forEach(t=>ctx.append(el('p',{textContent:t})));
    box.replaceChildren(el('p',{className:'small',textContent:`${intro}　第 ${i+1} / ${order.length} 題`}),el('p',{className:'q',textContent:d.q}),ctx,opts,fb,next);
  }
  show();
}

const collapse=[
{q:'Summary 只能留一個論點，留哪一個？',ctx:['A. Phone bans help focus. 對方沒有回應。','B. Phone bans save money. 對方說學校要花錢買鎖袋，你沒有回答。','C. Phone bans improve sleep. 對方說禁令只在白天，你沒有回答。'],o:['A 專心','B 省錢','C 睡眠'],a:'A 專心',why:'A 沒被回應，守起來最穩。接著要說明它為什麼重要。'},
{q:'哪一個值得留下？',ctx:['A. Uniforms look nice.（影響很小）','B. Uniforms reduce bullying. 對方反駁，但你有理由和證據可以守住。','C. Uniforms are cheap. 對方提出數據，你沒有回應。'],o:['A 好看','B 減少霸凌','C 便宜'],a:'B 減少霸凌',why:'B 影響大又守得住。不是沒被攻擊才好，能守住也可以。'},
{q:'時間只剩 60 秒，最好的做法是？',o:['三個論點各講 20 秒','選一個，重講理由並比較','加一個很厲害的新論點'],a:'選一個，重講理由並比較',why:'Collapse 就是放掉次要的，把一個講完整。'},
{q:'對方有一個論點你們完全沒回應，怎麼辦？',o:['假裝沒看到','說「就算那是真的，我們的影響更大，因為…」','開始講新的題目'],a:'說「就算那是真的，我們的影響更大，因為…」',why:'用 even if 比較，比假裝沒有這件事更有說服力。'},
{q:'這個網站教的 Summary 四步順序是？',o:['選→守→攻→比','攻→比→問→選','比→謝謝→選→守'],a:'選→守→攻→比',why:'先選戰場，守住自己，再打對方，最後比較。'}];

const weigh=[
{q:'哪一句是真正的比較？',ctx:['我方：Clean water helps 1,000 families.','對方：New benches help 50 visitors.'],o:['Our argument is very important.','Our impact is larger because 1,000 families is more than 50 visitors.','Clean water helps families.'],a:'Our impact is larger because 1,000 families is more than 50 visitors.',why:'有兩邊、有 because。這是「多大」（magnitude）。'},
{q:'哪一句用了「多可能」？',ctx:['我方有三個城市的實例；對方只說「也許會」。'],o:['Our impact is more likely because it already happened in three cities.','Our impact affects more people.','Our impact happens sooner.'],a:'Our impact is more likely because it already happened in three cities.',why:'有實例支持，比較的是 probability。'},
{q:'哪一句用了「多快」？',o:['Our harm happens this year, while theirs may take ten years.','Our harm is terrible.','Our harm affects the city.'],a:'Our harm happens this year, while theirs may take ten years.',why:'比較兩邊發生的時間，是 timeframe。'},
{q:'哪一句是最好的 even if？',o:['Even if costs rise a little, safety matters more because an injury is harder to fix.','Even if you are wrong, you are wrong.','Even if it rains, vote for us.'],a:'Even if costs rise a little, safety matters more because an injury is harder to fix.',why:'先接受對方一部分，再說明為什麼仍然贏。'},
{q:'“Theirs is bad.” 缺了什麼？',o:['理由和兩邊的比較','更大聲','更難的單字'],a:'理由和兩邊的比較',why:'weighing 不是評價，而是用理由比較。'},
{q:'哪一種說法最有說服力？',ctx:['影響 A：一百萬人，但幾乎不會發生。','影響 B：一百人，而且每天都在發生。'],o:['一定是 A，因為人多','一定是 B，因為常發生','兩邊都能主張，但要說明哪把尺比較重要'],a:'兩邊都能主張，但要說明哪把尺比較重要',why:'尺會互相衝突。你要告訴評審為什麼該用這把尺。'}];

const detective=[
{q:'Final Focus 可以講這句嗎？',ctx:['Summary 說過：Parks improve health because people walk more.','Final Focus：People walk more, so vote for health.'],o:['可以','不行，是新論點'],a:'可以',why:'它延續 Summary 的同一個論點。'},
{q:'Final Focus 可以講這句嗎？',ctx:['Summary 說過：Parks improve health.','Final Focus：Parks also create jobs.'],o:['可以','不行，是新論點'],a:'不行，是新論點',why:'jobs 前面沒出現，評審通常不會算。'},
{q:'Final Focus 可以講這句嗎？',ctx:['Summary 說過：Our harm affects 500 students; theirs affects 20.','Final Focus：Prefer our larger impact.'],o:['可以','不行，是新論點'],a:'可以',why:'Summary 已經比較過人數，這裡是重申。'},
{q:'Final Focus 可以講這句嗎？',ctx:['整場沒有提到任何研究。','Final Focus：A new study says homework causes stress.'],o:['可以','不行，是新證據'],a:'不行，是新證據',why:'最後一篇才拿出新證據，對方可能沒有機會回應。'},
{q:'Final Focus 應該先說什麼？',o:['Vote for us for one reason…','Hello, my favorite color is…','I forgot three points…'],a:'Vote for us for one reason…',why:'第一句就讓評審知道為什麼投你。'}];

const heat=['What is your strongest reason?','What evidence supports that?','Who is helped the most?','Who could be harmed?','Why is your impact more likely?','What if your plan costs too much?','Can you give one real example?','What would the other side say?','Why should we act now?','If you are wrong, what happens?','Which word in the topic matters most?','Does your evidence prove that exact claim?'];
const attacks=['That is too expensive.','It only helps a few people.','It will not work in real life.','Your evidence is too old.','People will not follow the rule.','There is a better solution.','The harm is bigger than the benefit.','That problem is already getting better.'];
const topics=['Schools should ban phones during class.','Every student should learn to cook.','Cities should add more bike lanes.','Schools should have less homework.','Zoos should be replaced by virtual zoos.','Students should grade their teachers.'];

function duel(){
  let front=false,score=0,timer,deck=[];
  const sel=el('select',{id:'topic'},...topics.map(t=>el('option',{textContent:t})));
  const card=el('p',{className:'q',textContent:'按「抽一張」開始'}),c=el('div',{className:'clock',textContent:'20'}),pts=el('span',{className:'stars',textContent:'本回合 0 分'});
  const marks=el('div',{className:'row'}),draw=el('button',{className:'go',textContent:'抽一張'}),mode=el('button',{textContent:'改玩 Frontline（家長攻擊）'});
  const setMarks=d=>[...marks.children].forEach(b=>b.disabled=d);
  [['0 還沒回答',0],['1 有回答',1],['2 有 because',2]].forEach(([t,v])=>marks.append(el('button',{textContent:t,disabled:true,onclick:()=>{clearInterval(timer);score+=v;if(v)star(v);pts.textContent=`本回合 ${score} 分`;setMarks(true)}})));
  draw.onclick=()=>{
    clearInterval(timer);if(!deck.length)deck=shuffle(front?attacks:heat);
    card.textContent=(front?'Attack: ':'Question: ')+deck.pop();
    const end=Date.now()+20000;c.classList.remove('end');c.textContent='20';setMarks(false);
    timer=setInterval(()=>{const s=Math.max(0,Math.ceil((end-Date.now())/1000));c.textContent=s;if(!s){c.classList.add('end');clearInterval(timer)}},200);
  };
  mode.onclick=()=>{front=!front;deck=[];clearInterval(timer);c.textContent='20';c.classList.remove('end');setMarks(true);card.textContent='按「抽一張」開始';mode.textContent=front?'改玩 Crossfire（互問）':'改玩 Frontline（家長攻擊）'};
  stop=()=>clearInterval(timer);
  box.replaceChildren(el('p',{textContent:'兩人玩：先選題目和立場。家長唸卡片，孩子在 20 秒內用英文回答，家長再給分。玩完交換角色！'}),el('label',{htmlFor:'topic',textContent:'題目'}),sel,el('div',{className:'row'},draw,mode,pts),card,c,marks);
}

const speeches={
'Summary 3:00':[180,[[0,'選：This round comes down to one issue…'],[15,'守：They said… That’s wrong because…'],[75,'攻：Their biggest argument fails because…'],[135,'比：Even if they’re right, we still win because…']]],
'Final Focus 2:00':[120,[[0,'一句：Vote for us for one reason…'],[15,'為何：This is still true because…'],[55,'打掉：You can’t vote for them because…'],[80,'比較：Our impact matters more because…']]],
'重講 90 秒':[90,[[0,'同樣內容，刪掉重複的話'],[45,'開始比較影響'],[75,'最後一句：Vote for us because…']]],
'重講 60 秒':[60,[[0,'只留一個論點'],[30,'比較'],[50,'收尾']]]};
function timer(){
  let cur=Object.keys(speeches)[0],left,run=false,h,last,counted=false;
  const tabs=el('div',{className:'tabs'}),c=el('div',{className:'clock'}),cue=el('p',{className:'cue',role:'status'}),go=el('button',{className:'go'}),re=el('button',{textContent:'重設'}),topic=el('p',{className:'q'});
  const nt=()=>{topic.textContent=shuffle(topics.filter(t=>t!==topic.textContent))[0]};nt();
  function draw(){
    const s=Math.ceil(left),[tot,cs]=speeches[cur];
    c.textContent=`${s/60|0}:${String(s%60).padStart(2,'0')}`;
    const show=left<=0?'時間到！說出一個優點、一個要改的地方，再講一次。':cs.filter(x=>x[0]<=tot-left).pop()[1];
    if(cue.textContent!==show)cue.textContent=show;
    c.classList.toggle('end',left<=10);go.textContent=run?'暫停':left<=0?'再講一次':'開始';
  }
  function reset(){clearInterval(h);run=false;left=speeches[cur][0];counted=false;draw()}
  Object.keys(speeches).forEach(k=>{
    const b=el('button',{textContent:k});b.setAttribute('aria-pressed',k===cur);
    b.onclick=()=>{cur=k;[...tabs.children].forEach(x=>x.setAttribute('aria-pressed',x===b));reset()};tabs.append(b);
  });
  go.onclick=()=>{
    if(left<=0)reset();run=!run;clearInterval(h);
    if(run){last=Date.now();h=setInterval(()=>{const n=Date.now();left-=(n-last)/1000;last=n;if(left<=0){left=0;run=false;clearInterval(h);if(!counted){counted=true;star(3)}}draw()},200)}
    draw();
  };
  re.onclick=reset;stop=()=>clearInterval(h);
  box.replaceChildren(el('p',{textContent:'跟著提示講。講完可得 3 顆星；再用 90 秒、60 秒重講。'}),tabs,topic,el('button',{textContent:'換題目',onclick:nt}),c,cue,el('div',{className:'row'},go,re));reset();
}

function puzzle(){
  const right=['Vote for us for one reason: bike lanes save lives.','This is still true because lanes keep cars and bikes apart.','You can’t vote for them because they never showed that losing a few parking spaces hurts people.','Our impact matters more because an injury is harder to fix than a longer walk.'];
  let a;do{a=shuffle(right)}while(a.every((x,i)=>x===right[i]));
  const ol=el('ol',{className:'sort'}),fb=el('div',{className:'fb',role:'status'});let won=false;
  function draw(){
    ol.replaceChildren();
    a.forEach((t,i)=>{
      const mk=(s,d,l)=>{
        const b=el('button',{textContent:s,disabled:i+d<0||i+d>=a.length});b.setAttribute('aria-label',`把第 ${i+1} 句往${l}移`);
        b.onclick=()=>{[a[i],a[i+d]]=[a[i+d],a[i]];draw();const bs=ol.children[i+d].querySelectorAll('button'),w=bs[d<0?0:1];(w.disabled?bs[d<0?1:0]:w).focus()};
        return b;
      };
      ol.append(el('li',{},el('span',{textContent:t}),mk('↑',-1,'上'),mk('↓',1,'下')));
    });
  }
  draw();
  const check=()=>{const n=a.filter((x,i)=>x===right[i]).length;if(n===4&&!won){won=true;star(2)}fb.textContent=n===4?'完成！⭐⭐ 現在不看畫面，自己講一次。':`有 ${n} 句位置正確，再試試！`};
  box.replaceChildren(el('p',{textContent:'把 Final Focus 排成：一句 → 為何 → 打掉 → 比較。'}),ol,el('div',{className:'row'},el('button',{className:'go',textContent:'檢查',onclick:check}),el('button',{textContent:'重新打亂',onclick:puzzle})),fb);
}

const games={collapse:()=>quiz(collapse,'選一個留下'),weigh:()=>quiz(weigh,'影響擂台'),detective:()=>quiz(detective,'新論點偵探'),puzzle,duel,timer};
const btns=[...document.querySelectorAll('[data-g]')];
function start(k){stop();stop=()=>{};btns.forEach(x=>x.setAttribute('aria-pressed',x.dataset.g===k));games[k]()}
let now;
function fromHash(){const k=Object.hasOwn(games,location.hash.slice(1))?location.hash.slice(1):'collapse';if(k!==now){now=k;start(k)}}
btns.forEach(b=>b.onclick=()=>{if(now===b.dataset.g)start(now);else location.hash=b.dataset.g;fromHash()});
addEventListener('hashchange',fromHash);fromHash();
