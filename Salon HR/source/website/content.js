{
/* ============ EDIT THESE BEFORE GOING LIVE ============ */
const CONFIG={
  brand:'Salon HR',company:'Salon Enterprise Solutions India Pvt. Ltd.',
  leadEmail:'partners@salon10x.in',
  phone:'',               // e.g. '+91 98xxxxxxxx' — when set, "Talk to Your HR" dials this number
  hours:'Mon–Sat, 10 am – 7 pm IST',
  formEndpoint:'',        // e.g. 'https://api.web3forms.com/submit' when hosted on your domain
  formKey:'',             // access key from the form service, set to deliver to partners@salon10x.in
  linkedin:'https://www.linkedin.com/company/salon10x',
  instagram:'https://www.instagram.com/salon10x',
  site:'salon10x.in',
  adminUrl:'https://claude.ai/artifact/6xMdcPgxup15R4LvdqMA7W',   // live: https://app.salonhr.in
  staffUrl:'https://claude.ai/artifact/SN5HvCFUiv3s3a97Emyxw9'    // live: https://staff.salonhr.in
};
/* Demo salon accounts for the login preview (live version reads these from the server) */
const TENANTS=[
 {id:'AURA01',salon:'Aura Salon & Spa',city:'Mumbai',plan:'Growth',branches:2,staff:6,since:'2026-08-01',services:['onboarding','attendance','leave','payroll','compliance','relations','exit']},
 {id:'GLOW02',salon:'Glow Studio',city:'Pune',plan:'Starter',branches:1,staff:4,since:'2026-10-10',services:['attendance','leave','payroll']}
];
const ACCOUNTS=[
 {phone:'9820000000',name:'Neha Kapoor',access:[['AURA01','Owner · all branches']]},
 {phone:'9811111111',name:'Ritu Shah',access:[['AURA01','Branch Manager · Andheri West'],['GLOW02','Salon Manager']]}
];

/* ============ ICONS ============ */
const IC={
 users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
 plus:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
 file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/>',
 shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
 clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
 cal:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
 wallet:'<path d="M20 12V8H6a2 2 0 0 1 0-4h12v4"/><path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
 bank:'<path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>',
 chart:'<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
 chat:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
 door:'<path d="M13 4h3a2 2 0 0 1 2 2v14M2 20h3M13 20h9M10 12v.01M13 4.56v16.88a.5.5 0 0 1-.68.47L5 19V5.13a1 1 0 0 1 .76-.97l6-1.5A1 1 0 0 1 13 3.63z"/>',
 search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
 phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
 check:'<path d="M20 6 9 17l-5-5"/>',
 spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
 store:'<path d="M3 9l1-5h16l1 5M4 9v11h16V9M9 20v-6h6v6M3 9h18"/>',
 law:'<path d="M12 3v18M5 21h14M6 7h12M6 7l-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z"/>',
 arrow:'<path d="M5 12h14M13 5l7 7-7 7"/>'
};
const icon=(n,s=22)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]||''}</svg>`;

/* ============ SERVICES ============ */
const SERVICES=[
 {id:'recruitment',icon:'search',name:'Recruitment & Sourcing',short:'Find trained stylists, beauticians, therapists and front-desk staff faster.',
  intro:'Hiring good salon talent is the hardest part of running a salon. We source, screen and shortlist candidates for your exact role, skill level and budget, so you spend time only on trials and final interviews.',
  features:['Role briefs written for salon roles: senior stylist, colourist, beautician, nail technician, makeup artist, spa therapist, receptionist, manager','Sourcing from academies, job portals, referrals and our salon talent network','Phone screening on skills, past salons, expected salary, notice period and location','Practical trial scheduling and structured trial scorecards','Offer and salary benchmarking for your city','Digital offer letter, sent and accepted in the app'],
  benefits:['Fill critical chairs before they cost you bookings','Fewer bad hires — every candidate is screened on skill and stability','Offers that match the local market, so people stay','A clean handover into onboarding on day one']},
 {id:'onboarding',icon:'plus',name:'Onboarding & Documentation',short:'Digital joining form, document collection and appointment letters on day one.',
  intro:'Under the Labour Codes, every employee must get an appointment letter. We make joining fully digital: the employee fills their part from their phone, uploads documents, and signs every letter with an OTP.',
  features:['Joining form with employee and employer sections, and required fields you control','Upload of Aadhaar (stored masked), PAN, photo, bank proof, certificates and previous relieving letters','Bank account and UPI ID with QR code collected for salary payment','Appointment letter, confidentiality and client-data undertaking, handbook acknowledgement','Two-sided e-sign with OTP, document fingerprint and audit trail','Branch, shift, weekly off and salary set before the first punch-in'],
  benefits:['Mandatory appointment letters issued to every employee','No paper files to lose; everything searchable by employee','Client data protected from the first day','Staff productive from day one instead of week two']},
 {id:'bgv',icon:'shield',name:'Background Verification',short:'Identity, address, past employment and court-record checks, with consent.',
  intro:'A salon trusts its staff with clients, cash, products and homes (for at-home services). Our verification checks who you are hiring before they handle any of these.',
  features:['Consent taken digitally under the DPDP Act, 2023 before any check','Identity and address verification','Calls to the last two workplaces to confirm tenure, role and conduct','Education and certification checks','Court-record check and police-verification assistance in the comprehensive package','Reports attached to the employee profile'],
  benefits:['Safer clients and a safer team','Lower risk of theft, fraud and misconduct','Pay per check — only when you need it','A defensible record if anything goes wrong']},
 {id:'attendance',icon:'clock',name:'Attendance, Shifts & Rosters',short:'Geo-fenced punch in/out, 30-minute meal breaks, weekly rosters and OT approvals.',
  intro:'Salons run on long, uneven days. Our staff app records exactly when each person starts, breaks and leaves, and you decide which extra time is overtime.',
  features:['Punch in, meal break start and end, and punch out from the staff app, inside your salon\'s geo-fence','Weekly roster: default shift and fixed weekly off for each person, with changes for any day','Late marks with grace time, half-day and full-day rules you set','Overtime calculated in 30-minute blocks and approved or denied by you for each day','Missed punches corrected by the owner or manager with a reason','Branch-wise view for multi-salon owners and managers'],
  benefits:['No more register disputes at month end','Overtime paid only when you approve it','Better cover for weekends and wedding season','Managers handle their branch; you see everything']},
 {id:'leave',icon:'cal',name:'Leave & Holidays',short:'Your leave types, your quotas, applied and approved in the app.',
  intro:'Define the leave your salon offers — casual, sick, annual, festival or anything else — and let staff apply from their phone while you approve in one tap.',
  features:['Unlimited leave types with yearly days, paid or unpaid, half-day and carry-forward rules','Balances for every employee, editable by the owner','Approvals by the owner or a branch manager','Holiday calendar for each year','Leave without pay deducted automatically in payroll','Annual leave encashment calculated at exit'],
  benefits:['Planned absences instead of surprise no-shows','Fair, visible balances that staff can check themselves','Payroll that already knows who was on leave','Compliant leave records for inspections']},
 {id:'payroll',icon:'wallet',name:'Payroll & Salary Payouts',short:'Payroll generated only after you approve attendance, OT, leave and targets.',
  intro:'Salary in a salon is fixed pay plus overtime plus incentives, minus statutory deductions. We calculate it correctly every month and release payslips only after you have reviewed everything.',
  features:['Pay structure that keeps basic wages at 50% of total remuneration, as the Code on Wages requires','Approved overtime at twice the ordinary rate of wages','Service and retail incentives from monthly target achievement','PF, ESI, professional tax and TDS deductions','Payslips in the staff app; bank transfer file and UPI details for every employee','Payment records with UTR for each salary'],
  benefits:['Salary paid on time, by the 7th of the next month','No calculation errors or WhatsApp arguments','One click to see the total salary cost per branch','Records ready for audits and labour inspections']},
 {id:'compliance',icon:'law',name:'PF, ESI & Labour Law Compliance',short:'Optional PF and ESI management, plus Labour Code-ready policies and registers.',
  intro:'India\'s four Labour Codes came into force on 21 November 2025. We keep your salon compliant without you having to read the rules — and PF and ESI are optional services you can switch on when you need them.',
  features:['PF registration support and monthly ECR file (12% + 12% on PF wages up to ₹25,000)','ESI registration support and monthly contribution file (0.75% + 3.25% for wages up to ₹21,000)','Alerts when your headcount crosses 10 (ESI) or 20 (PF)','Professional tax as per your state','POSH policy and committee guidance','Registers, policies and letters updated as rules change'],
  benefits:['Avoid penalties, interest and inspection trouble','Employees get social security they value — better retention','Clear advice on what is mandatory for your size','One partner instead of a separate consultant']},
 {id:'performance',icon:'chart',name:'Performance & Incentives',short:'Targets vs achievement against salary paid, month on month.',
  intro:'In a salon, people are your biggest cost and your biggest revenue engine. We show, for every stylist, what they sell against what they cost — every month.',
  features:['Monthly service and retail targets per employee','Achievement entered from your billing software','Incentive slabs you set (for example full at 100%, half from 80%)','Revenue-to-salary multiple for every person','Month-on-month charts for owners and managers','Inputs flow straight into payroll'],
  benefits:['Reward the people who grow your business','Spot under-performance early and coach it','Make raises and promotions on facts','Control salary cost as a share of revenue']},
 {id:'relations',icon:'chat',name:'Employee Relations & Helpdesk',short:'Policies, helpdesk tickets, discipline and POSH handled the right way.',
  intro:'Small problems become exits when nobody listens. Every query, request or complaint is a ticket in the app, with a 48-hour response target and escalation to the owner.',
  features:['Standard employee handbook with policies you can edit','Helpdesk tickets for pay, attendance, leave, OT and documents','Confidential POSH complaints channel','Warning letters, show-cause notices and replies with timestamps','Fair disciplinary process with hearing and decision letters','Profile change requests with approval for bank, UPI and ID changes'],
  benefits:['Happier staff who feel heard','Discipline that stands up if challenged','Less owner time spent on repeated questions','A record of every decision']},
 {id:'exit',icon:'door',name:'Exit & Full and Final',short:'Resignations, property return, clearance, F&F in 2 working days, letters.',
  intro:'How people leave decides what they say about you, and whether your kit, keys and clients leave with them. Our exit process puts property return first and pays dues on time.',
  features:['Resignation submitted only through the app, with the notice period applied automatically','Every issued item — kit, uniform, keys — returned and approved by a manager or the owner before F&F','Exit checklist and exit interview','F&F with salary, leave encashment, notice, gratuity and recoveries, shared with both sides','Payment within two working days of the last day, as the Code on Wages requires','Relieving letter and experience certificate issued digitally'],
  benefits:['Salon property comes back before money goes out','No disputes over dues — both sides see the same F&F','Compliance with the 2-day payment rule','Former staff leave as ambassadors, not critics']}
];

/* ============ CHALLENGES ============ */
const CHALLENGES=[
 ['Finding and keeping skilled staff','Trained stylists move for small pay differences, and every exit takes clients with it.','Structured hiring, fair incentives tied to targets, and on-time pay that builds loyalty.'],
 ['Attendance disputes and buddy punching','Paper registers and WhatsApp messages lead to arguments every month end.','Geo-fenced punch in/out with meal breaks, visible to both sides in real time.'],
 ['Unplanned overtime costs','Staff stay late on their own and claim overtime, or work late and never get paid for it.','Overtime counts only when you approve it, and approved overtime is paid at 2× automatically.'],
 ['Complicated salary calculations','Fixed pay, commissions, product incentives, late marks, leave and deductions in one spreadsheet.','Payroll generated after your approvals, with payslips in every employee\'s phone.'],
 ['New Labour Codes and compliance','Appointment letters, 50% wage rule, PF ceiling of ₹25,000, ESI, gratuity — rules most owners never studied.','We build compliance into every letter, payslip and process, and alert you before thresholds hit.'],
 ['Client poaching by departing staff','Stylists leave and message your clients from their personal phones.','Confidentiality and client-data undertakings from day one, and a clean exit process.'],
 ['No time for HR paperwork','Owners spend evenings on letters, files and calculations instead of growing the salon.','Every document generated and e-signed in minutes, stored forever in one place.'],
 ['Managing several branches','Each branch runs its own way and the owner has no single view.','Branch managers get their own logins and the owner sees all branches together.']
];
const STAGES=[['search','Sourcing'],['users','Screening & trials'],['plus','Onboarding'],['shield','Verification'],['clock','Attendance & rosters'],['cal','Leave'],['wallet','Payroll'],['law','PF / ESI compliance'],['chart','Performance'],['chat','Employee relations'],['door','Exit & F&F']];

/* ============ TESTIMONIALS (SAMPLE — replace with verified client feedback) ============ */
const TESTIMONIALS=[
 ['Unisex salon owner','Pune, Maharashtra',5,'Month-end used to be a fight over attendance. Now everyone sees their punches and OT is only what I approve.'],
 ['Bridal studio founder','Jaipur, Rajasthan',5,'During wedding season the weekly roster alone saves me hours. Staff know their shifts days in advance.'],
 ['Two-branch salon owner','Bengaluru, Karnataka',5,'My branch managers handle leave and rosters, and I see both salons in one place.'],
 ['Hair & beauty salon owner','Lucknow, Uttar Pradesh',4,'Appointment letters for every staff member, signed on the phone. I did not know they were mandatory now.'],
 ['Spa & salon owner','Kochi, Kerala',5,'PF and ESI were confusing. They explained what applies to us and run it every month.'],
 ['Men\'s grooming lounge owner','Hyderabad, Telangana',5,'Incentives against targets are clear now. My top stylist knows exactly what she earns and why.'],
 ['Family salon owner','Ahmedabad, Gujarat',4,'Payslips on WhatsApp are history. Staff check everything in the app and questions have dropped.'],
 ['Nail studio owner','Mumbai, Maharashtra',5,'When a technician left, all kits came back before settlement. No arguments, settlement on time.'],
 ['Premium salon owner','Delhi NCR',5,'Background checks before hiring for home services gave us real peace of mind.'],
 ['Makeup academy & salon owner','Chandigarh',5,'The joining form collects bank, UPI and documents in one go. Onboarding takes minutes.'],
 ['Salon chain operations head','Chennai, Tamil Nadu',5,'Five branches, one view of attendance, payroll cost and productivity. Exactly what we needed.'],
 ['Beauty parlour owner','Indore, Madhya Pradesh',4,'I am not an HR person. Having a partner who handles it lets me focus on my clients.'],
 ['Hair studio owner','Kolkata, West Bengal',5,'Revenue versus salary for each stylist changed how I plan raises.'],
 ['Wellness salon owner','Goa',5,'The helpdesk means staff raise issues properly instead of venting to clients.'],
 ['Unisex salon owner','Nagpur, Maharashtra',5,'Recruitment support found us a senior colourist in two weeks.'],
 ['Bridal & beauty salon owner','Surat, Gujarat',4,'Full and final settlements are clean and quick now, and both sides sign them.']
];

/* ============ FAQ ============ */
const FAQS=[
 ['Do small salons with 3–5 staff need an HR partner?','Yes. The Labour Codes require appointment letters for every employee regardless of size, and salary, overtime and leave must be recorded properly. A partner keeps this simple and affordable, and you can add PF, ESI and other services only when you need them.'],
 ['Is PF and ESI compulsory for my salon?','ESI is mandatory once you have 10 or more employees and voluntary below that. PF is mandatory at 20 or more employees and can be opted into voluntarily earlier. In our platform both are optional services you can switch on or off, and we alert you before you cross a threshold.'],
 ['How does overtime work in Salon HR?','Overtime is voluntary. Time beyond the shift is counted in 30-minute blocks and appears for your approval each day. Only approved overtime is paid, at twice the ordinary rate of wages, as required by the Code on Wages.'],
 ['Can my branch managers use the system?','Yes. Each manager gets their own login, sees only their branch, and you decide what they can do — approve leave and overtime, make rosters, approve property returns and more. The owner sees all branches.'],
 ['How do employees use it?','Employees log in to the staff app with their mobile number and an OTP. They punch in and out, take meal breaks, apply for leave, see payslips and targets, sign letters, raise helpdesk tickets and resign — all from their phone.'],
 ['What happens to my data?','Your data stays yours. Personal data is processed only for employment purposes under the Digital Personal Data Protection Act, 2023, Aadhaar numbers are stored masked, and access is limited by role.'],
 ['How quickly can we start?','Most salons go live within a week: we set up branches, shifts and leave types, invite your staff, and run the first payroll with you.']
];

/* ============ BLOGS ============ */
const BLOGS=[
 {id:'labour-codes-salons',cat:'Compliance',date:'2026-11-18',read:6,title:'The new Labour Codes: what every salon owner in India must change',excerpt:'Four codes replaced 29 labour laws on 21 November 2025. Here is what changes for appointment letters, salary structure, overtime and gratuity in your salon.',
  body:`<p>On 21 November 2025 the Government of India brought four Labour Codes into force — the Code on Wages, the Industrial Relations Code, the Code on Social Security and the Occupational Safety, Health and Working Conditions Code. Together they replace 29 older labour laws. For salon owners, a few changes matter immediately.</p>
  <h2>1. Appointment letters are now mandatory</h2><p>Every employee — including helpers, receptionists and trainees — must receive an appointment letter with their designation, wages and terms. If your stylists joined on a handshake, issue letters now.</p>
  <h2>2. The 50% wage rule</h2><p>"Wages" now means basic pay, dearness allowance and retaining allowance. Allowances such as HRA, overtime and bonuses can be excluded only up to 50% of total remuneration; anything above that is counted as wages. In practice, keep basic pay at 50% or more of the total, because PF, gratuity and other benefits are calculated on wages.</p>
  <h2>3. Overtime is voluntary and paid at double</h2><p>Working hours are capped at 48 a week, and overtime must be voluntary and paid at twice the normal rate. Track overtime per day and approve it, rather than letting it pile up informally.</p>
  <h2>4. Gratuity for fixed-term staff after one year</h2><p>Fixed-term employees now become eligible for gratuity after one year of continuous service, instead of five. Permanent employees still need five years. Gratuity applies to establishments with 10 or more employees.</p>
  <h2>5. Social security reaches further</h2><p>ESI now applies across India rather than only in notified areas, and small establishments can join voluntarily.</p>
  <h2>What to do this month</h2><ul><li>Issue appointment letters to all staff.</li><li>Restructure salaries so basic pay is at least 50%.</li><li>Start recording daily overtime with approvals.</li><li>Review your headcount against the PF and ESI thresholds.</li></ul><p class="note">This article is general information, not legal advice. State rules can add details — speak to your HR partner for your salon's situation.</p>`},
 {id:'pf-ceiling-25000',cat:'Payroll',date:'2026-10-02',read:5,title:'EPF wage ceiling is now ₹25,000: what it means for salon payroll',excerpt:'From 17 September 2026 the EPF wage ceiling moved from ₹15,000 to ₹25,000 a month. Here is how it changes contributions for your stylists.',
  body:`<p>For the first time since 2014, the government has raised the EPF wage ceiling — from ₹15,000 to ₹25,000 a month, effective 17 September 2026. The contribution rate itself has not changed: 12% from the employee and 12% from the employer on PF wages.</p>
  <h2>Who is affected</h2><p>Employees whose PF wages are up to ₹25,000 now fall under mandatory coverage. If your salon is covered by PF, staff earning between ₹15,000 and ₹25,000 who were outside PF may now need to be enrolled, and contributions for existing members can rise to the new ceiling.</p>
  <h2>Example</h2><p>A stylist with PF wages of ₹20,000: earlier, contributions could be limited to ₹15,000, so the employee share was ₹1,800. Now 12% of ₹20,000 is ₹2,400 from the employee, and the same from the employer.</p>
  <h2>September 2026 was a split month</h2><p>Contributions for 1–16 September used the old ceiling and 17–30 September the new one, so payroll for that month needed a split calculation.</p>
  <h2>ESI did not change</h2><p>The ESI wage limit stays at ₹21,000 a month. Check PF and ESI eligibility separately.</p>
  <h2>What to do</h2><ul><li>Update your payroll ceiling to ₹25,000.</li><li>Review staff who were excluded earlier.</li><li>Explain the change to staff — take-home falls slightly, but their PF savings grow.</li></ul><p class="note">General information, not legal advice.</p>`},
 {id:'pf-esi-salons',cat:'Compliance',date:'2026-09-12',read:5,title:'PF and ESI for salons: when it is mandatory and when it is optional',excerpt:'Headcount decides most of it. A simple guide to PF and ESI for salons with 5, 12 or 25 employees.',
  body:`<p>Salon owners often ask whether they "have to" register for PF and ESI. The answer depends mainly on how many people you employ.</p>
  <h2>ESI</h2><p>ESI coverage now extends across India. It is mandatory for establishments with 10 or more employees and voluntary for smaller ones if the employer and employees agree. It covers employees earning up to ₹21,000 a month, with 0.75% from the employee and 3.25% from the employer. Staff get medical care for themselves and their families, sickness and maternity benefits.</p>
  <h2>PF</h2><p>EPF applies to establishments with 20 or more employees. Smaller salons can opt in voluntarily. Contributions are 12% each from employee and employer on PF wages up to ₹25,000 a month.</p>
  <h2>Three examples</h2><ul><li><b>5 staff:</b> neither is mandatory; both can be offered voluntarily to retain good people.</li><li><b>12 staff:</b> ESI is mandatory for eligible staff; PF is optional.</li><li><b>25 staff:</b> both PF and ESI are mandatory.</li></ul>
  <h2>Why opt in early</h2><p>Stylists increasingly compare employers on benefits. Social security costs a little but signals a professional salon, and it avoids a rush when you cross the threshold.</p><p class="note">General information, not legal advice.</p>`},
 {id:'overtime-salon-staff',cat:'Attendance',date:'2026-08-21',read:4,title:'How to handle overtime for salon staff — legally and fairly',excerpt:'Late bridal bookings and weekend rushes create overtime. Here is a simple, compliant way to manage it.',
  body:`<p>Salons rarely close on the dot. A bridal client runs late, a Saturday overflows, and staff stay back. Under the Labour Codes, overtime must be voluntary and paid at twice the normal rate of wages, and weekly hours are capped at 48.</p>
  <h2>A three-step system</h2><ol><li><b>Fix shifts.</b> Give each person a shift of 8 working hours plus a meal break, and one weekly off.</li><li><b>Record actual time.</b> Punch in, meal break and punch out every day.</li><li><b>Approve per day.</b> Time beyond the shift appears as overtime; approve it when the work was needed, decline it when it was not.</li></ol>
  <h2>Calculating the rate</h2><p>Take the ordinary hourly rate and double it. For a stylist paid ₹20,800 a month over 26 days of 8 hours, the hourly rate is ₹100, so overtime is ₹200 an hour.</p>
  <h2>Avoid these mistakes</h2><ul><li>Paying overtime in cash outside payroll.</li><li>Expecting staff to stay without pay "because it is busy".</li><li>Letting overtime run unchecked, which inflates your salary cost.</li></ul><p class="note">General information, not legal advice.</p>`},
 {id:'stop-client-poaching',cat:'Employee relations',date:'2026-07-30',read:5,title:'When stylists leave with your clients: what you can and cannot do',excerpt:'Non-compete clauses do not work in India. Confidentiality, client data rules and a clean exit do.',
  body:`<p>Every salon owner has lived this: a senior stylist resigns, and within weeks your regular clients are booking with them elsewhere.</p>
  <h2>Why non-compete clauses fail</h2><p>Under Section 27 of the Indian Contract Act, agreements that restrain someone from carrying on a trade after employment are generally void. You cannot stop a stylist from working at another salon.</p>
  <h2>What does work</h2><ul><li><b>Confidentiality from day one.</b> A signed undertaking that client names, numbers, history and preferences belong to the salon.</li><li><b>No client data on personal phones.</b> Bookings and client contact through the salon's systems only.</li><li><b>No private services while employed.</b> Exclusive service clauses are enforceable during employment.</li><li><b>Data deletion at exit.</b> Confirmed in the exit checklist.</li><li><b>Relationships owned by the salon.</b> Follow-ups and offers come from the salon, not individual staff.</li></ul>
  <h2>The best defence is retention</h2><p>Fair incentives, on-time pay and respect keep most stylists from leaving in the first place.</p><p class="note">General information, not legal advice.</p>`},
 {id:'stylist-incentives',cat:'Performance',date:'2026-06-26',read:6,title:'Designing a target-based incentive plan for stylists',excerpt:'Commission on everything rewards volume. Targets with slabs reward growth. Here is a simple plan that works.',
  body:`<p>Most salons pay stylists a fixed salary plus some form of commission. The design of that commission decides whether your team chases revenue, quality or just more chairs.</p>
  <h2>Start with a fair target</h2><p>Set a monthly service target per person based on their seniority and past three months. A common starting point is a target of four to five times their fixed pay.</p>
  <h2>Use slabs</h2><ul><li>Below 80% of target: no service incentive.</li><li>80% to 99%: half the commission rate.</li><li>100% and above: full commission rate on all service sales.</li></ul>
  <h2>Reward retail separately</h2><p>A flat percentage on product sales encourages recommendations without pushing services.</p>
  <h2>Watch the revenue-to-salary multiple</h2><p>For each person, divide their monthly revenue by their total cost. Track it month on month — it tells you who to reward and who to coach.</p>
  <h2>Keep it visible</h2><p>Staff should see their target and achievement during the month, not only on payday.</p>`},
 {id:'appointment-letter-checklist',cat:'Documentation',date:'2026-05-29',read:4,title:'Appointment letters for salon staff: a practical checklist',excerpt:'Mandatory under the Labour Codes, and your best protection as an employer. Here is what to include.',
  body:`<p>Appointment letters are now mandatory for every employee. A good letter also protects the salon.</p>
  <h2>Must-haves</h2><ul><li>Name, designation, branch and date of joining</li><li>Probation or fixed-term details</li><li>Salary breakup with basic pay at least 50% of the total</li><li>Working hours, meal break, weekly off and overtime rules</li><li>Leave entitlements and holidays</li><li>PF, ESI and other benefits that apply</li><li>Notice period for both sides</li></ul>
  <h2>Salon-specific protections</h2><ul><li>Confidentiality of client data and no private services while employed</li><li>Billing only through the salon; no direct cash collection</li><li>Return of kits, uniforms and keys</li><li>Training cost recovery for sponsored courses, on a fair pro-rata basis</li><li>Fair disciplinary process with a show-cause notice</li></ul>
  <h2>Sign it properly</h2><p>E-sign with OTP and an audit trail is accepted under the Information Technology Act, 2000 and far easier to store than paper.</p><p class="note">General information, not legal advice.</p>`},
 {id:'full-and-final-2-days',cat:'Exit',date:'2026-04-24',read:5,title:'Full and final settlement in two working days: a salon owner\'s checklist',excerpt:'The Code on Wages requires dues to be paid within two working days of the last day. Here is how to get it right.',
  body:`<p>When an employee resigns, is terminated or is retrenched, the Code on Wages requires their wages to be paid within two working days of separation. Many salons take weeks. That now carries real risk.</p>
  <h2>Before the last day</h2><ul><li>Confirm the last working day in writing.</li><li>List every item issued — kits, uniforms, ID card, keys.</li><li>Get each item returned and checked by a manager.</li><li>Hand over client notes and future appointments.</li></ul>
  <h2>The F&F calculation</h2><ul><li>Salary up to the last day, including approved overtime and incentives</li><li>Leave encashment for unused annual leave</li><li>Notice pay or notice shortfall, as per the letter</li><li>Gratuity if eligible</li><li>Statutory deductions and any lawful recoveries</li></ul>
  <h2>After payment</h2><p>Share the statement with the employee, record the payment reference, then issue the relieving letter and experience certificate.</p><p class="note">General information, not legal advice.</p>`},
 {id:'wedding-season-rosters',cat:'Attendance',date:'2026-03-27',read:4,title:'Rosters for weekends and wedding season without burning out your team',excerpt:'Plan shifts a week ahead, protect weekly offs and use approved overtime — not exhaustion.',
  body:`<p>Wedding season and weekends can double a salon's footfall. Without planning, the same few people work every rush and burn out.</p>
  <h2>Build the week on Monday</h2><p>Start from each person's default shift and fixed weekly off, then adjust for bookings you already have.</p>
  <h2>Stagger shifts</h2><p>Morning, mid and late shifts give you cover from opening to close without anyone working 12 hours.</p>
  <h2>Move weekly offs, do not cancel them</h2><p>If someone must work their usual off day, give another day off that week.</p>
  <h2>Use overtime deliberately</h2><p>Approve overtime for real peaks, and see the cost before payroll.</p>
  <h2>Publish early</h2><p>Staff who know their week in advance turn up rested and on time.</p>`},
 {id:'hiring-verifying-staff',cat:'Recruitment',date:'2026-02-20',read:5,title:'Hiring and verifying salon staff: references, trials and background checks',excerpt:'A practical hiring flow for salons — from the first call to the first day.',
  body:`<p>A wrong hire costs a salon more than salary: unhappy clients, damaged products and lost trust.</p>
  <h2>1. Screen on the phone</h2><p>Check skills, last two salons, reason for leaving, expected pay and notice period.</p>
  <h2>2. Practical trial</h2><p>Score the trial on technique, hygiene, client handling and speed, with a model or a team member.</p>
  <h2>3. Reference calls</h2><p>Call the last two workplaces. Confirm dates, role and whether they would rehire.</p>
  <h2>4. Background verification</h2><p>Take written consent, then verify identity, address and, for home-service roles, court records. Consent and limited use of data are required under the Digital Personal Data Protection Act, 2023.</p>
  <h2>5. Digital joining</h2><p>Collect documents, bank and UPI details, then issue the appointment letter for e-signature before the first shift.</p>`}
];

