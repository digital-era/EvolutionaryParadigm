// scripts/i18n.js
document.addEventListener('DOMContentLoaded', () => {
    // Translations are expected to be globally available from translations-data.js
    // The 'translations' variable here will be a reference to that global object.
    const translations = window.siteTranslations || {}; 

    if (Object.keys(translations).length === 0) {
        console.error("Translations data (window.siteTranslations) not found or is empty. Make sure 'scripts/translations-data.js' is loaded before i18n.js and is correctly populated.");
    }

    let currentLang = localStorage.getItem('preferredLang') || 'zh-CN';

    // Fallback to the first available language if currentLang is not in translations
    // Or if 'zh-CN' (default) is not available, pick the first one.
    if (!translations[currentLang]) {
        const availableLangs = Object.keys(translations);
        if (availableLangs.length > 0) {
            console.warn(`Preferred language "${currentLang}" not found in translations. Falling back to "${availableLangs[0]}".`);
            currentLang = availableLangs[0];
            localStorage.setItem('preferredLang', currentLang); // Update stored preference
        } else {
            console.error("No languages available in translations data. Cannot apply translations.");
            return; 
        }
    }


    function applyTranslations(lang) {
        const langData = translations[lang]; 
        
        if (!langData) {
            console.warn(`No translation data found for language: "${lang}". Attempting to fallback.`);
            if (lang !== 'en' && translations['en']) {
                console.warn('Falling back to English translations.');
                applyTranslations('en'); 
            } else if (Object.keys(translations).length > 0) {
                const firstAvailableLang = Object.keys(translations)[0];
                console.warn(`Falling back to the first available language: "${firstAvailableLang}".`);
                applyTranslations(firstAvailableLang);
            } else {
                console.error("Cannot apply translations: No language data available at all.");
            }
            return;
        }

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (langData[key] !== undefined) {
                element.innerHTML = langData[key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (langData[key] !== undefined) {
                element.placeholder = langData[key];
            }
        });

        document.querySelectorAll('[data-i18n-alt]').forEach(element => {
            const key = element.getAttribute('data-i18n-alt');
            if (langData[key] !== undefined) {
                element.alt = langData[key];
            }
        });
        
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            if (langData[key] !== undefined) {
                element.title = langData[key];
            }
        });

        const pageTitleKey = document.documentElement.getAttribute('data-i18n-page-title');
        if (pageTitleKey && langData[pageTitleKey] !== undefined) {
            document.title = langData[pageTitleKey];
        }

        document.documentElement.lang = lang.startsWith('zh') ? 'zh-CN' : lang;

        document.querySelectorAll('.lang-switcher button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { 
                lang: lang,
                langData: langData 
            } 
        }));
    }

    function setLanguage(lang) {
        if (!translations[lang]) {
            const availableLangs = Object.keys(translations);
            if (availableLangs.length > 0) {
                console.warn(`Attempted to set unknown language "${lang}". Defaulting to "${availableLangs[0]}".`);
                lang = availableLangs[0];
            } else {
                console.error("Cannot set language: No languages available in translations data.");
                return; 
            }
        }
        currentLang = lang;
        localStorage.setItem('preferredLang', lang);
        applyTranslations(lang);
    }

    const langSwitcher = document.createElement('div');
    langSwitcher.classList.add('lang-switcher');
    
    const availableLangsFromData = Object.keys(translations);
    if (availableLangsFromData.includes('zh-CN')) {
        langSwitcher.innerHTML += `<button data-lang="zh-CN" class="${currentLang === 'zh-CN' ? 'active' : ''}">CN</button>`;
    }
    if (availableLangsFromData.includes('en')) {
         langSwitcher.innerHTML += `<button data-lang="en" class="${currentLang === 'en' ? 'active' : ''}">EN</button>`;
    }
    availableLangsFromData.forEach(langKey => {
        if (langKey !== 'zh-CN' && langKey !== 'en') {
            const langName = langKey.toUpperCase(); 
            langSwitcher.innerHTML += `<button data-lang="${langKey}" class="${currentLang === langKey ? 'active' : ''}">${langName}</button>`;
        }
    });

    const navbarLinks = document.querySelector('.navbar .nav-links');
    const aipegtmHeader = document.querySelector('body > .container > .header'); 

    if (navbarLinks) {
        const langSwitcherLi = document.createElement('li');
        langSwitcherLi.appendChild(langSwitcher);
        const authLinkLi = document.getElementById('auth-link');
        if (authLinkLi && authLinkLi.parentElement === navbarLinks) {
             navbarLinks.insertBefore(langSwitcherLi, authLinkLi);
        } else {
            navbarLinks.appendChild(langSwitcherLi);
        }
    } else if (aipegtmHeader && document.querySelector('html[data-i18n-page-title="aipegtm.pageTitle"]')) { 
        aipegtmHeader.appendChild(langSwitcher);
    } else {
        if (document.body) {
            document.body.insertBefore(langSwitcher, document.body.firstChild);
        } else {
            console.error("document.body not available for language switcher fallback.");
        }
    }
    
    langSwitcher.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const lang = event.target.getAttribute('data-lang');
            if (lang && lang !== currentLang) {
                setLanguage(lang);
            }
        }
    });

    setLanguage(currentLang); 

    window.applyTranslationsForElement = function(element) {
        if (!element) return;
        const langData = translations[currentLang]; 
        if (!langData) {
            console.warn(`Cannot apply translation for element: current language "${currentLang}" data not found.`);
            return;
        }

        const key = element.getAttribute('data-i18n');
        if (key && langData[key] !== undefined) {
            element.innerHTML = langData[key];
        }
    };

    window.uiTranslations = translations; 
}); // Corrected: Removed stray comma from here
