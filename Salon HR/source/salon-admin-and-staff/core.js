{
/* ================= UTILITIES ================= */
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inr=n=>'₹'+Math.round(n||0).toLocaleString('en-IN');
const pad=n=>String(n).padStart(2,'0');
const ymd=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const NOW=new Date();const todayS=ymd(NOW);const curMK=todayS.slice(0,7);
const addMonths=(ds,n)=>{const d=new Date(ds+'T00:00:00');const day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+n);d.setDate(Math.min(day,new Date(d.getFullYear(),d.getMonth()+1,0).getDate()));return ymd(d)};
const addDays=(ds,n)=>{const d=new Date(ds+'T00:00:00');d.setDate(d.getDate()+n);return ymd(d)};
const fdate=ds=>ds?new Date(ds+'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}):'—';
const fdt=iso=>iso?new Date(iso).toLocaleString('en-IN',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}):'—';
const mname=mk=>{const[y,m]=mk.split('-').map(Number);return new Date(y,m-1,1).toLocaleString('en-IN',{month:'long',year:'numeric'})};
const mshort=mk=>{const[y,m]=mk.split('-').map(Number);return new Date(y,m-1,1).toLocaleString('en-IN',{month:'short'})};
const toMin=t=>{if(!t)return null;const[h,m]=t.split(':').map(Number);return h*60+m};
const fromMin=m=>m==null?'—':pad(Math.floor(m/60)%24)+':'+pad(m%60);
const hm=m=>{m=Math.max(0,Math.round(m||0));return Math.floor(m/60)+'h '+pad(m%60)+'m'};
const nowHM=()=>pad(new Date().getHours())+':'+pad(new Date().getMinutes());
const uid=p=>p+Date.now().toString(36).slice(-4)+Math.random().toString(36).slice(2,6);
const daysIn=mk=>{const[y,m]=mk.split('-').map(Number);return new Date(y,m,0).getDate()};
const dates=mk=>Array.from({length:daysIn(mk)},(_,i)=>mk+'-'+pad(i+1));
const dow=ds=>new Date(ds+'T00:00:00').getDay();
const DOW=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const mkShift=(mk,n)=>{const[y,m]=mk.split('-').map(Number);const d=new Date(y,m-1+n,1);return ymd(d).slice(0,7)};
const hash=s=>{let h1=0xdeadbeef,h2=0x41c6ce57;for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);h1=Math.imul(h1^c,2654435761);h2=Math.imul(h2^c,1597334677)}h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return((h2>>>0).toString(16).padStart(8,'0')+(h1>>>0).toString(16).padStart(8,'0')).toUpperCase()};
const mask=(v,k=4)=>{v=String(v||'');return v.length>k?'X'.repeat(Math.min(8,v.length-k))+v.slice(-k):v};
function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

/* ================= STATE ================= */
const KEY='salonhr-platform-v1';
let S=null;
try{S=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){S=null}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const FILES={}; // in-memory previews of uploaded files (not persisted)

