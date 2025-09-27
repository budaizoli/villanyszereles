// Elektro Pro Bt. - Javított JavaScript (Admin belépés garantáltan működik!)

// Globális változók és állapot
let currentUser = null;
let currentPage = 'home';
let currentAdminSection = 'dashboard';

// Alkalmazás inicializálása
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Elektro Pro App inicializálása...');

    // Loading screen elrejtése
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => loadingScreen.style.display = 'none', 500);
        }
    }, 1000);

    // LocalStorage inicializálása
    initializeLocalStorage();

    // Event listenerek beállítása
    setupEventListeners();

    // Kezdeti oldal betöltése
    navigateToPage('home');

    console.log('✅ App sikeresen inicializálva');
    console.log('📋 Admin belépés: Admin/Admin');
});

// LocalStorage inicializálása alapértelmezett adatokkal
function initializeLocalStorage() {
    console.log('📦 LocalStorage inicializálása...');

    // Admin felhasználó (garantált létrehozás)
    const adminData = {
        username: 'Admin',
        password: 'Admin',
        role: 'admin',
        created: new Date().toISOString()
    };
    localStorage.setItem('elektro_admin', JSON.stringify(adminData));
    console.log('👤 Admin felhasználó létrehozva:', adminData.username);

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
        console.log('⚙️ Beállítások létrehozva');
    }

    // Kapcsolati adatok
    if (!localStorage.getItem('elektro_contact')) {
        const contact = {
            phone: '+36 30 123 4567',
            email: 'info@elektropro.hu',
            address: '1055 Budapest, Kossuth Lajos tér 12.',
            hours: 'Hétfő-Péntek: 8:00-18:00'
        };
        localStorage.setItem('elektro_contact', JSON.stringify(contact));
        console.log('📞 Kapcsolati adatok létrehozva');
    }

    console.log('✅ LocalStorage inicializálva');
}

// Event listenerek beállítása
function setupEventListeners() {
    console.log('🎯 Event listenerek beállítása...');

    // Navigációs linkek
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page') || this.getAttribute('href').replace('#', '');
            console.log('🔄 Navigáció:', page);
            navigateToPage(page);
        });
    });

    // Mobile hamburger menü
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            console.log('📱 Mobile menü toggled');
        });
    }

    // Hero contact button
    const heroContactBtn = document.getElementById('hero-contact-btn');
    if (heroContactBtn) {
        heroContactBtn.addEventListener('click', () => navigateToPage('contact'));
    }

    // ADMIN FORM EVENT LISTENER - KRITIKUS RÉSZ!
    const adminForm = document.querySelector('.admin-login-form');
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            console.log('🔐 Admin form submitted');
            adminLogin(e);
        });
        console.log('✅ Admin form listener beállítva');
    } else {
        console.error('❌ Admin form nem található!');
    }

    // Admin navigation linkek
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showAdminSection(section);
        });
    });

    // Lightbox ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    console.log('✅ Event listenerek beállítva');
}

// Oldal navigáció
function navigateToPage(page) {
    console.log('📄 Oldal váltás:', page);

    // Minden oldal elrejtése
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });

    // Céloldal megjelenítése
    const targetPage = document.getElementById(page);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = page;
        console.log('✅ Oldal aktív:', page);
    } else {
        console.error('❌ Oldal nem található:', page);
        return;
    }

    // Navigation aktív állapot
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('data-page') || link.getAttribute('href').replace('#', '');
        if (linkPage === page) {
            link.classList.add('active');
        }
    });

    // Admin oldal speciális kezelése
    if (page === 'admin') {
        handleAdminPage();
    }

    // Scroll top + mobile menü bezárása
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}

// Admin oldal kezelése
function handleAdminPage() {
    console.log('🔐 Admin oldal kezelése...');

    const adminLogin = document.getElementById('admin-login');
    const adminDashboard = document.getElementById('admin-dashboard');

    if (!adminLogin || !adminDashboard) {
        console.error('❌ Admin elemek nem találhatók!');
        return;
    }

    // Ellenőrizzük a bejelentkezési státuszt
    const currentUserData = localStorage.getItem('elektro_current_user');

    if (currentUserData) {
        console.log('✅ Felhasználó már bejelentkezve');
        currentUser = JSON.parse(currentUserData);
        adminLogin.style.display = 'none';
        adminDashboard.style.display = 'flex';
        showAdminSection('dashboard');
    } else {
        console.log('🔓 Nincs bejelentkezve, login megjelenítése');
        adminLogin.style.display = 'flex';
        adminDashboard.style.display = 'none';

        // Auto-fill demo értékekkel (fejlesztés során)
        const usernameInput = document.getElementById('admin-username');
        const passwordInput = document.getElementById('admin-password');
        if (usernameInput && passwordInput) {
            usernameInput.value = 'Admin';
            passwordInput.value = 'Admin';
            console.log('📝 Demo adatok auto-fill');
        }
    }
}

