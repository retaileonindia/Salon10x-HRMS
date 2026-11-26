
/* ============ HELPERS ============ */
const $=s=>document.querySelector(s);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fdate=ds=>new Date(ds+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove('on'),3000)};
const tick=icon('check',18);
const STATES=['Andhra Pradesh','Assam','Bihar','Chandigarh','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jammu & Kashmir','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Odisha','Puducherry','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','Uttarakhand','West Bengal','Other'];
const INTERESTS=['HRMS platform','Payroll & payslips','PF / ESI compliance','Recruitment','Background verification','Complete HR outsourcing'];

/* ============ LAYOUT ============ */
const header=()=>`<header><div class="wrap hbar">
  <a class="logo" href="#home" aria-label="${CONFIG.brand} home"><i>HR</i>${CONFIG.brand}</a>
  <nav class="hnav" id="hnav" aria-label="Main">
    <a href="#about">About Us</a>
    <div class="drop"><button data-act="svc" aria-expanded="false" aria-controls="dpanel">Services <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button>
      <div class="dpanel" id="dpanel" hidden>${SERVICES.map(s=>`<a href="#svc-${s.id}"><span class="ic">${icon(s.icon,20)}</span><span><b>${esc(s.name)}</b><small>${esc(s.short)}</small></span></a>`).join('')}<a class="all" href="#services">See all services ${icon('arrow',16)}</a></div></div>
    <a href="#blog">Blog</a>
    <a href="#login" class="mlogin">Login</a>
  </nav>
  <div class="hright"><a class="btn hl" href="#login">${icon('users',18)}<span>${sess()?'My account':'Login'}</span></a><button class="btn p" data-act="talk">${icon('phone',18)}<span>Talk To Your HR</span></button><button class="btn burger" data-act="burger" aria-label="Menu" style="padding:8px 12px;min-height:42px">☰</button></div>
</div></header>`;
const footer=()=>`<footer><div class="wrap"><div class="fgrid">
  <div><a class="logo" href="#home" style="color:#fff;font-size:24px;padding:0"><i>HR</i>${CONFIG.brand}</a><p style="font-size:14px;margin-top:12px;color:#cdb5bf">The dedicated HR partner for salons in India — from sourcing to exit. A ${esc(CONFIG.site)} company.</p>
   <div class="soc"><a href="${CONFIG.linkedin}" target="_blank" rel="noopener" aria-label="Salon10X on LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.3 21 14.7V21h-4v-5.6c0-1.34-.02-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96V21H9z"/></svg></a>
   <a href="${CONFIG.instagram}" target="_blank" rel="noopener" aria-label="Salon10X on Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a></div></div>
  <div><h4>Company</h4><a href="#about">About Us</a><a href="#services">Services</a><a href="#blog">Blog</a><a href="#home-faq">FAQs</a><a href="#" data-act="talk">Talk To Your HR</a></div>
  <div><h4>Policies</h4><a href="#privacy">Privacy Policy</a><a href="#terms">Terms & Conditions</a><a href="#refund">Refund & Cancellation</a></div>
  <div><h4>From the blog</h4>${BLOGS.map(b=>`<a href="#blog-${b.id}">${esc(b.title)}</a>`).join('')}</div>
</div>
<div class="fbot"><span>© ${new Date().getFullYear()} ${esc(CONFIG.company)}. All rights reserved.</span><span>Write to us: ${esc(CONFIG.leadEmail)}</span></div></div></footer>`;

/* ============ LEAD FORM ============ */
const leadForm=(id,title)=>`<form class="form" id="${id}" novalidate><h2>${title||'Get a free HR health check'}</h2><p class="s">Tell us about your salon. Your HR partner will call you within one working day and show you the platform.</p>
 <div class="fg"><label class="f">Salon / brand name *<input name="salon" required autocomplete="organization"></label><label class="f">Your name *<input name="name" required autocomplete="name"></label>
 <label class="f">Mobile *<input name="mobile" required inputmode="tel" autocomplete="tel" placeholder="10-digit mobile"></label><label class="f">Email<input name="email" type="email" autocomplete="email"></label>
 <label class="f">City *<input name="city" required autocomplete="address-level2"></label><label class="f">State<select name="state"><option value="">Select</option>${STATES.map(s=>`<option>${s}</option>`).join('')}</select></label>
 <label class="f">Branches<select name="branches"><option>1</option><option>2–3</option><option>4–10</option><option>More than 10</option></select></label><label class="f">Total staff<select name="staff"><option>1–9</option><option>10–19</option><option>20–49</option><option>50+</option></select></label>
 <div class="full"><span style="font-size:13px;font-weight:500">Interested in</span><div class="chips">${INTERESTS.map(i=>`<label><input type="checkbox" name="int" value="${i}"> ${i}</label>`).join('')}</div></div>
 <label class="f full">Anything we should know?<textarea name="msg" placeholder="e.g. We need help with payroll and PF for 14 staff"></textarea></label></div>
 <label class="consent"><input type="checkbox" name="ok" checked> I agree to be contacted by ${CONFIG.brand} by phone, WhatsApp or email about this enquiry.</label>
 <button class="btn g">Book my free demo ${icon('arrow',18)}</button></form>`;