function seed(){
  const r=rng(11);
  const st={v:7,
    settings:{salon:'Aura Salon & Spa',legal:'Aura Beauty Services Pvt. Ltd.',address:'Shop 4, Link Road, Andheri West, Mumbai 400053',city:'Mumbai',state:'Maharashtra',reg:'CIN U93020MH2021PTC000000 (sample)',
      owner:'Neha Kapoor',ownerTitle:'Director',phone:'+91 98200 00000',
      pf:true,esi:true,pfCeil:25000,esiCeil:21000,minWage:0,ptFlat:200,
      graceMin:15,mealMin:30,otBlock:30,fullDayMin:420,halfDayMin:240,latesPerHalf:3,
      noticeProb:7,noticeConf:30,probationM:3,
      bgv:false,
      holidays:[{date:'2026-01-26',name:'Republic Day'},{date:'2026-05-01',name:'Maharashtra Day'},{date:'2026-08-15',name:'Independence Day'},{date:'2026-10-02',name:'Gandhi Jayanti'}],
      leave:{CL:7,SL:7},
      leaveTypes:[{code:'CL',name:'Casual leave',days:7,paid:true,half:true,carry:false,encash:false},{code:'SL',name:'Sick leave',days:7,paid:true,half:true,carry:false,encash:false},{code:'EL',name:'Annual (earned) leave',days:15,paid:true,half:true,carry:true,encash:true}],
      incFull:100,incHalf:80,refsReq:1,keepMonths:3,archiveYears:5,
      depts:['Hair','Skin','Nails','Makeup','Spa','Front Desk','Housekeeping','Management'],
      designations:['Helper','Gents Hair Dresser (GHD)','Sr. Gents Hair Dresser (Sr. GHD)','Unisex Hair Dresser (UHD)','Sr. Unisex Hair Dresser (Sr. UHD)','Hair Colourist','Beautician','Sr. Beautician','Nail Artist','Makeup Artist','Spa Therapist','Receptionist / Front Desk','Salon Floor Manager','Asst. Salon Manager','Salon Manager','Housekeeping'],
      bgvPkgs:[{id:'essential',name:'Essential',desc:'Identity (Aadhaar/PAN) + current address',price:499},{id:'standard',name:'Standard',desc:'Essential + 2 previous employers + highest education',price:1199},{id:'complete',name:'Comprehensive',desc:'Standard + court-record check + police verification assistance',price:1999}],
      checklist:['Client notes & appointments handed over','Salon data deleted from personal devices','Advances / dues settled'],
      exitQs:['Main reason for leaving','What did you like most about working here?','What could the salon improve?','Were you treated fairly by your manager?','Would you recommend the salon as a workplace? (Yes/No)','Would you consider returning in future?'],
      clauses:{},form:null},
    shifts:[{id:'s1',name:'Morning',start:'10:00',end:'18:30'},{id:'s2',name:'Mid',start:'11:00',end:'19:30'},{id:'s3',name:'Late',start:'12:30',end:'21:00'}],
    branches:[{id:'b1',name:'Andheri West',address:'Shop 4, Link Road, Andheri West, Mumbai 400053'},{id:'b2',name:'Bandra West',address:'12 Hill Road, Bandra West, Mumbai 400050'}],
    users:[{id:'m1',name:'Ritu Shah',phone:'+91 9811111111',title:'Branch Manager',branchIds:['b1'],perms:{staff:true,attendance:true,roster:true,leave:true,targets:true,docs:false,exits:true,helpdesk:true}},{id:'m2',name:'Arjun Rao',phone:'+91 9822222222',title:'Branch Manager',branchIds:['b2'],perms:{staff:false,attendance:true,roster:true,leave:true,targets:true,docs:false,exits:true,helpdesk:true}}],
    roster:{},changeReqs:[],pays:{},policies:null,
    employees:[],att:{},leaves:[],perf:{},payroll:{},adj:{},docs:[],seps:[],tickets:[],audit:[],acks:{},bgv:[],notes:[],
    ui:{role:'owner',user:null,branch:'all',view:'dashboard',tab:{},date:todayS,mk:curMK,week:null}};
  const m0=mkShift(curMK,-4);
  const base=[
    ['Priya Sharma','F','Sr. Unisex Hair Dresser (Sr. UHD)','Hair','s2',2,32000,150000,8,10,'2024-03-11','Permanent'],
    ['Rahul Verma','M','Gents Hair Dresser (GHD)','Hair','s1',2,22000,100000,8,10,'2025-01-06','Permanent'],
    ['Sneha Patil','F','Beautician','Skin','s1',2,18000,80000,6,10,'2025-06-02','Permanent'],
    ['Imran Shaikh','M','Nail Artist','Nails','s3',2,16000,60000,6,10,m0+'-01','Probation'],
    ['Anjali Desai','F','Receptionist / Front Desk','Front Desk','s1',1,15000,0,0,5,'2023-11-20','Permanent'],
    ['Kavya Nair','F','Makeup Artist','Makeup','s2',2,26000,120000,8,10,addDays(todayS,-5),'Probation'],
    ['Deepa Rao','F','Beautician','Skin','s1',2,17000,70000,6,10,'2025-02-10','Permanent'],
    ['Vikram Singh','M','Unisex Hair Dresser (UHD)','Hair','s2',2,20000,90000,8,10,'2024-06-01','Permanent']];
  base.forEach((b,i)=>{
    const [name,g,des,dept,sh,wo,gross,target,comm,pc,doj,type]=b;
    const e={id:'e'+(i+1),code:'AUR'+pad(i+1).padStart(3,'0'),name,gender:g,designation:des,dept,branchId:['b1','b1','b2','b2','b1','b2','b1','b2'][i],shiftId:sh,weeklyOff:wo,gross,target,comm,prodComm:pc,doj,type,
      phone:'+91 9'+String(8000000000+i*1234567).slice(1),email:name.split(' ')[0].toLowerCase()+'@example.com',
      status:'active',pf:true,esi:gross<=21000,uan:'1012'+pad(i+31)+'4567'+pad(i),esic:gross<=21000?'31-00-12345'+pad(i):'',
      lb:{CL:7-Math.floor(r()*3),SL:7-Math.floor(r()*2),EL:Math.floor(4+r()*8)},onb:null,refs:[],lwd:null,custom:{},pay:{upi:name.split(' ')[0].toLowerCase()+'@okhdfcbank',qr:null},
      assets:[['Uniform set',2,1200],['Tool kit (scissors, combs, brushes)',1,3500],['ID card',1,100],['Locker key',1,200]].map((a,j)=>({id:'a'+i+j,name:a[0],qty:a[1],value:a[2],issuedOn:doj,status:'issued'}))};
    e.onb={status:'verified',submittedAt:e.doj+'T10:00:00',data:{dob:'1996-0'+(i+1)+'-1'+i,father:'—',address:'Mumbai, Maharashtra',aadhaar:'XXXXXXXX'+(4321+i),pan:'ABCDE'+(1234+i)+'F',bank:'HDFC Bank',acct:'50100'+(123456789+i),ifsc:'HDFC0001234',edu:'12th + Salon academy certificate',emName:'Family member',emPhone:'+91 98xxxxxx'+i,nominee:'Family member'},docs:['Aadhaar','PAN','Bank proof','Photo']};
    e.refs=[{org:'Previous salon',role:'Stylist',from:'2021',to:'2023',contact:'Manager',phone:'+91 99xxxxxx1'+i,status:'Verified',note:'Confirmed tenure & conduct'},{org:'Earlier salon',role:'Trainee',from:'2019',to:'2021',contact:'Owner',phone:'+91 99xxxxxx2'+i,status:'Verified',note:'Confirmed'}];
    st.employees.push(e);
  });
  const exA=st.employees[6],exB=st.employees[7];exA.lwd=addDays(todayS,-55);exB.lwd=m0+'-10';[exA,exB].forEach(x=>{x.status='exited';x.exitedOn=x.lwd;x.assets.forEach(a=>{a.status='approved';a.by='Neha Kapoor (Owner)'})});
  const kav=st.employees[5];kav.status='onboarding';kav.onb={status:'pending',data:{},docs:[]};kav.refs=[];kav.uan='';kav.esic='';kav.pay={upi:'',qr:null};kav.assets=[];
  // attendance
  const firstDay=m0+'-01';
  st.employees.forEach((e,ei)=>{
    const sh=st.shifts.find(s=>s.id===e.shiftId);const S0=toMin(sh.start),E0=toMin(sh.end);
    for(let ds=e.doj>firstDay?e.doj:firstDay;ds<todayS&&(!e.lwd||ds<=e.lwd);ds=addDays(ds,1)){
      const hol=st.settings.holidays.some(h=>h.date===ds);
      if(dow(ds)===e.weeklyOff||hol)continue;
      const x=r();
      if(x<0.035)continue; // absent
      if(x<0.07){st.leaves.push({id:uid('l'),empId:e.id,type:r()<.5?'CL':'SL',from:ds,to:ds,half:false,reason:'Personal',status:'approved',appliedOn:addDays(ds,-2),decidedOn:addDays(ds,-1)});continue}
      let inM=S0-10+Math.floor(r()*22);if(r()<0.1)inM=S0+16+Math.floor(r()*30);
      const mo=S0+210+Math.floor(r()*80);const mi=mo+30+(r()<0.08?12:0);
      let out=E0-4+Math.floor(r()*14);if(r()<0.22)out=E0+30+Math.floor(r()*4)*30+Math.floor(r()*10);
      if(r()<0.025)out=inM+290;
      const rec={in:fromMin(inM),mealOut:fromMin(mo),mealIn:fromMin(mi),out:fromMin(out),src:'App · geo-fence OK'};
      const ageDays=(new Date(todayS)-new Date(ds))/864e5;
      if(out-inM-30-(E0-S0-30)>=30){ if(ageDays>6) rec.otDecision=r()<0.85?'approved':'denied'; }
      (st.att[e.id]=st.att[e.id]||{})[ds]=rec;
    }
  });
  // one missed punch (current month) for Rahul
  const mp=addDays(todayS,-3);if(st.att.e2&&st.att.e2[mp]){delete st.att.e2[mp].out;delete st.att.e2[mp].otDecision}
  // performance
  st.employees.forEach(e=>{
    st.perf[e.id]={};
    for(let k=-4;k<=0;k++){const mk=mkShift(curMK,k);if(e.doj.slice(0,7)>mk||(e.lwd&&e.lwd.slice(0,7)<mk))continue;
      const f=k===0?(NOW.getDate()/daysIn(mk)):1;
      const svc=e.target?Math.round(e.target*(0.7+r()*0.55)*f/100)*100:0;
      st.perf[e.id][mk]={target:e.target,service:svc,product:Math.round((3000+r()*15000)*f/100)*100,final:k<0};}
  });
  // pending leave, resignation, ticket
  st.leaves.push({id:uid('l'),empId:'e3',type:'CL',from:addDays(todayS,3),to:addDays(todayS,4),half:false,reason:'Sister\'s wedding in Pune',status:'pending',appliedOn:addDays(todayS,-1)});
  st.seps.push({id:uid('sp'),empId:'e4',type:'resignation',status:'submitted',submittedOn:addDays(todayS,-2),reasonCat:'Better opportunity',reason:'Got an offer closer to home in Thane.',reqLWD:addDays(todayS,5),timeline:[{at:addDays(todayS,-2)+'T19:10:00',by:'Imran Shaikh',text:'Resignation submitted via HRMS'}],checklist:{},exit:null,fnf:null});
  st.tickets.push({id:'T-1001',empId:'e2',cat:'Overtime',subject:'OT on a Saturday last month not paid',status:'open',level:'Owner',createdAt:addDays(todayS,-1)+'T21:05:00',msgs:[{from:'e2',at:addDays(todayS,-1)+'T21:05:00',text:'I stayed 1.5 hours extra for a bridal booking but the OT is not showing in my payslip.'}]});
  return st;
}

