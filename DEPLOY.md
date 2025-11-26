# Portfolio Website - Deploy Rehberi

Bu portfolio sitesini başarıyla deploy etmek için aşağıdaki adımları takip edin.

## Dosya Yapısı

```
/
├── index.html
├── admin-login.html
├── admin-panel.html
├── .htaccess
├── css/
│   ├── style.css
│   ├── admin-login.css
│   ├── admin-panel.css
│   └── ...
├── js/
│   ├── script.js
│   ├── app.js
│   ├── admin-panel.js
│   └── ...
├── data/
│   └── data.json
└── images/
    └── proje_pp.png
```

## Deploy Adımları

### 1. Hosting Seçimi

Bu site statik bir sitedir ve aşağıdaki platformlarda barındırılabilir:

- **GitHub Pages** (Ücretsiz, önerilen)
- **Netlify** (Ücretsiz, önerilen)
- **Vercel** (Ücretsiz, önerilen)
- **Klasik Hosting** (Apache/Nginx)

### 2. GitHub Pages Deploy

```bash
# Repoyu GitHub'a push edin
git add .
git commit -m "Deploy hazır"
git push origin main

# GitHub repository Settings > Pages bölümünden:
# - Source: Deploy from a branch
# - Branch: main / (root)
# - Save
```

### 3. Netlify Deploy

1. [Netlify](https://netlify.com) hesabı oluşturun
2. "New site from Git" seçeneğini seçin
3. Repository'nizi bağlayın
4. Build settings:
   - Build command: (boş bırakın)
   - Publish directory: (boş bırakın veya `/`)
5. Deploy butonuna tıklayın

### 4. Vercel Deploy

```bash
# Vercel CLI kurulumu
npm install -g vercel

# Deploy
vercel
```

### 5. Klasik Hosting (cPanel, FileZilla vs.)

1. Tüm dosyaları `public_html` veya `www` klasörüne yükleyin
2. Dosya yapısının aynı kalmasına dikkat edin
3. `.htaccess` dosyasının yüklendiğinden emin olun
4. Dosya izinlerini kontrol edin:
   - HTML, CSS, JS dosyaları: 644
   - Klasörler: 755

## Önemli Notlar

### ✅ Düzeltilen Sorunlar

1. **CSS/JS Dosya Yolları**: Tüm yollar `./` ile başlayacak şekilde güncellendi
2. **Data JSON Yolu**: `fetch('./data/data.json')` olarak düzeltildi
3. **Image Yolları**: `./images/` ile başlayacak şekilde güncellendi
4. **.htaccess Eklendi**: Apache sunucular için önbellekleme ve CORS ayarları

### 🔍 Deploy Sonrası Kontrol Listesi

- [ ] Ana sayfa düzgün yükleniyor mu?
- [ ] CSS stilleri uygulanıyor mu?
- [ ] JavaScript çalışıyor mu?
- [ ] Görseller görünüyor mu?
- [ ] Admin login sayfası açılıyor mu?
- [ ] Tema değiştirme çalışıyor mu?
- [ ] Console'da hata var mı? (F12 > Console)

### 🐛 Sorun Giderme

#### CSS Görünmüyorsa:

1. Tarayıcı geliştirici araçlarını açın (F12)
2. Network sekmesine gidin
3. Sayfayı yenileyin (Ctrl+F5)
4. Kırmızı (404) hatalar varsa dosya yollarını kontrol edin

#### JavaScript Çalışmıyorsa:

1. Console sekmesine bakın (F12)
2. Hata mesajlarını kontrol edin
3. `data.json` dosyasının yüklendiğinden emin olun

#### Görsel Görünmüyorsa:

1. `images/` klasörünün yüklendiğinden emin olun
2. Dosya adlarının büyük/küçük harf duyarlı olduğunu unutmayın

## CORS Hataları

Eğer local'de test ederken CORS hatası alıyorsanız:

```bash
# Python ile local server
python -m http.server 8000

# Node.js ile local server
npx http-server -p 8000
```

Tarayıcıda `http://localhost:8000` adresini açın.

## Güvenlik

- Admin paneli sessionStorage kullanır (basit koruma)
- Production ortamında mutlaka backend authentication ekleyin
- `admin-panel.js` içindeki token kontrolünü gerçek bir API ile değiştirin

## Destek

Herhangi bir sorun yaşarsanız:
1. Browser Console'u kontrol edin
2. Network sekmesinde hangi dosyaların yüklenemediğini görün
3. Dosya yollarının doğru olduğundan emin olun

---

**Not**: Bu site tamamen statik bir frontend projesidir. Admin panel özellikleri client-side'dadır ve production'da backend entegrasyonu gerektirir.
