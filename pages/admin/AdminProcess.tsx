
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ProcessStep } from '../../types';
import { Edit2, Save, X, Leaf, Sprout, Hourglass, FlaskConical, PackageCheck, Image as ImageIcon, BoxSelect } from 'lucide-react';

const AdminProcess: React.FC = () => {
  const { processSteps, updateProcessStep } = useData();
  const [editingStep, setEditingStep] = useState<number | null>(null);
  
  // Local state to toggle between Icon mode and Image mode
  const [imageMode, setImageMode] = useState(false);

  const [formData, setFormData] = useState<ProcessStep>({
    step: 0,
    title: '',
    description: [],
    icon: 'Leaf',
    image: ''
  });

  const handleEdit = (step: ProcessStep) => {
    setFormData(step);
    setEditingStep(step.step);
    setImageMode(!!step.image);
  };

  const closeModal = () => {
    setEditingStep(null);
  }

  const handleSave = () => {
    const finalData = imageMode 
        ? formData 
        : { ...formData, image: '' }; 

    updateProcessStep(finalData);
    closeModal();
  };

  const handleDescriptionChange = (text: string) => {
    const lines = text.split('\n');
    setFormData(prev => ({ ...prev, description: lines }));
  };

  const getIconComponent = (iconName: string) => {
     switch (iconName) {
      case 'Leaf': return <Leaf size={24} />;
      case 'Sprout': return <Sprout size={24} />;
      case 'Hourglass': return <Hourglass size={24} />;
      case 'FlaskConical': return <FlaskConical size={24} />;
      case 'PackageCheck': return <PackageCheck size={24} />;
      default: return <Leaf size={24} />;
    }
  };

  const iconOptions = ['Leaf', 'Sprout', 'Hourglass', 'FlaskConical', 'PackageCheck'];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
         <div>
            <h1 className="font-serif text-2xl text-emerald-950 font-bold">Quản Lý Quy Trình</h1>
            <p className="text-stone-500 text-xs mt-1">Chỉnh sửa 5 bước sản xuất thủ công.</p>
         </div>
      </div>

      {/* Steps List */}
      <div className="grid gap-6">
        {processSteps.map((step) => (
           <div key={step.step} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-8 items-center hover:shadow-md transition-shadow group">
              
              {/* Thumbnail Display Logic */}
              <div className="flex-shrink-0 w-24 h-24 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800 border border-emerald-100 overflow-hidden shadow-inner">
                 {step.image ? (
                     <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                 ) : (
                     getIconComponent(step.icon)
                 )}
              </div>
              
              <div className="flex-grow text-center md:text-left">
                 <div className="flex items-center justify-center md:justify-start gap-4 mb-3">
                    <span className="font-display text-4xl font-bold text-stone-200">0{step.step}</span>
                    <h3 className="font-serif text-2xl font-bold text-emerald-950">{step.title}</h3>
                 </div>
                 <ul className="text-stone-600 text-sm space-y-1">
                    {step.description.map((line, i) => (
                      <li key={i} className="flex items-center justify-center md:justify-start gap-2">
                         <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> {line}
                      </li>
                    ))}
                 </ul>
              </div>

              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button 
                   onClick={() => handleEdit(step)}
                   className="flex items-center gap-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-5 py-2.5 rounded-lg transition-colors font-bold text-xs uppercase tracking-wider"
                 >
                    <Edit2 size={16} /> Chỉnh sửa
                 </button>
              </div>
           </div>
        ))}
      </div>

      {/* DRAWER FORM */}
      {editingStep && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
          
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-fade-in-up">
             <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-stone-50">
                <h3 className="font-serif text-xl font-bold text-emerald-950">Chỉnh Sửa Bước {formData.step}</h3>
                <button onClick={closeModal} className="text-stone-400 hover:text-red-500"><X size={24} /></button>
             </div>

             <div className="flex-1 overflow-y-auto p-8 space-y-6">
                 <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Tiêu đề bước</label>
                    <input 
                       type="text" 
                       value={formData.title} 
                       onChange={e => setFormData({...formData, title: e.target.value})}
                       className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none font-bold text-emerald-950"
                    />
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-3">Hình ảnh minh họa</label>
                    
                    {/* Switcher */}
                    <div className="flex bg-stone-100 p-1 rounded-lg w-full mb-4">
                        <button 
                            onClick={() => setImageMode(false)}
                            className={`flex-1 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${!imageMode ? 'bg-white shadow text-emerald-900' : 'text-stone-500 hover:text-stone-700'}`}
                        >
                            <BoxSelect size={14} /> Chọn Icon
                        </button>
                        <button 
                            onClick={() => setImageMode(true)}
                            className={`flex-1 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${imageMode ? 'bg-white shadow text-emerald-900' : 'text-stone-500 hover:text-stone-700'}`}
                        >
                            <ImageIcon size={14} /> Dùng Ảnh
                        </button>
                    </div>

                    {imageMode ? (
                        <div className="space-y-3 animate-fade-in-up">
                            <input 
                               type="text" 
                               value={formData.image || ''} 
                               onChange={e => setFormData({...formData, image: e.target.value})}
                               className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
                               placeholder="Nhập URL hình ảnh (Ví dụ: https://...)"
                            />
                            <div className="w-full aspect-video bg-stone-50 border border-stone-200 rounded-lg overflow-hidden flex items-center justify-center relative">
                                {formData.image ? (
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xs text-stone-400">Preview Ảnh</span>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-5 gap-2 animate-fade-in-up">
                          {iconOptions.map(icon => (
                            <button 
                              key={icon}
                              onClick={() => setFormData({...formData, icon})}
                              className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${formData.icon === icon ? 'bg-amber-100 border-amber-500 text-amber-900' : 'bg-stone-50 border-stone-200 hover:bg-stone-100'}`}
                            >
                               {getIconComponent(icon)}
                            </button>
                          ))}
                        </div>
                    )}
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Mô tả chi tiết (Mỗi dòng là một ý)</label>
                    <textarea 
                       rows={5}
                       value={formData.description.join('\n')}
                       onChange={e => handleDescriptionChange(e.target.value)}
                       className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed"
                    />
                 </div>
             </div>

             <div className="p-6 border-t border-stone-200">
                 <button 
                   onClick={handleSave}
                   className="w-full flex items-center justify-center gap-2 bg-emerald-950 text-white py-4 rounded-xl hover:bg-amber-600 transition-colors shadow-lg font-bold uppercase tracking-wider text-sm"
                 >
                   <Save size={18} /> Lưu Cập Nhật
                 </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProcess;
