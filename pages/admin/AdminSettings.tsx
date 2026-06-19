
import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Save, Settings, LayoutTemplate, ShieldAlert, ChevronRight, Eye, EyeOff, Globe } from 'lucide-react';
import { SiteContent } from '../../types';

const AdminSettings: React.FC = () => {
  const { siteContent, updateSiteContent } = useData();
  const [formData, setFormData] = useState<SiteContent>(siteContent);
  const [activeTab, setActiveTab] = useState<string>('general');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFormData(siteContent);
  }, [siteContent]);

  const handleSave = () => {
    updateSiteContent(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Menu Configuration - ONLY GLOBAL SETTINGS
  const menuItems = [
    { id: 'general', label: 'Thông Tin Chung', icon: <Settings size={18} />, desc: 'Hotline, Email, Facebook...' },
    { id: 'seo', label: 'Cấu Hình SEO', icon: <Globe size={18} />, desc: 'Meta Title, Description, Keywords' }, // New SEO Tab
    { id: 'ageGate', label: 'Xác Thực Tuổi', icon: <ShieldAlert size={18} />, desc: 'Popup kiểm tra 18+' },
    { id: 'navbar', label: 'Menu & Logo', icon: <LayoutTemplate size={18} />, desc: 'Logo, Thanh điều hướng' },
    { id: 'footer', label: 'Chân Trang (Footer)', icon: <LayoutTemplate size={18} />, desc: 'Footer & Copyright' },
  ];

  const updateNested = (path: string, value: any) => {
    const keys = path.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      for (let i = 0; i < keys.length - 1; i++) {
         if (!current[keys[i]]) current[keys[i]] = {}; 
         current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  // UI Components
  const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
    <div className="mb-8 pb-4 border-b border-stone-200">
      <h3 className="font-serif text-3xl font-bold text-emerald-950">{title}</h3>
      {subtitle && <p className="text-stone-500 text-sm mt-2">{subtitle}</p>}
    </div>
  );

  const GroupCard = ({ title, children, className = "" }: { title?: string, children?: React.ReactNode, className?: string }) => (
    <div className={`bg-white p-8 rounded-2xl border border-stone-200 shadow-sm mb-8 ${className}`}>
       {title && <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-[0.1em] mb-6 pb-2 border-b border-stone-100">{title}</h4>}
       {children}
    </div>
  );

  const InputField = ({ label, path, type = "text", rows = 1, placeholder = "", helpText = "" }: { label: string, path: string, type?: "text" | "textarea", rows?: number, placeholder?: string, helpText?: string }) => {
    const getValue = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc && acc[part], obj) || '';
    const val = getValue(formData, path);

    return (
      <div className="mb-6 last:mb-0">
        <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">{label}</label>
        {type === "textarea" ? (
          <textarea 
            rows={rows}
            value={val}
            onChange={(e) => updateNested(path, e.target.value)}
            className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-stone-50/30 transition-all text-sm leading-relaxed"
            placeholder={placeholder}
          />
        ) : (
          <input 
            type="text" 
            value={val}
            onChange={(e) => updateNested(path, e.target.value)}
            className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-stone-50/30 transition-all text-sm font-medium"
            placeholder={placeholder}
          />
        )}
        {helpText && <p className="text-xs text-stone-400 mt-2 italic">{helpText}</p>}
      </div>
    );
  };

  const ImagePreview = ({ url, label }: { url: string, label: string }) => (
     <div className="mt-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">{label}</p>
        <div className="relative group w-full bg-white rounded-lg overflow-hidden border border-stone-200 shadow-sm">
           {url ? (
             <img src={url} alt="Preview" className="w-full h-full object-cover max-h-[300px]" />
           ) : (
             <div className="flex items-center justify-center h-32 text-stone-300 text-xs">Chưa có ảnh</div>
           )}
        </div>
     </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200 px-8 py-4 flex items-center justify-between mb-8 shadow-sm">
         <div className="flex items-center gap-4">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg"><Settings size={20}/></div>
            <div>
                <h1 className="font-serif text-xl font-bold text-emerald-950">Cấu Hình Chung</h1>
                <p className="text-xs text-stone-500">Thiết lập thông tin hệ thống, liên hệ và hiển thị chung.</p>
            </div>
         </div>
         <button 
            onClick={handleSave}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-lg ${isSaved ? 'bg-green-600 text-white' : 'bg-emerald-950 text-white hover:bg-amber-600'}`}
         >
            <Save size={18} /> {isSaved ? 'Đã Lưu Thành Công!' : 'Lưu Thay Đổi'}
         </button>
      </div>

      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          <div className="lg:w-80 shrink-0">
             <div className="sticky top-32 bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-4 bg-stone-50 border-b border-stone-100">
                   <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Thiết Lập</h3>
                </div>
                <div className="flex flex-col p-2 space-y-1">
                   {menuItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                           setActiveTab(item.id);
                           window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                           activeTab === item.id 
                             ? 'bg-amber-50 text-emerald-900 border border-amber-100 shadow-sm' 
                             : 'text-stone-600 hover:bg-stone-50 border border-transparent'
                        }`}
                      >
                         <span className={activeTab === item.id ? 'text-amber-600' : 'text-stone-400'}>
                           {item.icon}
                         </span>
                         <div className="flex-1">
                            <div className={`text-sm font-bold ${activeTab === item.id ? 'text-emerald-950' : ''}`}>{item.label}</div>
                         </div>
                         {activeTab === item.id && <ChevronRight size={14} className="text-amber-600" />}
                      </button>
                   ))}
                </div>
             </div>
          </div>

          <div className="flex-1 min-w-0">
             <div className="animate-fade-in-up">
                
                {/* GENERAL */}
                {activeTab === 'general' && (
                  <>
                    <SectionHeader title="Thông Tin Chung" subtitle="Thông tin liên hệ cơ bản hiển thị toàn trang." />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <GroupCard title="Cấu hình tính năng" className="md:col-span-2">
                          <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                             <div>
                                <h4 className="font-bold text-emerald-950">Trang Tra Cứu Đại Lý</h4>
                                <p className="text-xs text-emerald-700/70 mt-1">Bật/Tắt hiển thị trang kiểm tra nguồn gốc trên menu công khai.</p>
                             </div>
                             <button 
                                onClick={() => updateNested('general.isTraceabilityEnabled', !formData.general.isTraceabilityEnabled)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all shadow-sm ${formData.general.isTraceabilityEnabled ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-500'}`}
                             >
                                {formData.general.isTraceabilityEnabled ? <><Eye size={16}/> Đang Bật</> : <><EyeOff size={16}/> Đang Tắt</>}
                             </button>
                          </div>
                       </GroupCard>
                       <GroupCard title="Thông tin liên hệ" className="md:col-span-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <InputField label="Hotline" path="general.hotline" placeholder="090..." />
                             <InputField label="Email" path="general.email" placeholder="contact@..." />
                             <div className="md:col-span-2">
                               <InputField label="Địa chỉ trụ sở" path="general.address" />
                             </div>
                          </div>
                       </GroupCard>
                       <GroupCard title="Mạng Xã Hội">
                          <InputField label="Facebook Fanpage URL" path="general.facebook" />
                       </GroupCard>
                    </div>
                  </>
                )}

                {/* SEO Config */}
                {activeTab === 'seo' && (
                   <>
                     <SectionHeader title="Cấu Hình SEO" subtitle="Tối ưu hóa công cụ tìm kiếm (Google) cho toàn trang web." />
                     <GroupCard title="Metadata Mặc Định">
                        <InputField label="Tiêu đề trang (Meta Title)" path="seo.defaultTitle" helpText="Tiêu đề mặc định hiển thị trên tab trình duyệt." />
                        <InputField label="Mô tả trang (Meta Description)" path="seo.defaultDescription" type="textarea" rows={3} helpText="Đoạn mô tả ngắn hiển thị dưới tiêu đề trên Google Search." />
                        <InputField label="Từ khóa (Meta Keywords)" path="seo.defaultKeywords" helpText="Các từ khóa chính, phân cách bằng dấu phẩy." />
                     </GroupCard>
                     <GroupCard title="Social Media (Open Graph)">
                        <InputField label="Ảnh đại diện khi chia sẻ (OG Image)" path="seo.ogImage" helpText="Ảnh sẽ hiện ra khi bạn gửi link website qua Zalo, Facebook..." />
                        <ImagePreview url={formData.seo?.ogImage} label="Preview OG Image" />
                     </GroupCard>
                   </>
                )}

                {/* AGE GATE */}
                {activeTab === 'ageGate' && (
                   <>
                     <SectionHeader title="Xác Thực Độ Tuổi" subtitle="Cửa sổ (Popup) hiện ra khi người dùng truy cập lần đầu." />
                     <GroupCard title="Nội dung hiển thị">
                        <InputField label="Tiêu đề chính" path="ageGate.heading" />
                        <InputField label="Mô tả phụ" path="ageGate.subHeading" />
                        <div className="grid grid-cols-2 gap-6 mt-6">
                           <InputField label="Nút: Tôi đã trên 18" path="ageGate.confirmBtn" />
                           <InputField label="Nút: Tôi chưa đủ tuổi" path="ageGate.rejectBtn" />
                        </div>
                     </GroupCard>
                     <GroupCard title="Cảnh báo pháp lý">
                        <InputField label="Nội dung cảnh báo" path="ageGate.warning" type="textarea" rows={3} helpText="Dòng chữ nhỏ hiển thị dưới các nút bấm." />
                     </GroupCard>
                   </>
                )}

                {/* NAVBAR */}
                {activeTab === 'navbar' && (
                   <>
                     <SectionHeader title="Thanh Điều Hướng (Navbar)" subtitle="Cấu hình Logo và Menu." />
                     <GroupCard title="Logo Thương Hiệu">
                        <InputField label="Link Ảnh Logo" path="navbar.logoImage" placeholder="https://..." helpText="Nếu để trống, website sẽ hiển thị Logo dạng chữ bên dưới." />
                        {formData.navbar.logoImage && <ImagePreview url={formData.navbar.logoImage} label="Logo hiện tại" />}
                        <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t border-stone-100">
                           <InputField label="Tên Logo (Chữ)" path="navbar.logoText" />
                           <InputField label="Slogan Logo (Nhỏ)" path="navbar.logoSubText" />
                        </div>
                     </GroupCard>
                     <GroupCard title="Cấu trúc Menu (Nhãn hiển thị)">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <InputField label="Label: Trang Chủ" path="navbar.menuHome" />
                           <InputField label="Label: Di Sản" path="navbar.menuStory" />
                           <InputField label="Label: Sản Phẩm" path="navbar.menuProducts" />
                           <InputField label="Label: Quy Trình" path="navbar.menuProcess" />
                           <InputField label="Label: Tra Cứu" path="navbar.menuTraceability" />
                        </div>
                     </GroupCard>
                     <GroupCard title="Nút Hành Động (CTA)">
                        <div className="grid grid-cols-2 gap-6">
                           <InputField label="Nút: Liên Hệ (Desktop)" path="navbar.contactButton" />
                           <InputField label="Nút: Mua Ngay (Mobile)" path="navbar.mobileMenuCta" />
                        </div>
                     </GroupCard>
                   </>
                )}

                {/* FOOTER */}
                {activeTab === 'footer' && (
                   <>
                     <SectionHeader title="Chân Trang (Footer)" subtitle="Nội dung hiển thị ở cuối tất cả các trang." />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <GroupCard title="Cột 1: Thương Hiệu">
                           <InputField label="Badge Footer" path="footer.brand.since" />
                           <div className="grid grid-cols-2 gap-6">
                              <InputField label="Dòng 1" path="footer.brand.titleLine1" />
                              <InputField label="Dòng 2 (Nổi bật)" path="footer.brand.titleHighlight" />
                           </div>
                           <InputField label="Mô tả thương hiệu" path="footer.brand.description" type="textarea" rows={3} />
                        </GroupCard>
                        <GroupCard title="Các Tiêu Đề Cột">
                           <InputField label="Tiêu đề Cột Link" path="footer.sections.linksTitle" />
                           <InputField label="Tiêu đề Cột Liên Hệ" path="footer.sections.contactTitle" />
                        </GroupCard>
                        <GroupCard title="Dòng Cuối Cùng" className="md:col-span-2">
                           <div className="grid grid-cols-2 gap-6">
                              <InputField label="Copyright Text" path="footer.bottom.copyright" />
                              <InputField label="Disclaimer / Cảnh báo" path="footer.bottom.disclaimer" />
                           </div>
                        </GroupCard>
                     </div>
                   </>
                )}

             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
