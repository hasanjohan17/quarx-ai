// Main JS for DevTools Hub — inject header/footer and initialize tools
(function(){
  'use strict';

  const headerHTML = `
  <nav class="nav">
    <div class="brand">
      <a href="./" class="site-brand" data-i18n="brand">Quarx AI</a>
      <span class="muted" data-i18n="tagline">Free online tools</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">🌙</button>
      <button class="lang-toggle" id="lang-toggle" aria-label="Toggle language">EN</button>
      <button class="nav-toggle" id="nav-toggle" aria-label="Open menu">☰</button>
    </div>
    <div class="nav-links" id="nav-links">
      <a href="./" data-i18n="nav.home">Home</a>
      <a href="./categories/developer-tools.html" data-i18n="nav.developer">Developer</a>
      <a href="./categories/daily-tools.html" data-i18n="nav.daily">Daily</a>
    </div>
  </nav>
  <div class="nav-mobile hidden" id="nav-mobile">
    <div class="nav-links">
      <a href="./" data-i18n="nav.home">Home</a>
      <a href="./categories/developer-tools.html" data-i18n="nav.developer">Developer Tools</a>
      <a href="./categories/daily-tools.html" data-i18n="nav.daily">Daily Tools</a>
    </div>
  </div>`;

  const footerHTML = `
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-section">
        <div class="footer-branding">
          <div class="footer-logo">
            <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" class="footer-icon">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#00D4D4;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#9D4EDD;stop-opacity:1" />
                </linearGradient>
              </defs>
              <circle cx="60" cy="60" r="55" fill="url(#grad)" opacity="0.1"/>
              <circle cx="60" cy="60" r="48" fill="none" stroke="url(#grad)" stroke-width="2"/>
              <text x="60" y="75" font-size="48" font-weight="bold" text-anchor="middle" fill="url(#grad)" letter-spacing="-2">Q</text>
              <circle cx="75" cy="45" r="4" fill="#00D4D4" opacity="0.8"/>
              <circle cx="82" cy="52" r="3" fill="#9D4EDD" opacity="0.6"/>
              <circle cx="78" cy="62" r="2.5" fill="#00D4D4" opacity="0.7"/>
            </svg>
            <span data-i18n="brand">Quarx AI</span>
          </div>
          <p class="footer-tagline" data-i18n="tagline">Free online tools</p>
        </div>
      </div>
      <div class="footer-section">
        <h4 class="footer-heading" data-i18n="footer.pages">Pages</h4>
        <nav class="footer-links">
          <a href="./about.html" data-i18n="footer.about">About</a>
          <a href="./privacy.html" data-i18n="footer.privacy">Privacy Policy</a>
          <a href="./contact.html" data-i18n="footer.contact">Contact</a>
        </nav>
      </div>
      <div class="footer-section">
        <h4 class="footer-heading" data-i18n="footer.categories">Categories</h4>
        <nav class="footer-links">
          <a href="./categories/developer-tools.html" data-i18n="home.filter.developer">Developer</a>
          <a href="./categories/daily-tools.html" data-i18n="home.filter.daily">Daily Tools</a>
        </nav>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} <span data-i18n="brand">Quarx AI</span> — All rights reserved</p>
    </div>
  </footer>`;

  function el(id){return document.getElementById(id)}

  document.addEventListener('DOMContentLoaded', function(){
    const hdr = document.getElementById('site-header');
    const ftr = document.getElementById('site-footer');
    if(hdr) hdr.innerHTML = headerHTML;
    if(ftr) ftr.innerHTML = footerHTML;

    const page = document.body.getAttribute('data-page') || '';
    // i18n strings (UI only, not tool-specific names)
    const i18n = {
      en: {
        'brand': 'Quarx AI', 'tagline':'Free online tools',
        'nav.home':'Home','nav.developer':'Developer','nav.daily':'Daily',
        'footer.about':'About','footer.privacy':'Privacy Policy','footer.contact':'Contact','footer.pages':'Pages','footer.categories':'Categories',
        'about.title':'About Quarx AI','about.lead':'Quarx AI offers fast, privacy-friendly online utilities for developers and everyday users. We focus on speed, simplicity and reliability.',
        'privacy.title':'Privacy Policy','privacy.lead':'This policy explains how Quarx AI handles data and respects your privacy.',
        'contact.title':'Contact','contact.lead':'We\'d love to hear from you. Use the form below to send feedback or report an issue.',
        'contact.label.name':'Name','contact.label.email':'Email','contact.label.message':'Message','contact.btn.send':'Send','contact.btn.reset':'Reset',
        'contact.placeholder.name':'Your name','contact.placeholder.email':'you@example.com','contact.placeholder.message':'How can we help?',
        'contact.social.title':'Connect with Us','contact.social.lead':'You can also reach us on social media:',
        'tts.title':'Text to Speech','tts.description':'Use your browser\'s SpeechSynthesis to read text aloud.','tts.label.text':'Text','tts.placeholder':'Enter text to speak','tts.btn.speak':'Speak','tts.btn.stop':'Stop','tts.voice.label':'Voice','tts.rate.label':'Rate','tts.pitch.label':'Pitch',
        'tts.lang.label':'Language','tts.gender.label':'Gender',
        'tool.word_counter':'Word Counter','tool.color_generator':'Color Generator','tool.box_shadow':'Box Shadow','tool.password_generator':'Password Generator','tool.image_compressor':'Image Compressor','tool.qr_code':'QR Code','tool.age_calculator':'Age Calculator','tool.unit_converter':'Unit Converter','tool.pomodoro':'Pomodoro',
        'wc.lead':'Counts words, characters and estimates read time.','wc.label.text':'Text','wc.placeholder':'Paste your text here...','wc.stat.words':'Words','wc.stat.chars':'Characters','wc.stat.sentences':'Sentences','wc.stat.read':'Read','wc.btn.copy':'Copy Text','wc.btn.clear':'Clear','wc.btn.reset':'Reset',
        'cg.lead':'Generate colors and palettes.','cg.label.hex':'HEX','cg.label.rgb':'RGB','cg.label.hsl':'HSL','cg.btn.generate':'Generate','cg.btn.copy_hex':'Copy HEX','cg.btn.copy_rgb':'Copy RGB',
        'bs.lead':'Interactive shadow builder with live preview.','bs.label.h':'Horizontal (px)','bs.label.v':'Vertical (px)','bs.label.blur':'Blur (px)','bs.label.spread':'Spread (px)','bs.label.color':'Color','bs.label.inset':'Inset','bs.label.preview':'Preview','bs.label.output':'CSS Output','bs.btn.copy':'Copy CSS','bs.btn.reset':'Reset',
        'pw.lead':'Create strong passwords with options.','pw.label.length':'Length','pw.opt.upper':'Include uppercase','pw.opt.lower':'Include lowercase','pw.opt.numbers':'Include numbers','pw.opt.symbols':'Include symbols','pw.btn.generate':'Generate','pw.btn.copy':'Copy','pw.label.output':'Password',
        'ic.lead':'Upload an image and compress it in the browser.','ic.label.quality':'Quality','ic.btn.compress':'Compress','ic.btn.download':'Download',
        'age.lead':'Compute age from a birth date.','age.label.birthdate':'Birthdate','age.btn.calc':'Calculate','age.btn.reset':'Reset','age.label.result':'Result',
        'uc.lead':'Convert between common length and weight units.','uc.label.type':'Type','uc.opt.length':'Length','uc.opt.weight':'Weight','uc.placeholder.value':'Value','uc.btn.convert':'Convert','uc.btn.copy':'Copy','uc.label.result':'Result',
        'pom.lead':'25/5 minute focus cycles with notifications.','pom.btn.start':'Start','pom.btn.stop':'Stop','pom.btn.reset':'Reset',
        'qr.lead':'Enter text or a URL to create a QR code.','qr.label.input':'Text or URL','qr.placeholder.input':'Enter URL or text...','qr.btn.generate':'Generate','qr.btn.copy':'Copy Image URL','qr.label.preview':'QR Preview',
        'home.title':'Free Online Tools for Everyday Use','home.lead':'Quarx AI offers lightweight, fast and free web tools for developers and non-technical users — all in one place.','home.search.placeholder':'Search tools (e.g. json, qr, word)','home.filter.all':'All Categories','home.filter.developer':'Developer Tools','home.filter.daily':'Daily Tools','home.cat.developer':'Developer Tools','home.cat.developer.lead':'JSON formatter, CSS shadow, Base64, HTML minifier, password generator and more.','home.cat.daily':'Daily Tools','home.cat.daily.lead':'Word counter, QR generator, age calculator, pomodoro and handy utilities.','home.browse':'Browse','home.open':'Open','home.pop.json.lead':'Format and validate JSON.','home.pop.word.lead':'Quickly count words and chars.','home.pop.color.lead':'Generate and copy HEX/RGB/HSL values.','home.pop.qr.lead':'Generate QR codes quickly.','home.pop.image.lead':'Compress images in your browser.',
        'cat.dev.title':'Developer Tools','cat.dev.lead':'Helpful utilities for developers and students.','cat.dev.json.desc':'Format and validate JSON.','cat.dev.shadow.desc':'Build box-shadows visually.','cat.dev.color.desc':'Generate colors and palettes.','cat.dev.base64.desc':'Encode or decode Base64 strings.','cat.dev.html.desc':'Minify HTML for production.','cat.dev.pwd.desc':'Create secure random passwords.',
        'cat.daily.title':'Daily Tools','cat.daily.lead':'Simple utilities for everyday users.','cat.daily.word.desc':'Count words and characters.','cat.daily.img.desc':'Frontend image compression demo.','cat.daily.tts.desc':'Read text aloud with browser API.','cat.daily.qr.desc':'Generate QR codes quickly.','cat.daily.age.desc':'Calculate age from birthdate.','cat.daily.unit.desc':'Length, weight and more.','cat.daily.pom.desc':'Simple focus timer with notifications.'
      },
      ar: {
        'brand': 'Quarx AI', 'tagline':'أدوات مجانية على الإنترنت',
        'nav.home':'الرئيسية','nav.developer':'مطورون','nav.daily':'يومي',
        'footer.about':'من نحن','footer.privacy':'سياسة الخصوصية','footer.contact':'اتصل بنا','footer.pages':'الصفحات','footer.categories':'الفئات',
        'about.title':'حول Quarx AI','about.lead':'نوفر أدوات عملية وسريعة مع احترام الخصوصية. تعمل معظم الأدوات على جهازك المحلي دون إرسال بيانات.',
        'privacy.title':'سياسة الخصوصية','privacy.lead':'تشرح هذه السياسة كيفية تعامل Quarx AI مع البيانات وتحترم خصوصيتك.',
        'contact.title':'اتصل بنا','contact.lead':'نرحب بتواصلكم. استخدم النموذج لإرسال ملاحظات أو الإبلاغ عن مشكلة.',
        'contact.label.name':'الاسم','contact.label.email':'البريد الإلكتروني','contact.label.message':'الرسالة','contact.btn.send':'إرسال','contact.btn.reset':'إعادة ضبط',
        'contact.placeholder.name':'اسمك','contact.placeholder.email':'you@example.com','contact.placeholder.message':'كيف يمكننا المساعدة؟',
        'contact.social.title':'تواصل معنا','contact.social.lead':'يمكنك أيضًا الوصول إلينا عبر وسائل التواصل:',
        'tts.title':'تحويل النص إلى كلام','tts.description':'استخدم متصفحك لقراءة النص بصوت مسموع.','tts.label.text':'النص','tts.placeholder':'أدخل النص المراد قراءته','tts.btn.speak':'تشغيل','tts.btn.stop':'إيقاف','tts.voice.label':'الصوت','tts.rate.label':'السرعة','tts.pitch.label':'نبرة الصوت',
        'tts.lang.label':'اللغة','tts.gender.label':'الجنس',
        'tool.word_counter':'عداد الكلمات','tool.color_generator':'مولد الألوان','tool.box_shadow':'ظل الصندوق','tool.password_generator':'مولد كلمات المرور','tool.image_compressor':'ضغط الصورة','tool.qr_code':'رمز الاستجابة السريعة','tool.age_calculator':'حاسبة العمر','tool.unit_converter':'محول الوحدات','tool.pomodoro':'مؤقت بومودورو','tool.json_formatter':'JSON Formatter','tool.text_to_speech':'نص إلى صوت',
        'wc.lead':'يحسب الكلمات والأحرف ويقدّر زمن القراءة.','wc.label.text':'النص','wc.placeholder':'ألصق النص هنا...','wc.stat.words':'الكلمات','wc.stat.chars':'الأحرف','wc.stat.sentences':'الجمل','wc.stat.read':'وقت القراءة','wc.btn.copy':'نسخ النص','wc.btn.clear':'مسح','wc.btn.reset':'إعادة ضبط',
        'cg.lead':'توليد ألوان ولوحات ألوان.','cg.label.hex':'HEX','cg.label.rgb':'RGB','cg.label.hsl':'HSL','cg.btn.generate':'توليد','cg.btn.copy_hex':'نسخ HEX','cg.btn.copy_rgb':'نسخ RGB',
        'bs.lead':'أداة تفاعلية لإنشاء الظل مع معاينة مباشرة.','bs.label.h':'أفقي (بكسل)','bs.label.v':'عمودي (بكسل)','bs.label.blur':'تمويه (بكسل)','bs.label.spread':'انتشار (بكسل)','bs.label.color':'اللون','bs.label.inset':'داخلي','bs.label.preview':'معاينة','bs.label.output':'مخرجات CSS','bs.btn.copy':'نسخ CSS','bs.btn.reset':'إعادة ضبط',
        'pw.lead':'إنشاء كلمات مرور قوية مع خيارات.','pw.label.length':'الطول','pw.opt.upper':'تضمين أحرف كبيرة','pw.opt.lower':'تضمين أحرف صغيرة','pw.opt.numbers':'تضمين أرقام','pw.opt.symbols':'تضمين رموز','pw.btn.generate':'توليد','pw.btn.copy':'نسخ','pw.label.output':'كلمة المرور',
        'ic.lead':'حمّل صورة واضغطها في المتصفح.','ic.label.quality':'الجودة','ic.btn.compress':'ضغط','ic.btn.download':'تحميل',
        'age.lead':'احسب العمر من تاريخ الميلاد.','age.label.birthdate':'تاريخ الميلاد','age.btn.calc':'احسب','age.btn.reset':'إعادة ضبط','age.label.result':'النتيجة',
        'uc.lead':'تحويل بين وحدات الطول والوزن الشائعة.','uc.label.type':'النوع','uc.opt.length':'الطول','uc.opt.weight':'الوزن','uc.placeholder.value':'القيمة','uc.btn.convert':'تحويل','uc.btn.copy':'نسخ','uc.label.result':'النتيجة',
        'pom.lead':'دورات تركيز 25/5 دقيقة مع إشعارات.','pom.btn.start':'ابدأ','pom.btn.stop':'إيقاف','pom.btn.reset':'إعادة ضبط',

        'qr.lead':'أدخل نصًا أو عنوان URL لإنشاء رمز استجابة سريعة.','qr.label.input':'نص أو رابط','qr.placeholder.input':'أدخل رابطًا أو نصًا...','qr.btn.generate':'توليد','qr.btn.copy':'نسخ رابط الصورة','qr.label.preview':'معاينة QR',
        'home.title':'أدوات مجانية على الإنترنت للاستخدام اليومي','home.lead':'Quarx AI يقدم أدوات ويب خفيفة وسريعة ومجانية للمطورين والمستخدمين.','home.search.placeholder':'ابحث عن أدوات (مثال: json, qr, word)','home.filter.all':'جميع الفئات','home.filter.developer':'أدوات المطورين','home.filter.daily':'أدوات يومية','home.cat.developer':'أدوات المطورين','home.cat.developer.lead':'معرّف JSON، ظل CSS، Base64، تصغير HTML، مولد كلمات مرور والمزيد.','home.cat.daily':'أدوات يومية','home.cat.daily.lead':'عداد الكلمات، جيل رموز QR، حاسبة العمر، بومودورو، الملاحظات وأدوات مفيدة.','home.browse':'تصفح','home.open':'افتح','home.pop.json.lead':'تنسيق والتحقق من JSON.','home.pop.word.lead':'احسب الكلمات والأحرف بسرعة.','home.pop.color.lead':'توليد ونسخ قيم HEX/RGB/HSL.','home.pop.qr.lead':'أنشئ رموز QR بسهولة.','home.pop.image.lead':'اضغط الصور في متصفحك.',
        'cat.dev.title':'أدوات المطورين','cat.dev.lead':'أدوات مفيدة للمطورين والطلاب.','cat.dev.json.desc':'تنسيق والتحقق من JSON.','cat.dev.shadow.desc':'إنشاء ظلال الصناديق بصريًا.','cat.dev.color.desc':'توليد الألوان واللوحات.','cat.dev.base64.desc':'ترميز أو فك ترميز سلاسل Base64.','cat.dev.html.desc':'تصغير HTML للإنتاج.','cat.dev.pwd.desc':'إنشاء كلمات مرور عشوائية آمنة.',
        'cat.daily.title':'أدوات يومية','cat.daily.lead':'أدوات بسيطة للمستخدمين اليوميين.','cat.daily.word.desc':'عد الكلمات والأحرف.','cat.daily.img.desc':'ضغط الصور بدون رفع أو فقدان.','cat.daily.tts.desc':'قراءة النص بصوت مسموع.','cat.daily.qr.desc':'توليد رموز QR بسرعة.','cat.daily.age.desc':'احسب العمر من تاريخ الميلاد.','cat.daily.unit.desc':'تحويل الطول والوزن والمزيد.','cat.daily.pom.desc':'مؤقت بومودورو بسيط مع إشعارات.'
      }
    };

    // language pref
    const langPref = localStorage.getItem('quarx-lang') || 'en';
    function applyLang(lang){
      const dict = i18n[lang] || i18n.en;
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const key = el.getAttribute('data-i18n');
        if(dict[key]) el.textContent = dict[key];
      });
      // placeholders
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
        const key = el.getAttribute('data-i18n-placeholder');
        if(dict[key]) el.placeholder = dict[key];
      });
      // page titles mapping
      if(document.body.dataset.page){
        if(/tool-tts/.test(document.body.dataset.page)) document.title = dict['tts.title'] + ' — ' + dict['brand'];
        else if(/about/.test(document.body.dataset.page)) document.title = dict['about.title'] + ' — ' + dict['brand'];
        else if(/privacy/.test(document.body.dataset.page)) document.title = dict['privacy.title'] + ' — ' + dict['brand'];
        else if(/contact/.test(document.body.dataset.page)) document.title = dict['contact.title'] + ' — ' + dict['brand'];
        else if(/category-developer/.test(document.body.dataset.page)) document.title = dict['cat.dev.title'] + ' — ' + dict['brand'];
        else if(/category-daily/.test(document.body.dataset.page)) document.title = dict['cat.daily.title'] + ' — ' + dict['brand'];
        else if(/tool-/.test(document.body.dataset.page)){
          // generic tool page title update
          const toolTitle = document.querySelector('.tool-title');
          if(toolTitle && toolTitle.textContent) document.title = toolTitle.textContent + ' — ' + dict['brand'];
        }
      }
      // html lang and dir
      document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      // update lang toggle label
      const lt = document.getElementById('lang-toggle'); if(lt) lt.textContent = lang === 'ar' ? 'AR' : 'EN';
    }
    applyLang(langPref);
    const langToggle = document.getElementById('lang-toggle');
    if(langToggle) langToggle.addEventListener('click', ()=>{
      const next = document.documentElement.lang === 'ar' ? 'en' : 'ar';
      const currentPath = window.location.pathname;
      let newPath = currentPath;
      
      if(next === 'ar' && !currentPath.includes('/ar/')) {
        // إنجليزي → عربي: أضف /ar/
        newPath = currentPath === '/' ? '/ar/' : '/ar' + currentPath;
      } else if(next === 'en' && currentPath.includes('/ar/')) {
        // عربي → إنجليزي: احذف /ar/
        newPath = currentPath.replace('/ar/', '/');
      }
      
      // احفظ اللغة المختارة
      localStorage.setItem('quarx-lang', next);
      // انقل للصفحة الجديدة
      window.location.href = newPath;
    });
    // schedule tool initializers during idle time to improve load
    function scheduleInit(fn){
      if('requestIdleCallback' in window) requestIdleCallback(fn, {timeout:1000});
      else setTimeout(fn, 300);
    }
    if(/json/.test(page)) scheduleInit(initJSONTool);
    if(/word/.test(page)) scheduleInit(initWordCounter);
    if(/color/.test(page)) scheduleInit(initColorGenerator);
    if(/box-shadow|shadow/.test(page)) scheduleInit(initBoxShadow);
    if(/base64/.test(page)) scheduleInit(initBase64);
    if(/html-minifier|minifier/.test(page)) scheduleInit(initHtmlMinifier);
    if(/password/.test(page)) scheduleInit(initPasswordGenerator);
    if(/image-compressor|compressor/.test(page)) scheduleInit(initImageCompressor);
    if(/tts|text-to-speech/.test(page)) scheduleInit(initTTS);
    if(/qr/.test(page)) scheduleInit(initQR);
    if(/age/.test(page)) scheduleInit(initAgeCalculator);
    if(/unit/.test(page)) scheduleInit(initUnitConverter);
    if(/pomodoro/.test(page)) scheduleInit(initPomodoro);

    // categories and homepage search/filter
    const searchInput = document.getElementById('tool-search');
    const filterSelect = document.getElementById('filter-category');
    if(searchInput){
      searchInput.addEventListener('input', ()=>filterCards(searchInput.value, filterSelect && filterSelect.value));
    }
    if(filterSelect){
      filterSelect.addEventListener('change', ()=>filterCards(searchInput && searchInput.value, filterSelect.value));
    }

    // mobile nav toggle - ensure it works properly
    const navToggle = document.getElementById('nav-toggle');
    const navMobile = document.getElementById('nav-mobile');
    if(navToggle && navMobile){
      navToggle.addEventListener('click', (e)=>{
        e.stopPropagation();
        navMobile.classList.toggle('hidden');
        navToggle.setAttribute('aria-expanded', !navMobile.classList.contains('hidden'));
      });
      // close mobile nav when clicking on a link
      document.querySelectorAll('#nav-mobile a').forEach(link=>{
        link.addEventListener('click', ()=>{
          navMobile.classList.add('hidden');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
      // close mobile nav when clicking outside
      document.addEventListener('click', (e)=>{
        if(!navToggle.contains(e.target) && !navMobile.contains(e.target) && !navMobile.classList.contains('hidden')){
          navMobile.classList.add('hidden');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // theme toggle: load saved pref or system, accessible control
    const themeToggle = document.getElementById('theme-toggle');
    const userPref = localStorage.getItem('devtools-theme');
    const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    function applyTheme(theme){
      if(theme === 'dark') document.body.setAttribute('data-theme','dark');
      else document.body.removeAttribute('data-theme');
      if(themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      }
    }
    const initial = userPref || (systemDark ? 'dark' : 'light');
    applyTheme(initial);
    if(themeToggle){
      themeToggle.addEventListener('click', ()=>{
        const current = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('devtools-theme', next);
      });
      themeToggle.addEventListener('keyup', (e)=>{ if(e.key === 'Enter' || e.key === ' ') themeToggle.click(); });
    }

    // attach universal copy/reset controls to panels with inputs/textareas
    function attachControlBars(){
      document.querySelectorAll('.panel').forEach(panel=>{
        if(panel.querySelector('.control-bar')) return; // already added
        const hasInput = panel.querySelector('textarea, input[type="text"], input[type="email"], input[type="url"], .code');
        if(!hasInput) return;
        const bar = document.createElement('div'); bar.className = 'control-bar';
        const copy = document.createElement('button'); copy.className = 'btn btn-ghost'; copy.type='button'; copy.textContent='Copy';
        const reset = document.createElement('button'); reset.className = 'btn btn-ghost'; reset.type='button'; reset.textContent='Reset';
        bar.appendChild(copy); bar.appendChild(reset); panel.appendChild(bar);
        copy.addEventListener('click', ()=>{
          const t = panel.querySelector('textarea, input[type="text"], .code'); if(!t) return;
          copyText(t.value || t.textContent || '');
        });
        reset.addEventListener('click', ()=>{
          const t = panel.querySelector('textarea, input, .code'); if(!t) return;
          if(t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') t.value=''; else t.textContent='';
          t.dispatchEvent(new Event('input'));
        });
      });
    }
    scheduleInit(attachControlBars);
  });

  // utilities
  function copyText(text){
    if(!navigator.clipboard) {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try{ document.execCommand('copy'); }catch(e){}
      ta.remove();
      return;
    }
    navigator.clipboard.writeText(text).catch(()=>{});
  }

  function filterCards(query, category){
    query = (query||'').toLowerCase().trim();
    const cards = document.querySelectorAll('.cards .card');
    cards.forEach(card=>{
      const title = (card.querySelector('h3') && card.querySelector('h3').textContent.toLowerCase())||'';
      const desc = (card.querySelector('p') && card.querySelector('p').textContent.toLowerCase())||'';
      const tags = (card.getAttribute('data-tags')||'') + ' ' + (card.getAttribute('data-category')||'');
      const matchesQuery = !query || title.includes(query) || desc.includes(query) || tags.includes(query);
      const matchesCategory = !category || category === 'all' || (card.getAttribute('data-category')||'') === category;
      card.style.display = (matchesQuery && matchesCategory) ? '' : 'none';
    });
  }

  // JSON Formatter
  function initJSONTool(){
    const input = el('json-input');
    const output = el('json-output');
    const formatBtn = el('format-btn');
    const minifyBtn = el('minify-btn');
    const validateBtn = el('validate-btn');
    const copyInputBtn = el('copy-input-btn');
    const copyOutputBtn = el('copy-output-btn');

    formatBtn.addEventListener('click', ()=>{
      try{
        const obj = JSON.parse(input.value);
        output.value = JSON.stringify(obj, null, 2);
      }catch(e){
        output.value = 'Invalid JSON: ' + e.message;
      }
    });

    minifyBtn.addEventListener('click', ()=>{
      try{
        const obj = JSON.parse(input.value);
        output.value = JSON.stringify(obj);
      }catch(e){ output.value = 'Invalid JSON: ' + e.message; }
    });

    validateBtn.addEventListener('click', ()=>{
      try{ JSON.parse(input.value); output.value = 'Valid JSON'; }
      catch(e){ output.value = 'Invalid JSON: ' + e.message; }
    });

    copyInputBtn.addEventListener('click', ()=>copyText(input.value || ''));
    copyOutputBtn.addEventListener('click', ()=>copyText(output.value || ''));
  }

  // Word Counter
  function initWordCounter(){
    const ta = el('wc-input');
    const words = el('wc-words');
    const chars = el('wc-chars');
    const sentences = el('wc-sentences');
    const time = el('wc-time');
    const copyBtn = el('wc-copy');
    const clearBtn = el('wc-clear');

    function calc(){
      const text = ta.value.trim();
      chars.textContent = text.length;
      const w = text.length ? text.split(/\s+/).filter(Boolean).length : 0;
      words.textContent = w;
      const s = (text.match(/[.!?]+/g)||[]).length;
      sentences.textContent = s;
      const minutes = Math.max(1, Math.ceil(w / 200));
      time.textContent = minutes + ' min';
    }

    ta.addEventListener('input', calc);
    copyBtn.addEventListener('click', ()=>copyText(ta.value));
    clearBtn.addEventListener('click', ()=>{ ta.value=''; calc(); });
    calc();
  }

  // Color Generator
  function hexToRgb(hex){
    const h = hex.replace('#','');
    const bigint = parseInt(h,16);
    return [(bigint>>16)&255, (bigint>>8)&255, bigint&255];
  }
  function rgbToHsl(r,g,b){
    r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b);
    let h=0,s=0,l=(max+min)/2; if(max!==min){
      const d=max-min; s = l>0.5?d/(2-max-min):d/(max+min);
      switch(max){case r: h=(g-b)/d + (g<b?6:0); break; case g: h=(b-r)/d+2; break; default: h=(r-g)/d+4}
      h/=6;
    }
    return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
  }

  function initColorGenerator(){
    const sw = el('color-swatch');
    const hexIn = el('hex');
    const rgbIn = el('rgb');
    const hslIn = el('hsl');
    const gen = el('gen-color');
    const copyHex = el('copy-hex');
    const copyRgb = el('copy-rgb');

    function setColor(hex){
      sw.style.background = hex;
      const [r,g,b] = hexToRgb(hex);
      const hsl = rgbToHsl(r,g,b);
      hexIn.value = hex.toUpperCase();
      rgbIn.value = `rgb(${r}, ${g}, ${b})`;
      hslIn.value = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
    }

    function genRandom(){
      const hex = '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');
      setColor(hex);
    }

    gen.addEventListener('click', genRandom);
    copyHex.addEventListener('click', ()=>copyText(hexIn.value));
    copyRgb.addEventListener('click', ()=>copyText(rgbIn.value));
    genRandom();
  }

  // Box shadow generator
  function initBoxShadow(){
    const x = el('shadow-x');
    const y = el('shadow-y');
    const blur = el('shadow-blur');
    const spread = el('shadow-spread');
    const color = el('shadow-color');
    const inset = el('shadow-inset');
    const preview = el('preview-box');
    const cssOut = el('css-output');
    const copyCss = el('copy-css');
    const reset = el('reset-shadow');

    function update(){
      const vals = `${x.value}px ${y.value}px ${blur.value}px ${spread.value}px ${color.value}`;
      const insetStr = inset.checked ? 'inset ' : '';
      const css = `box-shadow: ${insetStr}${x.value}px ${y.value}px ${blur.value}px ${spread.value}px ${color.value};`;
      preview.style.boxShadow = `${insetStr}${x.value}px ${y.value}px ${blur.value}px ${spread.value}px ${color.value}`;
      cssOut.value = css;
    }

    [x,y,blur,spread,color,inset].forEach(i=>i.addEventListener('input', update));
    copyCss.addEventListener('click', ()=>copyText(cssOut.value));
    reset.addEventListener('click', ()=>{
      x.value=10;y.value=10;blur.value=20;spread.value=0;color.value='#000000';inset.checked=false;update();
    });
    update();
  }

  // Base64
  function initBase64(){
    const input = el('b64-input');
    const output = el('b64-output');
    const enc = el('b64-encode');
    const dec = el('b64-decode');
    const copy = el('b64-copy');
    const reset = el('b64-reset');
    if(enc) enc.addEventListener('click', ()=>{ try{ output.value = btoa(unescape(encodeURIComponent(input.value))); }catch(e){ output.value = 'Encode error'; } });
    if(dec) dec.addEventListener('click', ()=>{ try{ output.value = decodeURIComponent(escape(atob(input.value))); }catch(e){ output.value = 'Decode error'; } });
    if(copy) copy.addEventListener('click', ()=>copyText(output.value));
    if(reset) reset.addEventListener('click', ()=>{ input.value=''; output.value=''; });
  }

  // HTML Minifier
  function initHtmlMinifier(){
    const inEl = el('html-input');
    const outEl = el('html-output');
    const btn = el('html-minify');
    const copy = el('html-copy');
    const reset = el('html-reset');
    if(btn) btn.addEventListener('click', ()=>{
      let v = inEl.value || '';
      v = v.replace(/<!--([\s\S]*?)-->/g, '');
      v = v.replace(/\s{2,}/g, ' ');
      v = v.replace(/>\s+</g, '><').trim();
      outEl.value = v;
    });
    if(copy) copy.addEventListener('click', ()=>copyText(outEl.value));
    if(reset) reset.addEventListener('click', ()=>{ inEl.value=''; outEl.value=''; });
  }

  // Password Generator
  function initPasswordGenerator(){
    const out = el('pw-output');
    const genBtn = el('pw-generate');
    const copyBtn = el('pw-copy');
    function gen(){
      const len = parseInt(el('pw-length').value)||16;
      const upper = el('pw-upper').checked;
      const lower = el('pw-lower').checked;
      const nums = el('pw-numbers').checked;
      const syms = el('pw-symbols').checked;
      let chars = '';
      if(lower) chars += 'abcdefghijklmnopqrstuvwxyz';
      if(upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if(nums) chars += '0123456789';
      if(syms) chars += '!@#$%^&*()-_=+[]{}|;:,.<>?~';
      if(!chars) chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let pw = '';
      for(let i=0;i<len;i++){ pw += chars.charAt(Math.floor(Math.random()*chars.length)); }
      out.value = pw;
    }
    if(genBtn) genBtn.addEventListener('click', gen);
    if(copyBtn) copyBtn.addEventListener('click', ()=>copyText(out.value));
    gen();
  }

  // Image Compressor (frontend demo)
  function initImageCompressor(){
    const file = el('img-file');
    const quality = el('img-quality');
    const preview = el('img-preview');
    const download = el('download-img');
    if(!file) return;
    document.getElementById('compress-btn').addEventListener('click', ()=>{
      const f = file.files && file.files[0]; if(!f) return alert('Select an image');
      const reader = new FileReader();
      reader.onload = function(e){
        const img = new Image(); img.onload = function(){
          const canvas = document.createElement('canvas'); canvas.width = img.width; canvas.height = img.height;
          const ctx = canvas.getContext('2d'); ctx.drawImage(img,0,0);
          const q = Math.max(0.1, (parseInt(quality.value)||80)/100);
          const mime = 'image/jpeg';
          const data = canvas.toDataURL(mime, q);
          preview.src = data; download.href = data; download.download = 'compressed.jpg';
        }; img.src = e.target.result;
      }; reader.readAsDataURL(f);
    });
  }

  // Text to Speech
  function initTTS(){
    const ta = el('tts-input');
    const speak = el('tts-speak');
    const stop = el('tts-stop');
    const voiceSel = el('voice-select');
    const rateEl = el('tts-rate');
    const pitchEl = el('tts-pitch');
    if(!speak || !ta) return;
    let utter = null;
    const synth = window.speechSynthesis;

    function normalizeText(txt){
      if(!txt) return '';
      // basic normalization: collapse spaces, ensure sentences end with punctuation
      let t = txt.replace(/[\u2018\u2019]/g,"'").replace(/[\u201C\u201D]/g,'"');
      t = t.replace(/\s+/g,' ').trim();
      if(t && !/[.!?]$/.test(t)) t = t + '.';
      return t;
    }

    const langSel = el('tts-lang');
    const genderSel = el('tts-gender');

    function detectGender(v){
      const n = (v.name || '').toLowerCase();
      if(/female|woman|girl|zira|sara|sara|amina|amina|sara|female/i.test(n)) return 'female';
      if(/male|man|boy|alex|david|daniel|john|ahmed|omar/i.test(n)) return 'male';
      return 'unknown';
    }

    function populateVoices(){
      const voices = synth.getVoices() || [];
      if(!voiceSel) return;
      voiceSel.innerHTML = '';
      const langFilter = langSel && langSel.value ? langSel.value : 'any';
      const genderFilter = genderSel && genderSel.value ? genderSel.value : 'any';
      let filtered = voices.slice();
      if(langFilter !== 'any'){
        filtered = filtered.filter(v=> (v.lang||'').toLowerCase().startsWith(langFilter));
      }
      if(genderFilter !== 'any'){
        filtered = filtered.filter(v=> detectGender(v) === genderFilter);
      }
      // sort: prefer exact lang matches and English first
      filtered.sort((a,b)=>{
        const ae = /(en|ar)/.test(a.lang||''); const be = /(en|ar)/.test(b.lang||'');
        if(ae && !be) return -1; if(!ae && be) return 1; return a.name.localeCompare(b.name);
      });
      filtered.forEach(v=>{
        const opt = document.createElement('option');
        opt.value = v.name; opt.setAttribute('data-lang', v.lang || ''); opt.setAttribute('data-gender', detectGender(v));
        opt.textContent = v.name + ' (' + (v.lang||'') + ')';
        voiceSel.appendChild(opt);
      });
      // select a default: prefer exact language selection
      if(voiceSel.options.length){
        let chosenIndex = 0;
        for(let i=0;i<voiceSel.options.length;i++){
          const opt = voiceSel.options[i];
          if(langSel && langSel.value !== 'any' && opt.getAttribute('data-lang').toLowerCase().startsWith(langSel.value)) { chosenIndex = i; break; }
          if(opt.getAttribute('data-lang').toLowerCase().startsWith('en')){ chosenIndex = i; break; }
        }
        voiceSel.selectedIndex = chosenIndex;
      }
    }

    if('onvoiceschanged' in synth) synth.onvoiceschanged = populateVoices;
    // repopulate when language or gender changes
    if(langSel) langSel.addEventListener('change', populateVoices);
    if(genderSel) genderSel.addEventListener('change', populateVoices);
    populateVoices();

    function speakText(){
      const text = normalizeText(ta.value);
      if(!text) return;
      speechSynthesis.cancel();
      utter = new SpeechSynthesisUtterance(text);
      const selName = voiceSel && voiceSel.value;
      const available = synth.getVoices() || [];
      let chosen = available.find(v=>v.name === selName);
      // if none chosen, try to find by selected language
      const selectedLang = langSel && langSel.value !== 'any' ? langSel.value : null;
      if(!chosen && selectedLang){
        chosen = available.find(v=> (v.lang||'').toLowerCase().startsWith(selectedLang));
      }
      if(!chosen) chosen = available.find(v=>/en/.test(v.lang)) || available[0];
      if(chosen) utter.voice = chosen;
      // set utter.lang to the selected TTS language if present
      if(selectedLang) utter.lang = selectedLang === 'ar' ? 'ar-SA' : 'en-US';
      else utter.lang = (chosen && chosen.lang) || 'en-US';
      utter.rate = rateEl ? Math.max(0.6, Math.min(1.4, parseFloat(rateEl.value)||0.95)) : 0.95;
      utter.pitch = pitchEl ? Math.max(0.6, Math.min(2, parseFloat(pitchEl.value)||1)) : 1;
      speechSynthesis.speak(utter);
    }

    speak.addEventListener('click', ()=>{ speakText(); });
    stop.addEventListener('click', ()=>{ speechSynthesis.cancel(); });
  }

  // QR (uses public API image)
  function initQR(){
    const inp = el('qr-input');
    const btn = el('qr-gen');
    const img = el('qr-img');
    const copyBtn = el('qr-copy');
    if(!btn) return;
    btn.addEventListener('click', ()=>{
      const v = encodeURIComponent(inp.value||'');
      const src = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data='+v;
      img.src = src;
    });
    if(copyBtn) copyBtn.addEventListener('click', ()=>copyText(img.src));
  }

  // Age Calculator
  function initAgeCalculator(){
    const date = el('birthdate');
    const btn = el('age-calc');
    const res = el('age-result');
    if(btn) btn.addEventListener('click', ()=>{
      const d = new Date(date.value); if(!d || isNaN(d)) return res.textContent='Invalid date';
      const now = new Date(); let years = now.getFullYear() - d.getFullYear(); const m = now.getMonth() - d.getMonth(); if(m<0 || (m===0 && now.getDate()<d.getDate())) years--;
      res.textContent = years + ' years';
    });
    const reset = el('age-reset'); if(reset) reset.addEventListener('click', ()=>{ date.value=''; el('age-result').textContent='—'; });
  }

  // Unit Converter
  function initUnitConverter(){
    const type = el('uc-type'); const input = el('uc-input'); const from = el('uc-from'); const to = el('uc-to'); const out = el('uc-result');
    if(!type) return;
    const presets = {
      length: {units:['m','km','cm','mm','in','ft','yd','mi'], toMeter:{m:1,km:1000,cm:0.01,mm:0.001,in:0.0254,ft:0.3048,yd:0.9144,mi:1609.344}},
      weight: {units:['g','kg','lb','oz'], toGram:{g:1,kg:1000,lb:453.59237,oz:28.3495231}}
    };
    function populate(){
      const t = type.value; from.innerHTML=''; to.innerHTML=''; const units = presets[t].units; units.forEach(u=>{ from.appendChild(new Option(u,u)); to.appendChild(new Option(u,u)); });
    }
    populate(); type.addEventListener('change', populate);
    el('uc-convert').addEventListener('click', ()=>{
      const v = parseFloat(input.value); if(isNaN(v)) return out.textContent='—';
      if(type.value==='length'){ const toM = presets.length.toMeter; const resVal = v * toM[from.value] / toM[to.value]; out.textContent = resVal + ' ' + to.value; }
      else { const toG = presets.weight.toGram; const resVal = v * toG[from.value] / toG[to.value]; out.textContent = resVal + ' ' + to.value; }
    });
    el('uc-copy').addEventListener('click', ()=>copyText(out.textContent));
  }

  // Pomodoro
  function initPomodoro(){
    const display = el('pom-time'); const start = el('pom-start'); const stop = el('pom-stop'); const reset = el('pom-reset');
    let timer=null; let remaining=25*60;
    function fmt(s){ const m=Math.floor(s/60); const sec=s%60; return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0'); }
    function tick(){ if(remaining<=0){ clearInterval(timer); timer=null; if(Notification && Notification.permission==='granted') new Notification('Pomodoro finished!'); return; } remaining--; display.textContent = fmt(remaining); }
    start.addEventListener('click', ()=>{ if(timer) return; timer=setInterval(tick,1000); });
    stop.addEventListener('click', ()=>{ if(timer){ clearInterval(timer); timer=null;} });
    reset.addEventListener('click', ()=>{ if(timer){ clearInterval(timer); timer=null;} remaining=25*60; display.textContent=fmt(remaining); });
    display.textContent = fmt(remaining);
  }

  // Smooth scroll fade-in animations
  function initScrollAnimations(){
    // Add scroll-fade class to cards and panels
    document.querySelectorAll('.card, .panel, .section-title, .hero').forEach(el=>{
      el.classList.add('scroll-fade');
    });
    
    // Intersection Observer for fade-in on scroll
    const observer = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {threshold: 0.1, rootMargin: '0px 0px -50px 0px'});
    
    // Observe all elements with scroll-fade class
    document.querySelectorAll('.scroll-fade').forEach(el=>{
      observer.observe(el);
    });
  }
  
  // Initialize scroll animations after DOM is ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }

})();