/* ============ LEGAL PAGES ============ */
const LEGAL={
 privacy:{title:'Privacy Policy',body:`<p>This policy explains how ${CONFIG.company} ("we") handles personal data collected through this website and the Salon HR platform.</p>
  <h2>What we collect</h2><p>From salon owners: name, salon name, contact details, city, branch and staff counts, and messages you send us. Within the platform: employee data that salons enter or that employees provide for employment purposes.</p>
  <h2>Why we use it</h2><p>To respond to enquiries, give demos, provide and support the platform, process payroll and compliance on behalf of salons, and meet legal obligations.</p>
  <h2>Legal basis</h2><p>We process personal data under the Digital Personal Data Protection Act, 2023, on the basis of consent or legitimate uses permitted by law. For employee data inside the platform, the salon is the Data Fiduciary and we act as its Data Processor.</p>
  <h2>Sharing</h2><p>We do not sell personal data. We share it only with service providers who help us run the platform (hosting, messaging, verification partners chosen by the salon), under confidentiality obligations, or when the law requires.</p>
  <h2>Salon HR Verified Work History (optional)</h2><p>Employees of client salons can choose to let us keep a verified record of their work history: name, contact details, date of birth, masked ID numbers, the salons they worked at with role and dates, and verification results. We act as Data Fiduciary for this record on the basis of the employee's own consent. It is shared with a new employer only after the employee approves each request, it stays active with no fixed end date while consent continues, and the employee can view, correct or withdraw it at any time. On withdrawal we delete the record and keep only a log of the consent and withdrawal dates and the checks performed, as proof of lawful processing. We never store salary, bank, documents, family or health details in this record, and we never record opinions about a person.</p>
  <h2>Security and retention</h2><p>Access is role-based, Aadhaar numbers are stored masked, and data is kept only as long as needed for the purpose or as required by law.</p>
  <h2>Your rights</h2><p>You may request access, correction or erasure of your personal data and withdraw consent by writing to ${CONFIG.leadEmail}.</p>`},
 terms:{title:'Terms & Conditions',body:`<p>These terms govern the use of this website and the Salon HR services offered by ${CONFIG.company}.</p>
  <h2>Services</h2><p>We provide HR software and HR services for salons. Specific services, fees and service levels are set out in your order form or subscription.</p>
  <h2>Your responsibilities</h2><p>You are responsible for the accuracy of information you enter, for decisions you take as an employer, and for obtaining employee consents where required.</p>
  <h2>Information on this website</h2><p>Articles and FAQs are general information and not legal, tax or financial advice.</p>
  <h2>Employee data</h2><p>Employee data you enter or your employees provide is used only to run your salon's HR. We do not use it to recruit your staff or for any other purpose. Your employees may separately and voluntarily opt in to the Salon HR Verified Work History; only the records of employees who opt in are kept in it, and they are shared with other employers only with that employee's approval.</p>
  <h2>Fees and payment</h2><p>Subscription and service fees are payable as per your invoice. Optional services such as PF/ESI management and background verification are billed as used.</p>
  <h2>Intellectual property</h2><p>The platform, content and brand belong to ${CONFIG.company}. Your data remains yours.</p>
  <h2>Limitation of liability</h2><p>To the extent permitted by law, our liability is limited to the fees paid by you for the service in the three months before the claim.</p>
  <h2>Governing law</h2><p>These terms are governed by the laws of India, and the courts at the city of our registered office have jurisdiction.</p>`},
 refund:{title:'Refund & Cancellation Policy',body:`<p>You may cancel your Salon HR subscription at any time with 30 days' written notice to ${CONFIG.leadEmail}. Fees for the current billing period are not refunded, and access continues until its end.</p><p>Charges for completed background verification checks and statutory filings already made are non-refundable. If we fail to deliver a paid service, we will redo it or refund the fee for that service.</p><p>On cancellation you can export your data for 60 days, after which it is deleted except where the law requires us to retain it.</p>`}
};
