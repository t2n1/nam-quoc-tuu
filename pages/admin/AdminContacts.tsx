
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Search, Mail, Phone, Calendar, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const AdminContacts: React.FC = () => {
  const { contacts, updateContactStatus, deleteContact } = useData();
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'done'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(c => {
    const matchesFilter = filter === 'all' || c.status === filter;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <span className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider"><AlertCircle size={10} /> Mới</span>;
      case 'contacted': return <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider"><Clock size={10} /> Đã LH</span>;
      case 'done': return <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider"><CheckCircle size={10} /> Xong</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
         <div className="flex items-center bg-stone-100 rounded-lg px-3 py-2 w-full md:w-80 border border-transparent focus-within:border-amber-500 focus-within:bg-white transition-all">
            <Search size={18} className="text-stone-400 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm tên hoặc SĐT..." 
              className="bg-transparent border-none outline-none text-sm w-full font-medium" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
         </div>
         <div className="flex gap-2">
            {['all', 'new', 'contacted', 'done'].map((f) => (
                <button 
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === f ? 'bg-emerald-950 text-white' : 'bg-stone-50 text-stone-500 hover:bg-stone-100'}`}
                >
                    {f === 'all' ? 'Tất cả' : f === 'new' ? 'Mới' : f === 'contacted' ? 'Đã LH' : 'Hoàn tất'}
                </button>
            ))}
         </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
         {filteredContacts.length === 0 ? (
             <div className="p-12 text-center text-stone-400">
                 <Mail size={48} className="mx-auto mb-4 opacity-50" />
                 <p className="text-sm">Không tìm thấy yêu cầu nào.</p>
             </div>
         ) : (
             <div className="divide-y divide-stone-100">
                 {filteredContacts.map((contact) => (
                     <div key={contact.id} className="p-6 hover:bg-stone-50 transition-colors flex flex-col md:flex-row gap-6 group">
                         {/* Info */}
                         <div className="w-full md:w-64 shrink-0">
                             <div className="flex items-center justify-between mb-2">
                                 <h4 className="font-bold text-emerald-950">{contact.name}</h4>
                                 {getStatusBadge(contact.status)}
                             </div>
                             <div className="flex flex-col gap-1 text-sm text-stone-500">
                                 <div className="flex items-center gap-2"><Phone size={14} className="text-amber-600"/> <span className="font-mono">{contact.phone}</span></div>
                                 <div className="flex items-center gap-2"><Calendar size={14}/> {contact.date}</div>
                             </div>
                         </div>

                         {/* Content */}
                         <div className="flex-1">
                             <div className="mb-2">
                                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Quan tâm:</span>
                                <span className="ml-2 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-xs">{contact.interest}</span>
                             </div>
                             <p className="text-stone-600 text-sm leading-relaxed bg-stone-50/50 p-3 rounded-lg border border-stone-100">
                                "{contact.message}"
                             </p>
                         </div>

                         {/* Actions */}
                         <div className="flex md:flex-col gap-2 justify-center shrink-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                             {contact.status !== 'done' && (
                                 <button 
                                    onClick={() => updateContactStatus(contact.id, 'done')}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded hover:bg-green-100 text-xs font-bold transition-colors"
                                 >
                                    <CheckCircle size={14} /> Hoàn tất
                                 </button>
                             )}
                             {contact.status === 'new' && (
                                 <button 
                                    onClick={() => updateContactStatus(contact.id, 'contacted')}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 text-xs font-bold transition-colors"
                                 >
                                    <Clock size={14} /> Đã gọi điện
                                 </button>
                             )}
                             <button 
                                onClick={() => deleteContact(contact.id)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded hover:bg-red-100 text-xs font-bold transition-colors"
                             >
                                <Trash2 size={14} /> Xóa
                             </button>
                         </div>
                     </div>
                 ))}
             </div>
         )}
      </div>
    </div>
  );
};

export default AdminContacts;
