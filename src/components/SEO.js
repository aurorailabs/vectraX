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
    "alternateName": ["vectrax", "vectraX"],
    "legalName": "vectraX Technologies",
    "url": "https://vectrax.in/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://vectrax.in/vx_logo-removebg-preview.png",
      "width": 500,
      "height": 500
    },
    "image": "https://vectrax.in/vx_logo-removebg-preview.png",
    "description": "vectraX Technologies (vectrax) is a leading software development and IT infrastructure services company. We provide expert software development, IT infrastructure solutions, and software infrastructure services that help businesses build scalable, secure, and efficient technology environments.",
    "slogan": "Direction, speed, precision",
    "keywords": "vectrax, vectraX, software development, IT infrastructure, software infrastructure, infrastructure services",
    "foundingLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "605, Block 2, My Home Krishe, TNGOs Colony",
      "addressLocality": "Gachibowli",
      "addressRegion": "Telangana",
      "postalCode": "500046",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.4486",
      "longitude": "78.3908"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": "hello@vectrax.in",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi", "Telugu"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "Sales",
        "email": "hello@vectrax.in",
        "areaServed": "IN"
      }
    ],
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "knowsAbout": [
      "Software Development",
      "IT Infrastructure",
      "Software Infrastructure",
      "Digital Solutions",
      "Product Development",
      "E-commerce Development",
      "Web Development"
    ],
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
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Software Development",
              "description": "Expert software development services from concept to launch. vectraX provides comprehensive software development solutions that enhance business performance and streamline operations.",
              "provider": {
                "@type": "Organization",
                "name": "vectraX Technologies"
              },
              "areaServed": "IN"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Product Development",
              "description": "End-to-end product development from concept to launch. We build modern digital solutions that enhance business performance and streamline operations.",
              "provider": {
                "@type": "Organization",
                "name": "vectraX Technologies"
              }
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "e-Commerce/Websites",
              "description": "Custom e-commerce platforms and professional websites. Full-featured solutions with payment integration, inventory management, and responsive design.",
              "provider": {
                "@type": "Organization",
                "name": "vectraX Technologies"
              }
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Digital Solutions",
              "description": "Comprehensive digital transformation solutions. Tailored software and systems that perfectly fit your business needs and drive digital innovation.",
              "provider": {
                "@type": "Organization",
                "name": "vectraX Technologies"
              }
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Internship Programs",
              "description": "Hands-on learning opportunities for aspiring developers. Gain real-world experience working on live projects and develop skills in modern technologies.",
              "provider": {
                "@type": "Organization",
                "name": "vectraX Technologies"
              }
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 6,
          "item": {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "IT Infrastructure",
              "description": "Comprehensive IT infrastructure and software infrastructure services covering Core Infrastructure, Network & Security, and Office IT Setup. vectraX provides expert IT infrastructure solutions including system and server setup, secure networking, data protection, and end-to-end workplace IT readiness.",
              "provider": {
                "@type": "Organization",
                "name": "vectraX Technologies"
              }
            }
          }
        }
      ]
    }
  };

  // Additional LocalBusiness schema for better location display
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "vectraX Technologies",
    "alternateName": "vectrax",
    "image": "https://vectrax.in/vx_logo-removebg-preview.png",
    "logo": "https://vectrax.in/vx_logo-removebg-preview.png",
    "url": "https://vectrax.in/",
    "description": "vectraX Technologies - Leading software development and IT infrastructure services company in Hyderabad, India.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "605, Block 2, My Home Krishe, TNGOs Colony",
      "addressLocality": "Gachibowli",
      "addressRegion": "Telangana",
      "postalCode": "500046",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.4486",
      "longitude": "78.3908"
    },
    "telephone": "",
    "email": "hello@vectrax.in",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
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
    addStructuredData(localBusinessData, 'structured-data-localbusiness');
    
    // Cleanup function
    return () => {
      const orgScript = document.getElementById('structured-data-organization');
      const webScript = document.getElementById('structured-data-website');
      const localScript = document.getElementById('structured-data-localbusiness');
      if (orgScript) orgScript.remove();
      if (webScript) webScript.remove();
      if (localScript) localScript.remove();
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default SEO;

