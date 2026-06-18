
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Sparkles, User, Wine, Zap, Gift } from 'lucide-react';
import { useData } from '../context/DataContext';

const AISommelier: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'sommelier' | 'gift'>('sommelier');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { products, siteContent } = useData();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemContext = mode === 'sommelier' 
        ? 'Bạn là Chuyên gia Sommelier (Người nếm rượu) cao cấp của thương hiệu Rượu Nam Quốc Tửu.'
        : 'Bạn là Cố vấn quà tặng (Gift Advisor) cao cấp của thương hiệu Rượu Nam Quốc Tửu.';

      const prompt = `${systemContext}
      Thông tin thương hiệu: 
      - OCOP 4 sao, 32 loại thảo mộc rừng Bắc Kạn. Sản phẩm đạt chuẩn xuất khẩu Nhật Bản.
      - Nguồn nước suối Nặm Cắt.
      - Sản phẩm: ${products.map(p => `${p.name} (${p.volume})`).join(', ')}.
      
      Yêu cầu:
      - Trả lời bằng giọng văn sang trọng, lịch thiệp.
      - ${mode === 'sommelier' ? 'Tư vấn cách nếm, hương vị, món ăn kèm.' : 'Tư vấn chọn bộ quà tặng phù hợp cho: đối tác Nhật, quà Tết, sếp, bạn bè.'}
      - Câu trả lời ngắn gọn (tối đa 3 câu).
      
      Câu hỏi khách hàng: ${userMessage}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const aiText = response.text || "Xin lỗi quý khách, tôi đang bận thưởng thức một mẻ rượu mới.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-32 right-8 z-[110]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-900 text-amber-500 rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(3,56,45,0.4)] border border-amber-500/20 hover:scale-110 active:scale-95 transition-all group overflow-hidden"
      >
        {isOpen ? <X size={24} /> : (
          <div className="relative">
             <Wine size={24} className="group-hover:rotate-12 transition-transform" />
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-emerald-900 animate-pulse"></div>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] max-h-[550px] bg-emerald-950/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-fade-in-up">
           <div className="p-6 bg-gradient-to-r from-emerald-900 to-emerald-950 border-b border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30 text-amber-500">
                   {mode === 'sommelier' ? <Sparkles size={18} /> : <Gift size={18} />}
                </div>
                <div>
                   <h4 className="font-serif text-base text-white">{mode === 'sommelier' ? 'Nam Quốc Tửu Sommelier' : 'Trợ Lý Chọn Quà'}</h4>
                   <div className="flex items-center gap-2 text-[8px] font-bold text-amber-500/60 uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> AI Powered
                   </div>
                </div>
              </div>
              <div className="flex bg-black/20 p-1 rounded-full">
                 <button 
                    onClick={() => setMode('sommelier')}
                    className={`flex-1 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${mode === 'sommelier' ? 'bg-amber-600 text-white' : 'text-white/40 hover:text-white'}`}
                 >
                    Advice
                 </button>
                 <button 
                    onClick={() => setMode('gift')}
                    className={`flex-1 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${mode === 'gift' ? 'bg-amber-600 text-white' : 'text-white/40 hover:text-white'}`}
                 >
                    Gifting
                 </button>
              </div>
           </div>

           <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar min-h-[300px]">
              {messages.length === 0 && (
                <div className="text-center py-10">
                   {mode === 'sommelier' ? (
                     <p className="text-emerald-100/40 text-sm italic">"Rượu ngon phải có bạn hiền. Tôi có thể giúp gì cho quý khách?"</p>
                   ) : (
                     <p className="text-emerald-100/40 text-sm italic">"Tìm món quà tinh hoa dành cho ai đó đặc biệt?"</p>
                   )}
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-amber-600 text-white rounded-br-none shadow-lg' : 'bg-white/5 text-emerald-100 border border-white/5 rounded-bl-none'}`}>
                      {m.text}
                   </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-white/5 p-4 rounded-2xl rounded-bl-none border border-white/5 flex gap-1">
                      <div className="w-1.5 h-1.5 bg-amber-500/40 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-amber-500/40 rounded-full animate-bounce [animation-delay:200ms]"></div>
                      <div className="w-1.5 h-1.5 bg-amber-500/40 rounded-full animate-bounce [animation-delay:400ms]"></div>
                   </div>
                </div>
              )}
              <div ref={chatEndRef} />
           </div>

           <div className="p-4 bg-black/20 border-t border-white/5">
              <div className="flex gap-2">
                 <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={mode === 'sommelier' ? "Hỏi về vị rượu..." : "Tặng cho sếp đi Nhật..."}
                    className="flex-1 bg-white/5 border border-white/5 rounded-full px-5 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-amber-500 transition-all placeholder-white/20"
                 />
                 <button onClick={handleSend} className="w-11 h-11 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-500 transition-all shadow-lg active:scale-90">
                    <Send size={18} />
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AISommelier;
