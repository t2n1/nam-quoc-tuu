
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Product } from '../types';

interface SEOProps {
  title?: string;
  description?: string;
  type?: 'website' | 'product' | 'article' | 'profile';
  image?: string;
  phoneCheck?: string;
  product?: Product;
}

const SEOMetadata: React.FC<SEOProps> = ({ title, description, type = 'website', image, phoneCheck, product }) => {
  const { siteContent } = useData();
  const location = useLocation();
  const siteName = "Rượu Nam Quốc Tửu";
  const siteOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl = `${siteOrigin}${location.pathname}`;

  useEffect(() => {
    const metaTitle = title ? `${title} | ${siteName}` : `${siteName} | Tinh Hoa Đại Ngàn Bắc Kạn`;
    const metaDesc = description || siteContent.footer.brand.description;
    
    document.title = metaTitle;

    // Update Meta Tags Helper
    const updateMeta = (name: string, content: string, isProperty = false) => {
      let el = document.querySelector(isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', metaDesc);
    updateMeta('og:title', metaTitle, true);
    updateMeta('og:description', metaDesc, true);
    updateMeta('og:url', fullUrl, true);
    updateMeta('og:type', type, true);
    if (image || (product && product.image)) updateMeta('og:image', image || product?.image || '', true);

    // Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
       canonical = document.createElement('link');
       canonical.setAttribute('rel', 'canonical');
       document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);


    // JSON-LD Structured Data for Google
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) existingScript.remove();

    let schema: any = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteName,
      "url": siteOrigin,
      "logo": `${siteOrigin}/logo-nqt.svg`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": siteContent.general.hotline,
        "contactType": "customer service"
      }
    };

    // Advanced Product Schema
    if (product) {
      schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": product.description,
        "brand": {
          "@type": "Brand",
          "name": "Nam Quốc Tửu Heritage"
        },
        "offers": {
          "@type": "Offer",
          "url": fullUrl,
          "priceCurrency": "VND",
          "availability": "https://schema.org/InStock",
          "price": "500000" // Should be dynamic
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "128"
        }
      };
    }

    // Specific Schema for Distributor Verification Page
    if (phoneCheck) {
      schema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": title?.split('|')[0].trim() || `Đại lý ${phoneCheck}`,
        "description": metaDesc,
        "telephone": phoneCheck,
        "url": fullUrl,
        "parentOrganization": {
            "@type": "Organization",
            "name": siteName
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": siteContent.general.address, // Ideally this should be the specific distributor address
          "addressCountry": "VN"
        },
        "image": image || "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?q=80&w=1000"
      };
    }

    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

  }, [title, description, location.pathname, siteContent, product, phoneCheck, image]);

  return null;
};

export default SEOMetadata;
