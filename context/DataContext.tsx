import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS, MOCK_DISTRIBUTORS as INITIAL_DISTRIBUTORS, PROCESS_STEPS as INITIAL_PROCESS, INITIAL_CONTENT, MOCK_NEWS as INITIAL_NEWS, MOCK_TESTIMONIALS, MOCK_FAQS, MOCK_CONTACTS, CONTENT_VERSION } from '../constants';
import { supabaseService } from '../supabaseService';

// Clear stale localStorage when source data version changes
if (localStorage.getItem('contentVersion') !== CONTENT_VERSION) {
  ['siteContent', 'products', 'distributors', 'processSteps', 'blogPosts', 'testimonials', 'faqs'].forEach(k => localStorage.removeItem(k));
  localStorage.setItem('contentVersion', CONTENT_VERSION);
}
import { Product, Distributor, ProcessStep, SiteContent, BlogPost, Testimonial, FAQItem, ContactRequest } from '../types';

interface DataContextType {
  products: Product[];
  distributors: Distributor[];
  processSteps: ProcessStep[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  contacts: ContactRequest[];
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
  addTestimonial: (item: Testimonial) => void;
  updateTestimonial: (item: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  addFaq: (item: FAQItem) => void;
  updateFaq: (originalQuestion: string, item: FAQItem) => void;
  deleteFaq: (question: string) => void;
  updateContactStatus: (id: string, status: 'new' | 'contacted' | 'done') => void;
  deleteContact: (id: string) => void;
  updateSiteContent: (content: SiteContent) => void;
  // Live Editing Props
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  isLiveEditing: boolean;
  toggleLiveEditing: () => void;
  updateContentByPath: (path: string, value: any) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [distributors, setDistributors] = useState<Distributor[]>(INITIAL_DISTRIBUTORS);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>(INITIAL_PROCESS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_NEWS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(MOCK_TESTIMONIALS);
  const [faqs, setFaqs] = useState<FAQItem[]>(MOCK_FAQS);
  const [contacts, setContacts] = useState<ContactRequest[]>(MOCK_CONTACTS);
  const [siteContent, setSiteContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => localStorage.getItem('isAdmin') === 'true');
  const [isLiveEditing, setIsLiveEditing] = useState(false);

  // Load data from Supabase on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          dbProducts,
          dbDistributors,
          dbBlogPosts,
          dbTestimonials,
          dbFaqs,
          dbContacts,
          dbContent
        ] = await Promise.all([
          supabaseService.getProducts(),
          supabaseService.getDistributors(),
          supabaseService.getBlogPosts(),
          supabaseService.getTestimonials(),
          supabaseService.getFaqs(),
          supabaseService.getContacts(),
          supabaseService.getSiteContent()
        ]);

        if (dbProducts.length > 0) setProducts(dbProducts);
        if (dbDistributors.length > 0) setDistributors(dbDistributors);
        if (dbBlogPosts.length > 0) setBlogPosts(dbBlogPosts);
        if (dbTestimonials.length > 0) setTestimonials(dbTestimonials);
        if (dbFaqs.length > 0) setFaqs(dbFaqs);
        if (dbContacts.length > 0) setContacts(dbContacts);

        if (dbContent) {
          // Smart merge with INITIAL_CONTENT to ensure new fields are present
          const merged = JSON.parse(JSON.stringify(INITIAL_CONTENT));
          const mergeRecursive = (base: any, override: any) => {
            for (const key in override) {
              if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {
                if (!base[key]) base[key] = {};
                mergeRecursive(base[key], override[key]);
              } else {
                base[key] = override[key];
              }
            }
          };
          mergeRecursive(merged, dbContent);
          setSiteContent(merged);
        }
      } catch (error) {
        console.error('Error loading data from Supabase:', error);
      }
    };

