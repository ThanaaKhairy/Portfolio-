        (function() {
            // ===== THEME TOGGLE =====
            const themeToggle = document.getElementById('themeToggle');
            const html = document.documentElement;
            
            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme') || 'light';
            html.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);

            themeToggle.addEventListener('click', function() {
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(newTheme);
            });

            function updateThemeIcon(theme) {
                const icon = themeToggle.querySelector('i');
                if (theme === 'light') {
                    icon.className = 'bi bi-moon-stars';
                } else {
                    icon.className = 'bi bi-brightness-high-fill';
                }
            }

            // ===== LANGUAGE TOGGLE =====
            const langToggle = document.getElementById('langToggle');
            const langText = document.getElementById('langText');
            
            // Check for saved language preference
            const savedLang = localStorage.getItem('language') || 'en';
            setLanguage(savedLang);

            langToggle.addEventListener('click', function() {
                const currentLang = html.getAttribute('lang') || 'en';
                const newLang = currentLang === 'en' ? 'ar' : 'en';
                setLanguage(newLang);
            });

            function setLanguage(lang) {
                if (lang === 'ar') {
                    html.setAttribute('dir', 'rtl');
                    html.setAttribute('lang', 'ar');
                    langText.textContent = 'AR';
                } else {
                    html.setAttribute('dir', 'ltr');
                    html.setAttribute('lang', 'en');
                    langText.textContent = 'EN';
                }
                
                // Update all elements with data-en and data-ar attributes
                document.querySelectorAll('[data-en]').forEach(element => {
                    const translation = element.getAttribute(`data-${lang}`);
                    if (translation) {
                        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                            element.placeholder = translation;
                        } else {
                            element.textContent = translation;
                        }
                    }
                });
                
                localStorage.setItem('language', lang);
            }

            // ===== SMOOTH SCROLL FOR BUTTONS =====
            document.querySelectorAll('.btn-pricing').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    if (this.getAttribute('href') === '#contact') {
                        e.preventDefault();
                        window.location.href = 'index.html#contact';
                    }
                });
            });
        })();