async function submitLead(f){const g=n=>(f.querySelector(`[name="${n}"]`)||{}).value?.trim()||'';
  const d={salon:g('salon'),name:g('name'),mobile:g('mobile').replace(/\D/g,''),email:g('email'),city:g('city'),state:g('state'),branches:g('branches'),staff:g('staff'),interests:[...f.querySelectorAll('[name=int]:checked')].map(x=>x.value).join(', '),msg:g('msg')};
  if(!d.salon||!d.name||!d.city)return toast('Please add salon name, your name and city');
  if(!/^[6-9]\d{9}$/.test(d.mobile.slice(-10)))return toast('Please enter a valid 10-digit mobile number');
  if(d.email&&!/^\S+@\S+\.\S+$/.test(d.email))return toast('Please check the email address');
  if(!f.querySelector('[name=ok]').checked)return toast('Please allow us to contact you');
  try{PLATFORM.emit('lead',d)}catch(x){}
  const lines=[`Salon: ${d.salon}`,`Contact: ${d.name}`,`Mobile: ${d.mobile}`,`Email: ${d.email||'-'}`,`City/State: ${d.city}${d.state?', '+d.state:''}`,`Branches: ${d.branches}`,`Staff: ${d.staff}`,`Interested in: ${d.interests||'-'}`,`Message: ${d.msg||'-'}`];
  const subject=`New Salon HR lead: ${d.salon}, ${d.city}`;let sent=false;
  if(CONFIG.formEndpoint&&CONFIG.formKey){try{const r=await fetch(CONFIG.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:CONFIG.formKey,subject,from_name:CONFIG.brand+' website',email:d.email||undefined,...d,message:lines.join('\n')})});sent=r.ok}catch(e){sent=false}}
  const mail=`mailto:${CONFIG.leadEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  f.innerHTML=sent?`<div class="ok"><h2>Thank you, ${esc(d.name.split(' ')[0])}!</h2><p style="margin-top:8px">Your details have reached our partner team. We will call you on ${esc(d.mobile)} within one working day.</p></div>`
   :`<div class="ok"><h2>Almost done, ${esc(d.name.split(' ')[0])}</h2><p style="margin-top:8px">Send your details to our partner team with one tap. Your email app opens with everything filled in.</p><a class="btn g" style="width:100%;margin-top:14px" href="${mail}">Send to ${esc(CONFIG.leadEmail)}</a><p style="font-size:13px;opacity:.8;margin-top:10px">Email app didn't open? Write to ${esc(CONFIG.leadEmail)} with these details:</p><pre style="white-space:pre-wrap;font-size:12.5px;background:#00000030;border-radius:10px;padding:10px;margin-top:8px">${esc(lines.join('\n'))}</pre></div>`;
  if(!sent)try{location.href=mail}catch(e){}
}

