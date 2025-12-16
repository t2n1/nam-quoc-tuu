
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AgeGate from './components/AgeGate'; // Import AgeGate
import Home from './pages/Home';
import Story from './pages/Story';
import Products from './pages/Products';
import Process from './pages/Process';
import Traceability from './pages/Traceability';
import Contact from './pages/Contact';
import BlogDetail from './pages/BlogDetail'; // Import BlogDetail

// Admin Imports
import AdminLogin from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminDistributors from './pages/admin/AdminDistributors';
import AdminContent from './pages/admin/AdminContent';
import AdminProcess from './pages/admin/AdminProcess';
import AdminBlog from './pages/admin/AdminBlog'; // Import AdminBlog
import AdminTestimonials from './pages/admin/AdminTestimonials'; // Import AdminTestimonials
import AdminFAQ from './pages/admin/AdminFAQ'; // Import AdminFAQ

import { DataProvider, useData } from './context/DataContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Route Wrapper
const ProtectedRoute = () => {
  const { isAuthenticated } = useData();
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

// Public Layout Wrapper (Standard Website)
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <AgeGate /> 
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/products" element={<Products />} />
            <Route path="/process" element={<Process />} />
            <Route path="/check" element={<Traceability />} />
            <Route path="/check/:phone" element={<Traceability />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news/:slug" element={<BlogDetail />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route element={<ProtectedRoute />}>
             <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="distributors" element={<AdminDistributors />} />
                <Route path="blog" element={<AdminBlog />} />
                <Route path="testimonials" element={<AdminTestimonials />} /> {/* New Route */}
                <Route path="faq" element={<AdminFAQ />} /> {/* New Route */}
                <Route path="content" element={<AdminContent />} />
                <Route path="process" element={<AdminProcess />} />
             </Route>
          </Route>

        </Routes>
      </Router>
    </DataProvider>
  );
};

export default App;
