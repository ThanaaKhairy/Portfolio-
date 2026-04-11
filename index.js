// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ==================== DARK MODE TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.innerHTML = theme === 'light'
        ? '<i class="bi bi-moon-stars"></i>'
        : '<i class="bi bi-brightness-high-fill"></i>';
}

// ==================== LANGUAGE TOGGLE (EN/AR) ====================
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('language') || 'en';

// Set initial language
setLanguage(currentLang);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', currentLang);
    setLanguage(currentLang);
});

function setLanguage(lang) {
    // Update direction
    if (lang === 'ar') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        langToggle.innerHTML = '🇸🇦 AR';
    } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        langToggle.innerHTML = '🇺🇸 EN';
    }

    // Translate all elements with data-en and data-ar attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            // Handle placeholders
            if (element.placeholder) {
                element.placeholder = element.getAttribute(`data-${lang}`) || element.placeholder;
            }
        } else {
            // Handle text content
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                if (element.children.length === 0 || element.tagName === 'BUTTON') {
                    element.textContent = translation;
                } else {
                    // For elements with children, only translate text nodes if needed
                    const textNode = Array.from(element.childNodes).find(node => node.nodeType === 3);
                    if (textNode) {
                        textNode.textContent = translation;
                    }
                }
            }
        }
    });

    // Update form placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(element => {
        if (element.hasAttribute(`data-${lang}`)) {
            element.placeholder = element.getAttribute(`data-${lang}`);
        }
    });
}

// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ==================== SMOOTH SCROLL ====================
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Close mobile menu
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }

            // Smooth scroll
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== CONTACT FORM VALIDATION & SUBMISSION ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // جلب الحقول
        const nameInput = this.querySelector('input[name="name"]');
        const emailInput = this.querySelector('input[name="email"]');
        const messageInput = this.querySelector('textarea[name="message"]');

        // متغيرات التحقق
        let isValid = true;
        let errorMessage = '';

        // إزالة الأخطاء القديمة
        clearAllErrors();

        // 1. التحقق من الاسم
        if (!nameInput.value.trim()) {
            isValid = false;
            errorMessage = currentLang === 'en' ? 'Please enter your name.' : 'الرجاء إدخال اسمك';
            showError(nameInput, currentLang === 'en' ? 'Name is required' : 'الاسم مطلوب');
        } else if (nameInput.value.trim().length < 2) {
            isValid = false;
            errorMessage = currentLang === 'en' ? 'Name must be at least 2 characters.' : 'الاسم يجب أن يكون حرفين على الأقل';
            showError(nameInput, currentLang === 'en' ? 'Name must be at least 2 characters' : 'الاسم قصير جداً');
        } else {
            clearError(nameInput);
        }

        // 2. التحقق من البريد الإلكتروني
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            isValid = false;
            errorMessage = currentLang === 'en' ? 'Please enter your email address.' : 'الرجاء إدخال بريدك الإلكتروني';
            showError(emailInput, currentLang === 'en' ? 'Email is required' : 'البريد الإلكتروني مطلوب');
        } else if (!emailRegex.test(emailInput.value.trim())) {
            isValid = false;
            errorMessage = currentLang === 'en' ? 'Please enter a valid email address.' : 'الرجاء إدخال بريد إلكتروني صحيح';
            showError(emailInput, currentLang === 'en' ? 'Enter a valid email' : 'بريد إلكتروني غير صحيح');
        } else {
            clearError(emailInput);
        }

        // 3. التحقق من الرسالة
        if (!messageInput.value.trim()) {
            isValid = false;
            errorMessage = currentLang === 'en' ? 'Please enter your message.' : 'الرجاء إدخال رسالتك';
            showError(messageInput, currentLang === 'en' ? 'Message is required' : 'الرسالة مطلوبة');
        } else if (messageInput.value.trim().length < 10) {
            isValid = false;
            errorMessage = currentLang === 'en' ? 'Message must be at least 10 characters.' : 'الرسالة يجب أن تكون 10 أحرف على الأقل';
            showError(messageInput, currentLang === 'en' ? 'Message too short' : 'الرسالة قصيرة جداً');
        } else {
            clearError(messageInput);
        }

        // إذا البيانات مش صحيحة، نمنع الإرسال ونظهر الخطأ
        if (!isValid) {
            e.preventDefault();
            showNotification('error', errorMessage);
        }
        // إذا البيانات صحيحة، الفورم هيروح لـ FormSubmit وهي redirect لصفحة الشكر
        // من غير ما نعمل preventDefault
    });
}

// دالة إظهار الخطأ تحت الحقل
function showError(input, message) {
    input.classList.add('is-invalid');

    let errorDiv = input.parentElement.querySelector('.invalid-feedback');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        input.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

// دالة إزالة الخطأ من حقل واحد
function clearError(input) {
    input.classList.remove('is-invalid');
    const errorDiv = input.parentElement.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// دالة إزالة كل الأخطاء
function clearAllErrors() {
    document.querySelectorAll('.is-invalid').forEach(input => {
        input.classList.remove('is-invalid');
    });
    document.querySelectorAll('.invalid-feedback').forEach(error => {
        error.remove();
    });
}

// دالة إظهار الإشعارات
function showNotification(type, message) {
    // إزالة أي إشعار قديم
    const oldNotification = document.querySelector('.form-notification');
    if (oldNotification) {
        oldNotification.remove();
    }

    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.innerHTML = `
        <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'} me-2"></i>
        ${message}
    `;

    // إضافة الإشعار قبل الفورم
    const formCard = document.querySelector('.contact-form');
    if (formCard) {
        formCard.insertBefore(notification, formCard.firstChild);
    }

    // إظهار الإشعار
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // إخفاء الإشعار بعد 4 ثواني
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ==================== TYPING EFFECT ====================
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';

    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect when page loads
    window.addEventListener('load', typeWriter);
}

// ==================== BOOTSTRAP TABS MANUAL FIX ====================
document.addEventListener('DOMContentLoaded', function() {
    // اختيار كل الأزرار
    const tabButtons = document.querySelectorAll('#skillsTab .nav-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabButtons.length > 0) {
        // إخفاء كل المحتوى ما عدا أول واحد
        tabPanes.forEach((pane, index) => {
            if (index !== 0) {
                pane.classList.remove('show', 'active');
            } else {
                pane.classList.add('show', 'active');
            }
        });

        // لما تضغط على أي زر
        tabButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();

                // شيل active من كل الأزرار
                tabButtons.forEach(btn => btn.classList.remove('active'));

                // ضيف active للزر المضغوط
                this.classList.add('active');

                // جيب الـ id المستهدف
                const targetId = this.getAttribute('data-bs-target');

                // أخفي كل المحتوى
                tabPanes.forEach(pane => {
                    pane.classList.remove('show', 'active');
                });

                // ظهر المحتوى المطلوب
                const targetPane = document.querySelector(targetId);
                if (targetPane) {
                    targetPane.classList.add('show', 'active');
                }
            });
        });
    }
});

// ==================== FIX FOR RTL/LTR WITH LINKS ====================
const originalSetLanguage = window.setLanguage;
if (originalSetLanguage) {
    window.setLanguage = function(lang) {
        originalSetLanguage(lang);

        // بعد تغيير اللغة، تأكدي أن الروابط لسة شغالة
        setTimeout(() => {
            document.querySelectorAll('.contact-info .info-item a').forEach(link => {
                link.style.pointerEvents = 'auto';
            });
        }, 100);
    };
}