/* ============ PAGES ============ */
const P={};
P.home=()=>`<section class="hero band" style="padding-top:clamp(36px,5vw,64px)"><div class="wrap hgrid">
  <div><div class="eyebrow">HR partner for salons in India</div><h1>Your salon's dedicated HR team — from hiring to exit.</h1>
  <p class="lead">${CONFIG.brand} combines an easy HR platform with real HR experts, so you stop chasing registers, salaries and compliance and get back to growing your salon.</p>
  <a class="btn p mob" href="#home" data-act="toform" style="margin-top:20px">Book a free demo ${icon('arrow',18)}</a><div class="usp">${[['clock','Punch in, breaks & OT you approve','Geo-fenced attendance with 30-minute meal breaks; overtime paid only when approved.'],['wallet','Payroll after your sign-off','Salaries, incentives and payslips generated once you finish approvals.'],['law','Labour Code-ready','Appointment letters, the 50% wage rule, PF and ESI built in.'],['file','Paperless with e-sign','Joining forms, letters and policies signed with OTP on any phone.'],['store','Built for multi-branch salons','Owner sees every branch; managers get their own logins.'],['door','Sourcing to exit','Recruitment, BGV, performance, property return and F&F.']].map(u=>`<div><span class="ic">${icon(u[0],20)}</span><span><b>${u[1]}</b><small>${u[2]}</small></span></div>`).join('')}</div>
  <div class="trust"><span class="pill">Owner app + staff app</span><span class="pill">PF / ESI optional</span><span class="pill">DPDP Act aligned</span><span class="pill">Hindi & English support</span></div></div>
  <div>${leadForm('lead1')}</div></div></section>

 <section class="band" id="challenges"><div class="wrap"><div class="eyebrow">The reality</div><h2>The HR challenges Indian salons face today — and how we solve them</h2>
  <p class="lead">Salons are people businesses. Most owners run HR on registers, spreadsheets and WhatsApp, and lose time, money and staff because of it.</p>
  <div class="chg">${CHALLENGES.map((c,i)=>`<article><span class="num">Challenge ${String(i+1).padStart(2,'0')}</span><h3>${esc(c[0])}</h3><p class="pr">${esc(c[1])}</p><div class="so">${tick}<span><b>How we solve it:</b> ${esc(c[2])}</span></div></article>`).join('')}</div></div></section>

 <section class="band life"><div class="wrap"><div class="eyebrow" style="color:#f0a9c6">End-to-end HR solutions</div><h2 style="color:#fff">From sourcing till exit — one partner for the whole employee journey</h2>
  <p class="lead">Every stage of a salon employee's life with you, handled by one team and one platform.</p>
  <div class="track">${STAGES.map(s=>`<div><span>${icon(s[0],22)}</span>${esc(s[1])}</div>`).join('')}</div>
  <div class="crit"><div><h3>Why a dedicated HR partner is critical for salons today</h3><p style="margin-top:12px;opacity:.85">India's four Labour Codes came into force on 21 November 2025, the EPF wage ceiling rose to ₹25,000 from 17 September 2026, and skilled stylists have more choices than ever. HR is no longer paperwork — it decides whether your salon keeps its people and stays compliant.</p></div>
  <ul>${['Appointment letters are mandatory for every employee, and salary structures must keep wages at 50% of pay.','Overtime must be voluntary and paid at double; full & final dues within two working days of exit.','PF and ESI thresholds mean growing salons cross compliance lines without noticing.','Staff turnover is the biggest hidden cost — every exit takes clients and training with it.','Owners who spend evenings on HR are not spending them on clients, marketing and growth.'].map(x=>`<li>${icon('check',18)}<span>${x}</span></li>`).join('')}</ul></div></div></section>

 <section class="band"><div class="wrap"><div class="eyebrow">Our expertise</div><h2>HR partners who understand the salon floor</h2>
  <p class="lead">We are not a generic payroll vendor. ${CONFIG.brand} is built by people who run multi-branch salons and know what a Saturday rush, a bridal booking and a senior stylist's resignation feel like.</p>
  <div class="exp">${[['store','Salon operations first','Shifts, rosters, commissions, retail incentives and wedding-season peaks are built into how we work — not adapted from factory HR.'],['law','Labour law, made practical','We translate the Labour Codes, PF, ESI, professional tax and POSH into simple steps for your size and state.'],['users','Talent that stays','Hiring, onboarding and fair incentive design that cut early attrition and keep your best stylists.'],['spark','Technology plus people','An owner app and a staff app, backed by an HR partner you can call — not a ticketing robot.'],['shield','Trust and safety','Consent-based verification, masked identity data and confidential POSH channels.'],['chart','Numbers you can act on','Revenue against salary for every stylist, every month, so you plan raises and hiring on facts.']].map(x=>`<div><span style="color:var(--berry)">${icon(x[0],26)}</span><h3>${x[1]}</h3><p>${x[2]}</p></div>`).join('')}</div></div></section>

 <section class="band" style="background:var(--bg2)"><div class="wrap"><div class="row" style="display:flex;flex-wrap:wrap;gap:14px;align-items:end;justify-content:space-between"><div><div class="eyebrow">What salon owners say</div><h2>Testimonials</h2><span class="sample" style="margin-top:10px">Sample testimonials — replace with verified client feedback before launch</span></div><div class="ctrl"><button class="btn" data-act="tprev" aria-label="Previous testimonial">‹</button><button class="btn" data-act="tnext" aria-label="Next testimonial">›</button></div></div>
  <div class="tst" id="tst" tabindex="0" aria-label="Testimonials">${TESTIMONIALS.map(t=>`<figure><div class="stars" aria-label="${t[2]} out of 5 stars">${'★'.repeat(t[2])}<span style="opacity:.25">${'★'.repeat(5-t[2])}</span></div><blockquote>“${esc(t[3])}”</blockquote><figcaption><b>${esc(t[0])}</b><span>${esc(t[1])}</span></figcaption></figure>`).join('')}</div></div></section>

 <section class="band" id="home-faq"><div class="wrap" style="max-width:920px"><div class="eyebrow">FAQs</div><h2>Questions salon owners ask us</h2><div style="margin-top:20px">${FAQS.map((q,i)=>`<details class="q"${i===0?' open':''}><summary>${esc(q[0])}</summary><p>${esc(q[1])}</p></details>`).join('')}</div></div></section>

 <section class="band" style="padding-top:0"><div class="wrap"><div class="cta"><div><h2>Ready to put HR on autopilot?</h2><p style="opacity:.85;margin-top:8px">Get a free walkthrough of the platform for your salon.</p></div><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn g" href="#home" data-act="toform">Book a free demo</a><button class="btn" data-act="talk" style="background:transparent;color:#fff;border-color:#ffffff60">${icon('phone',18)} Talk To Your HR</button></div></div></div></section>`;

P.about=()=>`<section class="phero"><div class="wrap"><div class="crumb"><a href="#home">Home</a> / About Us</div><h1>About ${CONFIG.brand}</h1><p class="lead">We are the dedicated HR partner for salons in India — an HR platform and an HR team in one, from sourcing to exit.</p></div></section>
 <section class="band"><div class="wrap cols" style="margin-top:0"><div class="box"><h3>Our story</h3><p style="color:var(--mute)">${CONFIG.brand} grew out of running salons. Managing stylists across branches meant registers that never matched, salary sheets that took days, staff who left with clients, and labour rules nobody had time to read. We built the system we wished we had — and the HR team to run it with you.</p></div>
 <div class="box"><h3>Our mission</h3><p style="color:var(--mute)">Make every salon in India a great, compliant place to work, so owners can focus on clients and growth while their teams feel secure, paid on time and treated fairly.</p></div>
 <div class="box"><h3>What we do</h3><ul class="ticks">${SERVICES.map(s=>`<li>${tick}<a href="#svc-${s.id}">${esc(s.name)}</a></li>`).join('')}</ul></div>
 <div class="box"><h3>What we believe</h3><ul class="ticks">${['Salon people deserve professional HR, whatever the salon\'s size.','Compliance should be built in, not bolted on.','Owners should approve, not calculate.','Every employee should know what they earn and why.','Fair exits protect a salon\'s reputation.'].map(x=>`<li>${tick}<span>${x}</span></li>`).join('')}</ul></div></div>
 <div class="wrap" style="margin-top:30px"><div class="box"><h3>Company</h3><p style="color:var(--mute)">${esc(CONFIG.company)} operates ${CONFIG.brand} as part of ${esc(CONFIG.site)}. Write to us at ${esc(CONFIG.leadEmail)}.</p></div></div></section>${ctaBand()}`;

