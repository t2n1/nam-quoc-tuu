
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import FloatingButtons from './components/FloatingButtons';
import ScrollToTopButton from './components/ScrollToTopButton';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AgeGate from './components/AgeGate';
import Home from './pages/Home';
import Story from './pages/Story';
import Products from './pages/Products';
import Process from './pages/Process';
import Traceability from './pages/Traceability';
import Contact from './pages/Contact';
import BlogDetail from './pages/BlogDetail';

import { DataProvider } from './context/DataContext';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
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
      <FloatingButtons />
      <ScrollToTopButton />
    </div>
  );
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

        </Routes>
      </Router>
    </DataProvider>
    </>
  );
};

export default App;
