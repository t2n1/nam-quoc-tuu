
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FAQItem } from '../../types';
import { Plus, Edit2, Trash2, Save, X, HelpCircle, ChevronRight } from 'lucide-react';

const AdminFAQ: React.FC = () => {
  const { faqs, addFaq, updateFaq, deleteFaq } = useData();
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const emptyFaq: FAQItem = {
    question: '',
    answer: ''
  };
  
  const [formData, setFormData] = useState<FAQItem>(emptyFaq);

  const handleEdit = (item: FAQItem) => {
    setFormData(item);
    setEditingQuestion(item.question);
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setFormData(emptyFaq);
    setIsAdding(true);
    setEditingQuestion(null);
  };

  const closeModal = () => {
    setIsAdding(false);
    setEditingQuestion(null);
  };

  const handleSave = () => {
    if (isAdding) {
      if (faqs.some(f => f.question === formData.question)) {
        alert('Câu hỏi này đã tồn tại!');
        return;
      }
      addFaq(formData);
    } else {
      if (editingQuestion) {
          updateFaq(editingQuestion, formData);
      }
    }
    closeModal();
  };

  const handleDelete = (question: string) => {
    if (window.confirm('Xóa câu hỏi này?')) {
      deleteFaq(question);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
        <div>
           <h1 className="font-serif text-2xl text-emerald-950 font-bold">Hỏi Đáp (FAQ)</h1>
           <p className="text-stone-500 text-xs mt-1">Quản lý các câu hỏi thường gặp trên website.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors shadow-md text-sm font-bold uppercase tracking-wider"
        >
          <Plus size={18} /> Thêm Câu Hỏi
        </button>
      </div>

      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all group">
             <div className="flex justify-between items-start gap-6">
                <div className="flex gap-4">
                   <div className="w-10 h-10 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center shrink-0">
                      <span className="font-bold font-serif">Q{idx + 1}</span>
                   </div>
                   <div className="space-y-2">
                      <h4 className="font-bold text-lg text-emerald-950">{item.question}</h4>
                      <div className="text-stone-600 text-sm leading-relaxed bg-stone-50 p-4 rounded-lg border border-stone-100">
                        {item.answer}
                      </div>
                   </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(item)} className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.question)} className="text-red-400 hover:bg-red-50 p-2 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* DRAWER FORM */}
      {(isAdding || editingQuestion) && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
          
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-fade-in-up">
             <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-stone-50">
                <h3 className="font-serif text-xl font-bold text-emerald-950">{isAdding ? 'Thêm FAQ Mới' : 'Chỉnh Sửa FAQ'}</h3>
                <button onClick={closeModal} className="text-stone-400 hover:text-red-500"><X size={24} /></button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-8 space-y-6">
                 <div>
                   <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Câu Hỏi</label>
                   <input 
                      type="text" 
                      value={formData.question} 
                      onChange={e => setFormData({...formData, question: e.target.value})}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none font-bold text-emerald-950"
                      placeholder="Ví dụ: Rượu để được bao lâu?"
                   />
                 </div>
                 
                 <div>
                   <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Câu Trả Lời</label>
                   <textarea 
                      rows={8}
                      value={formData.answer} 
                      onChange={e => setFormData({...formData, answer: e.target.value})}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed"
                      placeholder="Nhập nội dung trả lời chi tiết..."
                   />
                 </div>
             </div>

             <div className="p-6 border-t border-stone-200">
                 <button 
                   onClick={handleSave}
                   className="w-full flex items-center justify-center gap-2 bg-emerald-950 text-white py-4 rounded-xl hover:bg-amber-600 transition-colors shadow-lg font-bold uppercase tracking-wider text-sm"
                 >
                   <Save size={18} /> Lưu Thay Đổi
                 </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFAQ;