P.services=()=>`<section class="phero"><div class="wrap"><div class="crumb"><a href="#home">Home</a> / Services</div><h1>End-to-end HR services for salons</h1><p class="lead">Pick one service or let us run HR for you from sourcing to exit. PF/ESI management and background verification are optional add-ons.</p></div></section>
 <section class="band"><div class="wrap"><div class="sgrid" style="margin-top:0">${SERVICES.map(s=>`<a href="#svc-${s.id}"><div class="ic">${icon(s.icon,24)}</div><h3>${esc(s.name)}</h3><p>${esc(s.short)}</p><span class="more">Learn more ${icon('arrow',16)}</span></a>`).join('')}</div></div></section>${ctaBand()}`;

const svcPage=s=>`<section class="phero"><div class="wrap"><div class="crumb"><a href="#home">Home</a> / <a href="#services">Services</a> / ${esc(s.name)}</div><div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap"><span style="width:56px;height:56px;border-radius:14px;background:var(--berry);color:#fff;display:grid;place-items:center">${icon(s.icon,28)}</span><h1>${esc(s.name)}</h1></div><p class="lead">${esc(s.intro)}</p></div></section>
 <section class="band"><div class="wrap"><div class="hgrid"><div>
  <div class="box"><h3>What's included</h3><ul class="ticks">${s.features.map(f=>`<li>${tick}<span>${esc(f)}</span></li>`).join('')}</ul></div>
  <div class="box" style="margin-top:18px;background:var(--bg2);border-color:transparent"><h3>What your salon gains today</h3><ul class="ticks">${s.benefits.map(f=>`<li>${tick}<span>${esc(f)}</span></li>`).join('')}</ul></div>
  <h3 style="margin-top:28px">How it works</h3><div class="steps">${[['Talk to us','A 20-minute call about your salon, staff and current process.'],['Set up','We configure branches, shifts, leave and pay rules with you.'],['Go live','Staff join the app; you approve, we run the process.'],['Review monthly','Reports, compliance alerts and a call with your HR partner.']].map((x,i)=>`<div><b>${i+1}</b><span class="b" style="font-weight:600">${x[0]}</span><p style="color:var(--mute);font-size:14px;margin-top:4px">${x[1]}</p></div>`).join('')}</div>
  <h3 style="margin-top:28px">Other services</h3><div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:10px">${SERVICES.filter(x=>x.id!==s.id).map(x=>`<a class="pill" style="text-decoration:none;color:var(--ink)" href="#svc-${x.id}">${esc(x.name)}</a>`).join('')}</div></div>
  <div style="position:sticky;top:90px">${leadForm('lead-'+s.id,'Get '+s.name.toLowerCase()+' for your salon')}</div></div></div></section>`;

P.blog=()=>`<section class="phero"><div class="wrap"><div class="crumb"><a href="#home">Home</a> / Blog</div><h1>The Salon HR blog</h1><p class="lead">Practical guides on labour law, payroll, hiring and keeping great salon teams.</p></div></section>
 <section class="band"><div class="wrap"><div class="bgrid" style="margin-top:0">${BLOGS.map(b=>`<a href="#blog-${b.id}"><div class="cover">${esc(b.cat)}</div><div class="in"><span class="meta">${fdate(b.date)} · ${b.read} min read</span><h3>${esc(b.title)}</h3><p style="color:var(--mute);font-size:15px">${esc(b.excerpt)}</p><span class="more">Read article ${icon('arrow',16)}</span></div></a>`).join('')}</div></div></section>`;
const blogPage=b=>{const i=BLOGS.indexOf(b),nx=BLOGS[(i+1)%BLOGS.length];return`<section class="phero"><div class="wrap article"><div class="crumb"><a href="#home">Home</a> / <a href="#blog">Blog</a> / ${esc(b.cat)}</div><h1 style="font-size:clamp(30px,4vw,44px)">${esc(b.title)}</h1><p class="meta" style="margin-top:14px">${CONFIG.brand} team · ${fdate(b.date)} · ${b.read} min read</p></div></section>
 <section class="band" style="padding-top:36px"><div class="wrap"><article class="article"><p class="lead" style="max-width:none">${esc(b.excerpt)}</p>${b.body}
  <div class="cta" style="margin-top:36px"><div><h2 style="font-size:26px">Want this handled for your salon?</h2><p style="opacity:.85;margin-top:6px">Talk to a Salon HR partner today.</p></div><button class="btn g" data-act="talk">${icon('phone',18)} Talk To Your HR</button></div>
  <p style="margin-top:30px"><a href="#blog-${nx.id}" class="more" style="font-size:16px">Next: ${esc(nx.title)} ${icon('arrow',16)}</a></p></article></div></section>`};
const legalPage=k=>`<section class="phero"><div class="wrap"><div class="crumb"><a href="#home">Home</a> / ${esc(LEGAL[k].title)}</div><h1>${esc(LEGAL[k].title)}</h1><p class="meta" style="margin-top:10px">Last updated ${fdate('2026-11-25')}</p></div></section><section class="band"><div class="wrap legal">${LEGAL[k].body}</div></section>`;
const ctaBand=()=>`<section class="band" style="padding-top:0"><div class="wrap"><div class="cta"><div><h2>Let's make HR easy for your salon</h2><p style="opacity:.85;margin-top:8px">Book a free demo or speak to your HR partner now.</p></div><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn g" href="#home" data-act="toform">Book a free demo</a><button class="btn" data-act="talk" style="background:transparent;color:#fff;border-color:#ffffff60">${icon('phone',18)} Talk To Your HR</button></div></div></div></section>`;

