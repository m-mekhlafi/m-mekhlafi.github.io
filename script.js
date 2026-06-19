/* ==========================================================================
   PORTFOLIO ARCHITECTURE - SECURE, STABLE & OPTIMIZED JS (FINAL)
   ========================================================================== */

/* ----------------------------------------------------------
   1. SPA NAVIGATION (Single Page Application Router)
---------------------------------------------------------- */
function showView(targetId) {
    const views = document.querySelectorAll('.view');
    const hero = document.getElementById('view-hero');

    if (!hero) return;

    if (targetId === 'view-hero') {
        hero.classList.remove('compact');
        views.forEach(v => {
            if (v.id !== 'view-hero') v.classList.remove('active-view');
        });
    } else {
        hero.classList.add('compact');
        views.forEach(v => {
            if (v.id !== 'view-hero') {
                if (v.id === targetId) {
                    v.classList.add('active-view');
                } else {
                    v.classList.remove('active-view');
                }
            }
        });
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.target === targetId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ----------------------------------------------------------
   2. MOBILE HAMBURGER MENU
---------------------------------------------------------- */
function closeMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');

    navLinks?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
}

function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('.nav-btn').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

/* ----------------------------------------------------------
   3. DYNAMIC CYBER SKILLS GENERATOR
---------------------------------------------------------- */
function initCyberSkills() {
    document.querySelectorAll('.cyber-skill-card').forEach(card => {
        const progress = parseInt(card.getAttribute('data-progress'), 10) || 0;
        const skillNameEl = card.querySelector('.skill-name');
        const skillNameHTML = skillNameEl ? skillNameEl.outerHTML : '';

        const activeStars = Math.round(progress / 20);
        let starsHTML = '<div class="cyber-stars-rating">';
        for(let i = 0; i < 5; i++) {
            starsHTML += `<span class="star-node ${i < activeStars ? 'active' : ''}"></span>`;
        }
        starsHTML += '</div>';

        let status = "GATHERING_DATA";
        if (progress === 100) status = "MAXIMUM_CAPACITY";
        else if (progress >= 80) status = "ADVANCED_STABLE";
        else if (progress >= 60) status = "SECURE_OPERATIONAL";
        else if (progress >= 40) status = "INITIALIZING...";

        card.innerHTML = `
            <div class="card-glitch-overlay"></div>
            <div class="skill-header">
                ${skillNameHTML}
                ${starsHTML}
            </div>
            <div class="progress-track-wrapper">
                <div class="progress-energy-fill" style="width: 0%; transition: width 1.5s ease-out;"></div>
                <div class="scan-glow-particle"></div>
            </div>
            <div class="skill-footer-meta">
                <span class="status-indicator-text">STATUS: ${status}</span>
                <span class="percentage-counter">${progress}%</span>
            </div>
        `;

        setTimeout(() => {
            const fillBar = card.querySelector('.progress-energy-fill');
            if (fillBar) fillBar.style.width = `${progress}%`;
        }, 100);
    });
}

/* ----------------------------------------------------------
   4. ADVANCED LANGUAGE SWITCHER
---------------------------------------------------------- */
const LANG_CONFIG = {
    en: { dir: 'ltr', label: 'English', bodyClass: '' },
    ar: { dir: 'rtl', label: 'عربي', bodyClass: 'lang-ar' },
    tr: { dir: 'ltr', label: 'Türkçe', bodyClass: '' }
};

let currentLang = 'en';

function switchLanguage(targetLang) {
    if (!LANG_CONFIG[targetLang]) return;

    const html = document.documentElement;
    const body = document.body;
    const config = LANG_CONFIG[targetLang];

    html.setAttribute('lang', targetLang);
    html.setAttribute('data-lang', targetLang);
    html.setAttribute('dir', config.dir);

    body.classList.remove('lang-ar');
    if (config.bodyClass) body.classList.add(config.bodyClass);

    const currentLangText = document.getElementById('currentLangText');
    if (currentLangText) currentLangText.textContent = config.label;

    const translatables = document.querySelectorAll('[data-en], [data-ar]');
    translatables.forEach(el => {
        let text = el.getAttribute(`data-${targetLang}`);
        if (!text && targetLang === 'tr') {
            text = el.getAttribute('data-en');
        }
        if (text !== null) {
            el.innerHTML = text; // في switchLanguage
        }
    });

    currentLang = targetLang;

    // تحديث نصوص نافذة تفاصيل المشروع النشطة حالياً إذا كانت مفتوحة لضمان تزامن اللغات
    const detailTitle = document.getElementById('detail-title');
    const detailDesc = document.getElementById('detail-desc');
    if (detailTitle && detailTitle.getAttribute(`data-${targetLang}`)) {
        detailTitle.innerText = detailTitle.getAttribute(`data-${targetLang}`);
    }
    if (detailDesc && detailDesc.getAttribute(`data-${targetLang}`)) {
        detailDesc.innerText = detailDesc.getAttribute(`data-${targetLang}`);
    }
}

function initLangDropdown() {
    const langBtn = document.getElementById('langToggleBtn');
    const langMenu = document.getElementById('langMenu');
    const langOptions = document.querySelectorAll('.lang-option');

    if (!langBtn || !langMenu) return;

    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('show');
        langBtn.setAttribute('aria-expanded', langMenu.classList.contains('show'));
    });

    document.addEventListener('click', () => {
        langMenu.classList.remove('show');
        langBtn.setAttribute('aria-expanded', 'false');
    });

    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            const selectedLang = e.target.getAttribute('data-lang-val');
            if (selectedLang) {
                switchLanguage(selectedLang);
                langMenu.classList.remove('show');
            }
        });
    });
}

