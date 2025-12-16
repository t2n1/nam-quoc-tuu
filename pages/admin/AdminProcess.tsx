
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
    // If there is an image URL, switch to image mode automatically
    setImageMode(!!step.image);
  };

  const handleSave = () => {
    // If in icon mode, clear the image field to ensure Icon renders
    const finalData = imageMode 
        ? formData 
        : { ...formData, image: '' }; // Reset image if user chose Icon mode

    updateProcessStep(finalData);
    setEditingStep(null);
  };

  const handleDescriptionChange = (text: string) => {
    // Split by new line to array
    const lines = text.split('\n');
    setFormData(prev => ({ ...prev, description: lines }));
  };

  const getIconComponent = (iconName: string) => {
     switch (iconName) {
      case 'Leaf': return <Leaf size={20} />;
      case 'Sprout': return <Sprout size={20} />;
      case 'Hourglass': return <Hourglass size={20} />;
      case 'FlaskConical': return <FlaskConical size={20} />;
      case 'PackageCheck': return <PackageCheck size={20} />;
      default: return <Leaf size={20} />;
    }
  };

  const iconOptions = ['Leaf', 'Sprout', 'Hourglass', 'FlaskConical', 'PackageCheck'];

  return (
    <div className="space-y-8">
      <div>
         <h1 className="font-serif text-3xl text-emerald-950 font-bold">Quản Lý Quy Trình</h1>
         <p className="text-stone-500 text-sm mt-1">Chỉnh sửa chi tiết các bước trong quy trình sản xuất.</p>
      </div>

      {/* Editing Form */}
      {editingStep && (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 animate-fade-in-up">
           <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-emerald-900">Chỉnh Sửa Bước {formData.step}</h3>
            <button onClick={() => setEditingStep(null)} className="text-stone-400 hover:text-red-500">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
             <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Tiêu đề bước</label>
                <input 
                   type="text" 
                   value={formData.title} 
                   onChange={e => setFormData({...formData, title: e.target.value})}
                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
             </div>

             <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Hình ảnh minh họa</label>
                
                {/* Switcher */}
                <div className="flex bg-stone-100 p-1 rounded-lg w-fit mb-4">
                    <button 
                        onClick={() => setImageMode(false)}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${!imageMode ? 'bg-white shadow text-emerald-900' : 'text-stone-500 hover:text-stone-700'}`}
                    >
                        <BoxSelect size={16} /> Chọn Icon
                    </button>
                    <button 
                        onClick={() => setImageMode(true)}
                        className={`px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${imageMode ? 'bg-white shadow text-emerald-900' : 'text-stone-500 hover:text-stone-700'}`}
                    >
                        <ImageIcon size={16} /> Dùng Hình Ảnh
                    </button>
                </div>

                {imageMode ? (
                    <div className="space-y-3 animate-fade-in-up">
                        <input 
                           type="text" 
                           value={formData.image || ''} 
                           onChange={e => setFormData({...formData, image: e.target.value})}
                           className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                           placeholder="Nhập URL hình ảnh (Ví dụ: https://...)"
                        />
                        <div className="w-40 aspect-video bg-stone-50 border border-stone-200 rounded-lg overflow-hidden flex items-center justify-center">
                            {formData.image ? (
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-xs text-stone-400">Preview</span>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-4 animate-fade-in-up">
                      {iconOptions.map(icon => (
                        <button 
                          key={icon}
                          onClick={() => setFormData({...formData, icon})}
                          className={`p-3 rounded-lg border flex flex-col items-center gap-2 transition-all ${formData.icon === icon ? 'bg-amber-100 border-amber-500 text-amber-900' : 'bg-stone-50 border-stone-200 hover:bg-stone-100'}`}
                        >
                           {getIconComponent(icon)}
                           <span className="text-[10px] uppercase font-bold">{icon}</span>
                        </button>
                      ))}
                    </div>
                )}
             </div>

             <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Mô tả chi tiết (Mỗi dòng là một ý)</label>
                <textarea 
                   rows={5}
                   value={formData.description.join('\n')}
                   onChange={e => handleDescriptionChange(e.target.value)}
                   className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                />
             </div>

             <div className="pt-4 flex justify-end">
                 <button 
                   onClick={handleSave}
                   className="flex items-center gap-2 bg-emerald-950 text-white px-8 py-3 rounded-lg hover:bg-emerald-900 transition-colors shadow-lg"
                 >
                   <Save size={18} /> Lưu Cập Nhật
                 </button>
             </div>
          </div>
        </div>
      )}

      {/* Steps List */}
      <div className="grid gap-6">
        {processSteps.map((step) => (
           <div key={step.step} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row gap-6 items-start hover:shadow-md transition-shadow">
              
              {/* Thumbnail Display Logic */}
              <div className="flex-shrink-0 w-20 h-20 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-800 border border-emerald-100 overflow-hidden">
                 {step.image ? (
                     <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                 ) : (
                     getIconComponent(step.icon)
                 )}
              </div>
              
              <div className="flex-grow">
                 <div className="flex items-center gap-3 mb-2">
                    <span className="font-display text-2xl font-bold text-stone-300">0{step.step}</span>
                    <h3 className="font-serif text-xl font-bold text-emerald-950">{step.title}</h3>
                 </div>
                 <ul className="list-disc list-inside text-stone-600 space-y-1 text-sm">
                    {step.description.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                 </ul>
              </div>

              <div className="flex-shrink-0">
                 <button 
                   onClick={() => handleEdit(step)}
                   className="flex items-center gap-2 text-amber-600 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-lg transition-colors font-bold text-xs uppercase tracking-wider"
                 >
                    <Edit2 size={16} /> Chỉnh sửa
                 </button>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProcess;