// ADMIN BELÉPÉS - JAVÍTOTT VERZIÓ
function adminLogin(event) {
    event.preventDefault();
    console.log('🔐 Admin belépés kezdése...');

    // Form adatok lekérése
    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value.trim();

    console.log('👤 Megadott felhasználó:', username);
    console.log('🔑 Jelszó hossza:', password.length);

    // Validáció
    if (!username || !password) {
        showAlert('Kérjük, adja meg a felhasználónevet és jelszót!', 'error');
        return;
    }

    // Admin adatok lekérése LocalStorage-ből
    const adminDataString = localStorage.getItem('elektro_admin');
    console.log('📦 Admin adat string:', adminDataString ? 'létezik' : 'nem létezik');

    if (!adminDataString) {
        console.error('❌ Admin adatok nem találhatók!');
        showAlert('Rendszerhiba: Admin adatok nem találhatók!', 'error');
        return;
    }

    let adminUser;
    try {
        adminUser = JSON.parse(adminDataString);
        console.log('✅ Admin adatok betöltve:', adminUser.username);
    } catch (error) {
        console.error('❌ Admin adat parsing hiba:', error);
        showAlert('Rendszerhiba: Admin adatok sérültek!', 'error');
        return;
    }

    // Hitelesítés
    if (username === adminUser.username && password === adminUser.password) {
        console.log('✅ Sikeres hitelesítés!');

        // Bejelentkezési adatok mentése
        const sessionData = {
            username: adminUser.username,
            role: adminUser.role,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('elektro_current_user', JSON.stringify(sessionData));
        currentUser = sessionData;

        // UI frissítése
        handleAdminPage();

        // Sikeres belépés üzenet
        showAlert('Sikeres bejelentkezés! Üdvözöljük az admin panelben.', 'success');

        console.log('🎉 Admin belépés sikeres!');
    } else {
        console.log('❌ Hibás hitelesítési adatok');
        console.log('Várt:', adminUser.username, '/', adminUser.password);
        console.log('Kapott:', username, '/', password);

        showAlert('Hibás felhasználónév vagy jelszó!', 'error');

        // Form reset
        document.getElementById('admin-username').value = '';
        document.getElementById('admin-password').value = '';
        document.getElementById('admin-username').focus();
    }
}

// Admin kijelentkezés
function adminLogout() {
    console.log('🚪 Admin kijelentkezés...');

    localStorage.removeItem('elektro_current_user');
    currentUser = null;

    navigateToPage('home');
    showAlert('Sikeres kijelentkezés!', 'info');

    console.log('✅ Kijelentkezés befejezve');
}

// Admin szekciók megjelenítése
function showAdminSection(section) {
    console.log('📊 Admin szekció váltás:', section);

    // Minden szekció elrejtése
    document.querySelectorAll('.admin-section').forEach(s => {
        s.classList.remove('active');
    });

    // Célszekció megjelenítése
    const targetSection = document.getElementById('admin-' + section + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
        currentAdminSection = section;
        console.log('✅ Admin szekció aktív:', section);
    } else {
        console.error('❌ Admin szekció nem található:', section);
    }

    // Navigation aktív állapot
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === section) {
            link.classList.add('active');
        }
    });
}