/* ============ ROUTER ============ */
function route(){const h=location.hash.slice(1)||'home';let body,title=CONFIG.brand+' — HR partner for salons';
  if(h.startsWith('svc-')){const s=SERVICES.find(x=>'svc-'+x.id===h);body=s?svcPage(s):P.services();if(s)title=s.name+' · '+CONFIG.brand}
  else if(h.startsWith('blog-')){const b=BLOGS.find(x=>'blog-'+x.id===h);body=b?blogPage(b):P.blog();if(b)title=b.title+' · '+CONFIG.brand}
  else if(LEGAL[h]){body=legalPage(h);title=LEGAL[h].title+' · '+CONFIG.brand}
  else if(P[h]){body=P[h]();if(h!=='home')title=h[0].toUpperCase()+h.slice(1)+' · '+CONFIG.brand}
  else if(h==='home-faq'||h==='challenges'){if(!$('#home-faq')){render(P.home(),title);setTimeout(()=>document.getElementById(h)?.scrollIntoView(),30)}return}
  else body=P.home();
  render(body,title);window.scrollTo(0,0)}
function render(body,title){document.title=title;$('#app').innerHTML=header()+`<main>${body}</main>`+footer();startSlider()}
window.addEventListener('hashchange',route);

/* ============ SLIDER ============ */
let sl=null;
function startSlider(){clearInterval(sl);const t=$('#tst');if(!t)return;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let paused=false;t.onmouseenter=()=>paused=true;t.onmouseleave=()=>paused=false;t.onfocusin=()=>paused=true;t.onfocusout=()=>paused=false;t.ontouchstart=()=>{paused=true;setTimeout(()=>paused=false,6000)};
  sl=setInterval(()=>{if(paused||!document.body.contains(t))return;slide(1)},3500)}
function slide(n){const t=$('#tst');if(!t)return;const w=t.querySelector('figure').getBoundingClientRect().width+16;
  if(n>0&&t.scrollLeft+t.clientWidth>=t.scrollWidth-4)t.scrollTo({left:0,behavior:'smooth'});else if(n<0&&t.scrollLeft<=4)t.scrollTo({left:t.scrollWidth,behavior:'smooth'});else t.scrollBy({left:n*w,behavior:'smooth'})}

/* ============ EVENTS ============ */
function openModal(h){$('#mbody').innerHTML=h;$('#modal').hidden=false}
const ACT={
 close:()=>{$('#modal').hidden=true},
 svc:el=>{const p=$('#dpanel');p.hidden=!p.hidden;el.setAttribute('aria-expanded',String(!p.hidden))},
 burger:()=>$('#hnav').classList.toggle('open'),
 tprev:()=>slide(-1),tnext:()=>slide(1),
 toform:(el,ev)=>{ev.preventDefault();if((location.hash.slice(1)||'home')!=='home'){location.hash='home';setTimeout(()=>$('#lead1')?.scrollIntoView({block:'center'}),60)}else $('#lead1')?.scrollIntoView({block:'center'});setTimeout(()=>$('#lead1 [name=salon]')?.focus(),400)},
 talk:(el,ev)=>{ev.preventDefault();const ph=CONFIG.phone;
  openModal(`<h2 style="font-size:26px">Talk To Your HR</h2><p style="color:var(--mute);margin:8px 0 16px">${ph?`Speak to a Salon HR partner now. We are available ${esc(CONFIG.hours)}.`:`Leave your number and a Salon HR partner will call you back, ${esc(CONFIG.hours)}.`}</p>
  ${ph?`<a class="btn p" style="width:100%;font-size:18px" href="tel:${ph.replace(/\s/g,'')}">${icon('phone',20)} Call ${esc(ph)}</a><p style="text-align:center;font-size:14px;color:var(--mute);margin-top:10px">or dial ${esc(ph)} from your phone</p><hr style="border:0;border-top:1px solid var(--line);margin:18px 0"><p class="b" style="font-weight:600">Prefer a call back?</p>`:''}
  <form id="cb"><label class="f" style="margin-top:8px">Your name<input name="n" autocomplete="name"></label><label class="f" style="margin-top:10px">Mobile<input name="m" inputmode="tel" autocomplete="tel"></label><label class="f" style="margin-top:10px">Salon & city<input name="s"></label><button class="btn ${ph?'':'p'}" style="width:100%;margin-top:14px">Request a call back</button></form>`)}
};
document.addEventListener('click',ev=>{if(ev.target.id==='modal'){ACT.close();return}
  const el=ev.target.closest('[data-act]');if(el&&ACT[el.dataset.act]){ACT[el.dataset.act](el,ev);return}
  if(!ev.target.closest('.drop')){const p=$('#dpanel');if(p&&!p.hidden){p.hidden=true}}
  if(ev.target.closest('.hnav a'))$('#hnav')?.classList.remove('open')});
