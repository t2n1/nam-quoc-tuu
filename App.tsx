
import React, { useEffect, useState, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import FloatingButtons from './components/FloatingButtons';
import ScrollToTopButton from './components/ScrollToTopButton';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AgeGate from './components/AgeGate';
import FloatingCTA from './components/FloatingCTA';
import Soundscape from './components/Soundscape';
import Home from './pages/Home';
import Story from './pages/Story';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Process from './pages/Process';
import Traceability from './pages/Traceability';
import Contact from './pages/Contact';
import BlogDetail from './pages/BlogDetail';
import NotFound from './pages/NotFound';

// Admin Imports
import AdminLogin from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminDistributors from './pages/admin/AdminDistributors';
import AdminBlog from './pages/admin/AdminBlog';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminFAQ from './pages/admin/AdminFAQ';
import AdminContent from './pages/admin/AdminContent';
import AdminSettings from './pages/admin/AdminSettings';
import AdminProcess from './pages/admin/AdminProcess';
import AdminContacts from './pages/admin/AdminContacts';
import { AdminToolbar } from './components/LiveEditor';

import { DataProvider, useData } from './context/DataContext';

// Scroll to top
const ScrollHandler = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Custom cursor
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { isLiveEditing } = useData();

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, input, select, textarea, .group, .cursor-pointer');
      setIsHovered(!!isClickable);
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      cursor.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animationId = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (isLiveEditing) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-amber-500 rounded-full pointer-events-none z-[200] hidden lg:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 border border-amber-500/40 rounded-full pointer-events-none z-[200] hidden lg:block transition-all duration-300 ease-out
          ${isHovered ? 'w-14 h-14 bg-amber-500/10 border-amber-500' : 'w-8 h-8'}
        `}
        style={{ willChange: 'transform, width, height' }}
      />
    </>
  );
};

const ProtectedRoute = () => {
  const { isAuthenticated } = useData();
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans cursor-none relative">
      <CustomCursor />
      <AgeGate />
      <Navbar />
      <AdminToolbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Soundscape />
      <FloatingCTA />
      <Footer />
      <FloatingButtons />
      <ScrollToTopButton />
    </div>
  );
};

// Guard component to handle disabled Traceability
const TraceabilityGuard = () => {
  const { siteContent } = useData();
  return siteContent.general.isTraceabilityEnabled ? <Traceability /> : <Navigate to="/" />;
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(() => {
    const seen = sessionStorage.getItem('nqt_loaded');
    if (!seen) { sessionStorage.setItem('nqt_loaded', '1'); return true; }
    return false;
  });

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <DataProvider>
        <Router>
          <ScrollHandler />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/story" element={<Story />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/process" element={<Process />} />
              <Route path="/check" element={<TraceabilityGuard />} />
              <Route path="/check/:phone" element={<TraceabilityGuard />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/news/:slug" element={<BlogDetail />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="distributors" element={<AdminDistributors />} />
                <Route path="blog" element={<AdminBlog />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="faq" element={<AdminFAQ />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="process" element={<AdminProcess />} />
                <Route path="contacts" element={<AdminContacts />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </>
  );
};

export default App;