// Lightbox funkciók
function openLightbox(imageSrc, title, description) {
    console.log('🖼️ Lightbox megnyitása:', title);

    const lightbox = document.getElementById('lightbox');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');

    if (!lightbox) {
        console.error('❌ Lightbox nem található!');
        return;
    }

    // Placeholder tartalom (mivel nincs valódi kép)
    let placeholder = lightbox.querySelector('.lightbox-placeholder');
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
            font-size: 64px;
            margin-bottom: 20px;
        `;
        lightbox.querySelector('.lightbox-content').insertBefore(placeholder, lightboxTitle);
    }

    placeholder.innerHTML = '⚡';
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;

    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Kontakt form kezelése
function submitContactForm(event) {
    event.preventDefault();
    console.log('📧 Kontakt form küldése...');

    const formData = new FormData(event.target);
    const data = {};

    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    console.log('📋 Form adatok:', data);

    // Szimuláció: email küldés
    showAlert('Köszönjük üzenetét! 24 órán belül felvesszük Önnel a kapcsolatot.', 'success');
    event.target.reset();
}

// Admin funkciók
function saveContent() {
    console.log('💾 Tartalom mentése...');

    const settings = JSON.parse(localStorage.getItem('elektro_settings') || '{}');

    const companyNameInput = document.getElementById('company-name-input');
    const heroTitleInput = document.getElementById('hero-title-input');
    const heroDescInput = document.getElementById('hero-description-input');

    if (companyNameInput) settings.companyName = companyNameInput.value;
    if (heroTitleInput) settings.heroTitle = heroTitleInput.value;
    if (heroDescInput) settings.heroDescription = heroDescInput.value;

    localStorage.setItem('elektro_settings', JSON.stringify(settings));

    showAlert('Tartalom sikeresen mentve!', 'success');
    console.log('✅ Tartalom mentve');
}

function saveContact() {
    console.log('💾 Kapcsolat mentése...');

    const contact = JSON.parse(localStorage.getItem('elektro_contact') || '{}');

    const phoneInput = document.getElementById('contact-phone-input');
    const emailInput = document.getElementById('contact-email-input');
    const addressInput = document.getElementById('contact-address-input');

    if (phoneInput) contact.phone = phoneInput.value;
    if (emailInput) contact.email = emailInput.value;  
    if (addressInput) contact.address = addressInput.value;

    localStorage.setItem('elektro_contact', JSON.stringify(contact));

    showAlert('Kapcsolati adatok sikeresen mentve!', 'success');
    console.log('✅ Kapcsolat mentve');
}

function saveAppearance() {
    console.log('💾 Megjelenés mentése...');

    const settings = JSON.parse(localStorage.getItem('elektro_settings') || '{}');

    const primaryColorInput = document.getElementById('primary-color-input');
    const secondaryColorInput = document.getElementById('secondary-color-input');

    if (primaryColorInput) {
        settings.primaryColor = primaryColorInput.value;
        document.documentElement.style.setProperty('--primary-color', primaryColorInput.value);
    }

    if (secondaryColorInput) {
        settings.secondaryColor = secondaryColorInput.value;
        document.documentElement.style.setProperty('--secondary-color', secondaryColorInput.value);
    }

    localStorage.setItem('elektro_settings', JSON.stringify(settings));

    showAlert('Megjelenés sikeresen frissítve!', 'success');
    console.log('✅ Megjelenés mentve');
}

function changePassword() {
    console.log('🔑 Jelszó változtatás...');

    const currentPassword = document.getElementById('current-password');
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');

    if (!currentPassword || !newPassword || !confirmPassword) {
        showAlert('Hiányzó mezők!', 'error');
        return;
    }

    const currentPwd = currentPassword.value;
    const newPwd = newPassword.value;
    const confirmPwd = confirmPassword.value;

    const adminUser = JSON.parse(localStorage.getItem('elektro_admin') || '{}');

    if (currentPwd !== adminUser.password) {
        showAlert('Hibás jelenlegi jelszó!', 'error');
        return;
    }

    if (newPwd !== confirmPwd) {
        showAlert('Az új jelszavak nem egyeznek!', 'error');
        return;
    }

    if (newPwd.length < 4) {
        showAlert('A jelszónak legalább 4 karakter hosszúnak kell lennie!', 'error');
        return;
    }

    adminUser.password = newPwd;
    localStorage.setItem('elektro_admin', JSON.stringify(adminUser));

    // Mezők törlése
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';

    showAlert('Jelszó sikeresen megváltoztatva!', 'success');
    console.log('✅ Jelszó megváltoztatva');
}

// Alert rendszer
function showAlert(message, type = 'info') {
    console.log('🔔 Alert:', type, message);

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

    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;

    const colors = {
        success: '#10b981',
        error: '#ef4444', 
        warning: '#f59e0b',
        info: '#2563eb'
    };

    alert.style.cssText = `
        background: ${colors[type] || colors.info};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 350px;
        font-weight: 500;
        cursor: pointer;
        animation: slideInRight 0.3s ease-out;
    `;

    alert.textContent = message;

    // CSS animáció hozzáadása
    if (!document.querySelector('#alert-styles')) {
        const style = document.createElement('style');
        style.id = 'alert-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    alertContainer.appendChild(alert);

    // Automatikus eltüntetés
    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            if (alert.parentNode) alert.parentNode.removeChild(alert);
        }, 300);
    }, 5000);

    // Kattintásra eltüntetés
    alert.addEventListener('click', () => {
        alert.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            if (alert.parentNode) alert.parentNode.removeChild(alert);
        }, 300);
    });
}

// Globális funkciók exportálása (backward compatibility)
window.navigateToPage = navigateToPage;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.submitContactForm = submitContactForm;
window.adminLogin = adminLogin;
window.adminLogout = adminLogout;
window.showAdminSection = showAdminSection;
window.saveContent = saveContent;
window.saveContact = saveContact;
window.saveAppearance = saveAppearance;
window.changePassword = changePassword;

console.log('🚀 Elektro Pro JavaScript betöltve - Admin belépés garantáltan működik!');
console.log('📋 Teszteléshez: navigálj az Admin oldalra és használd Admin/Admin belépést');