
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Edit3, Image as ImageIcon, LayoutTemplate, Save, Eye, LogOut, Check, X, Upload, Link as LinkIcon } from 'lucide-react';

// --- ADMIN TOOLBAR ---
export const AdminToolbar: React.FC = () => {
  const { isAuthenticated, isLiveEditing, toggleLiveEditing, logout } = useData();
  const navigate = useNavigate();

  // Nếu chưa đăng nhập, không hiển thị gì cả
  if (!isAuthenticated) {
    return null;
  }

  // Khi đã đăng nhập
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-1 bg-emerald-950/90 backdrop-blur-xl p-1.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 animate-fade-in-up transition-all hover:scale-105">
      <div className="px-4 py-2 flex items-center gap-2 border-r border-white/10 mr-1">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="hidden md:inline text-xs font-bold uppercase tracking-wider text-white">Admin</span>
      </div>

      <button
        onClick={toggleLiveEditing}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${isLiveEditing ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/50' : 'text-stone-400 hover:text-white hover:bg-white/10'}`}
      >
        {isLiveEditing ? <><Edit3 size={14} /> Editing On</> : <><Eye size={14} /> View Mode</>}
      </button>

      <div className="h-6 w-px bg-white/10 mx-1"></div>

      <button onClick={() => navigate('/admin/dashboard')} className="p-2.5 text-stone-400 hover:text-white hover:bg-white/10 rounded-full transition-all group relative" title="Dashboard">
        <LayoutTemplate size={18} />
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[9px] rounded opacity-0 group-hover:opacity-100 pointer-events-none">Dashboard</span>
      </button>

      <button onClick={() => window.location.reload()} className="p-2.5 text-stone-400 hover:text-green-400 hover:bg-white/10 rounded-full transition-all group relative" title="Save & Refresh">
        <Save size={18} />
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[9px] rounded opacity-0 group-hover:opacity-100 pointer-events-none">Lưu & Refresh</span>
      </button>

      <button onClick={() => { logout(); navigate('/'); }} className="p-2.5 text-stone-400 hover:text-red-400 hover:bg-white/10 rounded-full transition-all group relative" title="Logout">
        <LogOut size={18} />
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[9px] rounded opacity-0 group-hover:opacity-100 pointer-events-none">Đăng xuất</span>
      </button>
    </div>
  );
};

// --- EDITABLE TEXT COMPONENT (ADVANCED) ---
interface EditableTextProps {
  path: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
  content: string;
}

export const EditableText: React.FC<EditableTextProps> = ({ path, tag = 'div', className = '', multiline = false, content }) => {
  const { isLiveEditing, updateContentByPath } = useData();
  const [isEditingLocal, setIsEditingLocal] = useState(false);
  const [tempValue, setTempValue] = useState(content);

  useEffect(() => {
    setTempValue(content);
  }, [content]);

  const handleSave = () => {
    if (tempValue !== content) {
      updateContentByPath(path, tempValue);
    }
    setIsEditingLocal(false);
  };

  const handleCancel = () => {
    setTempValue(content);
    setIsEditingLocal(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isLiveEditing) {
    const Tag = tag as any;
    if (multiline) {
      return <Tag className={className} dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />;
    }
    return <Tag className={className}>{content}</Tag>;
  }

  return (
    <div className={`relative group/edit inline-block ${multiline ? 'w-full' : ''}`}>
      {isEditingLocal ? (
        <div className="relative z-50">
          {multiline ? (
            <textarea
              autoFocus
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`w-full bg-emerald-950/90 text-white border-2 border-amber-500 rounded-lg p-3 outline-none shadow-2xl ${className} min-h-[120px]`}
            />
          ) : (
            <input
              autoFocus
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`w-full bg-emerald-950/90 text-white border-2 border-amber-500 rounded px-2 py-1 outline-none shadow-2xl ${className}`}
            />
          )}

          {/* Action Toolbar */}
          <div className="absolute top-full right-0 mt-1 flex gap-1 z-50 animate-fade-in-up">
            <button onClick={handleCancel} className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors shadow-lg" title="Hủy (Esc)">
              <X size={14} />
            </button>
            <button onClick={handleSave} className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors shadow-lg" title="Lưu (Enter)">
              <Check size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsEditingLocal(true)}
          className={`relative cursor-text hover:outline hover:outline-2 hover:outline-amber-500/50 hover:bg-amber-500/10 rounded transition-all p-0.5 -m-0.5 border border-transparent hover:border-amber-500/20 ${className}`}
        >
          {multiline ? (
            <div dangerouslySetInnerHTML={{ __html: tempValue.replace(/\n/g, '<br/>') }} />
          ) : (
            tempValue
          )}
          <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-1 opacity-0 group-hover/edit:opacity-100 transition-opacity z-10 shadow-md scale-75 pointer-events-none">
            <Edit3 size={10} />
          </div>
        </div>
      )}
    </div>
  );
};