/* ================= CALCULATIONS ================= */
const E=id=>S.employees.find(e=>e.id===id);
const shiftOf=e=>S.shifts.find(s=>s.id===e.shiftId)||S.shifts[0];
const rosterOf=(e,ds)=>(S.roster[e.id]||{})[ds];
const shiftFor=(e,ds)=>{const r=rosterOf(e,ds);return(r&&r!=='OFF'&&S.shifts.find(s=>s.id===r))||shiftOf(e)};
const offFor=(e,ds)=>{const r=rosterOf(e,ds);return r?r==='OFF':dow(ds)===e.weeklyOff};
const LT=()=>S.settings.leaveTypes;const ltype=c=>LT().find(t=>t.code===c);const lname=c=>c==='LOP'?'Leave without pay':(ltype(c)||{name:c}).name;
const lpaid=c=>c!=='LOP'&&(!ltype(c)||ltype(c).paid);
const BR=id=>S.branches.find(b=>b.id===id)||{name:'—',address:''};const bn=e=>BR(e.branchId).name;
const user=()=>S.ui.user&&S.ui.user!=='owner'?S.users.find(u=>u.id===S.ui.user):null;
const isBoss=()=>S.ui.user==='owner';
const can=p=>isBoss()||!!(user()&&user().perms[p]);
const myBranches=()=>{const u=user();return u?S.branches.filter(b=>u.branchIds.includes(b.id)):S.branches};
const inScope=e=>{const u=user();if(u&&!u.branchIds.includes(e.branchId))return false;const bf=S.ui.branch||'all';return bf==='all'||e.branchId===bf};
const SE=()=>S.employees.filter(inScope);
const isHol=ds=>S.settings.holidays.find(h=>h.date===ds);
const rec=(id,ds)=>(S.att[id]||{})[ds];
const setRec=(id,ds,r)=>{(S.att[id]=S.att[id]||{})[ds]=r};
const leaveOn=(id,ds)=>S.leaves.find(l=>l.empId===id&&l.status==='approved'&&l.from<=ds&&l.to>=ds);
const STL={P:'Present',HD:'Half day',A:'Absent',L:'Paid leave',HL:'Half-day leave',LOP:'Unpaid leave',WO:'Weekly off',H:'Holiday',MP:'Missed punch',IN:'Working',F:'Upcoming','—':'Not punched',NJ:'Not joined',EX:'Exited'};
const STC={P:'c-ok',HD:'c-warn',A:'c-bad',L:'c-info',HL:'c-info',LOP:'c-bad',WO:'',H:'c-b',MP:'c-bad',IN:'c-ok',F:'','—':'',NJ:'',EX:''};
const PAIDV={P:1,HD:.5,HL:1,L:1,WO:1,H:1,LOP:0,A:0,MP:0,IN:1,F:1,'—':1,NJ:0,EX:0};

