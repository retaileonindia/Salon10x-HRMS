import re

def css_of(path):
    h = open(path).read()
    a = h.index('<style>') + 7
    b = h.index('</style>')
    return h[a:b]

def strip_comments(c):
    return re.sub(r'/\*.*?\*/', '', c, flags=re.S)

def pre_sel(sel, P):
    sel = sel.strip()
    if not sel:
        return sel
    if sel.startswith(':root'):
        rest = sel[5:]
        return (':root' + rest + ' ' + P) if rest else P
    if sel == 'html':
        return 'html'
    if sel.startswith('body'):
        return P + sel[4:]
    if sel == '*':
        return P + ',' + P + ' *'
    return P + ' ' + sel

def prefix_css(css, P, suffix):
    css = strip_comments(css)
    css = re.sub(r'#(app|modal|mbody|toast)\b', lambda m: '#' + m.group(1) + '-' + suffix, css)
    out = []
    i = 0
    n = len(css)
    while i < n:
        j = css.find('{', i)
        if j < 0:
            break
        head = css[i:j].strip()
        if head.startswith('@media') or head.startswith('@supports'):
            depth = 1; k = j + 1
            while depth:
                if css[k] == '{': depth += 1
                elif css[k] == '}': depth -= 1
                k += 1
            inner = css[j + 1:k - 1]
            out.append(head + '{' + prefix_css(inner, P, suffix) + '}')
            i = k
            continue
        k = css.index('}', j)
        body = css[j + 1:k]
        sels = ','.join(pre_sel(s, P) for s in head.split(','))
        out.append(sels + '{' + body + '}')
        i = k + 1
    return '\n'.join(out)

def js_tx(code, app, suffix):
    code = re.sub(r"#(app|modal|mbody|toast)(?![-\w])", lambda m: '#' + m.group(1) + '-' + suffix, code)
    code = code.replace("id==='modal'", "id==='modal-" + suffix + "'")
    code = code.replace("const $=s=>document.querySelector(s);", "const $=s=>document.getElementById('" + app + "-root').querySelector(s);")
    code = code.replace('document.addEventListener(', '__on(').replace('window.addEventListener(', '__onw(')
    pre = ("const __on=(t,f)=>document.addEventListener(t,e=>{if(window.__APP==='%s')return f(e)});"
           "const __onw=(t,f)=>window.addEventListener(t,e=>{if(window.__APP==='%s')return f(e)});") % (app, app)
    k = code.index('{') + 1
    assert code.count("document.getElementById('" + app + "-root').querySelector") >= 1, app + ' $ not replaced'
    return code[:k] + pre + code[k:]

site_css = prefix_css(css_of('site_shell.html'), '.m-site', 'site')
hrms_css = prefix_css(css_of('hrms_shell.html'), '.m-hrms', 'hrms')
con_css = prefix_css(css_of('console_shell.html'), '.m-console', 'console')

site_js = js_tx(open('site_content.js').read() + open('site_app.js').read(), 'site', 'site')
hrms_js = js_tx(''.join(open(f).read() for f in ['core.js', 'docs.js', 'owner.js', 'rest.js', 'emp.js', 'ext.js', 'retain.js', 'vwh.js', 'init.js']), 'hrms', 'hrms')
con_js = js_tx(open('console.js').read(), 'console', 'console')

modal_site = '<div id="modal-site" class="modal" hidden><div class="sheet" role="dialog" aria-modal="true"><button class="btn x" data-act="close" aria-label="Close" style="min-height:36px;padding:6px 10px">✕</button><div id="mbody-site"></div></div></div><div id="toast-site" role="status"></div>'
modal_app = lambda s: f'<div id="modal-{s}" class="modal" hidden><div class="sheet"><button class="btn s x" data-act="closeModal" aria-label="Close">Close</button><div id="mbody-{s}"></div></div></div><div id="toast-{s}" role="status"></div>'

platform_js = r"""
window.__APP='site';
window.PLATFORM={apps:{},bus:{},on(e,f){(this.bus[e]=this.bus[e]||[]).push(f)},emit(e,d){(this.bus[e]||[]).forEach(f=>{try{f(d)}catch(x){console.error(x)}})}};
function __route(){const h=location.hash.slice(1);let app='site',mode=null;
  if(h==='app-admin'){app='hrms';mode='admin'}else if(h==='app-staff'){app='hrms';mode='staff'}else if(h==='app-console'){app='console'}
  window.__APP=app;['site','hrms','console'].forEach(a=>{document.getElementById(a+'-root').hidden=a!==app});
  const A=PLATFORM.apps[app];if(A&&A.show)A.show(mode)}
window.addEventListener('hashchange',__route);
"""

stack_obs = """new MutationObserver(()=>{for(const c of document.querySelectorAll('.stack td:not([data-l])')){let i=0,p=c;while(p=p.previousElementSibling)i+=p.colSpan;c.dataset.l=c.closest('table').rows[0].cells[i]?.textContent||''}}).observe(document,{childList:true,subtree:true})"""

html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Salon HR — HR partner for salons</title>
<meta name="description" content="Salon HR: one platform for salon owners, managers, staff and the Salon HR team — recruitment, onboarding, attendance, payroll, compliance and exit.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
/* VOICE: one warm, expert platform for salon owners, staff and the Salon HR team
   IDEA: a salon's front desk — the website is the shopfront, each login opens the right room
   PICTURE: each part keeps its own working screen; the website hero pairs the promise with the enquiry form
   COLOUR+TYPE: lipstick berry, blush and brass throughout; Outfit headings, Inter text
   LAYOUT: website full-width bands; admin and console with a berry rail; staff app phone-first with a bottom bar */
html,body{margin:0}
[hidden]{display:none!important}
.m-site,.m-hrms,.m-console{min-height:100vh}
@@site_css@@
@@hrms_css@@
@@con_css@@
</style>
<script>@@stack_obs@@</script>
</head>
<body>
<div id="site-root" class="m-site"><div id="app-site"></div>@@modal_site@@</div>
<div id="hrms-root" class="m-hrms" hidden><div id="app-hrms"></div>@@modal_hrms@@</div>
<div id="console-root" class="m-console" hidden><div id="app-console"></div>@@modal_console@@</div>
<script>@@platform_js@@</script>
<script>
@@site_js@@
</script>
<script>
@@hrms_js@@
</script>
<script>
@@con_js@@
</script>
<script>__route();</script>
</body>
</html>
"""
for k,v in [('site_css',site_css),('hrms_css',hrms_css),('con_css',con_css),('stack_obs',stack_obs),('modal_site',modal_site),('modal_hrms',modal_app('hrms')),('modal_console',modal_app('console')),('platform_js',platform_js),('site_js',site_js),('hrms_js',hrms_js),('con_js',con_js)]:
    html=html.replace('@@'+k+'@@',v)
open('salonhr-platform.html', 'w').write(html)
open('/tmp/site_js.js', 'w').write(site_js)
open('/tmp/hrms_js.js', 'w').write(hrms_js)
open('/tmp/con_js.js', 'w').write(con_js)
print(len(html))