/* ----------------------------------------------------------
   5. CTA BUTTON ROUTING
---------------------------------------------------------- */
function initCtaButtons() {
    document.querySelectorAll('[data-target]:not(.nav-btn)').forEach(el => {
        el.addEventListener('click', () => {
            const target = el.dataset.target;
            if (target) showView(target);
        });
    });
}

/* ----------------------------------------------------------
   6. THEME TOGGLE (True Light / Dark Mode)
---------------------------------------------------------- */
function initThemeToggle() {
    const themeInput = document.getElementById('theme-input');
    if (!themeInput) return;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
        themeInput.checked = false;
    } else {
        document.documentElement.classList.remove('light-mode');
        themeInput.checked = true;
    }

    themeInput.addEventListener('change', () => {
        if (themeInput.checked) {
            document.documentElement.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    });
}

/* ----------------------------------------------------------
7. PROJECT DETAILS MODAL / VIEW (UPGRADED & SECURE)
----------------------------------------------------------*/
function initProjectDetails() {
    // الرابط الافتراضي لحسابك في حال نسيان إضافة رابط المستودع لأي مشروع
    const DEFAULT_GITHUB = 'https://github.com/m-mekhlafi';

    document.querySelectorAll('.project-card').forEach(card => {
        card.style.cursor = 'pointer';

        card.addEventListener('click', (e) => {
            // [حماية هندسية]: منع فتح النافذة إذا ضغط المستخدم على رابط فعلي (مثل زر عرض الـ README) داخل الكرت
            if (e.target.closest('a') && !e.target.closest('a').classList.contains('view-details-btn')) {
                return;
            }

            // 1. استخراج العناصر الأساسية
            const titleEl = card.querySelector('.project-title');
            const descEl = card.querySelector('.project-desc');
            const thumbHtml = card.querySelector('.project-thumb, .thumb-placeholder')?.innerHTML || '';

            if (!titleEl || !descEl) return;

            // 2. استخراج المعرفات والروابط (يدعم data-id و data-project)
            const projectId = card.getAttribute('data-id') || card.getAttribute('data-project') || 'unknown-project';
            const githubUrl = card.getAttribute('data-github-url') || DEFAULT_GITHUB;

            // 3. استخراج النصوص المترجمة
            const titleEn = titleEl.getAttribute('data-en') || titleEl.innerText;
            const titleAr = titleEl.getAttribute('data-ar') || titleEl.innerText;
            const descEn = descEl.getAttribute('data-en') || descEl.innerText;
            const descAr = descEl.getAttribute('data-ar') || descEl.innerText;

            // 4. استهداف عناصر النافذة الكبرى (Modal)
            const detailTitle = document.getElementById('detail-title');
            const detailDesc = document.getElementById('detail-desc');
            const detailMedia = document.getElementById('detail-media');
            const detailGithub = document.getElementById('detail-github-link');

            // 5. حقن البيانات في النافذة
            if (detailTitle) {
                detailTitle.setAttribute('data-en', titleEn);
                detailTitle.setAttribute('data-ar', titleAr);
                detailTitle.innerText = currentLang === 'ar' ? titleAr : titleEn;
            }

            if (detailDesc) {
                detailDesc.setAttribute('data-en', descEn);
                detailDesc.setAttribute('data-ar', descAr);
                detailDesc.innerText = currentLang === 'ar' ? descAr : descEn;
            }

            if (detailMedia) {
                detailMedia.innerHTML = thumbHtml.trim() ? thumbHtml : '';
            }

            if (detailGithub) {
                // هنا يتم تحديث رابط زر الجيتهاب ديناميكياً بناءً على الكرت المضغوط
                detailGithub.setAttribute('href', githubUrl);
            }
            // أضف هذا التحقق لضمان عدم حدوث خطأ إذا لم يتم العثور على أي عنصر
            if (!detailTitle || !detailDesc || !detailMedia || !detailGithub) {
                console.warn("[-] Project Detail elements not found in DOM.");
                return;
            }

            // 6. نظام المشاركة الديناميكي (Dynamic Sharing System)
            const fullTargetUrl = `${window.location.origin}${window.location.pathname}?viewProject=${encodeURIComponent(projectId)}`;
            const shareText = currentLang === 'ar'
                ? `إليك مشروعي البرمجي الاحترافي: ${titleAr}`
                : `Check out my software project: ${titleEn}`;

            // دالة مساعدة لتقليل تكرار الكود وتسريع التنفيذ
            const setShareLink = (id, url) => {
                const el = document.getElementById(id);
                if (el) el.setAttribute('href', url);
            };

            setShareLink('share-twitter', `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullTargetUrl)}`);
            setShareLink('share-facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullTargetUrl)}`);
            setShareLink('share-whatsapp', `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + fullTargetUrl)}`);
            setShareLink('share-reddit', `https://www.reddit.com/submit?url=${encodeURIComponent(fullTargetUrl)}&title=${encodeURIComponent(shareText)}`);

            // 7. نظام النسخ الآمن للحافظة (Secure Clipboard Copy)
            const copyBtn = document.getElementById('share-copy');
            if (copyBtn) {
                // استنساخ الزر لمسح أي مستمعات أحداث (Event Listeners) قديمة لمنع التكرار
                const newCopyBtn = copyBtn.cloneNode(true);
                copyBtn.parentNode.replaceChild(newCopyBtn, copyBtn);

                newCopyBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(fullTargetUrl).then(() => {
                        newCopyBtn.style.color = 'var(--green)';
                        newCopyBtn.style.borderColor = 'var(--green)';

                        setTimeout(() => {
                            newCopyBtn.style.color = '';
                            newCopyBtn.style.borderColor = '';
                        }, 1500);
                    }).catch(err => {
                        console.error('[-] Security Alert: Clipboard access denied or failed.', err);
                    });
                });
            }

            // 8. إظهار النافذة بعد اكتمال التحضير
            showView('view-project-details');
        });
    });
}
/* ----------------------------------------------------------
   7.2 AUTOMATIC DEEP-LINK ROUTER (Cybersecurity Hardened)
---------------------------------------------------------- */
function checkIncomingSharedLinks() {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedProjectId = urlParams.get('viewProject');

    if (sharedProjectId) {
        try {
            // تطهير المدخلات لمنع الرموز الخبيثة من كسر محرك استعلامات المتصفح
            const sanitizedId = CSS.escape(sharedProjectId);
            const targetCard = document.querySelector(`.project-card[data-id="${sanitizedId}"]`);
            if (targetCard) {
                setTimeout(() => {
                    targetCard.click();
                }, 300);
            }
        } catch (error) {
            console.error("[-] Cybersecurity Alert: Malformed selector injection blocked.");
        }
    }
}

