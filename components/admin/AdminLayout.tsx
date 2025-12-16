
import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Users, LogOut, FileText, Globe, Newspaper, MessageSquareQuote, HelpCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminLayout: React.FC = () => {
  const { logout } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Tổng quan', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Sản phẩm', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Đại lý (Traceability)', path: '/admin/distributors', icon: <Users size={20} /> },
    { name: 'Tin tức & Blog', path: '/admin/blog', icon: <Newspaper size={20} /> },
    { name: 'Khách Hàng (Review)', path: '/admin/testimonials', icon: <MessageSquareQuote size={20} /> }, // New
    { name: 'Hỏi Đáp (FAQ)', path: '/admin/faq', icon: <HelpCircle size={20} /> }, // New
    { name: 'Nội dung Website', path: '/admin/content', icon: <Globe size={20} /> },
    { name: 'Quy trình', path: '/admin/process', icon: <FileText size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-stone-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-950 text-white flex flex-col shadow-2xl z-20 overflow-y-auto">
        <div className="p-8 border-b border-emerald-900 shrink-0">
          <h1 className="font-serif text-2xl font-bold text-amber-500">Bằng Phúc</h1>
          <p className="text-emerald-400 text-xs tracking-widest uppercase mt-1">Admin Portal</p>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? 'bg-amber-600 text-white shadow-lg' 
                    : 'text-emerald-100/70 hover:bg-emerald-900 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-emerald-900 shrink-0">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="sticky top-0 z-10 bg-white border-b border-stone-200 px-8 py-4 flex justify-between items-center shadow-sm">
           <h2 className="font-serif text-xl text-emerald-950 font-bold">
             {menuItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
           </h2>
           <div className="text-xs text-stone-500">
              Admin User
           </div>
        </div>
        <div className="p-8">
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
