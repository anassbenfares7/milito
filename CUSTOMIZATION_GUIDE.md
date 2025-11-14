# AZITALIA RESTAURANT TEMPLATE - CUSTOMIZATION GUIDE

## 🍽️ Welcome to Your New Restaurant Website Template!

This comprehensive guide will help you transform the AZITALIA restaurant website into your own beautiful, functional restaurant website. We've organized all the code and added helpful comments to make customization as easy as possible.

---

## 📋 Table of Contents

1. [Quick Start Guide](#quick-start-guide)
2. [Basic Customization](#basic-customization)
3. [Advanced Customization](#advanced-customization)
4. [Menu Management](#menu-management)
5. [Contact & Reservations](#contact--reservations)
6. [SEO Optimization](#seo-optimization)
7. [Performance Optimization](#performance-optimization)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start Guide

### Step 1: Update Basic Information
Edit these files to replace AZITALIA with your restaurant details:

#### **index.html** (Main Page)
- **Line 19**: Update meta description
- **Line 48**: Change favicon to your logo
- **Line 51**: Update page title
- **Line 97**: Change desktop logo
- **Line 123**: Change mobile restaurant name
- **Line 169**: Update main headline
- **Line 171**: Update main description

#### **CSS Customization** (assets/css/style.css)
- **Lines 14-22**: Update brand colors in CSS variables:
  ```css
  :root {
    --primary-color: #075548;      /* Main brand color */
    --secondary-color: #8B4513;    /* Secondary color */
    --accent-color: #d4af37;       /* Gold accent */
    --background-color: #FDF5E6;   /* Background color */
    --text-color: #075548;         /* Text color */
    --heading-color: #8B0000;      /* Heading color */
  }
  ```

### Step 2: Replace Images
Replace these placeholder images with your restaurant photos:

| Image Location | Current File | Recommended Size | Description |
|---|---|---|---|
| Logo | `assets/images/AZITALIA logo circle.png` | 200x200px | Favicon |
| Logo | `assets/images/AZITALIA logo no-bg green.png` | 200x50px | Header logo |
| Banner | `assets/images/banner-img.webp` | 1920x1080px | Hero section |
| Food photos | `assets/images/menu/` | 800x600px | Menu items |

---

## 🎨 Basic Customization

### Restaurant Information

#### **Contact Details** (Multiple Files)
Update in all HTML files:
- Phone numbers
- Email addresses
- Physical address
- Opening hours

#### **Navigation Menu** (All HTML files)
Keep the same structure but update text:
```html
<li class="list-unstyled py-2">
    <a class="text-decoration-none text-uppercase p-4 text-white" href="./index.html">Accueil</a>
</li>
```

### Color Scheme

#### **Primary Colors** (assets/css/style.css:14-22)
```css
:root {
    --primary-color: #075548;      /* Your main brand color */
    --secondary-color: #8B4513;    /* Secondary brand color */
    --accent-color: #d4af37;       /* Highlight/accent color */
    --background-color: #FDF5E6;   /* Page background */
    --text-color: #075548;         /* Main text color */
    --heading-color: #8B0000;      /* Headings color */
}
```

#### **Font Customization** (index.html:39)
Change Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFontFamily:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

---

## 🔧 Advanced Customization

### Menu System

#### **Menu Data Structure** (assets/js/menu.json)
The menu is dynamically loaded from this JSON file:

```json
{
  "categories": [
    {
      "name": "PROMO",
      "icon": "fas fa-star",
      "items": [
        {
          "id": 1,
          "name": "Tajine d'Agneau",
          "description": "Délicieux tajine avec agneau tendre et légumes",
          "price": "180 DH",
          "imageURL": "images/menu/tajine-agneau.jpg"
        }
      ]
    }
  ]
}
```

**To customize your menu:**
1. Open `assets/js/menu.json`
2. Modify categories or add new ones
3. Update items with your dishes
4. Update image paths to your food photos

#### **Adding Menu Categories**
```json
{
  "name": "CATEGORY_NAME",
  "icon": "fas fa-icon-name",
  "items": [
    {
      "id": unique_number,
      "name": "Dish Name",
      "description": "Dish description",
      "price": "Price format",
      "imageURL": "path/to/image.jpg"
    }
  ]
}
```

### Form Configuration

#### **Contact Form** (assets/js/contact.js)
**EmailJS Setup:**
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Update these values:
   - Line 15: `emailjs.init("YOUR_PUBLIC_KEY")`
   - Line 171: `"service_your_service_id"`
   - Line 172: `"template_your_template_id"`

#### **Reservation Form** (assets/js/reservation.js)
**Google Sheets Setup:**
1. Create Google Apps Script Web App
2. Update line 12 with your script URL:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

---

## 📱 Page-by-Page Customization

### **index.html** - Homepage
**Hero Section** (Lines 204-195):
```html
<section class="banner py-5">
  <div class="container py-5">
    <div class="row">
      <div class="col-md-6 banner-content pe-5" data-aos="fade-right">
        <h1 class="display-2">Your Headline Here</h1>
        <p>Your restaurant description here...</p>
      </div>
    </div>
  </div>
</section>
```

### **menu.html** - Menu Page
Automatically loads from `menu.json`. No direct editing needed.

### **about.html** - About Page
Update your restaurant story, timeline, and team information.

### **contact.html** - Contact Page
Update map coordinates and contact information.

### **reservation.html** - Reservation Page
Update reservation form fields and opening hours.

---

## 🔍 SEO Optimization

### **Meta Tags** (All HTML files)
Update for each page:
```html
<meta name="description" content="Your page description">
<meta property="og:title" content="Your page title">
<meta property="og:description" content="Your page description">
<meta property="og:image" content="URL to page image">
```

### **Structured Data** (index.html:43-45)
Update restaurant information:
```json
{
  "@context":"https://schema.org",
  "@type":"Restaurant",
  "name":"Your Restaurant Name",
  "address":{
    "@type":"PostalAddress",
    "streetAddress":"Your Address",
    "addressLocality":"Your City",
    "addressCountry":"Your Country"
  },
  "telephone":"+1234567890",
  "openingHours":"Mo-Su 12:00-23:59"
}
```

### **SEO Files**
- **sitemap.xml**: Update with your domain
- **robots.txt**: Update with your sitemap URL

---

## ⚡ Performance Optimization

### **Image Optimization**
- Use WebP format for photos
- Compress images to under 200KB
- Use responsive images with `srcset`

### **Loading Strategy**
- CSS is optimized with preload
- JavaScript loads after page content
- Images use lazy loading

### **Web Vitals Monitoring**
The template includes performance monitoring (assets/js/web-vitals.js):
- Tracks Core Web Vitals
- Reports to Google Analytics
- Only runs in production

---

## 📧 Email Configuration

### **EmailJS Setup (Contact Form)**
1. Create EmailJS account
2. Create email service
3. Create email template
4. Update contact.js with your IDs

### **Google Sheets Setup (Reservations)**
1. Create Google Sheet
2. Create Apps Script Web App
3. Update reservation.js with script URL

---

## 🛠️ Troubleshooting

### **Common Issues**

#### **Images Not Loading**
- Check file paths in HTML and CSS
- Ensure image files exist in correct folders
- Verify image formats (JPG, PNG, WebP)

#### **Menu Not Displaying**
- Check `menu.json` for valid JSON syntax
- Verify image paths in menu data
- Check browser console for errors

#### **Forms Not Working**
- Verify EmailJS configuration
- Check Google Apps Script deployment
- Ensure form field names match

#### **Styles Not Applied**
- Check CSS file path
- Verify CSS variable names
- Clear browser cache

### **Getting Help**

1. **Browser Console**: Check for JavaScript errors
2. **Network Tab**: Verify all resources load correctly
3. **Validate HTML**: Use online HTML validators
4. **Validate JSON**: Check menu.json syntax

---

## 📁 File Structure

```
AZITALIA/
├── index.html              # Homepage
├── about.html              # About page
├── menu.html               # Menu page
├── contact.html            # Contact page
├── reservation.html        # Reservation page
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet (organized)
│   ├── js/
│   │   ├── script.js       # Main JavaScript (organized)
│   │   ├── contact.js      # Contact form handler (organized)
│   │   ├── reservation.js  # Reservation form handler (organized)
│   │   ├── web-vitals.js   # Performance monitoring (organized)
│   │   └── menu.json       # Menu data structure
│   ├── images/
│   │   ├── *.png           # Logos and icons
│   │   ├── *.webp          # Optimized photos
│   │   └── menu/           # Menu item photos
│   └── components/         # Reusable HTML components
├── sitemap.xml             # SEO sitemap
└── robots.txt              # SEO instructions
```

---

## 🎯 Customization Checklist

### **Phase 1: Basic Setup**
- [ ] Update restaurant name everywhere
- [ ] Replace logo files
- [ ] Update contact information
- [ ] Change brand colors
- [ ] Update social media links

### **Phase 2: Content**
- [ ] Write your menu items in menu.json
- [ ] Add your food photos
- [ ] Update about page content
- [ ] Write your restaurant story
- [ ] Add team member information

### **Phase 3: Technical**
- [ ] Set up EmailJS for contact form
- [ ] Configure Google Sheets for reservations
- [ ] Update meta tags for SEO
- [ ] Test all forms
- [ ] Check mobile responsiveness

### **Phase 4: Launch**
- [ ] Test all links
- [ ] Validate HTML
- [ ] Check loading speed
- [ ] Test on mobile devices
- [ ] Set up domain and hosting

---

## 💡 Pro Tips

1. **Keep Image Sizes Small**: Optimize photos before uploading
2. **Test Mobile First**: Most customers will use mobile
3. **Keep Menu Simple**: Don't overwhelm with too many options
4. **Update Regularly**: Keep content fresh and accurate
5. **Monitor Performance**: Use the built-in Web Vitals monitoring

---

## 📞 Support Resources

- **HTML/CSS Validation**: [W3C Validator](https://validator.w3.org/)
- **JSON Validation**: [JSON Lint](https://jsonlint.com/)
- **Image Optimization**: [TinyPNG](https://tinypng.com/)
- **SEO Tools**: [Google Search Console](https://search.google.com/search-console/)

---

## 🎉 Congratulations!

You now have a fully functional, professional restaurant website template. The code is organized, documented, and ready for customization. Your new website includes:

- ✅ Responsive design for all devices
- ✅ Interactive menu with photo galleries
- ✅ Contact and reservation forms
- ✅ SEO optimization
- ✅ Performance monitoring
- ✅ Modern loading animations
- ✅ Professional styling and animations

Good luck with your restaurant website! 🍽️

---

*This template was transformed from AZITALIA restaurant website into a clean, reusable template with organized code, comprehensive documentation, and easy customization options.*