    loadData();
  }, []);

  // Auth Actions
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
    setIsLiveEditing(false);
    localStorage.removeItem('isAdmin');
  };

  const toggleLiveEditing = () => {
    if (isAuthenticated) setIsLiveEditing(prev => !prev);
  };

  // Generic Update Functions (with Supabase sync)
  const updateProduct = async (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    await supabaseService.saveProduct(updatedProduct);
  };

  const addProduct = async (product: Product) => {
    setProducts(prev => [...prev, product]);
    await supabaseService.saveProduct(product);
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    await supabaseService.deleteProduct(id);
  };

  const updateDistributor = async (updatedDistributor: Distributor) => {
    setDistributors(prev => prev.map(d => d.phone === updatedDistributor.phone ? updatedDistributor : d));
    await supabaseService.saveDistributor(updatedDistributor);
  };

  const addDistributor = async (distributor: Distributor) => {
    setDistributors(prev => [...prev, distributor]);
    await supabaseService.saveDistributor(distributor);
  };

  const deleteDistributor = async (phone: string) => {
    setDistributors(prev => prev.filter(d => d.phone !== phone));
    await supabaseService.deleteDistributor(phone);
  };

  // Note: Process steps are currently tied to SiteContent in some implementations or constant. 
  // If they need to be separate tables, we can add them later. Use siteContent for simplicity if preferred.
  const updateProcessStep = (updatedStep: ProcessStep) => setProcessSteps(prev => prev.map(s => s.step === updatedStep.step ? updatedStep : s));

  const addBlogPost = async (post: BlogPost) => {
    setBlogPosts(prev => [post, ...prev]);
    await supabaseService.saveBlogPost(post);
  };

  const updateBlogPost = async (updatedPost: BlogPost) => {
    setBlogPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
    await supabaseService.saveBlogPost(updatedPost);
  };

  const deleteBlogPost = async (id: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
    await supabaseService.deleteBlogPost(id);
  };

  const addTestimonial = async (item: Testimonial) => {
    setTestimonials(prev => [...prev, item]);
    await supabaseService.saveTestimonial(item);
  };

  const updateTestimonial = async (updatedItem: Testimonial) => {
    setTestimonials(prev => prev.map(t => t.id === updatedItem.id ? updatedItem : t));
    await supabaseService.saveTestimonial(updatedItem);
  };

  const deleteTestimonial = async (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    await supabaseService.deleteTestimonial(id);
  };

  const addFaq = async (item: FAQItem) => {
    setFaqs(prev => [...prev, item]);
    await supabaseService.saveFaq(item);
  };

  const updateFaq = async (originalQuestion: string, updatedItem: FAQItem) => {
    setFaqs(prev => prev.map(f => f.question === originalQuestion ? updatedItem : f));
    await supabaseService.saveFaq(updatedItem);
  };

  const deleteFaq = async (question: string) => {
    setFaqs(prev => prev.filter(f => f.question !== question));
    await supabaseService.deleteFaq(question);
  };

  const updateContactStatus = async (id: string, status: 'new' | 'contacted' | 'done') => {
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;
    const updated = { ...contact, status };
    setContacts(prev => prev.map(c => c.id === id ? updated : c));
    await supabaseService.saveContact(updated);
  };

  const deleteContact = async (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    await supabaseService.deleteContact(id);
  };

  const updateSiteContent = async (content: SiteContent) => {
    setSiteContent(content);
    await supabaseService.updateSiteContent(content);
  };

  const updateContentByPath = async (path: string, value: any) => {
    let finalContent: SiteContent | null = null;
    setSiteContent(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      finalContent = newData;
      return newData;
    });

    if (finalContent) {
      await supabaseService.updateSiteContent(finalContent);
    }
  };

  return (
    <DataContext.Provider value={{
      products, distributors, processSteps, blogPosts, testimonials, faqs, contacts, siteContent,
      updateProduct, addProduct, deleteProduct,
      updateDistributor, addDistributor, deleteDistributor,
      updateProcessStep,
      addBlogPost, updateBlogPost, deleteBlogPost,
      addTestimonial, updateTestimonial, deleteTestimonial,
      addFaq, updateFaq, deleteFaq,
      updateContactStatus, deleteContact,
      updateSiteContent,
      isAuthenticated, login, logout,
      isLiveEditing, toggleLiveEditing, updateContentByPath
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