// --- EDITABLE IMAGE COMPONENT (ADVANCED) ---
interface EditableImageProps {
  path: string;
  src: string;
  alt: string;
  className?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ path, src, alt, className = '' }) => {
  const { isLiveEditing, updateContentByPath } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState(src);
  const [isValidPreview, setIsValidPreview] = useState(true);

  // Sync when prop changes
  useEffect(() => { setNewUrl(src); }, [src]);

  const handleSave = () => {
    if (newUrl && newUrl !== src) {
      updateContentByPath(path, newUrl);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setNewUrl(src);
    setIsModalOpen(false);
  }

  if (!isLiveEditing) {
    return <img src={src} alt={alt} className={className} />;
  }

  return (
    <>
      <div className="relative group/img cursor-pointer w-full h-full">
        <img src={src} alt={alt} className={`${className} group-hover/img:brightness-50 group-hover/img:blur-[2px] transition-all`} />

        {/* Edit Overlay */}
        <div
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsModalOpen(true); }}
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity z-10"
        >
          <div className="bg-amber-500 text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xl flex items-center gap-2 transform hover:scale-105 transition-transform hover:bg-amber-600">
            <ImageIcon size={16} /> Thay Ảnh
          </div>
        </div>

        <div className="absolute top-2 right-2 bg-amber-500 w-2 h-2 rounded-full border border-white z-20 shadow-sm animate-pulse"></div>
      </div>

      {/* ADVANCED IMAGE EDIT MODAL - Now using Portal to escape parent z-index constraints */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop with higher blur for better focus */}
          <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-md transition-opacity" onClick={handleCancel}></div>

          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden animate-fade-in-up flex flex-col border border-white/20">
            <div className="bg-emerald-900 p-5 px-6 flex justify-between items-center text-white border-b border-emerald-800">
              <h3 className="font-serif text-lg font-bold flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <ImageIcon size={18} />
                </div>
                Thay Đổi Hình Ảnh
              </h3>
              <button onClick={handleCancel} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6 bg-stone-50/50">
              {/* Preview Area */}
              <div className="w-full aspect-video bg-stone-200 rounded-xl overflow-hidden border-2 border-dashed border-stone-300 relative group shadow-inner">
                <img
                  src={newUrl}
                  alt="Preview"
                  className="w-full h-full object-contain transition-all group-hover:scale-105"
                  onError={() => setIsValidPreview(false)}
                  onLoad={() => setIsValidPreview(true)}
                />
                {!isValidPreview && (
                  <div className="absolute inset-0 flex items-center justify-center text-stone-400 bg-stone-100 font-bold text-xs uppercase tracking-widest text-center px-4">
                    Oops! Link ảnh không hợp lệ hoặc không thể tải
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-emerald-900 uppercase tracking-widest opacity-60">Đường dẫn ảnh (URL)</label>
                <div className="flex gap-3">
                  <div className="relative flex-1 group">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-500 transition-colors" size={16} />
                    <input
                      type="text"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200 rounded-xl text-sm focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all text-emerald-950 font-medium shadow-sm"
                      placeholder="Paste link ảnh mới tại đây..."
                      autoFocus
                    />
                  </div>
                  <button className="w-12 h-12 flex items-center justify-center bg-white border border-stone-200 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 text-stone-500 transition-all shadow-sm" title="Upload (Demo)">
                    <Upload size={18} />
                  </button>
                </div>
                <p className="text-[10px] text-stone-400 leading-relaxed">
                  <span className="font-bold text-amber-600">Tip:</span> Bạn có thể dùng link từ Unsplash, Pinterest hoặc link ảnh riêng của bạn.
                </p>
              </div>
            </div>

            <div className="p-5 bg-stone-100/50 border-t border-stone-200 flex justify-end gap-3 px-6">
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 rounded-xl text-emerald-900/60 font-bold text-xs uppercase tracking-widest hover:bg-stone-200 hover:text-emerald-900 transition-all"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-2.5 bg-emerald-950 text-amber-50 rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-amber-600 transition-all shadow-[0_10px_20px_-5px_rgba(6,78,59,0.3)] flex items-center gap-2 hover:translate-y-[-2px] active:translate-y-0"
              >
                <Save size={16} /> Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
