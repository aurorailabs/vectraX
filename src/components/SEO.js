import { useEffect } from 'react';

const SEO = ({ 
  title = "vectraX - Software Development & IT Infrastructure Services | vectraX Technologies",
  description = "vectraX Technologies - Leading software development and IT infrastructure services provider. Expert software development, IT infrastructure solutions, software infrastructure, and digital transformation services. vectrax delivers cutting-edge technology solutions.",
  keywords = "vectrax, vectraX, software development, IT infrastructure, software infrastructure, infrastructure, software development services, IT infrastructure services, vectraX Technologies, software solutions, digital solutions, technology infrastructure, software services, infrastructure services",
  image = "https://vectrax.in/vx_logo-removebg-preview.png",
  url = "https://vectrax.in/",
  type = "website"
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Add or update meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Update meta tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    
    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:url', url, true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    updateMetaTag('twitter:image', image, true);
    
    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [title, description, keywords, image, url, type]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "vectraX Technologies",
    "alternateName": "vectrax",
    "url": "https://vectrax.in/",
    "logo": "https://vectrax.in/vx_logo-removebg-preview.png",
    "description": "vectraX Technologies (vectrax) is a leading software development and IT infrastructure services company. We provide expert software development, IT infrastructure solutions, and software infrastructure services that help businesses build scalable, secure, and efficient technology environments.",
    "slogan": "Direction, speed, precision",
    "keywords": "vectrax, vectraX, software development, IT infrastructure, software infrastructure, infrastructure services",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "605, Block 2, My Home Krishe, TNGOs Colony",
      "addressLocality": "Gachibowli",
      "addressRegion": "Telangana",
      "postalCode": "500046",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "",
      "contactType": "Customer Service",
      "email": "hello@vectrax.in",
      "areaServed": "IN",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://facebook.com",
      "https://twitter.com",
      "https://linkedin.com",
      "https://instagram.com",
      "https://youtube.com",
      "https://github.com"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Software Development & IT Infrastructure Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Software Development",
            "description": "Expert software development services from concept to launch. vectraX provides comprehensive software development solutions that enhance business performance and streamline operations."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Product Development",
            "description": "End-to-end product development from concept to launch. We build modern digital solutions that enhance business performance and streamline operations."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "e-Commerce/Websites",
            "description": "Custom e-commerce platforms and professional websites. Full-featured solutions with payment integration, inventory management, and responsive design."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Solutions",
            "description": "Comprehensive digital transformation solutions. Tailored software and systems that perfectly fit your business needs and drive digital innovation."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Internship Programs",
            "description": "Hands-on learning opportunities for aspiring developers. Gain real-world experience working on live projects and develop skills in modern technologies."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "IT Infrastructure",
            "description": "Comprehensive IT infrastructure and software infrastructure services covering Core Infrastructure, Network & Security, and Office IT Setup. vectraX provides expert IT infrastructure solutions including system and server setup, secure networking, data protection, and end-to-end workplace IT readiness."
          }
        }
      ]
    }
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "vectraX Technologies",
    "url": "https://vectrax.in/",
    "description": "vectraX Technologies - Software Products & Digital Solutions",
    "publisher": {
      "@type": "Organization",
      "name": "vectraX Technologies"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://vectrax.in/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  useEffect(() => {
    // Add structured data scripts
    const addStructuredData = (data, id) => {
      // Remove existing script if present
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }
      
      // Create new script
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    };

    addStructuredData(structuredData, 'structured-data-organization');
    addStructuredData(websiteStructuredData, 'structured-data-website');
    
    // Cleanup function
    return () => {
      const orgScript = document.getElementById('structured-data-organization');
      const webScript = document.getElementById('structured-data-website');
      if (orgScript) orgScript.remove();
      if (webScript) webScript.remove();
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default SEO;

