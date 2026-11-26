function boot(){
if(!S||S.v!==7){S=seed();S.settings.form=defaultForm();S.policies=JSON.parse(JSON.stringify(POLICIES));for(let k=-4;k<0;k++){const mk=mkShift(curMK,k);
  // seed safety: decide any leftover OT
  S.employees.forEach(e=>dates(mk).forEach(ds=>{const o=day(e,ds);if(o.ot&&o.otDecision==='pending')o.r.otDecision='approved';if(o.status==='MP')o.r.out=o.sh.end}));
  finalize(mk,'Neha Kapoor (Owner)',true);}
  // seed docs
  S.employees.forEach(e=>{if(e.status==='active'){['appointment','nda','handbook'].forEach(t=>{const d=makeDoc(t,e,{},true);d.status='completed';
    const at=e.doj+'T11:00:00';d.created=at;d.signs={employer:{name:S.settings.owner,at,method:'Typed + OTP'},employee:{name:e.name,at:e.doj+'T12:30:00',method:'Typed + OTP'}};d.audit=[{at,text:'Created & signed by employer'},{at:e.doj+'T12:30:00',text:'Signed by employee (OTP verified)'}];});S.acks[e.id]=e.doj}});
  ['e7','e8'].forEach(id=>{const e=E(id);['appointment','relieving','experience'].forEach(t=>{const d=makeDoc(t,e,{lwd:e.lwd,type:'resignation',conduct:'good'},true);d.status='completed';d.created=t==='appointment'?e.doj+'T11:00:00':e.lwd+'T18:00:00';d.signs={employer:{name:S.settings.owner,at:d.created,method:'Typed + OTP'}};if(t==='appointment')d.signs.employee={name:e.name,at:d.created,method:'Typed + OTP'}});
    S.seps.push({id:uid('sp'),empId:id,type:'resignation',status:'closed',submittedOn:addDays(e.lwd,-30),lwd:e.lwd,reasonCat:'Relocation',reason:'Moving to another city.',timeline:[{at:addDays(e.lwd,-30)+'T10:00:00',by:e.name,text:'Resignation submitted via HRMS'},{at:e.lwd+'T18:00:00',by:'Neha Kapoor (Owner)',text:'F&F paid; relieving letter and experience certificate issued'}],checklist:{},clearance:{by:'Neha Kapoor (Owner)',at:e.lwd+'T17:00:00'},fnf:{lines:[['Salary & leave encashment',e.gross*0.6]],net:Math.round(e.gross*0.6),due:addDays(e.lwd,2),paid:e.lwd,ref:'Bank transfer (seed)'}})});
  makeDoc('appointment',E('e6'),{},true);
  vwhSeed();runRetention();save();
}

}
boot();render();

