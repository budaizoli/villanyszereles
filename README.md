# Elektro Pro Bt. - Villanyszerelési Weboldal

## 🚀 MŰKÖDŐ WEBOLDAL - Minden funkció elérhető!

### ✅ Funkciók
- ✅ **Navigáció**: Főoldal, Szolgáltatások, Galéria, Kapcsolat, Admin
- ✅ **Admin felület**: Admin/Admin belépés
- ✅ **Lightbox galéria**: Képek nagyítása
- ✅ **Reszponzív design**: Mobil/tablet/desktop
- ✅ **Magyar ékezetek**: UTF-8 kódolás
- ✅ **LocalStorage**: Adatok mentése

## 🏃‍♂️ Gyors indítás

### 1. ZIP kicsomagolása
```bash
unzip elektro-pro-teljes-weboldal.zip
cd elektro-pro-teljes-weboldal
```

### 2. Webszerver indítása
```bash
# Python webszerver
python -m http.server 8000

# VAGY Node.js
npx http-server -p 8000

# VAGY egyszerűen dupla kattintás az index.html-re
```

### 3. Böngésző megnyitása
- http://localhost:8000
- Vagy közvetlenül az index.html fájl megnyitása

### 4. Admin belépés
- Admin menü → Belépés
- **Felhasználó:** Admin
- **Jelszó:** Admin
- ⚠️ **Első dolgod:** Jelszó megváltoztatása!

## 📤 GitHub feltöltés - Egyszerű módszer

### 1. GitHub repository létrehozása
1. https://github.com → New repository
2. Név: `elektro-pro-weboldal`
3. Public/Private választás
4. **NE** pipáld be: Add README, .gitignore, license
5. Create repository

### 2. Fájlok feltöltése
```bash
# A weboldal mappájában
git init
git add .
git commit -m "Elektro Pro weboldal"
git branch -M main

# CSERÉLD KI a 'FELHASZNALONEV'-et!
git remote add origin https://github.com/FELHASZNALONEV/elektro-pro-weboldal.git
git push -u origin main
```

### 3. GitHub Pages beállítás
1. Repository → Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: "main"
4. Save
5. ⏳ 2-3 perc várakozás
6. 🌐 Weboldal elérhető: `https://FELHASZNALONEV.github.io/elektro-pro-weboldal/`

## 🛠️ Funkciók részletesen

### Nyilvános oldal:
- **Főoldal**: Hero, szolgáltatások, galéria, kapcsolat
- **Szolgáltatások**: 3 részletes szolgáltatás
- **Galéria**: 6 kép lightbox funkcióval
- **Kapcsolat**: Teljes elérhetőségek + űrlap

### Admin panel:
- **Dashboard**: Statisztikák
- **Tartalom**: Szövegek szerkesztése
- **Szolgáltatások**: CRUD műveletek (demo)
- **Galéria**: Képkezelés (demo)
- **Kapcsolat**: Elérhetőségek szerkesztése
- **Megjelenés**: Színek testreszabása
- **Profil**: Jelszóváltás

## 🔧 Testreszabás

### Szövegek módosítása:
1. Admin → Tartalom
2. Módosítsd a mezőket
3. Mentés

### Színek változtatása:
1. Admin → Megjelenés  
2. Színválasztó használata
3. Mentés → Azonnali frissülés

### Kapcsolat frissítése:
1. Admin → Kapcsolat
2. Telefon/email/cím módosítása
3. Mentés

## 📱 Reszponzív design
- **Mobil**: < 768px - hamburger menü, egyoszlopos elrendezés
- **Tablet**: 768px - 1024px - kétoszlopos rácsok
- **Desktop**: > 1024px - teljes funkcionális elrendezés

## 🔒 Biztonság
- LocalStorage alapú adattárolás
- Jelszó hashelés nélküli (demo célú)
- **Éles használatra**: Backend implementáció ajánlott

## 🆘 Hibaelhárítás

### Ha nem működik az oldal:
1. Ellenőrizd: minden fájl (index.html, style.css, script.js) jelen van
2. Nyisd meg Developer Tools-t (F12) → Console
3. Indítsd újra a webszervert

### Admin problémák:
1. F12 → Application → Local Storage → törlés
2. Oldal frissítése (F5)  
3. Admin/Admin újra próbálása

### GitHub problémák:
```bash
# Git konfiguráció ellenőrzése
git config --global user.name "Neved"
git config --global user.email "email@domain.com"

# Remote URL javítása
git remote set-url origin https://github.com/FELHASZNALONEV/elektro-pro-weboldal.git
```

## 📊 Technikai adatok
- **Fájlok**: 3 fő fájl (HTML, CSS, JS)
- **Méret**: ~50KB összes fájl
- **Böngészők**: Chrome, Firefox, Safari, Edge
- **Mobilbarát**: 100% reszponzív
- **Gyorsaság**: Statikus fájlok → villámgyors

## 🎯 Következő lépések
1. ⬇️ ZIP letöltése és kicsomagolása
2. 🌐 Helyi tesztelés
3. 🔐 Admin jelszó megváltoztatása
4. 🎨 Tartalom testreszabása
5. 📤 GitHub feltöltés
6. 🚀 GitHub Pages publikálás

**🎉 Kész! A weboldal online és használható!**

---

📧 **Támogatás**: Minden funkció dokumentált és működőképes.  
📜 **Licenc**: Szabadon használható kereskedelmi célokra is.  
🔄 **Frissítések**: Git push-sal egyszerűen frissíthető.
