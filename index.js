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
      if (navbarCollapse.classList.contains('show')) {
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

// ==================== FORM SUBMISSION ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
    submitBtn.disabled = true;
    
    // FormSubmit will handle the redirect
    // If you want to prevent redirect and handle via AJAX, uncomment below:
    
    /*
    e.preventDefault();
    const formData = new FormData(this);
    
    fetch(this.action, {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        alert(currentLang === 'en' ? 'Message sent successfully!' : 'تم إرسال الرسالة بنجاح!');
        this.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch(error => {
      alert(currentLang === 'en' ? 'Error sending message. Please try again.' : 'خطأ في إرسال الرسالة. حاول مرة أخرى.');
    })
    .finally(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
    */
  });
}

// ==================== TYPING EFFECT (Optional) ====================
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

// ==================== ENABLE ALL LINKS ====================
// document.addEventListener('DOMContentLoaded', function() {
    
//     // تفعيل جميع الروابط
//     const allLinks = document.querySelectorAll('a[href]');
//     allLinks.forEach(link => {
//         // منع أي JavaScript من تعطيل الروابط
//         link.addEventListener('click', function(e) {
//             // إذا كان الرابط خارجي أو بريد أو تليفون، خليه يشتغل عادي
//             const href = this.getAttribute('href');
//             if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('#')) {
//                 // سيبيه يشتغل عادي
//                 return true;
//             }
//         });
//     });

//     // تأكيد أن روابط البريد والتليفون شغالة
//     console.log('✅ All links are enabled');
// });
  // document.addEventListener('DOMContentLoaded', function() {
  //       // التأكد من وجود Bootstrap
  //       if (typeof bootstrap !== 'undefined') {
  //           // تفعيل أول تبويب
  //           var firstTab = new bootstrap.Tab(document.querySelector('#skillsTab .nav-link.active'));
  //           firstTab.show();
            
  //           // تفعيل كل الأزرار
  //           var triggerTabList = [].slice.call(document.querySelectorAll('#skillsTab button'));
  //           triggerTabList.forEach(function(triggerEl) {
  //               var tabTrigger = new bootstrap.Tab(triggerEl);
  //               triggerEl.addEventListener('click', function(event) {
  //                   event.preventDefault();
  //                   tabTrigger.show();
  //               });
  //           });
            
  //           console.log('Skills tabs activated successfully!');
  //       } else {
  //           console.log('Bootstrap not loaded!');
  //       }
  //   });

 // تفعيل Bootstrap Tabs (بدون تدخل يدوي)
// document.addEventListener('DOMContentLoaded', function() {
//     if (typeof bootstrap === 'undefined') {
//         console.log('❌ Bootstrap not loaded!');
//     }
// });

// حل يدوي للـ tabs (من غير Bootstrap)
document.addEventListener('DOMContentLoaded', function() {
    // اختيار كل الأزرار
    const tabButtons = document.querySelectorAll('#skillsTab .nav-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
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
            document.querySelector(targetId).classList.add('show', 'active');
        });
    });
});
// ==================== FIX FOR RTL/LTR WITH LINKS ====================
// ده عشان لما نغير اللغة، الروابط تفضل شغالة
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