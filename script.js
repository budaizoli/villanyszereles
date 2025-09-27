// Elektro Pro Bt. - TELJES CRUD FUNKCIONALITÁSÚ JavaScript

// Globális változók
let currentUser = null;
let currentPage = 'home';
let currentAdminSection = 'dashboard';
let servicesData = [];
let galleryData = [];
let contactData = {};
let settingsData = {};

// Alkalmazás inicializálása
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Elektro Pro App inicializálása - TELJES CRUD verzió...');

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

    // UI betöltése adatokkal
    loadAllData();

    // Kezdeti oldal betöltése
    navigateToPage('home');

    console.log('✅ App sikeresen inicializálva - TELJES CRUD funkcionalitással');
    console.log('📋 Admin belépés: Admin/Admin');
});

// LocalStorage inicializálása alapértelmezett adatokkal
function initializeLocalStorage() {
    console.log('📦 LocalStorage inicializálása...');

    // Admin felhasználó
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
        settingsData = {
            companyName: 'Elektro Pro Bt.',
            heroTitle: 'Professzionális villanyszerelési szolgáltatások',
            heroDescription: 'Megbízható, szakszerű villanyszerelési munkák magánszemélyek és vállalkozások számára. Modern technológiák, megfizethető árak.',
            primaryColor: '#2563eb',
            secondaryColor: '#1e40af'
        };
        localStorage.setItem('elektro_settings', JSON.stringify(settingsData));
        console.log('⚙️ Beállítások létrehozva');
    }

    // Kapcsolati adatok
    if (!localStorage.getItem('elektro_contact')) {
        contactData = {
            phone: '+36 30 123 4567',
            email: 'info@elektropro.hu',
            address: '1055 Budapest, Kossuth Lajos tér 12.',
            hours: 'Hétfő-Péntek: 8:00-18:00'
        };
        localStorage.setItem('elektro_contact', JSON.stringify(contactData));
        console.log('📞 Kapcsolati adatok létrehozva');
    }

    // Szolgáltatások
    if (!localStorage.getItem('elektro_services')) {
        servicesData = [
            {
                id: 1,
                name: 'Lakások teljes átvezetékelése',
                short: 'Komplett lakás villamos hálózat megújítása',
                description: 'Teljes körű lakás átvezetékelés a legmodernebb szabványok szerint. Új vezetékek fektetése, elosztó cseréje, minden villamos szerelvény modernizálása. Megfelelünk a 2024-es MSZ szabványoknak és garantáljuk a biztonságos üzemeltetést.',
                icon: '🏠',
                price: 'Árajánlat egyedi igények alapján',
                duration: '3-7 nap lakás méretétől függően'
            },
            {
                id: 2,
                name: 'Lakáselosztó kicserélése/létesítése',
                short: 'Biztonságos, modern elosztók telepítése',
                description: 'Régi, elavult elosztók cseréje korszerű, biztonságos megoldásokra. FI-védelem, túláramvédelem és megfelelő címkézés biztosítása. Minden elosztó egyedi tervezés alapján készül.',
                icon: '📋',
                price: '45.000 - 120.000 Ft',
                duration: '1-2 nap'
            },
            {
                id: 3,
                name: 'Kisebb munkák és javítások',
                short: 'Gyors villanyszerelési szolgáltatások',
                description: 'Gyors és megbízható kisebb villanyszerelési munkák. Konnektorok, kapcsolók, lámpák szerelése és javítása. Hibaelhárítás és rendszeres karbantartás magánszemélyek és irodák számára.',
                icon: '🔧',
                price: '8.000 - 25.000 Ft',
                duration: '2-4 óra'
            }
        ];
        localStorage.setItem('elektro_services', JSON.stringify(servicesData));
        console.log('🛠️ Szolgáltatások létrehozva');
    }

    // Galéria
    if (!localStorage.getItem('elektro_gallery')) {
        galleryData = [
            {
                id: 1,
                title: 'Modern lakáselosztó',
                description: 'Új, biztonságos lakáselosztó FI-relékkel és automatákkal',
                category: 'elosztok',
                project: 'XIII. kerületi lakás felújítás',
                icon: '⚡'
            },
            {
                id: 2,
                title: 'Teljes átvezetékelés',
                description: '60 m² lakás komplett villamos hálózatának megújítása',
                category: 'atvezetekeles',
                project: 'Panellakás modernizáció',
                icon: '🔌'
            },
            {
                id: 3,
                title: 'Design kapcsolók',
                description: 'Modern, minőségi kapcsolók és konnektorok szerelése',
                category: 'szerelveny',
                project: 'Irodaház felújítás',
                icon: '💡'
            },
            {
                id: 4,
                title: 'Kültéri világítás',
                description: 'Kerti világítás és kültéri elosztó kialakítása',
                category: 'kulteri',
                project: 'Családi ház - kert világítás',
                icon: '🌟'
            },
            {
                id: 5,
                title: 'Ipari elektromos munkák',
                description: 'Nagyobb teljesítményű ipari kapcsolások és motorindítók',
                category: 'ipari',
                project: 'Műhely elektromos felszerelése',
                icon: '🏭'
            },
            {
                id: 6,
                title: 'Sürgős hibaelhárítás',
                description: 'Villamos hibák gyors és hatékony elhárítása',
                category: 'hibas',
                project: '24/7 ügyeleti szolgáltatás',
                icon: '🚨'
            }
        ];
        localStorage.setItem('elektro_gallery', JSON.stringify(galleryData));
        console.log('🖼️ Galéria létrehozva');
    }

    console.log('✅ LocalStorage inicializálva');
}

