# SEO & Web Crawling Setup Guide

This document provides comprehensive SEO and web crawling setup for the Senhas Property Sales Frontend.

## 🚀 Quick Start

### 1. Generate Sitemaps

```bash
# Generate XML sitemaps for search engines
npm run generate:sitemap
```

This creates:
- `/public/sitemap.xml` - Main sitemap
- `/public/sitemap-pages.xml` - Static pages sitemap
- `/public/sitemap-properties.xml` - Properties sitemap
- `/public/sitemap-index.xml` - Sitemap index

### 2. Run SEO Crawler & Audit

```bash
# Analyze pages and generate SEO report
npm run seo:audit
```

This generates:
- `/public/seo-report.json` - Detailed JSON report
- `/public/seo-report.html` - Visual HTML report
- `/public/robots.txt` - Updated robots.txt

## 📝 Page-Level SEO Implementation

### Using the SEOHead Component

Add SEO metadata to each page:

```jsx
import SEOHead from '../components/SEOHead';
import { getPropertySchema } from '../utils/seoManager';

function PropertiesPage() {
  return (
    <>
      <SEOHead
        title="Browse Properties"
        description="Explore our premium land properties and real estate listings"
        keywords="property, land, real estate, Sri Lanka"
        ogImage="https://sps.example.com/og-properties.jpg"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Properties',
          description: 'Premium land properties'
        }}
      />
      {/* Page content */}
    </>
  );
}
```

### Page Title & Meta Description Guidelines

- **Title**: 50-60 characters, include target keywords
  - ✅ "Property Listings | Senhas Property Sales - Premium Land"
  - ❌ "page1" or overly long titles

- **Description**: 150-160 characters, compelling and action-oriented
  - ✅ "Discover premium land properties for sale. Browse listings with detailed maps, pricing, and agent contacts. Find your perfect property today."
  - ❌ "This is a page about properties"

- **Keywords**: 5-10 relevant terms, comma-separated
  - ✅ "land property, real estate, property for sale, Sri Lanka"
  - ❌ "property, real estate, house, land, ..." (avoid keyword stuffing)

## 🏗️ Structured Data

### Property Listing Schema

```jsx
import { getPropertySchema, setStructuredData } from '../utils/seoManager';

useEffect(() => {
  const propertySchema = getPropertySchema({
    name: property.title,
    description: property.description,
    image: property.image,
    address: property.location,
    city: property.city,
    price: property.price,
    priceCurrency: 'LKR',
    url: window.location.href,
    latitude: property.lat,
    longitude: property.lng
  });
  setStructuredData(propertySchema);
}, [property]);
```

### Breadcrumb Schema

```jsx
import { getBreadcrumbSchema, setStructuredData } from '../utils/seoManager';

useEffect(() => {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'Home', url: 'https://sps.example.com' },
    { name: 'Properties', url: 'https://sps.example.com/properties' },
    { name: currentProperty.name, url: window.location.href }
  ]);
  setStructuredData(breadcrumbs);
}, [currentProperty]);
```

## 🖼️ Image Optimization

Use the `OptimizedImage` component for lazy loading and WebP support:

```jsx
import OptimizedImage from '../components/OptimizedImage';

export function PropertyCard({ property }) {
  return (
    <OptimizedImage
      src={property.imageUrl}
      alt={`${property.name} - Property in ${property.city}`}
      title={property.name}
      width={400}
      height={300}
      sizes="(max-width: 768px) 100vw, 50vw"
      onLoad={() => console.log('Image loaded')}
    />
  );
}
```

## 📊 Performance Monitoring

Add the `PerformanceMonitor` component to track Core Web Vitals:

```jsx
import PerformanceMonitor from '../components/PerformanceMonitor';

function App() {
  return (
    <>
      <PerformanceMonitor debug={process.env.NODE_ENV === 'development'} />
      {/* Rest of app */}
    </>
  );
}
```

## 🔗 Internal Linking Strategy

### Best Practices

1. **Link Structure**
   - Use descriptive anchor text
   - Link to related properties and categories
   - Avoid keyword stuffing in links

2. **Navigation Hierarchy**
   - Home → Categories → Subcategories → Details
   - Logical, crawlable structure

3. **Breadcrumb Navigation**
   - Helps users and crawlers understand page hierarchy
   - Include in markup as well as visually

## 🤖 Robots Configuration

The `robots.txt` includes:
- Allow crawling of main content pages
- Disallow private/admin areas
- Specify sitemap locations
- Crawl delay recommendations

### Customize in `/public/robots.txt`:

```
User-agent: *
Allow: /
Allow: /properties
Disallow: /admin
Disallow: /dashboard
Sitemap: https://sps.example.com/sitemap.xml
```

## 🌍 Multi-Language Support

The SEOHead component supports alternate language versions:

```jsx
<SEOHead
  title="Properties"
  description="Browse properties"
  language="en"
  alternateLanguages={[
    { hreflang: 'si', href: 'https://sps.example.com/si/properties' },
    { hreflang: 'ta', href: 'https://sps.example.com/ta/properties' }
  ]}
/>
```

## 📈 SEO Checklist

- [ ] All pages have unique titles (50-60 chars)
- [ ] All pages have meta descriptions (150-160 chars)
- [ ] Structured data (Schema.org) implemented
- [ ] Images use descriptive alt text
- [ ] Images are optimized (WebP, lazy-loaded)
- [ ] Mobile-responsive design
- [ ] Fast page load (LCP < 2.5s, CLS < 0.1)
- [ ] Sitemaps generated and submitted
- [ ] robots.txt configured
- [ ] Internal linking strategy implemented
- [ ] Canonical URLs set
- [ ] Hreflang tags for multi-language
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags for Twitter sharing

## 🔧 Package.json Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "generate:sitemap": "node scripts/generate-sitemap.js",
    "seo:audit": "node scripts/seo-crawler.js",
    "seo:full": "npm run generate:sitemap && npm run seo:audit"
  }
}
```

## 📊 Monitoring & Analytics

### Google Search Console
1. Add property in GSC
2. Submit sitemaps
3. Monitor search performance
4. Fix indexation issues

### Google Analytics
1. Integrate with your app
2. Track page views and events
3. Monitor Core Web Vitals
4. Review conversion funnels

### Page Speed Insights
1. Run reports regularly
2. Monitor LCP, FID, CLS
3. Optimize based on recommendations

## 🔗 Useful Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards)

## 🐛 Troubleshooting

### Sitemaps not generating
- Check `VITE_SITE_URL` environment variable
- Ensure public folder exists
- Check file permissions

### SEO crawler errors
- Verify all page components exist
- Check Route definitions in App.jsx
- Review console for parsing errors

### Low Core Web Vitals scores
- Optimize images (use OptimizedImage component)
- Reduce JavaScript bundle size
- Implement code splitting
- Use performance monitoring to identify bottlenecks

## 📞 Support

For issues or questions about SEO setup, check the generated reports:
- `public/seo-report.html` - Detailed recommendations
- Browser console - Debug information
- Performance tab in DevTools - Metrics

---

Last Updated: 2024
