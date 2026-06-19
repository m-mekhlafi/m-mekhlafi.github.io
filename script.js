/* ==========================================================================
   PORTFOLIO ARCHITECTURE - SECURE, STABLE & OPTIMIZED JS
   ========================================================================== */

/* ----------------------------------------------------------
   1. SPA NAVIGATION
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
                v.classList.toggle('active-view', v.id === targetId);
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
    document.getElementById('navLinks')?.classList.remove('open');
    document.getElementById('hamburger')?.setAttribute('aria-expanded', 'false');
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
        const progress     = parseInt(card.getAttribute('data-progress'), 10) || 0;
        const skillNameEl  = card.querySelector('.skill-name');
        const skillNameHTML = skillNameEl ? skillNameEl.outerHTML : '';
        const activeStars  = Math.round(progress / 20);

        let starsHTML = '<div class="cyber-stars-rating">';
        for (let i = 0; i < 5; i++) {
            starsHTML += `<span class="star-node ${i < activeStars ? 'active' : ''}"></span>`;
        }
        starsHTML += '</div>';

        let status = 'GATHERING_DATA';
        if      (progress === 100) status = 'MAXIMUM_CAPACITY';
        else if (progress >= 80)   status = 'ADVANCED_STABLE';
        else if (progress >= 60)   status = 'SECURE_OPERATIONAL';
        else if (progress >= 40)   status = 'INITIALIZING...';

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
            const fill = card.querySelector('.progress-energy-fill');
            if (fill) fill.style.width = `${progress}%`;
        }, 100);
    });
}

/* ----------------------------------------------------------
   4. LANGUAGE SWITCHER
---------------------------------------------------------- */
const LANG_CONFIG = {
    en: { dir: 'ltr', label: 'English',  bodyClass: '' },
    ar: { dir: 'rtl', label: 'عربي',     bodyClass: 'lang-ar' },
    tr: { dir: 'ltr', label: 'Türkçe',   bodyClass: '' }
};

let currentLang = 'en';

function switchLanguage(targetLang) {
    if (!LANG_CONFIG[targetLang]) return;

    const html   = document.documentElement;
    const body   = document.body;
    const config = LANG_CONFIG[targetLang];

    html.setAttribute('lang',      targetLang);
    html.setAttribute('data-lang', targetLang);
    html.setAttribute('dir',       config.dir);

    body.classList.remove('lang-ar');
    if (config.bodyClass) body.classList.add(config.bodyClass);

    const currentLangText = document.getElementById('currentLangText');
    if (currentLangText) currentLangText.textContent = config.label;

    document.querySelectorAll('[data-en], [data-ar]').forEach(el => {
        let text = el.getAttribute(`data-${targetLang}`);
        if (!text && targetLang === 'tr') text = el.getAttribute('data-en');
        if (text !== null) el.innerHTML = text;
    });

    currentLang = targetLang;

    // تحديث نافذة تفاصيل المشروع إن كانت مفتوحة
    const detailTitle = document.getElementById('detail-title');
    const detailDesc  = document.getElementById('detail-desc');
    if (detailTitle?.getAttribute(`data-${targetLang}`)) {
        detailTitle.innerText = detailTitle.getAttribute(`data-${targetLang}`);
    }
    if (detailDesc?.getAttribute(`data-${targetLang}`)) {
        detailDesc.innerText = detailDesc.getAttribute(`data-${targetLang}`);
    }
}