// Összes adat betöltése LocalStorage-ből
function loadAllData() {
    console.log('📊 Adatok betöltése LocalStorage-ből...');

    try {
        settingsData = JSON.parse(localStorage.getItem('elektro_settings') || '{}');
        contactData = JSON.parse(localStorage.getItem('elektro_contact') || '{}');
        servicesData = JSON.parse(localStorage.getItem('elektro_services') || '[]');
        galleryData = JSON.parse(localStorage.getItem('elektro_gallery') || '[]');

        console.log('✅ Adatok betöltve:', {
            services: servicesData.length,
            gallery: galleryData.length,
            settings: Object.keys(settingsData).length,
            contact: Object.keys(contactData).length
        });

        // UI frissítése betöltött adatokkal
        updateAllUI();

    } catch (error) {
        console.error('❌ Hiba az adatok betöltése során:', error);
        showAlert('Hiba az adatok betöltése során!', 'error');
    }
}

// Teljes UI frissítése
function updateAllUI() {
    console.log('🔄 UI frissítése...');

    updateServicesUI();
    updateGalleryUI();
    updateContactUI();
    updateSettingsUI();
    updateStats();
}

// Event listenerek beállítása
function setupEventListeners() {
    console.log('🎯 Event listenerek beállítása...');

    // Navigációs linkek
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page') || this.getAttribute('href').replace('#', '');
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
        });
    }

    // Hero contact button
    const heroContactBtn = document.getElementById('hero-contact-btn');
    if (heroContactBtn) {
        heroContactBtn.addEventListener('click', () => navigateToPage('contact'));
    }

    // Admin form event listener
    const adminForm = document.querySelector('.admin-login-form');
    if (adminForm) {
        adminForm.addEventListener('submit', function(e) {
            adminLogin(e);
        });
        console.log('✅ Admin form listener beállítva');
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

// SZOLGÁLTATÁSOK CRUD FUNKCIÓK

// Szolgáltatások UI frissítése
function updateServicesUI() {
    console.log('🛠️ Szolgáltatások UI frissítése...');

    // Főoldal szolgáltatások előnézet
    const servicesPreviewGrid = document.getElementById('services-preview-grid');
    if (servicesPreviewGrid) {
        servicesPreviewGrid.innerHTML = servicesData.map(service => `
            <div class="service-card">
                <div class="service-icon">${service.icon || '🔧'}</div>
                <h3>${service.name}</h3>
                <p>${service.short}</p>
                <div class="service-price">${service.price || 'Árajánlat kérésre'}</div>
            </div>
        `).join('');
    }

    // Szolgáltatások oldal
    const servicesDetailed = document.getElementById('services-detailed');
    if (servicesDetailed) {
        servicesDetailed.innerHTML = servicesData.map(service => `
            <div class="service-detailed">
                <div class="service-header">
                    <div class="service-icon-large">${service.icon || '🔧'}</div>
                    <div>
                        <h2>${service.name}</h2>
                        <p class="service-subtitle">${service.short}</p>
                    </div>
                </div>
                <div class="service-content">
                    <p>${service.description}</p>
                    <div class="service-info">
                        <div class="info-item">
                            <strong>Időtartam:</strong> ${service.duration || 'Egyedi'}
                        </div>
                        <div class="info-item">
                            <strong>Ár:</strong> ${service.price || 'Árajánlat kérésre'}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Footer szolgáltatások lista
    const footerServicesList = document.getElementById('footer-services-list');
    if (footerServicesList) {
        footerServicesList.innerHTML = servicesData.map(service => 
            `<li>${service.name}</li>`
        ).join('');
    }

    // Admin szolgáltatások lista
    updateAdminServicesList();
}

// Admin szolgáltatások lista frissítése
function updateAdminServicesList() {
    const servicesList = document.getElementById('services-list');
    if (!servicesList) return;

    servicesList.innerHTML = servicesData.map(service => `
        <div class="admin-list-item">
            <div class="admin-item-content">
                <div class="admin-item-icon">${service.icon || '🔧'}</div>
                <div class="admin-item-info">
                    <h4>${service.name}</h4>
                    <p>${service.short}</p>
                    <small>Ár: ${service.price || 'Nincs megadva'} | Időtartam: ${service.duration || 'Nincs megadva'}</small>
                </div>
            </div>
            <div class="admin-item-actions">
                <button class="btn btn-sm btn-outline" onclick="editService(${service.id})">Szerkesztés</button>
                <button class="btn btn-sm btn-error" onclick="deleteService(${service.id})">Törlés</button>
            </div>
        </div>
    `).join('');
}

// Új szolgáltatás form megjelenítése
function showAddServiceForm() {
    const formContainer = document.getElementById('service-form-container');
    const formTitle = document.getElementById('service-form-title');
    const form = document.getElementById('service-form');

    formTitle.textContent = 'Új szolgáltatás hozzáadása';
    form.reset();
    document.getElementById('service-id').value = '';
    formContainer.style.display = 'block';

    // Scroll to form
    formContainer.scrollIntoView({ behavior: 'smooth' });
}

// Szolgáltatás szerkesztése
function editService(id) {
    const service = servicesData.find(s => s.id === id);
    if (!service) return;

    const formContainer = document.getElementById('service-form-container');
    const formTitle = document.getElementById('service-form-title');

    formTitle.textContent = 'Szolgáltatás szerkesztése';
    document.getElementById('service-id').value = service.id;
    document.getElementById('service-name').value = service.name;
    document.getElementById('service-short').value = service.short;
    document.getElementById('service-description').value = service.description;
    document.getElementById('service-icon').value = service.icon || '';
    document.getElementById('service-price').value = service.price || '';
    document.getElementById('service-duration').value = service.duration || '';

    formContainer.style.display = 'block';
    formContainer.scrollIntoView({ behavior: 'smooth' });
}

// Szolgáltatás mentése
function saveService() {
    const id = document.getElementById('service-id').value;
    const name = document.getElementById('service-name').value.trim();
    const short = document.getElementById('service-short').value.trim();
    const description = document.getElementById('service-description').value.trim();
    const icon = document.getElementById('service-icon').value.trim();
    const price = document.getElementById('service-price').value.trim();
    const duration = document.getElementById('service-duration').value.trim();

    if (!name || !short || !description) {
        showAlert('Kérjük, töltse ki a kötelező mezőket!', 'error');
        return;
    }

    const serviceData = {
        name,
        short,
        description,
        icon: icon || '🔧',
        price: price || 'Árajánlat kérésre',
        duration: duration || 'Egyedi'
    };

    if (id) {
        // Szerkesztés
        const index = servicesData.findIndex(s => s.id === parseInt(id));
        if (index !== -1) {
            servicesData[index] = { ...servicesData[index], ...serviceData };
            console.log('✅ Szolgáltatás frissítve:', name);
        }
    } else {
        // Új hozzáadása
        const newId = Math.max(...servicesData.map(s => s.id), 0) + 1;
        servicesData.push({ id: newId, ...serviceData });
        console.log('✅ Új szolgáltatás hozzáadva:', name);
    }

    // Mentés LocalStorage-be
    localStorage.setItem('elektro_services', JSON.stringify(servicesData));

    // UI frissítése
    updateServicesUI();
    updateStats();

    // Form elrejtése
    cancelServiceEdit();

    showAlert('Szolgáltatás sikeresen mentve!', 'success');
}

// Szolgáltatás szerkesztés megszakítása
function cancelServiceEdit() {
    const formContainer = document.getElementById('service-form-container');
    formContainer.style.display = 'none';
    document.getElementById('service-form').reset();
}

// Szolgáltatás törlése
function deleteService(id) {
    const service = servicesData.find(s => s.id === id);
    if (!service) return;

    if (confirm(`Biztosan törli a "${service.name}" szolgáltatást?`)) {
        servicesData = servicesData.filter(s => s.id !== id);
        localStorage.setItem('elektro_services', JSON.stringify(servicesData));

        updateServicesUI();
        updateStats();

        showAlert('Szolgáltatás sikeresen törölve!', 'success');
        console.log('🗑️ Szolgáltatás törölve:', service.name);
    }
}

// GALÉRIA CRUD FUNKCIÓK

// Galéria UI frissítése
function updateGalleryUI() {
    console.log('🖼️ Galéria UI frissítése...');

    // Főoldal galéria előnézet
    const galleryPreviewGrid = document.getElementById('gallery-preview-grid');
    if (galleryPreviewGrid) {
        const previewItems = galleryData.slice(0, 4); // Első 4 elem
        galleryPreviewGrid.innerHTML = previewItems.map(item => `
            <div class="gallery-item" onclick="openLightbox('', '${item.title}', '${item.description}')">
                <div class="gallery-placeholder">
                    <div class="gallery-icon">${item.icon || '⚡'}</div>
                    <span>${item.title}</span>
                </div>
            </div>
        `).join('');
    }

    // Galéria oldal
    const galleryFull = document.getElementById('gallery-full');
    if (galleryFull) {
        galleryFull.innerHTML = galleryData.map(item => `
            <div class="gallery-item" onclick="openLightbox('', '${item.title}', '${item.description} - ${item.project || ''}')">
                <div class="gallery-placeholder">
                    <div class="gallery-icon">${item.icon || '⚡'}</div>
                    <div class="gallery-info">
                        <h3>${item.title}</h3>
                        <p>${item.project || item.category}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Admin galéria lista
    updateAdminGalleryList();
}

// Admin galéria lista frissítése
function updateAdminGalleryList() {
    const galleryList = document.getElementById('gallery-list');
    if (!galleryList) return;

    galleryList.innerHTML = galleryData.map(item => `
        <div class="admin-list-item gallery-item-admin">
            <div class="admin-item-content">
                <div class="admin-item-icon">${item.icon || '⚡'}</div>
                <div class="admin-item-info">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <small>Kategória: ${item.category || 'Nincs'} | Projekt: ${item.project || 'Nincs megadva'}</small>
                </div>
            </div>
            <div class="admin-item-actions">
                <button class="btn btn-sm btn-outline" onclick="editGalleryItem(${item.id})">Szerkesztés</button>
                <button class="btn btn-sm btn-error" onclick="deleteGalleryItem(${item.id})">Törlés</button>
            </div>
        </div>
    `).join('');
}

// Új galéria elem form megjelenítése
function showAddGalleryForm() {
    const formContainer = document.getElementById('gallery-form-container');
    const formTitle = document.getElementById('gallery-form-title');
    const form = document.getElementById('gallery-form');

    formTitle.textContent = 'Új kép hozzáadása';
    form.reset();
    document.getElementById('gallery-id').value = '';
    formContainer.style.display = 'block';

    formContainer.scrollIntoView({ behavior: 'smooth' });
}

// Galéria elem szerkesztése
function editGalleryItem(id) {
    const item = galleryData.find(g => g.id === id);
    if (!item) return;

    const formContainer = document.getElementById('gallery-form-container');
    const formTitle = document.getElementById('gallery-form-title');

    formTitle.textContent = 'Kép szerkesztése';
    document.getElementById('gallery-id').value = item.id;
    document.getElementById('gallery-title').value = item.title;
    document.getElementById('gallery-description').value = item.description;
    document.getElementById('gallery-category').value = item.category || 'elosztok';
    document.getElementById('gallery-icon').value = item.icon || '';
    document.getElementById('gallery-project').value = item.project || '';

    formContainer.style.display = 'block';
    formContainer.scrollIntoView({ behavior: 'smooth' });
}

// Galéria elem mentése
function saveGalleryItem() {
    const id = document.getElementById('gallery-id').value;
    const title = document.getElementById('gallery-title').value.trim();
    const description = document.getElementById('gallery-description').value.trim();
    const category = document.getElementById('gallery-category').value;
    const icon = document.getElementById('gallery-icon').value.trim();
    const project = document.getElementById('gallery-project').value.trim();

    if (!title || !description) {
        showAlert('Kérjük, töltse ki a kötelező mezőket!', 'error');
        return;
    }

    const galleryItemData = {
        title,
        description,
        category: category || 'elosztok',
        icon: icon || '⚡',
        project: project || ''
    };

    if (id) {
        // Szerkesztés
        const index = galleryData.findIndex(g => g.id === parseInt(id));
        if (index !== -1) {
            galleryData[index] = { ...galleryData[index], ...galleryItemData };
            console.log('✅ Galéria elem frissítve:', title);
        }
    } else {
        // Új hozzáadása
        const newId = Math.max(...galleryData.map(g => g.id), 0) + 1;
        galleryData.push({ id: newId, ...galleryItemData });
        console.log('✅ Új galéria elem hozzáadva:', title);
    }

    // Mentés LocalStorage-be
    localStorage.setItem('elektro_gallery', JSON.stringify(galleryData));

    // UI frissítése
    updateGalleryUI();
    updateStats();

    // Form elrejtése
    cancelGalleryEdit();

    showAlert('Galéria elem sikeresen mentve!', 'success');
}

// Galéria szerkesztés megszakítása
function cancelGalleryEdit() {
    const formContainer = document.getElementById('gallery-form-container');
    formContainer.style.display = 'none';
    document.getElementById('gallery-form').reset();
}

// Galéria elem törlése
function deleteGalleryItem(id) {
    const item = galleryData.find(g => g.id === id);
    if (!item) return;

    if (confirm(`Biztosan törli a "${item.title}" képet?`)) {
        galleryData = galleryData.filter(g => g.id !== id);
        localStorage.setItem('elektro_gallery', JSON.stringify(galleryData));

        updateGalleryUI();
        updateStats();

        showAlert('Galéria elem sikeresen törölve!', 'success');
        console.log('🗑️ Galéria elem törölve:', item.title);
    }
}

// KAPCSOLAT ÉS BEÁLLÍTÁSOK FUNKCIÓK

// Kapcsolat UI frissítése
function updateContactUI() {
    // Főoldal kapcsolat
    const phoneDisplay = document.getElementById('contact-phone-display');
    const emailDisplay = document.getElementById('contact-email-display');
    const addressDisplay = document.getElementById('contact-address-display');

    if (phoneDisplay) phoneDisplay.textContent = contactData.phone || '+36 30 123 4567';
    if (emailDisplay) emailDisplay.textContent = contactData.email || 'info@elektropro.hu';
    if (addressDisplay) addressDisplay.textContent = contactData.address || '1055 Budapest, Kossuth Lajos tér 12.';

    // Kapcsolat oldal
    const phoneFull = document.getElementById('contact-phone-full');
    const emailFull = document.getElementById('contact-email-full');
    const addressFull = document.getElementById('contact-address-full');

    if (phoneFull) phoneFull.textContent = contactData.phone || '+36 30 123 4567';
    if (emailFull) emailFull.textContent = contactData.email || 'info@elektropro.hu';
    if (addressFull) addressFull.innerHTML = (contactData.address || '1055 Budapest, Kossuth Lajos tér 12.').replace(', ', '<br>');

    // Footer
    const footerPhone = document.getElementById('footer-phone');
    const footerEmail = document.getElementById('footer-email');
    const footerAddress = document.getElementById('footer-address');

    if (footerPhone) footerPhone.textContent = '📞 ' + (contactData.phone || '+36 30 123 4567');
    if (footerEmail) footerEmail.textContent = '📧 ' + (contactData.email || 'info@elektropro.hu');
    if (footerAddress) footerAddress.textContent = '📍 ' + (contactData.address || 'Budapest, Kossuth Lajos tér 12.');

    // Admin form mezők
    const phoneInput = document.getElementById('contact-phone-input');
    const emailInput = document.getElementById('contact-email-input');
    const addressInput = document.getElementById('contact-address-input');

    if (phoneInput) phoneInput.value = contactData.phone || '+36 30 123 4567';
    if (emailInput) emailInput.value = contactData.email || 'info@elektropro.hu';
    if (addressInput) addressInput.value = contactData.address || '1055 Budapest, Kossuth Lajos tér 12.';
}

// Beállítások UI frissítése
function updateSettingsUI() {
    // Vállalat név frissítése
    const companyNames = document.querySelectorAll('.company-name');
    companyNames.forEach(el => {
        if (el) el.textContent = settingsData.companyName || 'Elektro Pro Bt.';
    });

    // Hero szövegek
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');

    if (heroTitle) heroTitle.textContent = settingsData.heroTitle || 'Professzionális villanyszerelési szolgáltatások';
    if (heroDescription) heroDescription.textContent = settingsData.heroDescription || 'Megbízható, szakszerű villanyszerelési munkák.';

    // Admin form mezők
    const companyNameInput = document.getElementById('company-name-input');
    const heroTitleInput = document.getElementById('hero-title-input');
    const heroDescInput = document.getElementById('hero-description-input');
    const primaryColorInput = document.getElementById('primary-color-input');
    const secondaryColorInput = document.getElementById('secondary-color-input');

    if (companyNameInput) companyNameInput.value = settingsData.companyName || 'Elektro Pro Bt.';
    if (heroTitleInput) heroTitleInput.value = settingsData.heroTitle || 'Professzionális villanyszerelési szolgáltatások';
    if (heroDescInput) heroDescInput.value = settingsData.heroDescription || 'Megbízható, szakszerű villanyszerelési munkák.';
    if (primaryColorInput) primaryColorInput.value = settingsData.primaryColor || '#2563eb';
    if (secondaryColorInput) secondaryColorInput.value = settingsData.secondaryColor || '#1e40af';

    // CSS változók alkalmazása
    if (settingsData.primaryColor) {
        document.documentElement.style.setProperty('--primary-color', settingsData.primaryColor);
    }
    if (settingsData.secondaryColor) {
        document.documentElement.style.setProperty('--secondary-color', settingsData.secondaryColor);
    }
}

// Statisztikák frissítése
function updateStats() {
    const servicesCount = document.getElementById('services-count');
    const galleryCount = document.getElementById('gallery-count');

    if (servicesCount) servicesCount.textContent = servicesData.length;
    if (galleryCount) galleryCount.textContent = galleryData.length;
}

// ADMIN CORE FUNKCIÓK

// Oldal navigáció
function navigateToPage(page) {
    console.log('📄 Oldal váltás:', page);

    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });

    const targetPage = document.getElementById(page);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = page;
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('data-page') || link.getAttribute('href').replace('#', '');
        if (linkPage === page) {
            link.classList.add('active');
        }
    });

    if (page === 'admin') {
        handleAdminPage();
    }

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

    const currentUserData = localStorage.getItem('elektro_current_user');

    if (currentUserData) {
        console.log('✅ Felhasználó már bejelentkezve');
        currentUser = JSON.parse(currentUserData);
        adminLogin.style.display = 'none';
        adminDashboard.style.display = 'flex';
        showAdminSection('dashboard');
        updateStats();
    } else {
        console.log('🔓 Nincs bejelentkezve, login megjelenítése');
        adminLogin.style.display = 'flex';
        adminDashboard.style.display = 'none';

        const usernameInput = document.getElementById('admin-username');
        const passwordInput = document.getElementById('admin-password');
        if (usernameInput && passwordInput) {
            usernameInput.value = 'Admin';
            passwordInput.value = 'Admin';
        }
    }
}

