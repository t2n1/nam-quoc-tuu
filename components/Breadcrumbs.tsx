
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') return null;

  return (
    <nav className="flex px-6 py-4 max-w-7xl mx-auto relative z-30" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-emerald-400 hover:text-amber-500 transition-colors">
            <Home size={12} className="mr-2" /> Trang chủ
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          
          // Custom labels
          const labels: { [key: string]: string } = {
            'products': 'Bộ sưu tập',
            'story': 'Di sản',
            'process': 'Quy trình',
            'check': 'Tra cứu',
            'contact': 'Liên hệ'
          };

          const label = labels[value] || value;

          return (
            <li key={to}>
              <div className="flex items-center">
                <ChevronRight size={14} className="text-emerald-800 mx-1" />
                {last ? (
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-500/60 truncate max-w-[150px]">
                    {label}
                  </span>
                ) : (
                  <Link to={to} className="text-xs font-bold uppercase tracking-widest text-emerald-400 hover:text-amber-500 transition-colors">
                    {label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