function initLangDropdown() {
    const langBtn     = document.getElementById('langToggleBtn');
    const langMenu    = document.getElementById('langMenu');
    const langOptions = document.querySelectorAll('.lang-option');

    if (!langBtn || !langMenu) return;

    langBtn.addEventListener('click', e => {
        e.stopPropagation();
        const isOpen = langMenu.classList.toggle('show');
        langBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', () => {
        langMenu.classList.remove('show');
        langBtn.setAttribute('aria-expanded', 'false');
    });

    langOptions.forEach(option => {
        option.addEventListener('click', e => {
            const lang = e.target.getAttribute('data-lang-val');
            if (lang) {
                switchLanguage(lang);
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
   6. THEME TOGGLE
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
   7. PROJECT DETAILS MODAL
---------------------------------------------------------- */
function initProjectDetails() {
    const DEFAULT_GITHUB = 'https://github.com/m-mekhlafi';

    document.querySelectorAll('.project-card').forEach(card => {
        card.style.cursor = 'pointer';

        card.addEventListener('click', e => {
            if (e.target.closest('a') && !e.target.closest('a').classList.contains('view-details-btn')) return;

            const titleEl    = card.querySelector('.project-title');
            const descEl     = card.querySelector('.project-desc');
            const thumbHtml  = card.querySelector('.project-thumb, .thumb-placeholder')?.innerHTML || '';

            if (!titleEl || !descEl) return;

            const projectId  = card.getAttribute('data-id') || card.getAttribute('data-project') || 'unknown-project';
            const githubUrl  = card.getAttribute('data-github-url') || DEFAULT_GITHUB;

            const titleEn = titleEl.getAttribute('data-en') || titleEl.innerText;
            const titleAr = titleEl.getAttribute('data-ar') || titleEl.innerText;
            const descEn  = descEl.getAttribute('data-en')  || descEl.innerText;
            const descAr  = descEl.getAttribute('data-ar')  || descEl.innerText;

            const detailTitle  = document.getElementById('detail-title');
            const detailDesc   = document.getElementById('detail-desc');
            const detailMedia  = document.getElementById('detail-media');
            const detailGithub = document.getElementById('detail-github-link');

            if (!detailTitle || !detailDesc || !detailMedia || !detailGithub) {
                console.warn('[-] Project Detail elements not found in DOM.');
                return;
            }

            detailTitle.setAttribute('data-en', titleEn);
            detailTitle.setAttribute('data-ar', titleAr);
            detailTitle.innerText = currentLang === 'ar' ? titleAr : titleEn;

            detailDesc.setAttribute('data-en', descEn);
            detailDesc.setAttribute('data-ar', descAr);
            detailDesc.innerText = currentLang === 'ar' ? descAr : descEn;

            detailMedia.innerHTML = thumbHtml.trim() ? thumbHtml : '';
            detailGithub.setAttribute('href', githubUrl);

            // Dynamic Share Links
            const fullUrl   = `${window.location.origin}${window.location.pathname}?viewProject=${encodeURIComponent(projectId)}`;
            const shareText = currentLang === 'ar'
                ? `إليك مشروعي البرمجي الاحترافي: ${titleAr}`
                : `Check out my software project: ${titleEn}`;

            const setShareLink = (id, url) => {
                const el = document.getElementById(id);
                if (el) el.setAttribute('href', url);
            };

            setShareLink('share-twitter',  `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}`);
            setShareLink('share-facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`);
            setShareLink('share-whatsapp', `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + fullUrl)}`);
            setShareLink('share-reddit',   `https://www.reddit.com/submit?url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(shareText)}`);

            // Clipboard Copy — clone to remove stale listeners
            const copyBtn = document.getElementById('share-copy');
            if (copyBtn) {
                const newCopyBtn = copyBtn.cloneNode(true);
                copyBtn.parentNode.replaceChild(newCopyBtn, copyBtn);

                newCopyBtn.addEventListener('click', e => {
                    e.preventDefault();
                    navigator.clipboard.writeText(fullUrl).then(() => {
                        newCopyBtn.style.color        = 'var(--green)';
                        newCopyBtn.style.borderColor  = 'var(--green)';
                        setTimeout(() => {
                            newCopyBtn.style.color       = '';
                            newCopyBtn.style.borderColor = '';
                        }, 1500);
                    }).catch(err => {
                        console.error('[-] Clipboard access denied.', err);
                    });
                });
            }

            showView('view-project-details');
        });
    });
}

/* ----------------------------------------------------------
   7.2 DEEP-LINK ROUTER
---------------------------------------------------------- */
function checkIncomingSharedLinks() {
    const params          = new URLSearchParams(window.location.search);
    const sharedProjectId = params.get('viewProject');

    if (!sharedProjectId) return;

    try {
        const sanitizedId = CSS.escape(sharedProjectId);
        const targetCard  = document.querySelector(`.project-card[data-id="${sanitizedId}"]`);
        if (targetCard) setTimeout(() => targetCard.click(), 300);
    } catch (err) {
        console.error('[-] Malformed selector injection blocked.');
    }
}

/* ----------------------------------------------------------
   8. AJAX CONTACT FORM (Formspree)
---------------------------------------------------------- */
function initFormspreeAjax() {
    const form      = document.getElementById('contact-form');
    const status    = document.getElementById('form-status');
    const submitBtn = form?.querySelector('.quantum-transmit-btn');
    const btnText   = submitBtn?.querySelector('.btn-text');

    if (!form || !status || !submitBtn || !btnText) return;

    let lastSubmit = 0;

    form.addEventListener('submit', async e => {
        e.preventDefault();

        // Rate limit: 10 seconds between submissions
        if (Date.now() - lastSubmit < 10_000) {
            status.style.display = 'block';
            status.className     = 'form-status-message error-status';
            status.innerHTML     = currentLang === 'ar'
                ? '[-] يرجى الانتظار قبل محاولة الإرسال مجدداً.'
                : '[-] Rate limit: Please wait before transmitting again.';
            return;
        }

        const formData       = new FormData(form);
        const originalBtnTxt = btnText.innerHTML;

        btnText.innerHTML  = currentLang === 'ar' ? 'جاري التشفير...' : 'Encrypting...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('https://formspree.io/f/maqzqoyp', {
                method:  'POST',
                body:    formData,
                headers: { 'Accept': 'application/json' }
            });

            status.style.display = 'block';

            if (response.ok) {
                lastSubmit       = Date.now();
                status.className = 'form-status-message success-status';
                status.innerHTML = currentLang === 'ar'
                    ? '[+] تم الإرسال بنجاح: البيانات مشفرة وآمنة.'
                    : '[+] Transmission Successful: Data Encrypted & Sent.';
                form.reset();
            } else {
                throw new Error('Server Error');
            }

        } catch (err) {
            status.style.display = 'block';
            status.className     = 'form-status-message error-status';
            status.innerHTML     = currentLang === 'ar'
                ? '[-] خطأ: فشل تشفير الاتصال.'
                : '[-] Connection Error: Quantum link handshake failed.';
        } finally {
            btnText.innerHTML  = originalBtnTxt;
            submitBtn.disabled = false;
            setTimeout(() => { status.style.display = 'none'; }, 5000);
        }
    });
}

/* ----------------------------------------------------------
   9. MAIN INITIALIZATION
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

/* ----------------------------------------------------------
   10. CYBER PRELOADER
---------------------------------------------------------- */
window.addEventListener('load', () => {
    const preloader = document.getElementById('cyber-preloader');
    if (!preloader) return;

    setTimeout(() => {
        preloader.style.opacity    = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    }, 1500);
});