// Admin belépés
function adminLogin(event) {
    event.preventDefault();
    console.log('🔐 Admin belépés kezdése...');

    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value.trim();

    if (!username || !password) {
        showAlert('Kérjük, adja meg a felhasználónevet és jelszót!', 'error');
        return;
    }

    const adminDataString = localStorage.getItem('elektro_admin');
    if (!adminDataString) {
        showAlert('Rendszerhiba: Admin adatok nem találhatók!', 'error');
        return;
    }

    let adminUser;
    try {
        adminUser = JSON.parse(adminDataString);
    } catch (error) {
        showAlert('Rendszerhiba: Admin adatok sérültek!', 'error');
        return;
    }

    if (username === adminUser.username && password === adminUser.password) {
        console.log('✅ Sikeres hitelesítés!');

        const sessionData = {
            username: adminUser.username,
            role: adminUser.role,
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('elektro_current_user', JSON.stringify(sessionData));
        currentUser = sessionData;

        handleAdminPage();
        showAlert('Sikeres bejelentkezés! Üdvözöljük az admin panelben.', 'success');

        console.log('🎉 Admin belépés sikeres!');
    } else {
        console.log('❌ Hibás hitelesítési adatok');
        showAlert('Hibás felhasználónév vagy jelszó!', 'error');

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
}

// Admin szekciók megjelenítése
function showAdminSection(section) {
    console.log('📊 Admin szekció váltás:', section);

    document.querySelectorAll('.admin-section').forEach(s => {
        s.classList.remove('active');
    });

    const targetSection = document.getElementById('admin-' + section + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
        currentAdminSection = section;

        // Szekció specifikus inicializálás
        if (section === 'services') {
            updateAdminServicesList();
        } else if (section === 'gallery') {
            updateAdminGalleryList();
        }
    }

    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === section) {
            link.classList.add('active');
        }
    });
}