/* ----------------------------------------------------------
   8. SECURE AJAX MAIL TRANSMISSION (Stealth Formspree)
---------------------------------------------------------- */
function initFormspreeAjax() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const submitBtn = form?.querySelector('.quantum-transmit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');

    if (!form || !status || !submitBtn || !btnText) return;

    // متغير لتخزين وقت آخر إرسال (خارج المستمع لمنع التكرار)
    let lastSubmit = 0;

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // 🛡️ صمام أمان: منع الإرسال المتكرر إذا لم تمر 10 ثوانٍ
        if (Date.now() - lastSubmit < 10000) {
            status.style.display = "block";
            status.className = "form-status-message error-status";
            status.innerHTML = currentLang === 'ar'
                ? "[-] يرجى الانتظار قبل محاولة الإرسال مجدداً."
                : "[-] Rate limit hit: Please wait before transmitting again.";
            return;
        }

        const formData = new FormData(form);
        const originalBtnText = btnText.innerHTML;

        // تحديث حالة الزر
        btnText.innerHTML = currentLang === 'ar' ? 'جاري التشفير...' : 'Encrypting...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('https://formspree.io/f/maqzqoyp', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            status.style.display = "block";

            if (response.ok) {
                // تحديث وقت الإرسال الناجح فقط لمنع حظر المستخدم العشوائي
                lastSubmit = Date.now();

                status.className = "form-status-message success-status";
                status.innerHTML = currentLang === 'ar'
                    ? "[+] تم الإرسال بنجاح: البيانات مشفرة وآمنة."
                    : "[+] Transmission Successful: Data Encrypted & Sent.";
                form.reset();
            } else {
                throw new Error('Server Error');
            }
        } catch (error) {
            status.style.displa
  /* ----------------------------------------------------------
   8. SECURE AJAX MAIL TRANSMISSION (Stealth Formspree)
---------------------------------------------------------- */
            function initFormspreeAjax() {
                const form = document.getElementById('contact-form');
                const status = document.getElementById('form-status');
                const submitBtn = form?.querySelector('.quantum-transmit-btn');
                const btnText = submitBtn?.querySelector('.btn-text');

                if (!form || !status || !submitBtn || !btnText) return;

                // We define lastSubmit outside the event listener so it tracks time correctly
                let lastSubmit = 0;

                form.addEventListener('submit', async function(event) {
                    event.preventDefault();

                    // Rate Limiter: Prevent spamming the button
                    if (Date.now() - lastSubmit < 10000) {
                        status.style.display = "block";
                        status.className = "form-status-message error-status";
                        status.innerHTML = currentLang === 'ar'
                            ? "[-] يرجى الانتظار 10 ثوانٍ قبل الإرسال مجدداً."
                            : "[-] Rate limit hit: Wait 10 seconds before transmitting.";

                        setTimeout(() => { status.style.display = "none"; }, 5000);
                        return;
                    }

                    const formData = new FormData(form);
                    const originalBtnText = btnText.innerHTML;

                    // UI Update: Show loading state
                    btnText.innerHTML = currentLang === 'ar' ? 'جاري التشفير...' : 'Encrypting...';
                    submitBtn.disabled = true;

                    try {
                        // Your correct Formspree Endpoint
                        const response = await fetch('https://formspree.io/f/maqzqoyp', {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'Accept': 'application/json'
                            }
                        });

                        status.style.display = "block";

                        if (response.ok) {
                            // Only update the timer if the transmission was actually successful
                            lastSubmit = Date.now();

                            status.className = "form-status-message success-status";
                            status.innerHTML = currentLang === 'ar'
                                ? "[+] تم الإرسال بنجاح: البيانات مشفرة وآمنة."
                                : "[+] Transmission Successful: Data Encrypted & Sent.";
                            form.reset(); // Clear the form
                        } else {
                            // If Formspree rejects it (e.g., bad data), throw an error
                            throw new Error('Server Error');
                        }
                    } catch (error) {
                        // This runs if fetch fails (e.g., no internet, blocked by adblock, or server error)
                        status.style.display = "block";
                        status.className = "form-status-message error-status";
                        status.innerHTML = currentLang === 'ar'
                            ? "[-] خطأ: فشل تشفير الاتصال الحركي."
                            : "[-] Connection Error: Quantum link handshake failed.";
                        console.error("Formspree Error:", error); // Log the actual error to the console for debugging
                    } finally {
                        // Restore button state regardless of success or failure
                        btnText.innerHTML = originalBtnText;
                        submitBtn.disabled = false;

                        // Hide the status message after 5 seconds
                        setTimeout(() => {
                            status.style.display = "none";
                        }, 5000);
                    }
                });
            }