function day(e,ds){
  const sh=shiftFor(e,ds),r=rec(e.id,ds)||{},st=S.settings;
  const start=toMin(sh.start),end=toMin(sh.end),expected=end-start-st.mealMin;
  const o={ds,r,sh,expected,worked:0,late:0,meal:0,ot:0,status:'',flags:[],otDecision:null};
  if(ds<e.doj){o.status='NJ';return o}
  if(e.lwd&&ds>e.lwd){o.status='EX';return o}
  const lv=leaveOn(e.id,ds),off=offFor(e,ds)||!!isHol(ds);
  if(r.in){
    const inM=toMin(r.in);const lb=inM-start;o.late=lb>st.graceMin?lb:0;
    if(r.out){
      let meal=st.mealMin;
      if(r.mealOut&&r.mealIn){const a=toMin(r.mealIn)-toMin(r.mealOut);meal=Math.max(st.mealMin,a);if(a>st.mealMin+5)o.flags.push('Long break '+a+'m')}
      else o.flags.push('No meal punch (30m deducted)');
      o.meal=meal;o.worked=Math.max(0,toMin(r.out)-inM-meal);
      if(off){o.ot=Math.floor(o.worked/st.otBlock)*st.otBlock;o.flags.push('Worked on '+(isHol(ds)?'holiday':'weekly off'));o.late=0}
      else{const x=o.worked-expected;o.ot=x>=st.otBlock?Math.floor(x/st.otBlock)*st.otBlock:0}
      o.status=o.worked>=st.fullDayMin?'P':o.worked>=st.halfDayMin?'HD':'A';
      if(off)o.status=offFor(e,ds)?'WO':'H';
      if(lv&&lv.half&&lpaid(lv.type)&&o.status==='HD')o.status='HL';
      if(r.reg)o.flags.push('Regularised');
    }else o.status=ds<todayS?'MP':'IN';
    if(o.ot)o.otDecision=r.otDecision||'pending';
  }else if(lv)o.status=lv.half?'HD':(lpaid(lv.type)?'L':'LOP');
  else if(isHol(ds))o.status='H';
  else if(offFor(e,ds))o.status='WO';
  else o.status=ds>todayS?'F':(ds===todayS?'—':'A');
  if(lv)o.leave=lv;
  return o;
}
function msum(e,mk){
  const s={days:daysIn(mk),paid:0,P:0,HD:0,A:0,L:0,LOP:0,WO:0,H:0,MP:0,late:0,otApproved:0,otPending:0,otDenied:0,worked:0,pend:[],mps:[],projected:0};
  dates(mk).forEach(ds=>{const o=day(e,ds);let v=PAIDV[o.status]??0;
    s.paid+=v;if(['F','—','IN'].includes(o.status))s.projected++;
    if(s[o.status]!=null&&typeof s[o.status]==='number')s[o.status]++;
    if(o.late)s.late++;s.worked+=o.worked;
    if(o.ot){if(o.otDecision==='approved')s.otApproved+=o.ot;else if(o.otDecision==='denied')s.otDenied+=o.ot;else{s.otPending+=o.ot;s.pend.push(ds)}}
    if(o.status==='MP')s.mps.push(ds)});
  return s;
}
function structure(g){const b=Math.round(g*.5),h=Math.round(g*.2);return{basic:b,hra:h,spl:g-b-h}}
function pt(g,gender,mk){const m=+mk.slice(5),st=S.settings.state;
  switch(st){
    case'Maharashtra':if(gender==='F')return g>25000?(m===2?300:200):0;return g>10000?(m===2?300:200):g>7500?175:0;
    case'Karnataka':return g>=25000?200:0;
    case'Telangana':return g>20000?200:g>15000?150:0;
    case'Gujarat':return g>=12000?200:0;
    case'West Bengal':return g>40000?200:g>25000?150:g>15000?130:g>10000?110:0;
    case'Delhi':case'Uttar Pradesh':case'Haryana':case'Rajasthan':case'Goa (not levied)':return 0;
    default:return g>=15000?S.settings.ptFlat:0}}