/* ================= PLATFORM INTEGRATION (salon admin + staff) ================= */
const norm10=p=>String(p||'').replace(/\D/g,'').slice(-10);
PLATFORM.apps.hrms={
  show(mode){closeModal();window.EMP_MODE=mode==='staff';document.getElementById('hrms-root').classList.toggle('emp',window.EMP_MODE);
    if(!window.EMP_MODE&&S.ui.role!=='owner'){S.ui.role='owner';S.ui.view='dashboard'}render();document.title=window.EMP_MODE?'Salon HR — Staff':'Salon HR — Salon admin';scrollTo(0,0)},
  support(name){S.ui.user='owner';S.ui.role='owner';S.ui.support=name;S.ui.view='dashboard';audit('Salon HR support session started','Salon HR support · '+name);save()},
  stats(){const act=S.employees.filter(e=>e.status!=='exited');return{staff:act.length,branches:S.branches.length,branchList:S.branches.map(b=>({name:b.name,address:b.address})),managers:S.users.map(u=>({name:u.name,phone:norm10(u.phone),branch:u.branchIds.map(b=>BR(b).name).join(', ')}))}},
  findByMobile(m){return S.employees.find(e=>norm10(e.phone)===norm10(m))||null}
};
PLATFORM.on('vwhShare',d=>{const e=PLATFORM.apps.hrms.findByMobile(d.mobile);if(!e||!e.vwh||e.vwh.withdrawnAt)return;e.vwh.shares=e.vwh.shares||[];e.vwh.shares.unshift({id:d.ref,to:d.to,why:d.why,at:todayS+'T'+nowHM()+':00',status:'pending'});save()});
ACT.endSupport=()=>{audit('Salon HR support session ended','Salon HR support · '+S.ui.support);S.ui.support=null;S.ui.user=null;save();location.hash='app-console'};
VIEWS.mysvc=()=>{const c=PLATFORM.apps.console,t=c&&c.tenant('AURA01');if(!t)return head('Salon HR plan & partner','')+'<div class="card"><div class="empty">Not available right now.</div></div>';
  const own=t.svcAll.filter(s=>t.services.includes(s[0])),oth=t.svcAll.filter(s=>!t.services.includes(s[0]));
  return head('Salon HR plan & partner',`${esc(t.plan.name)} plan · Salon ID AURA01`)+`<div class="grid g2"><div class="card"><h2>Your services</h2><div class="list" style="margin-top:6px">${own.map(s=>`<div><span class="sp">${esc(s[1])}</span>${chip('Active','c-ok')}</div>`).join('')}</div>
  <h3 style="margin-top:16px">Add more services</h3><p class="small muted">Your HR partner confirms pricing and switches it on.</p><div class="list">${oth.map(s=>{const r=t.reqs.find(x=>x.title==='Add '+s[1]&&x.status!=='Resolved');return`<div><span class="sp">${esc(s[1])}</span>${r?chip('Requested','c-warn'):`<button class="btn s" data-act="svcReq" data-s="${esc(s[1])}">Request</button>`}</div>`}).join('')}</div></div>
  <div><div class="card"><h2>Your HR partner</h2>${t.partner?`<p class="b" style="margin-top:6px">${esc(t.partner.name)}</p><p class="small muted">+91 ${esc(t.partner.phone)} · ${esc(t.partner.email)}</p><div class="row" style="margin-top:10px"><a class="btn s" href="tel:+91${esc(t.partner.phone)}">Call</a><a class="btn s" href="https://wa.me/91${esc(t.partner.phone)}" target="_blank" rel="noopener">WhatsApp</a></div>`:'<p class="muted">Being assigned.</p>'}
  <form id="fhr" style="margin-top:14px"><label class="f">Ask your HR partner<select name="c"><option>Hiring a new staff member</option><option>Letter or document</option><option>Payroll or payslip question</option><option>PF / ESI</option><option>Disciplinary issue</option><option>Exit or F&F</option><option>Other</option></select></label><label class="f" style="margin-top:8px">Details<textarea name="n"></textarea></label><button class="btn p" style="margin-top:10px">Send to HR partner</button></form></div>
  <div class="card"><h2>Your requests</h2>${t.reqs.length?`<div class="list">${t.reqs.map(r=>`<div style="align-items:flex-start"><span class="sp"><b>${esc(r.title)}</b><br><span class="small muted">${fdate(r.at.slice(0,10))}${r.msgs.length?' · Reply: '+esc(r.msgs[r.msgs.length-1].text):''}</span></span>${chip(r.status,r.status==='Resolved'?'c-ok':r.status==='Open'?'c-warn':'c-info')}</div>`).join('')}</div>`:'<div class="empty">No requests yet.</div>'}</div></div></div>`};
ACT.svcReq=el=>{PLATFORM.emit('salonRequest',{tenant:'AURA01',type:'service',title:'Add '+el.dataset.s,note:'Requested by '+actorName()+' from the salon admin'});audit('Requested '+el.dataset.s+' from Salon HR');render();toast('Sent to your HR partner')};
__on('submit',ev=>{if(ev.target.id!=='fhr')return;ev.preventDefault();const f=ev.target,n=fval(f,'n');if(!n)return toast('Add a few details');PLATFORM.emit('salonRequest',{tenant:'AURA01',type:'hr',title:fval(f,'c'),note:n+' — '+actorName()});render();toast('Sent to your HR partner')});

}
