import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS, MOCK_DISTRIBUTORS as INITIAL_DISTRIBUTORS, PROCESS_STEPS as INITIAL_PROCESS, INITIAL_CONTENT, MOCK_NEWS as INITIAL_NEWS, MOCK_TESTIMONIALS, MOCK_FAQS, MOCK_CONTACTS } from '../constants';
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

  const updateProduct = (updated: Product) => setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  const updateDistributor = (updated: Distributor) => setDistributors(prev => prev.map(d => d.phone === updated.phone ? updated : d));
  const addDistributor = (distributor: Distributor) => setDistributors(prev => [...prev, distributor]);
  const deleteDistributor = (phone: string) => setDistributors(prev => prev.filter(d => d.phone !== phone));

  const updateProcessStep = (updated: ProcessStep) => setProcessSteps(prev => prev.map(s => s.step === updated.step ? updated : s));

  const addBlogPost = (post: BlogPost) => setBlogPosts(prev => [post, ...prev]);
  const updateBlogPost = (updated: BlogPost) => setBlogPosts(prev => prev.map(p => p.id === updated.id ? updated : p));
  const deleteBlogPost = (id: string) => setBlogPosts(prev => prev.filter(p => p.id !== id));

  const addTestimonial = (item: Testimonial) => setTestimonials(prev => [...prev, item]);
  const updateTestimonial = (updated: Testimonial) => setTestimonials(prev => prev.map(t => t.id === updated.id ? updated : t));
  const deleteTestimonial = (id: string) => setTestimonials(prev => prev.filter(t => t.id !== id));

  const addFaq = (item: FAQItem) => setFaqs(prev => [...prev, item]);
  const updateFaq = (originalQuestion: string, updated: FAQItem) => setFaqs(prev => prev.map(f => f.question === originalQuestion ? updated : f));
  const deleteFaq = (question: string) => setFaqs(prev => prev.filter(f => f.question !== question));

  const updateContactStatus = (id: string, status: 'new' | 'contacted' | 'done') =>
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  const deleteContact = (id: string) => setContacts(prev => prev.filter(c => c.id !== id));

  const updateSiteContent = (content: SiteContent) => setSiteContent(content);

  const updateContentByPath = (path: string, value: any) => {
    setSiteContent(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
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