// EGYÉB FUNKCIÓK

// Lightbox funkciók
function openLightbox(imageSrc, title, description) {
    const lightbox = document.getElementById('lightbox');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');

    if (!lightbox) return;

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
    showAlert('Köszönjük üzenetét! 24 órán belül felvesszük Önnel a kapcsolatot.', 'success');
    event.target.reset();
}

// Admin mentési funkciók
function saveContent() {
    console.log('💾 Tartalom mentése...');

    const companyNameInput = document.getElementById('company-name-input');
    const heroTitleInput = document.getElementById('hero-title-input');
    const heroDescInput = document.getElementById('hero-description-input');

    if (companyNameInput) settingsData.companyName = companyNameInput.value;
    if (heroTitleInput) settingsData.heroTitle = heroTitleInput.value;
    if (heroDescInput) settingsData.heroDescription = heroDescInput.value;

    localStorage.setItem('elektro_settings', JSON.stringify(settingsData));
    updateSettingsUI();

    showAlert('Tartalom sikeresen mentve!', 'success');
}

function saveContact() {
    console.log('💾 Kapcsolat mentése...');

    const phoneInput = document.getElementById('contact-phone-input');
    const emailInput = document.getElementById('contact-email-input');
    const addressInput = document.getElementById('contact-address-input');

    if (phoneInput) contactData.phone = phoneInput.value;
    if (emailInput) contactData.email = emailInput.value;
    if (addressInput) contactData.address = addressInput.value;

    localStorage.setItem('elektro_contact', JSON.stringify(contactData));
    updateContactUI();

    showAlert('Kapcsolati adatok sikeresen mentve!', 'success');
}