document.addEventListener('keydown',ev=>{if(ev.key==='Escape'){ACT.close();const p=$('#dpanel');if(p)p.hidden=true}});
document.addEventListener('submit',ev=>{const f=ev.target;ev.preventDefault();
  if(f.classList.contains('form'))return submitLead(f);
  if(f.id==='cb'){const n=f.n.value.trim(),m=f.m.value.replace(/\D/g,''),s=f.s.value.trim();if(!n||!/^[6-9]\d{9}$/.test(m.slice(-10)))return toast('Please add your name and a valid mobile');
    try{PLATFORM.emit('lead',{salon:s,name:n,mobile:m,interests:'Call-back request'})}catch(x){}
    const body=`Call-back request\nName: ${n}\nMobile: ${m}\nSalon & city: ${s||'-'}`;const mail=`mailto:${CONFIG.leadEmail}?subject=${encodeURIComponent('Call-back request: '+n)}&body=${encodeURIComponent(body)}`;
    if(CONFIG.formEndpoint&&CONFIG.formKey){fetch(CONFIG.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:CONFIG.formKey,subject:'Call-back request: '+n,message:body})}).then(r=>{if(!r.ok)throw 0;$('#mbody').innerHTML=`<h2>Thank you, ${esc(n)}!</h2><p style="margin-top:8px;color:var(--mute)">Your HR partner will call you on ${esc(m)} shortly.</p>`}).catch(()=>{location.href=mail})}
    else{$('#mbody').innerHTML=`<h2>One last tap</h2><p style="margin-top:8px;color:var(--mute)">Send your call-back request to our team.</p><a class="btn p" style="width:100%;margin-top:14px" href="${mail}">Send request</a><p style="font-size:13px;color:var(--mute);margin-top:10px">Or write to ${esc(CONFIG.leadEmail)} with your name and number.</p>`;try{location.href=mail}catch(e){}}}});
/* ============ LOGIN & CLIENT PORTAL ============ */
let MEM={};const LS={get:k=>{try{return JSON.parse(localStorage.getItem(k))}catch(e){return MEM[k]??null}},set:(k,v)=>{MEM[k]=v;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},del:k=>{delete MEM[k];try{localStorage.removeItem(k)}catch(e){}}};
const sess=()=>LS.get('shr-sess');
const norm=p=>String(p||'').replace(/\D/g,'').slice(-10);
let LG={owner:{},staff:{}};
P.login=()=>{const s=sess();if(s&&s.tenant)return P.portal();
 const step=(k)=>LG[k];
 const ownerCard=()=>{const st=step('owner');
  if(st.pick)return`<h2>Choose your salon</h2><p style="color:var(--mute);margin:6px 0 14px">${esc(st.acc.name)}, your number has access to more than one salon.</p><div class="demo">${st.acc.access.map(a=>{const t=TENANTS.find(x=>x.id===a[0]);return`<button data-act="pickT" data-id="${a[0]}"><b>${esc(t.salon)}</b> · ${esc(t.city)}<br><span style="color:var(--mute)">Salon ID ${t.id} · ${esc(a[1])}</span></button>`}).join('')}</div>`;
  if(st.phone)return`<h2>Enter OTP</h2><p style="color:var(--mute);margin:6px 0 14px">Sent to +91 ${esc(st.phone)} by SMS and WhatsApp. Demo OTP: 123456</p><form id="lo2"><label class="f">6-digit OTP<input name="o" inputmode="numeric" maxlength="6" autocomplete="one-time-code"></label><button class="btn p" style="width:100%;margin-top:14px">Verify & continue</button></form><button class="btn" style="width:100%;margin-top:8px" data-act="lback" data-k="owner">Change number</button>`;
  return`<h2>Salon owner / manager</h2><p style="color:var(--mute);margin:6px 0 14px">Your client portal: paid services, the HRMS admin, payroll and requests to your dedicated HR.</p><form id="lo1"><label class="f">Registered mobile<input name="m" inputmode="tel" autocomplete="tel" placeholder="10-digit mobile"></label><button class="btn p" style="width:100%;margin-top:14px">Send OTP</button></form>
   <div class="demo"><span style="font-size:13px;color:var(--mute)">Demo logins — tap to fill</span>${ACCOUNTS.map(a=>`<button data-act="lfill" data-k="owner" data-p="${a.phone}"><b>${esc(a.name)}</b> · ${a.access.map(x=>esc(x[1].split(' · ')[0])).join(' / ')} · ${a.phone}</button>`).join('')}</div>`};
 const staffCard=()=>{const st=step('staff');
  if(st.ok)return`<h2>Welcome back</h2><p style="opacity:.85;margin:6px 0 14px">Punch in, apply for leave, see payslips and sign letters in the staff app.</p><a class="btn g" style="width:100%" href="${CONFIG.staffUrl}" target="_blank" rel="noopener">Open staff app ${icon('arrow',18)}</a><p style="font-size:13px;opacity:.75;margin-top:10px">Tip: add the staff app to your phone's home screen to open it like an app.</p>`;
  if(st.phone)return`<h2>Enter OTP</h2><p style="opacity:.85;margin:6px 0 14px">Sent to +91 ${esc(st.phone)}. Demo OTP: 123456</p><form id="ls2"><label class="f">6-digit OTP<input name="o" inputmode="numeric" maxlength="6"></label><button class="btn g" style="width:100%;margin-top:14px">Verify</button></form><button class="btn" style="width:100%;margin-top:8px;background:transparent;color:#fff;border-color:#ffffff50" data-act="lback" data-k="staff">Change number</button>`;
  return`<h2>Salon staff</h2><p style="opacity:.85;margin:6px 0 14px">Stylists, beauticians, therapists and front desk: log in with the mobile number your salon registered.</p><form id="ls1"><label class="f">Mobile<input name="m" inputmode="tel" autocomplete="tel" placeholder="10-digit mobile"></label><button class="btn g" style="width:100%;margin-top:14px">Send OTP</button></form>`};
 return`<section class="phero"><div class="wrap"><div class="crumb"><a href="#home">Home</a> / Login</div><h1>Login to Salon HR</h1><p class="lead">Already a Salon HR client? Pick how you work with us. New here? <a href="#home" data-act="toform">Book a free demo</a>.</p></div></section>
 <section class="band"><div class="wrap"><div class="lgrid"><div class="lcard">${ownerCard()}</div><div class="lcard d">${staffCard()}</div></div>
 <p style="text-align:center;color:var(--mute);font-size:14px;margin-top:18px">Trouble logging in? Your number must be registered by your salon. Write to ${esc(CONFIG.leadEmail)}.</p></div></section>`};
