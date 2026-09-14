# SEO & Web Crawling Implementation - Quick Start

A comprehensive SEO optimization suite has been added to your millenium-senhas-frontend project. This includes automated crawling, sitemap generation, and performance monitoring.

## 📦 What's Included

### Core SEO Files

1. **seoManager.js** - Centralized SEO utilities
   - `setSeoMeta()` - Set page meta tags
   - `setStructuredData()` - Add JSON-LD markup
   - `getPropertySchema()` - Property listing schema
   - `getOrganizationSchema()` - Organization schema
   - `getBreadcrumbSchema()` - Breadcrumb navigation

2. **SEOHead.jsx** - Reusable component for managing page SEO
   - Dynamic meta tags
   - Structured data
   - Canonical URLs
   - Hreflang tags for multi-language support

3. **OptimizedImage.jsx** - Image optimization component
   - Lazy loading
   - WebP format support
   - Responsive images
   - Placeholder while loading

4. **PerformanceMonitor.jsx** - Core Web Vitals tracking
   - LCP (Largest Contentful Paint)
   - CLS (Cumulative Layout Shift)
   - FID (First Input Delay)
   - Resource timing

### Scripts

1. **generate-sitemap.js** - Generates XML sitemaps
   ```bash
   npm run seo:generate-sitemap
   ```
   Creates: `sitemap.xml`, `sitemap-pages.xml`, `sitemap-properties.xml`, `sitemap-index.xml`

2. **seo-crawler.js** - SEO audit and analysis
   ```bash
   npm run seo:audit
   ```
   Creates: `seo-report.json`, `seo-report.html`, updated `robots.txt`

3. **Full SEO check**
   ```bash
   npm run seo:full
   ```
   Runs both sitemap generation and SEO audit

### Configuration Files

- **robots.txt** - Search engine crawler instructions
- **web.config** - IIS server SEO configuration
- **.env.example** - Environment variables for SEO
- **seoMetadata.js** - Centralized SEO metadata constants

### Documentation

- **SEO_SETUP.md** - Complete SEO implementation guide
- **SEO_INTEGRATION_EXAMPLES.js** - Code examples for integration

## 🚀 Quick Integration Steps

### Step 1: Add PerformanceMonitor to App.jsx

```jsx
import PerformanceMonitor from './components/PerformanceMonitor';

function App() {
  return (
    <>
      <PerformanceMonitor debug={process.env.NODE_ENV === 'development'} />
      {/* Rest of your app */}
    </>
  );
}
```

### Step 2: Add SEOHead to Each Page

Example for HomePage:

```jsx
import SEOHead from '../components/SEOHead';
import { getPageSEO, getAlternateLanguages } from '../constants/seoMetadata';

function HomePage() {
  const seoData = getPageSEO('home');
  const alternates = getAlternateLanguages('/');

  return (
    <>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        alternateLanguages={alternates}
      />
      {/* Your page content */}
    </>
  );
}
```

### Step 3: Use OptimizedImage Component

```jsx
import OptimizedImage from '../components/OptimizedImage';

function PropertyCard({ property }) {
  return (
    <OptimizedImage
      src={property.imageUrl}
      alt={`${property.name} - Property in ${property.city}`}
      width={400}
      height={300}
      lazy={true}
    />
  );
}
```

### Step 4: Generate Sitemaps

```bash
npm run seo:generate-sitemap
```

### Step 5: Run SEO Audit

```bash
npm run seo:audit
```

This creates an HTML report at `/public/seo-report.html`

## 📊 SEO Checklist

Use this checklist to ensure comprehensive SEO implementation:

- [ ] All pages use SEOHead component
- [ ] Unique titles for each page (50-60 characters)
- [ ] Unique descriptions for each page (150-160 characters)
- [ ] Structured data (Schema.org JSON-LD) implemented
- [ ] All images use OptimizedImage or have alt text
- [ ] Breadcrumb navigation added to relevant pages
- [ ] Internal linking strategy implemented
- [ ] robots.txt configured
- [ ] Sitemaps generated and submitted to GSC
- [ ] Canonical URLs set
- [ ] Hreflang tags for multi-language pages
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags configured
- [ ] Core Web Vitals monitoring active
- [ ] Mobile responsive design verified

## 🔍 Available SEO Metadata Constants

The `seoMetadata.js` file contains pre-configured metadata for all pages:

```javascript
import { getPageSEO } from '../constants/seoMetadata';

// For static pages
const seoData = getPageSEO('home');
const seoData = getPageSEO('properties');
const seoData = getPageSEO('contactUs');

// For pages with dynamic parameters
const seoData = getPageSEO('propertyDetail', {
  propertyName: 'Colombo Property',
  city: 'Colombo',
  price: '5,000,000 LKR'
});
```

### Available Pages

- `home` - Homepage
- `properties` - Properties listing
- `propertyDetail` - Individual property (dynamic)
- `contactUs` - Contact page
- `login` - Login page (noindex)
- `register` - Register page (noindex)
- `dashboard` - User dashboard (noindex)
- `messages` - Messages page (noindex)
- `chat` - Chat page

## 🌍 Multi-Language Support

SEOHead automatically handles hreflang tags:

```jsx
<SEOHead
  title="Browse Properties"
  language="en"
  alternateLanguages={[
    { hreflang: 'si', href: 'https://sps.example.com/si/properties' },
    { hreflang: 'ta', href: 'https://sps.example.com/ta/properties' }
  ]}
/>
```

## 📈 Monitoring Performance

The PerformanceMonitor component tracks:

1. **Largest Contentful Paint (LCP)** - Should be < 2.5s
2. **Cumulative Layout Shift (CLS)** - Should be < 0.1
3. **First Input Delay (FID)** - Should be < 100ms
4. **Page Load Time** - Total time to load
5. **Resource Timing** - Individual resource speeds

Enable debug mode to see metrics in console:

```jsx
<PerformanceMonitor debug={true} />
```

## 📝 Customizing SEO Metadata

Edit `src/constants/seoMetadata.js` to customize titles, descriptions, and keywords for your site.

## 🔗 Useful Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org)
- [Web Vitals Guide](https://web.dev/vitals/)
- [React Router for SPAs](https://reactrouter.com/)

## 🐛 Troubleshooting

### Sitemaps not generating?
- Check `VITE_SITE_URL` in `.env`
- Ensure `/public` folder exists
- Run: `mkdir -p public` then `npm run seo:generate-sitemap`

### SEO audit not finding pages?
- Verify routes are defined in `App.jsx`
- Check page components exist in `/src/pages`
- Review crawler output for errors

### Low Core Web Vitals?
- Use OptimizedImage for all images
- Implement code splitting with React.lazy()
- Reduce bundle size
- Enable gzip compression on server

## 📧 Next Steps

1. **Integrate SEOHead** into all your page components
2. **Replace images** with OptimizedImage component
3. **Run seo:audit** to get a detailed report
4. **Submit sitemaps** to Google Search Console
5. **Monitor performance** using the PerformanceMonitor
6. **Fix issues** identified in the SEO report

---

**Need Help?** Check the SEO_SETUP.md file for detailed information on each feature.