function saveAppearance() {
    console.log('💾 Megjelenés mentése...');

    const primaryColorInput = document.getElementById('primary-color-input');
    const secondaryColorInput = document.getElementById('secondary-color-input');

    if (primaryColorInput) {
        settingsData.primaryColor = primaryColorInput.value;
        document.documentElement.style.setProperty('--primary-color', primaryColorInput.value);
    }

    if (secondaryColorInput) {
        settingsData.secondaryColor = secondaryColorInput.value;
        document.documentElement.style.setProperty('--secondary-color', secondaryColorInput.value);
    }

    localStorage.setItem('elektro_settings', JSON.stringify(settingsData));

    showAlert('Megjelenés sikeresen frissítve!', 'success');
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

    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';

    showAlert('Jelszó sikeresen megváltoztatva!', 'success');
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

    setTimeout(() => {
        alert.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            if (alert.parentNode) alert.parentNode.removeChild(alert);
        }, 300);
    }, 5000);

    alert.addEventListener('click', () => {
        alert.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            if (alert.parentNode) alert.parentNode.removeChild(alert);
        }, 300);
    });
}

// Globális funkciók exportálása
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

// Szolgáltatások funkciók
window.showAddServiceForm = showAddServiceForm;
window.editService = editService;
window.saveService = saveService;
window.cancelServiceEdit = cancelServiceEdit;
window.deleteService = deleteService;

// Galéria funkciók
window.showAddGalleryForm = showAddGalleryForm;
window.editGalleryItem = editGalleryItem;
window.saveGalleryItem = saveGalleryItem;
window.cancelGalleryEdit = cancelGalleryEdit;
window.deleteGalleryItem = deleteGalleryItem;

console.log('🚀 Elektro Pro JavaScript TELJES CRUD verzió betöltve!');
console.log('📋 Teszteléshez: Admin/Admin belépés után használd a Szolgáltatások és Galéria szekciókat');