/* ----------------------------------------------------------
   9. MAIN INITIALIZATION (On DOM Load)
---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            if (target) showView(target);
        });
    });

    document.getElementById('btn-back-projects')?.addEventListener('click', () => {
        showView('view-projects');
    });

    // تشغيل المكونات باستقرار كامل وبترتيب منطقي آمن
    initCtaButtons();
    initCyberSkills();
    initHamburger();
    initLangDropdown();
    initProjectDetails();
    initThemeToggle();
    initFormspreeAjax();

    checkIncomingSharedLinks();

    showView('view-hero');
});
const atmLangs = {
    en: { header: "AL-MEKHLAFI ATM", dep: "Deposit", with: "Withdraw", success: "Success!" },
    ar: { header: "صراف المخلافي الآلي", dep: "إيداع", with: "سحب", success: "تمت العملية!" }
};

// وبدلاً من مصفوفات الـ C++ (Names/Pins)، سنستخدم مصفوفة كائنات (Array of Objects) في JS:
let users = [
    { name: "Mohammed", pin: 1234, balance: 500 }
];
/* ----------------------------------------------------------
   10. CYBER PRELOADER LOGIC
---------------------------------------------------------- */
// نستخدم window.addEventListener('load') بدلاً من DOMContentLoaded
// لأنه يضمن تحميل كل الصور والمحتوى قبل إخفاء الشاشة
window.addEventListener('load', () => {
    const preloader = document.getElementById('cyber-preloader');

    if (preloader) {
        // إضافة تأخير متعمد بسيط (مثلاً ثانية ونصف) لكي يستمتع الزائر برؤية الأنيميشن
        // يمكنك تعديل الرقم 1500 (1.5 ثانية) حسب رغبتك، أو حذفه ليختفي فوراً
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    }
});