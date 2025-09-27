// Elektro Pro Bt. - JavaScript funkciók

class ElektroProApp {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'home';
        this.currentAdminSection = 'dashboard';

        this.initializeApp();
    }

    // Alkalmazás inicializálása
    initializeApp() {
        console.log('Elektro Pro App inicializálása...');

        // LocalStorage inicializálás
        this.initializeLocalStorage();

        // Event listener-ek beállítása
        this.setupEventListeners();

        // Loading screen eltüntetése
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 1500);

        // Kezdeti oldal betöltése
        this.loadPage('home');

        console.log('App sikeresen inicializálva');
    }

    // LocalStorage inicializálása
    initializeLocalStorage() {
        // Admin felhasználó
        if (!localStorage.getItem('elektro_admin')) {
            const adminUser = {
                username: 'Admin',
                password: 'Admin',
                role: 'admin'
            };
            localStorage.setItem('elektro_admin', JSON.stringify(adminUser));
        }

        // Beállítások
        if (!localStorage.getItem('elektro_settings')) {
            const settings = {
                companyName: 'Elektro Pro Bt.',
                heroTitle: 'Professzionális villanyszerelési szolgáltatások',
                heroDescription: 'Megbízható, szakszerű villanyszerelési munkák magánszemélyek és vállalkozások számára.',
                primaryColor: '#2563eb',
                secondaryColor: '#1e40af'
            };
            localStorage.setItem('elektro_settings', JSON.stringify(settings));
        }

        // Kapcsolati adatok
        if (!localStorage.getItem('elektro_contact')) {
            const contact = {
                phone: '+36 30 123 4567',
                email: 'info@elektropro.hu',
                address: '1055 Budapest, Kossuth Lajos tér 12.',
                hours: 'Hétfő-Péntek: 8:00-18:00, Szombat: 9:00-15:00'
            };
            localStorage.setItem('elektro_contact', JSON.stringify(contact));
        }
    }

    // Event listener-ek beállítása
    setupEventListeners() {
        // Navigációs linkek
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page') || link.getAttribute('href').replace('#', '');
                this.navigateToPage(page);
            });
        });

        // Mobile menü toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Hero contact button
        const heroContactBtn = document.getElementById('hero-contact-btn');
        if (heroContactBtn) {
            heroContactBtn.addEventListener('click', () => {
                this.navigateToPage('contact');
            });
        }

        // Admin navigation
        document.querySelectorAll('.admin-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.showAdminSection(section);
            });
        });

        // Lightbox ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox();
            }
        });

        // Outside click close mobile menu
        document.addEventListener('click', (e) => {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');

            if (navMenu && navToggle) {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    }

    // Oldal navigáció
    navigateToPage(page) {
        // Minden oldal elrejtése
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        // Aktív oldal megjelenítése
        const targetPage = document.getElementById(page);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = page;
        }

        // Navigation aktív állapot frissítése
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page || 
                link.getAttribute('href') === '#' + page) {
                link.classList.add('active');
            }
        });

        // Admin oldal speciális kezelése
        if (page === 'admin') {
            this.handleAdminPage();
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Mobile menü bezárása
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }

    // Admin oldal kezelése
    handleAdminPage() {
        const adminLogin = document.getElementById('admin-login');
        const adminDashboard = document.getElementById('admin-dashboard');

        // Ellenőrizzük, hogy be van-e jelentkezve
        const currentUser = localStorage.getItem('elektro_current_user');

        if (currentUser) {
            adminLogin.style.display = 'none';
            adminDashboard.style.display = 'flex';
            this.showAdminSection('dashboard');
        } else {
            adminLogin.style.display = 'flex';
            adminDashboard.style.display = 'none';
        }
    }

    // Admin bejelentkezés
    adminLogin(event) {
        event.preventDefault();

        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;

        const adminUser = JSON.parse(localStorage.getItem('elektro_admin'));

        if (username === adminUser.username && password === adminUser.password) {
            localStorage.setItem('elektro_current_user', JSON.stringify(adminUser));
            this.currentUser = adminUser;

            this.showAlert('Sikeres bejelentkezés!', 'success');
            this.handleAdminPage();
        } else {
            this.showAlert('Hibás felhasználónév vagy jelszó!', 'error');
        }
    }

    // Admin kijelentkezés
    adminLogout() {
        localStorage.removeItem('elektro_current_user');
        this.currentUser = null;
        this.navigateToPage('home');
        this.showAlert('Sikeres kijelentkezés!', 'info');
    }

    // Admin szekciók megjelenítése
    showAdminSection(section) {
        // Minden szekció elrejtése
        document.querySelectorAll('.admin-section').forEach(s => {
            s.classList.remove('active');
        });

        // Aktív szekció megjelenítése
        const targetSection = document.getElementById('admin-' + section + '-section');
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentAdminSection = section;
        }

        // Navigation aktív állapot frissítése
        document.querySelectorAll('.admin-nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === section) {
                link.classList.add('active');
            }
        });
    }

    // Lightbox megnyitása
    openLightbox(imageSrc, title, description) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDescription = document.getElementById('lightbox-description');

        // Placeholder kép helyett egyszerű színes background
        lightboxImage.style.display = 'none';

        // Helyette egy placeholder div
        let placeholder = document.querySelector('.lightbox-placeholder');
        if (!placeholder) {
            placeholder = document.createElement('div');
            placeholder.className = 'lightbox-placeholder';
            placeholder.style.cssText = `
                width: 100%;
                max-width: 600px;
                height: 400px;
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 48px;
                margin-bottom: 20px;
            `;
            lightboxImage.parentNode.insertBefore(placeholder, lightboxImage);
        }

        placeholder.innerHTML = '⚡';
        placeholder.style.display = 'flex';

        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;

        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Lightbox bezárása
    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Kontakt form küldése
    submitContactForm(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        // Demo: email küldés szimulálása
        console.log('Kontakt form adatok:', data);

        this.showAlert('Köszönjük üzenetét! 24 órán belül felvesszük Önnel a kapcsolatot.', 'success');
        event.target.reset();
    }

    // Admin funkciók
    saveContent() {
        const settings = JSON.parse(localStorage.getItem('elektro_settings'));

        settings.companyName = document.getElementById('company-name-input').value;
        settings.heroTitle = document.getElementById('hero-title-input').value;
        settings.heroDescription = document.getElementById('hero-description-input').value;

        localStorage.setItem('elektro_settings', JSON.stringify(settings));

        // UI frissítése
        this.updateUIFromSettings();

        this.showAlert('Tartalom sikeresen mentve!', 'success');
    }

    saveContact() {
        const contact = JSON.parse(localStorage.getItem('elektro_contact'));

        contact.phone = document.getElementById('contact-phone-input').value;
        contact.email = document.getElementById('contact-email-input').value;
        contact.address = document.getElementById('contact-address-input').value;

        localStorage.setItem('elektro_contact', JSON.stringify(contact));

        this.showAlert('Kapcsolati adatok sikeresen mentve!', 'success');
    }

    saveAppearance() {
        const settings = JSON.parse(localStorage.getItem('elektro_settings'));

        settings.primaryColor = document.getElementById('primary-color-input').value;
        settings.secondaryColor = document.getElementById('secondary-color-input').value;

        localStorage.setItem('elektro_settings', JSON.stringify(settings));

        // CSS változók frissítése
        document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);

        this.showAlert('Megjelenés sikeresen frissítve!', 'success');
    }

    changePassword() {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        const adminUser = JSON.parse(localStorage.getItem('elektro_admin'));

        if (currentPassword !== adminUser.password) {
            this.showAlert('Hibás jelenlegi jelszó!', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            this.showAlert('Az új jelszavak nem egyeznek!', 'error');
            return;
        }

        if (newPassword.length < 4) {
            this.showAlert('A jelszónak legalább 4 karakter hosszúnak kell lennie!', 'error');
            return;
        }

        adminUser.password = newPassword;
        localStorage.setItem('elektro_admin', JSON.stringify(adminUser));

        // Form mezők törlése
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';

        this.showAlert('Jelszó sikeresen megváltoztatva!', 'success');
    }

    // UI frissítése beállításokból
    updateUIFromSettings() {
        const settings = JSON.parse(localStorage.getItem('elektro_settings'));

        // Vállalat név frissítése
        const companyNames = document.querySelectorAll('.company-name');
        companyNames.forEach(el => {
            if (el) el.textContent = settings.companyName;
        });

        // Hero szövegek frissítése
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');

        if (heroTitle) heroTitle.textContent = settings.heroTitle;
        if (heroDescription) heroDescription.textContent = settings.heroDescription;
    }

    // Alert megjelenítése
    showAlert(message, type = 'info') {
        // Létezik-e már alert container
        let alertContainer = document.querySelector('.alert-container');

        if (!alertContainer) {
            alertContainer = document.createElement('div');
            alertContainer.className = 'alert-container';
            alertContainer.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 3000;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(alertContainer);
        }

        // Alert elem létrehozása
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;

        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#2563eb'
        };

        alert.style.cssText = `
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 300px;
            font-weight: 500;
            animation: slideIn 0.3s ease-out;
            cursor: pointer;
        `;

        alert.textContent = message;

        // CSS animáció hozzáadása
        if (!document.querySelector('#alert-animations')) {
            const style = document.createElement('style');
            style.id = 'alert-animations';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        alertContainer.appendChild(alert);

        // Automatikus eltüntetés
        setTimeout(() => {
            alert.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 300);
        }, 4000);

        // Kattintásra eltüntetés
        alert.addEventListener('click', () => {
            alert.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.parentNode.removeChild(alert);
                }
            }, 300);
        });
    }
}

