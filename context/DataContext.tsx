
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS, MOCK_DISTRIBUTORS as INITIAL_DISTRIBUTORS, PROCESS_STEPS as INITIAL_PROCESS, INITIAL_CONTENT, MOCK_NEWS as INITIAL_NEWS, MOCK_TESTIMONIALS, MOCK_FAQS } from '../constants';
import { Product, Distributor, ProcessStep, SiteContent, BlogPost, Testimonial, FAQItem } from '../types';

interface DataContextType {
  products: Product[];
  distributors: Distributor[];
  processSteps: ProcessStep[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  siteContent: SiteContent;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateDistributor: (distributor: Distributor) => void;
  addDistributor: (distributor: Distributor) => void;
  deleteDistributor: (phone: string) => void;
  updateProcessStep: (step: ProcessStep) => void;
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  addTestimonial: (item: Testimonial) => void; // New
  updateTestimonial: (item: Testimonial) => void; // New
  deleteTestimonial: (id: string) => void; // New
  addFaq: (item: FAQItem) => void; // New
  updateFaq: (originalQuestion: string, item: FAQItem) => void; // New
  deleteFaq: (question: string) => void; // New
  updateSiteContent: (content: SiteContent) => void;
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial data from localStorage if available, else use constants
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [distributors, setDistributors] = useState<Distributor[]>(() => {
    const saved = localStorage.getItem('distributors');
    return saved ? JSON.parse(saved) : INITIAL_DISTRIBUTORS;
  });

  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(() => {
    const saved = localStorage.getItem('processSteps');
    return saved ? JSON.parse(saved) : INITIAL_PROCESS;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('blogPosts');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('testimonials');
    return saved ? JSON.parse(saved) : MOCK_TESTIMONIALS;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('faqs');
    return saved ? JSON.parse(saved) : MOCK_FAQS;
  });

  // Load Content
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem('siteContent');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  // Persist to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('distributors', JSON.stringify(distributors));
  }, [distributors]);

  useEffect(() => {
    localStorage.setItem('processSteps', JSON.stringify(processSteps));
  }, [processSteps]);

  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('faqs', JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem('siteContent', JSON.stringify(siteContent));
  }, [siteContent]);

  // --- Auth Actions ---
  const login = (password: string) => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdmin');
  };

  // --- Product Actions ---
  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // --- Distributor Actions ---
  const updateDistributor = (updatedDistributor: Distributor) => {
    setDistributors(prev => prev.map(d => d.phone === updatedDistributor.phone ? updatedDistributor : d));
  };

  const addDistributor = (distributor: Distributor) => {
    setDistributors(prev => [...prev, distributor]);
  };

  const deleteDistributor = (phone: string) => {
    setDistributors(prev => prev.filter(d => d.phone !== phone));
  };

  // --- Process Actions ---
  const updateProcessStep = (updatedStep: ProcessStep) => {
    setProcessSteps(prev => prev.map(s => s.step === updatedStep.step ? updatedStep : s));
  };

  // --- Blog Actions ---
  const addBlogPost = (post: BlogPost) => {
    setBlogPosts(prev => [post, ...prev]);
  };

  const updateBlogPost = (updatedPost: BlogPost) => {
    setBlogPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  // --- Testimonial Actions ---
  const addTestimonial = (item: Testimonial) => {
    setTestimonials(prev => [...prev, item]);
  };

  const updateTestimonial = (updatedItem: Testimonial) => {
    setTestimonials(prev => prev.map(t => t.id === updatedItem.id ? updatedItem : t));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // --- FAQ Actions ---
  const addFaq = (item: FAQItem) => {
    setFaqs(prev => [...prev, item]);
  };

  const updateFaq = (originalQuestion: string, updatedItem: FAQItem) => {
    setFaqs(prev => prev.map(f => f.question === originalQuestion ? updatedItem : f));
  };

  const deleteFaq = (question: string) => {
    setFaqs(prev => prev.filter(f => f.question !== question));
  };

  // --- Content Actions ---
  const updateSiteContent = (content: SiteContent) => {
    setSiteContent(content);
  }

  return (
    <DataContext.Provider value={{
      products,
      distributors,
      processSteps,
      blogPosts,
      testimonials,
      faqs,
      siteContent,
      updateProduct,
      addProduct,
      deleteProduct,
      updateDistributor,
      addDistributor,
      deleteDistributor,
      updateProcessStep,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      addFaq,
      updateFaq,
      deleteFaq,
      updateSiteContent,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