function payCalc(e,mk){
  const st=S.settings,sm=msum(e,mk),n=sm.days,str=structure(e.gross);
  const latePen=Math.floor(sm.late/st.latesPerHalf)*0.5;
  const paid=Math.max(0,sm.paid-latePen),f=paid/n;
  const eb=Math.round(str.basic*f),eh=Math.round(str.hra*f),es=Math.round(str.spl*f);
  const hourly=e.gross/(26*8);
  const otPay=Math.round(sm.otApproved/60*hourly*2);
  const p=(S.perf[e.id]||{})[mk]||{};
  const target=p.target??e.target,svc=p.service||0,prod=p.product||0,ach=target?svc/target:0;
  const rate=target?(ach>=st.incFull/100?e.comm:ach>=st.incHalf/100?e.comm/2:0):0;
  const inc=Math.round(svc*rate/100),pinc=Math.round(prod*(e.prodComm||0)/100);
  const gross=eb+eh+es+otPay+inc+pinc;
  const excl=gross-eb,wages=Math.round(eb+Math.max(0,excl-gross*.5));
  let pfEE=0,pfER=0,eps=0,adm=0,edli=0;
  if(st.pf&&e.pf){const w=Math.min(wages,st.pfCeil);pfEE=Math.round(w*.12);eps=Math.round(w*.0833);pfER=Math.round(w*.12);adm=Math.round(w*.005);edli=Math.round(w*.005)}
  let esiEE=0,esiER=0;if(st.esi&&e.esi&&e.gross<=st.esiCeil){esiEE=Math.ceil(gross*.0075);esiER=Math.ceil(gross*.0325)}
  const ptx=pt(gross,e.gender,mk);
  const a=(S.adj[mk]||{})[e.id]||{};const adv=+a.adv||0,oth=+a.oth||0,tds=+a.tds||0;
  const ded=pfEE+esiEE+ptx+adv+oth+tds;
  const warn=[];if(ded>gross*.5)warn.push('Deductions exceed 50% of wages (Code on Wages limit)');
  if(st.minWage&&e.gross<st.minWage)warn.push('Fixed pay below the minimum wage set in Settings');
  return{empId:e.id,name:e.name,code:e.code,designation:e.designation,days:n,paidDays:paid,latePen,lates:sm.late,lop:+(n-paid).toFixed(1),
    basic:eb,hra:eh,spl:es,otMin:sm.otApproved,otPay,target,svc,prod,ach,inc,pinc,gross,wages,pfEE,pfER,eps,adm,edli,esiEE,esiER,pt:ptx,adv,oth,tds,ded,net:gross-ded,
    cost:gross+pfER+adm+edli+esiER,warn,projected:sm.projected,fixed:e.gross}
}
const inMonth=(e,mk)=>e.doj<=mk+'-'+pad(daysIn(mk))&&(!e.lwd||e.lwd>=mk+'-01');
function payChecks(mk){
  const emps=S.employees.filter(e=>inMonth(e,mk));const c={ot:[],mp:[],lv:[],perf:[],adj:[]};
  emps.forEach(e=>{const s=msum(e,mk);s.pend.forEach(ds=>c.ot.push({e,ds}));s.mps.forEach(ds=>c.mp.push({e,ds}));
    const p=(S.perf[e.id]||{})[mk];if(e.target&&!(p&&p.final))c.perf.push(e)});
  S.leaves.filter(l=>l.status==='pending'&&(l.from.slice(0,7)===mk||l.to.slice(0,7)===mk)).forEach(l=>c.lv.push(l));
  c.ok=!c.ot.length&&!c.mp.length&&!c.lv.length&&!c.perf.length;c.emps=emps;return c;
}
function finalize(mk,by,silent){
  const rows=S.employees.filter(e=>inMonth(e,mk)).map(e=>payCalc(e,mk));
  S.payroll[mk]={status:'finalized',at:new Date().toISOString(),by,rows};
  if(!silent)audit('Payroll finalised for '+mname(mk)+' · '+rows.length+' payslips released');
}
function audit(text,who){S.audit.unshift({at:new Date().toISOString(),by:who||actorName(),text});if(S.audit.length>300)S.audit.length=300}
function actorName(){if(S.ui.role!=='owner')return(E(S.ui.role)||{}).name||'System';const u=user();return u?u.name+' ('+u.title+')':S.settings.owner+' (Owner)'}