const REQS=()=>LS.get('shr-req')||[];
P.portal=()=>{const s=sess();if(!s||!s.tenant){location.hash='login';return''}const t=TENANTS.find(x=>x.id===s.tenant),acc=ACCOUNTS.find(a=>a.phone===s.phone),role=(acc.access.find(a=>a[0]===t.id)||[])[1]||'';
 const own=SERVICES.filter(x=>t.services.includes(x.id)),other=SERVICES.filter(x=>!t.services.includes(x.id));const rq=REQS().filter(r=>r.tenant===t.id);
 return`<section class="phero"><div class="wrap"><div class="crumb"><a href="#home">Home</a> / Client portal</div><div style="display:flex;flex-wrap:wrap;gap:14px;justify-content:space-between;align-items:end"><div><h1>${esc(t.salon)}</h1><p class="lead" style="margin-top:8px">Salon ID ${t.id} · ${esc(t.city)} · ${esc(acc.name)}, ${esc(role)}</p></div><div style="display:flex;gap:8px;flex-wrap:wrap">${acc.access.length>1?`<button class="btn" data-act="switchT">Switch salon</button>`:''}<button class="btn" data-act="logout">Log out</button></div></div>
 <div class="kp"><div><b>${esc(t.plan)}</b><span>Current plan</span></div><div><b>${own.length} of ${SERVICES.length}</b><span>Services active</span></div><div><b>${t.branches}</b><span>Branches</span></div><div><b>${t.staff}</b><span>Staff on HRMS</span></div></div></div></section>
 <section class="band" style="padding-top:36px"><div class="wrap">
 <div class="cta" style="border-radius:20px"><div><h2 style="font-size:28px">HRMS admin</h2><p style="opacity:.85;margin-top:6px">Attendance, rosters, OT approvals, leave, payroll, payslips, documents and exits for all your branches.</p></div><a class="btn g" href="${CONFIG.adminUrl}" target="_blank" rel="noopener">Open HRMS admin ${icon('arrow',18)}</a></div>
 <div class="pgrid"><div class="lcard"><h2 style="font-size:24px">Your services</h2>${own.map(x=>`<div class="svc-row"><span class="ic">${icon(x.icon,20)}</span><span class="t"><b>${esc(x.name)}</b><small>${esc(x.short)}</small></span><span class="tag on">Active</span></div>`).join('')}
  <h3 style="margin-top:22px">Add more services</h3><p style="color:var(--mute);font-size:14px;margin:4px 0 4px">Your dedicated HR partner will confirm pricing and switch it on.</p>${other.map(x=>{const r=rq.find(q=>q.svc===x.id);return`<div class="svc-row"><span class="ic">${icon(x.icon,20)}</span><span class="t"><b>${esc(x.name)}</b><small>${esc(x.short)}</small></span>${r?`<span class="tag">Requested ${fdate(r.at.slice(0,10))}</span>`:`<button class="btn" data-act="reqSvc" data-id="${x.id}" style="min-height:38px;padding:8px 12px">Request</button>`}</div>`}).join('')}</div>
 <div><div class="lcard d"><h2 style="font-size:22px">Your dedicated HR partner</h2><p style="opacity:.85;margin-top:8px">One team that knows your salon. Ask for anything: a new hire, a letter, a PF question, a difficult exit.</p><button class="btn g" style="width:100%;margin-top:14px" data-act="reqHR">Raise a request</button><button class="btn" style="width:100%;margin-top:8px;background:transparent;color:#fff;border-color:#ffffff50" data-act="talk">${icon('phone',18)} Talk To Your HR</button></div>
  <div class="lcard" style="margin-top:20px"><h3>Your requests</h3>${rq.length?rq.slice().reverse().map(r=>`<div class="svc-row"><span class="t"><b>${esc(r.title)}</b><small>${fdate(r.at.slice(0,10))} · ${esc(r.note||'')}</small></span><span class="tag">${esc(r.status)}</span></div>`).join(''):'<p style="color:var(--mute);font-size:14px;margin-top:8px">No requests yet.</p>'}</div>
  <div class="lcard" style="margin-top:20px"><h3>Staff access</h3><p style="color:var(--mute);font-size:14px;margin-top:6px">Your staff log in at the staff app with their own mobile and OTP. Share this link with new joiners:</p><p style="font-size:14px;word-break:break-all;margin-top:8px"><a href="${CONFIG.staffUrl}" target="_blank" rel="noopener">${esc(CONFIG.staffUrl)}</a></p></div></div></div></div></section>`};
