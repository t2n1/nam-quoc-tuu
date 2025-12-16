
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FAQItem } from '../../types';
import { Plus, Edit2, Trash2, Save, X, HelpCircle } from 'lucide-react';

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
    setEditingQuestion(null);
    setIsAdding(false);
  };

  const handleDelete = (question: string) => {
    if (window.confirm('Xóa câu hỏi này?')) {
      deleteFaq(question);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="font-serif text-3xl text-emerald-950 font-bold">Hỏi Đáp Thường Gặp (FAQ)</h1>
           <p className="text-stone-500 text-sm mt-1">Quản lý các câu hỏi hiển thị trong trang Liên Hệ.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors shadow-md text-sm font-bold uppercase tracking-wider"
        >
          <Plus size={18} /> Thêm Câu Hỏi
        </button>
      </div>

      {/* Form Area */}
      {(isAdding || editingQuestion) && (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 animate-fade-in-up">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-emerald-900">{isAdding ? 'Thêm FAQ Mới' : 'Chỉnh Sửa FAQ'}</h3>
            <button onClick={() => { setIsAdding(false); setEditingQuestion(null); }} className="text-stone-400 hover:text-red-500">
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
             <div>
               <label className="block text-sm font-medium text-stone-700 mb-1">Câu Hỏi</label>
               <input 
                  type="text" 
                  value={formData.question} 
                  onChange={e => setFormData({...formData, question: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none font-bold text-emerald-950"
                  placeholder="Ví dụ: Rượu để được bao lâu?"
               />
             </div>
             
             <div>
               <label className="block text-sm font-medium text-stone-700 mb-1">Câu Trả Lời</label>
               <textarea 
                  rows={5}
                  value={formData.answer} 
                  onChange={e => setFormData({...formData, answer: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="Nhập nội dung trả lời..."
               />
             </div>

             <div className="flex justify-end">
                 <button 
                   onClick={handleSave}
                   className="flex items-center gap-2 bg-emerald-950 text-white px-8 py-3 rounded-lg hover:bg-emerald-900 transition-colors shadow-lg"
                 >
                   <Save size={18} /> Lưu Thay Đổi
                 </button>
             </div>
          </div>
        </div>
      )}

      {/* List Area */}
      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4">
                   <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg h-fit">
                      <HelpCircle size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold text-lg text-emerald-950 mb-2">{item.question}</h4>
                      <p className="text-stone-600 leading-relaxed text-sm">{item.answer}</p>
                   </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => handleEdit(item)} className="text-emerald-600 hover:bg-emerald-50 p-2 rounded transition-colors">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.question)} className="text-red-400 hover:bg-red-50 p-2 rounded transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFAQ;
