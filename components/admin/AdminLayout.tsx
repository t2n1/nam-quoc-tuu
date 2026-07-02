
import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Users, LogOut, FileText, Globe, Newspaper, MessageSquareQuote, HelpCircle, ChevronRight, Bell, Search, Settings, Layers, Command, Menu, Inbox } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminLayout: React.FC = () => {
  const { logout, contacts } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  // Off-canvas drawer state for mobile (<md). Independent of the desktop collapse.
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  // Count new contacts
  const newContactsCount = contacts.filter(c => c.status === 'new').length;

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Xem Website', path: '/', icon: <Globe size={20} />, highlight: true },
    { name: 'Tổng quan', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Hộp thư (Inbox)', path: '/admin/contacts', icon: <Inbox size={20} />, badge: newContactsCount > 0 ? newContactsCount : null },
    { name: 'Sản phẩm', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Đại lý', path: '/admin/distributors', icon: <Users size={20} /> },
    { name: 'Bài viết', path: '/admin/blog', icon: <Newspaper size={20} /> },
    { name: 'Đánh giá', path: '/admin/testimonials', icon: <MessageSquareQuote size={20} /> },
    { name: 'Hỏi đáp (FAQ)', path: '/admin/faq', icon: <HelpCircle size={20} /> },
    { name: 'Quy trình', path: '/admin/process', icon: <FileText size={20} /> },
    { name: 'Nội dung Trang', path: '/admin/content', icon: <Layers size={20} /> },
    { name: 'Cấu hình', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const currentPathName = menuItems.find(i => i.path === location.pathname)?.name || 'Dashboard';

  return (
    <div className="flex h-screen bg-[#f0f4f8] font-sans overflow-hidden">
      {/* Mobile backdrop */}
      {isMobileNavOpen && (
        <div
          onClick={() => setIsMobileNavOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          aria-hidden="true"
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 w-72 ${isSidebarOpen ? 'md:w-72' : 'md:w-20'} ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 bg-[#022c22] text-white flex flex-col shadow-2xl z-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20 pointer-events-none"></div>
        
        {/* Logo Area - Click to Home */}
        <div className="h-24 flex items-center px-6 relative z-10 border-b border-white/5">
          <Link to="/" title="Về trang chủ" className="flex items-center gap-4 overflow-hidden group">
             <div className="w-10 h-10 min-w-[40px] bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-emerald-950 font-bold font-serif text-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform">B</div>
             <div className={`transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                <h1 className="font-serif text-xl font-bold text-white leading-none mb-1 whitespace-nowrap group-hover:text-amber-400 transition-colors">Nam Quốc Tửu</h1>
                <p className="text-amber-500/80 text-[9px] tracking-[0.2em] uppercase font-bold whitespace-nowrap">Admin Portal</p>
             </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-2 relative z-10 overflow-y-auto custom-scrollbar">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            const isSeparator = item.path === '/admin/content';
            const isHomeLink = item.path === '/';
            
            return (
              <React.Fragment key={item.path}>
                {isSeparator && isSidebarOpen && (
                    <div className="pt-6 pb-2 px-3 animate-fade-in-up">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-500/50 pl-1">Website Builder</p>
                    </div>
                )}
                
                <Link
                    to={item.path}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={`group flex items-center relative px-3 py-3 rounded-xl transition-all duration-300 overflow-hidden ${
                    isActive 
                        ? 'bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]' 
                        : isHomeLink 
                            ? 'text-amber-400 hover:bg-amber-500/20 hover:text-amber-300 mb-4 border border-amber-500/20' 
                            : 'text-emerald-100/60 hover:bg-white/5 hover:text-white'
                    }`}
                    title={!isSidebarOpen ? item.name : ''}
                >
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-amber-500 rounded-r-full shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>}
                    
                    <div className={`flex items-center justify-center w-6 h-6 ${isActive ? 'text-amber-400' : 'text-current group-hover:text-amber-200'} transition-colors relative z-10 shrink-0 mx-auto md:mx-0`}>
                        {item.icon}
                    </div>
                    
                    <span className={`ml-4 text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${isSidebarOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 absolute'}`}>
                        {item.name}
                    </span>
                    
                    {item.badge && isSidebarOpen && (
                        <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-pulse">
                            {item.badge}
                        </span>
                    )}
                    
                    {isHomeLink && isSidebarOpen && (
                        <ChevronRight size={14} className="ml-auto text-amber-500/50 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    )}
                    
                    {isActive && isSidebarOpen && !item.badge && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.8)]"></div>}
                </Link>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/5 relative z-10 bg-[#03382d]">
           <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="hidden md:flex items-center justify-center w-full p-2 text-emerald-400 hover:text-white transition-colors mb-2"
           >
              <Menu size={20} />
           </button>
           <button 
            onClick={handleLogout}
            className={`flex items-center ${isSidebarOpen ? 'justify-start px-4' : 'justify-center px-2'} py-3 w-full text-red-300/80 hover:text-white hover:bg-red-500/20 rounded-xl transition-all text-xs font-bold uppercase tracking-wider border border-transparent hover:border-red-500/30 group`}
          >
            <LogOut size={18} className="shrink-0" />
            <span className={`ml-3 transition-all duration-300 ${isSidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'}`}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Header */}
        <header className="h-20 px-4 md:px-8 flex justify-between items-center z-20 bg-white/80 backdrop-blur-md border-b border-stone-200/60 sticky top-0 transition-all">
           <div className="flex items-center gap-3 md:gap-4 min-w-0">
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="md:hidden p-2 -ml-2 text-emerald-950 hover:text-amber-600 transition-colors shrink-0"
                aria-label="Mở menu"
              >
                <Menu size={24} />
              </button>
              <h2 className="font-display text-2xl md:text-3xl text-emerald-950 font-bold tracking-tight truncate">{currentPathName}</h2>
           </div>

           <div className="flex items-center gap-6">
              {/* Search */}
              <div className="hidden lg:flex items-center bg-stone-100/50 hover:bg-white rounded-full px-4 py-2.5 text-stone-500 border border-stone-200/50 shadow-inner focus-within:shadow-lg focus-within:bg-white focus-within:border-amber-200 transition-all w-80 group">
                 <Search size={16} className="group-focus-within:text-amber-600 transition-colors" />
                 <input type="text" placeholder="Tìm kiếm (Ctrl + K)..." className="bg-transparent border-none outline-none text-sm ml-3 w-full text-emerald-900 placeholder-stone-400 font-medium" />
                 <div className="w-6 h-6 rounded bg-white shadow-sm border border-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-400 group-focus-within:text-amber-600 group-focus-within:border-amber-100">⌘</div>
              </div>

              <div className="w-px h-8 bg-stone-200"></div>

              <button className="relative p-2.5 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-all group">
                 <Bell size={20} className="group-hover:animate-swing" />
                 {newContactsCount > 0 && <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white shadow-sm animate-pulse"></span>}
              </button>
              
              <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                 <div className="text-right hidden md:block group-hover:translate-x-[-2px] transition-transform">
                    <div className="text-sm font-bold text-emerald-950 leading-none mb-1">Admin User</div>
                    <div className="text-[9px] text-amber-600 uppercase tracking-widest font-bold">Super Admin</div>
                 </div>
                 <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-amber-300 to-emerald-500 group-hover:shadow-lg transition-shadow">
                    <div className="w-full h-full rounded-full bg-white border-2 border-white flex items-center justify-center overflow-hidden">
                       <img src="https://ui-avatars.com/api/?name=Admin+User&background=022c22&color=fff" alt="Admin" className="w-full h-full object-cover" />
                    </div>
                 </div>
              </div>
           </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative bg-[#f0f4f8]">
           <div className="max-w-[1600px] mx-auto pb-20">
              <Outlet />
           </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