function reqModal(title,svc){openModal(`<h2 style="font-size:24px">${esc(title)}</h2><p style="color:var(--mute);margin:6px 0 12px">Goes to your dedicated HR partner at ${esc(CONFIG.leadEmail)}.</p><form id="rq" data-svc="${svc||''}" data-title="${esc(title)}">${svc?'':`<label class="f">Topic<select name="c" style="width:100%;border:1px solid var(--line);background:var(--bg);border-radius:10px;padding:10px;min-height:46px;margin-top:5px"><option>Hiring a new staff member</option><option>Letter or document</option><option>Payroll or payslip question</option><option>PF / ESI</option><option>Disciplinary issue</option><option>Exit or F&F</option><option>Other</option></select></label>`}<label class="f" style="margin-top:10px">Details<textarea name="n" style="width:100%;border:1px solid var(--line);background:var(--bg);border-radius:10px;padding:10px;min-height:90px;margin-top:5px;font-size:16px" placeholder="${svc?'e.g. We have 14 staff and want PF from next month':'Tell us what you need'}"></textarea></label><button class="btn p" style="width:100%;margin-top:14px">Send request</button></form>`)}
Object.assign(ACT,{
 lfill:el=>{const f=document.querySelector(el.dataset.k==='owner'?'#lo1':'#ls1');f.m.value=el.dataset.p;f.m.focus()},
 lback:el=>{LG[el.dataset.k]={};route()},
 pickT:el=>{const st=LG.owner;LS.set('shr-sess',{phone:st.acc.phone,tenant:el.dataset.id});LG.owner={};location.hash='portal';route()},
 switchT:()=>{const s=sess();const acc=ACCOUNTS.find(a=>a.phone===s.phone);LS.set('shr-sess',{phone:s.phone});LG.owner={phone:s.phone,acc,pick:true};location.hash='login';route()},
 logout:()=>{LS.del('shr-sess');LG={owner:{},staff:{}};location.hash='login';route();toast('Logged out')},
 reqSvc:el=>{const x=SERVICES.find(s=>s.id===el.dataset.id);reqModal('Add '+x.name,x.id)},
 reqHR:()=>reqModal('Request to your HR partner')
});
document.addEventListener('submit',ev=>{const f=ev.target;
 if(f.id==='lo1'){const p=norm(f.m.value);if(!/^[6-9]\d{9}$/.test(p))return toast('Enter a valid 10-digit mobile');const acc=ACCOUNTS.find(a=>a.phone===p);if(!acc)return toast('This number is not registered as a salon owner or manager');LG.owner={phone:p,acc};route()}
 if(f.id==='lo2'){if(f.o.value!=='123456')return toast('Wrong OTP (demo: 123456)');const acc=LG.owner.acc;if(acc.access.length>1){LG.owner.pick=true;return route()}LS.set('shr-sess',{phone:acc.phone,tenant:acc.access[0][0]});LG.owner={};location.hash='portal';route()}
 if(f.id==='ls1'){const p=norm(f.m.value);if(!/^[6-9]\d{9}$/.test(p))return toast('Enter a valid 10-digit mobile');LG.staff={phone:p};route()}
 if(f.id==='ls2'){if(f.o.value!=='123456')return toast('Wrong OTP (demo: 123456)');LG.staff.ok=true;route()}
 if(f.id==='rq'){const s=sess(),note=(f.n.value||'').trim(),title=f.dataset.svc?f.dataset.title:(f.c?f.c.value:'Request');if(!note&&!f.dataset.svc)return toast('Add a few details');
  const r={tenant:s.tenant,svc:f.dataset.svc||null,title,note,status:'Sent to HR partner',at:new Date().toISOString()};LS.set('shr-req',[...REQS(),r]);
  const t=TENANTS.find(x=>x.id===s.tenant);const body=`Salon: ${t.salon} (${t.id})\nFrom: ${ACCOUNTS.find(a=>a.phone===s.phone).name}, +91 ${s.phone}\nRequest: ${title}\nDetails: ${note||'-'}`;
  if(CONFIG.formEndpoint&&CONFIG.formKey)fetch(CONFIG.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:CONFIG.formKey,subject:`Client request: ${title} — ${t.salon}`,message:body})}).catch(()=>{});
  else{try{location.href=`mailto:${CONFIG.leadEmail}?subject=${encodeURIComponent('Client request: '+title+' — '+t.salon)}&body=${encodeURIComponent(body)}`}catch(e){}}
  ACT.close();route();toast('Request sent to your HR partner')}
});
P.login=()=>`<section class="phero"><div class="wrap"><div class="crumb"><a href="#home">Home</a> / Login</div><h1>Login to Salon HR</h1><p class="lead">One platform for salon owners, managers, staff and the Salon HR team. Choose how you use it.</p></div></section>
<section class="band"><div class="wrap"><div class="sgrid" style="margin-top:0">${[['store','Salon owner or manager','Attendance, rosters, overtime, leave, payroll, documents and exits for all your branches, plus your Salon HR plan and HR partner.','app-admin','Owner / manager login'],['users','Salon staff','Punch in and out, apply for leave, see payslips, sign letters and raise requests from your phone.','app-staff','Staff login'],['shield','Salon HR team','Super admin and HR partners: salons, leads, billing, requests, compliance and verified work history.','app-console','Team login']].map(x=>`<a href="#${x[3]}"><div class="ic">${icon(x[0],24)}</div><h3>${x[1]}</h3><p>${x[2]}</p><span class="more">${x[4]} ${icon('arrow',16)}</span></a>`).join('')}</div>
<p style="text-align:center;color:var(--mute);font-size:14px;margin-top:22px">Every login uses your registered mobile number and a one-time password.</p></div></section>`;
PLATFORM.apps.site={show(){ACT.close();route()}};
route();
}