// Globális funkciókat adjuk hozzá a window objektumhoz
window.navigateToPage = function(page) {
    if (window.app) {
        window.app.navigateToPage(page);
    }
};

window.openLightbox = function(imageSrc, title, description) {
    if (window.app) {
        window.app.openLightbox(imageSrc, title, description);
    }
};

window.closeLightbox = function() {
    if (window.app) {
        window.app.closeLightbox();
    }
};

window.submitContactForm = function(event) {
    if (window.app) {
        window.app.submitContactForm(event);
    }
};

window.adminLogin = function(event) {
    if (window.app) {
        window.app.adminLogin(event);
    }
};

window.adminLogout = function() {
    if (window.app) {
        window.app.adminLogout();
    }
};

window.showAdminSection = function(section) {
    if (window.app) {
        window.app.showAdminSection(section);
    }
};

window.saveContent = function() {
    if (window.app) {
        window.app.saveContent();
    }
};

window.saveContact = function() {
    if (window.app) {
        window.app.saveContact();
    }
};

window.saveAppearance = function() {
    if (window.app) {
        window.app.saveAppearance();
    }
};

window.changePassword = function() {
    if (window.app) {
        window.app.changePassword();
    }
};

// Alkalmazás indítása amikor a DOM betöltődött
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM betöltve, app indítása...');
    window.app = new ElektroProApp();
});

// Fallback ha a DOMContentLoaded nem működne
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (!window.app) {
            console.log('Fallback app indítás...');
            window.app = new ElektroProApp();
        }
    });
} else {
    console.log('DOM már kész, azonnali app indítás...');
    window.app = new ElektroProApp();
}