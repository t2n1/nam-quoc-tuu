
export interface Product {
  id: string;
  name: string;
  volume: string;
  type: 'Lẻ' | 'Sỉ';
  price?: string;
  description: string;
  image: string;
  scales?: {
    sweetness: number; // 1-5
    aroma: number;
    body: number;
    finish: number;
    intensity?: number; // Add intensity if missing in some places
  };
  pairings?: {
    name: string;
    description?: string; // Added description
    image: string;
  }[];
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string[];
  icon: string;
  image?: string;
}

export interface Benefit {
  title: string;
  description: string;
}

export interface Distributor {
  phone: string;
  name: string;
  address: string;
  status: 'active' | 'inactive';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
  author: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactRequest {
  id: string;
  name: string;
  phone: string;
  interest: string;
  message: string;
  date: string;
  status: 'new' | 'contacted' | 'done';
}


export interface SiteContent {
  general: {
    hotline: string;
    address: string;
    email: string;
    facebook: string;
    isTraceabilityEnabled: boolean;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string;
    ogImage: string;
  };
  ageGate: {
    heading: string;
    subHeading: string;
    confirmBtn: string;
    rejectBtn: string;
    warning: string;
  };
  navbar: {
    logoImage: string;
    logoText: string;
    logoSubText: string;
    menuHome: string;
    menuStory: string;
    menuProducts: string;
    menuProcess: string;
    menuTraceability: string;
    contactButton: string;
    mobileMenuCta: string;
  };
  hero: {
    topTagline: string;
    mainTitle: string;
    subTitle: string;
    description: string;
    buttonText: string;
    backgroundImage: string;
  };
  home: {
    intro: {
      tagline: string;
      title: string;
      subtitle: string;
      quote: string;
      body1: string;
      body2: string;
      image: string;
      floatingText: string;
    };
    // New Section Headers
    headers: {
      botanicalsTagline: string;
      botanicalsTitle: string;
      botanicalsSubtitle: string;
      testimonialsTagline: string;
      testimonialsTitle: string;
      testimonialsSubtitle: string;
      blogTagline: string;
      blogTitle: string;
      blogSubtitle: string;
      faqTitle: string;
      faqSubtitle: string;
    };
    botanicals: { name: string; desc: string }[]; 
    values: {
      title: string;
      subtitle: string;
      description: string;
      items: {
        icon: string;
        title: string;
        desc: string;
      }[];
    };
    japanExport: {
      title: string;
      subTitle: string;
      description: string;
      badgeText: string;
      images: string[];
    };
    gallery: {
      title: string;
      description: string;
      images: string[];
    };
    collection: {
      tagline: string;
      title: string;
      description: string;
      buttonText: string;
      bgImage: string;
      image: string;
    };
    traceabilityBanner: {
      bgText: string;
      quote: string;
      title: string;
    };
  };
  story: {
    header: {
      tagline: string;
      title: string;
      subtitle: string;
      quote: string;
      image: string;
    };
    chapter1: {
      label: string;
      title: string;
      quote: string;
      dropCapText: string;
      content: string;
      image: string;
      imageCaption: string;
    };
    section2: {
      title: string;
      content: string;
    };
    highlight: {
      title: string;
      content: string;
    };
    section3: {
      title: string;
      content: string;
    };
    signature: {
      name: string;
      role: string;
    };
  };
  productsPage: {
    header: {
      tagline: string;
      title: string;
      subtitle: string;
    };
    b2b: {
      tagline: string;
      title: string;
      content: string;
      buttonText: string;
    };
  };
  processPage: {
    header: {
      tagline: string;
      title: string;
      subtitle: string;
    };
    bottomQuote: string;
  };
  traceabilityPage: {
    header: {
      title: string;
      subtitle: string;
    };
  };
  contactPage: {
    title: string;
    subtitle: string;
    addressLabel: string;
    hotlineLabel: string;
    emailLabel: string;
    formTitle: string;
    formNameLabel: string;
    formPhoneLabel: string;
    formInterestLabel: string;
    formMessageLabel: string;
    submitButton: string;
    interestOptions: string[];
  };
  footer: {
    brand: {
      since: string;
      titleLine1: string;
      titleHighlight: string;
      description: string;
    };
    sections: {
      linksTitle: string;
      contactTitle: string;
    };
    bottom: {
      copyright: string;
      disclaimer: string;
    };
  };
}