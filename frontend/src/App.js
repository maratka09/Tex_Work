import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Mic, Send, Loader2, Bot, User, CornerDownLeft } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const startVoice = () => {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) return alert("Браузер не поддерживает распознавание речи.");
    const rec = new Speech();
    rec.lang = 'ru-RU';
    rec.onstart = () => setIsListening(true);
    rec.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setText(prev => (prev ? `${prev} ${transcript}` : transcript));
      setIsListening(false);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    rec.start();
  };

  const sendPrompt = async () => {
    const trimmedText = text.trim();
    if (!trimmedText || loading) return;
    
    const userMsg = { role: 'user', content: trimmedText };
    setMessages(prev => [...prev, userMsg]);
    setText('');
    setLoading(true);

    try {
      const res = await axios.post('http://127.0.0.1:8002/api/chat/', { text: trimmedText });
      const aiMsg = { role: 'assistant', content: res.data.reply };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Ошибка связи с сервером. Проверьте соединение."
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="flex flex-col h-screen bg-[#F7F9FC] text-slate-700 antialiased py-6 px-4 md:px-0"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        * { 
          font-family: 'Montserrat', sans-serif !important; 
          letter-spacing: -0.01em; 
        }
      `}} />
      
      <div className="flex flex-col flex-1 max-w-5xl mx-auto w-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[40px] overflow-hidden border border-slate-100">
        
        <header className="bg-white border-b border-slate-100 py-5 px-8 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-full text-blue-600">
              <Bot size={24} strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">AI Помощник</h1>
              <div className="flex items-center justify-center gap-1.5 text-sm text-emerald-600 font-medium">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Ждет вашего запроса...
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 bg-white">
          {messages.length === 0 && (
            <div className="text-center mt-24 flex flex-col items-center justify-center">
              <div className="p-8 bg-slate-50 rounded-full border border-slate-100 mb-6 text-slate-400">
                 <Bot size={60} strokeWidth={1} className="opacity-60" />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Приветствую вас!</h2>
              <p className="text-slate-500 max-w-sm text-center">Я готов помочь с кодом или ответить на вопросы. Просто напиши свой вопрос.</p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-blue-600' : 'bg-white border border-slate-200'}`}>
                {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-slate-500" />}
              </div>

              <div className={`group relative max-w-[75%] px-6 py-4 transition-all duration-300 hover:shadow-md ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-full rounded-br-none' 
                  : 'bg-white border border-slate-100 text-slate-800 rounded-full rounded-tl-none'
              }`}>
                <p className="text-[15px] leading-relaxed font-medium">{msg.content}</p>
                
                <span className={`absolute -bottom-6 text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  msg.role === 'user' ? 'right-2 text-blue-400' : 'left-2 text-slate-400'
                }`}>
                  {msg.role === 'user' ? 'Отправлено' : 'Ассистент'}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-end gap-3">
              <div className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                <Bot size={16} className="text-slate-400" />
              </div>
              <div className="bg-slate-50 border border-slate-100 px-6 py-4 rounded-full rounded-tl-none flex items-center gap-2 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                </div>
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-tight ml-1">Думаю...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        <footer className="bg-white border-t border-slate-100 p-6">
          <div className="flex items-center gap-4 bg-[#F8FAFC] border border-slate-100 rounded-full p-2 pr-3 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            
            <button 
              onClick={startVoice}
              className={`flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full transition-all ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Mic size={22} />
            </button>
            
            <input 
              className="flex-1 bg-transparent border-none text-slate-800 py-3 px-2 focus:ring-0 outline-none text-base"
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendPrompt())}
              placeholder="Спросите меня о чем нибудь..."
            />
            
            <button 
              onClick={sendPrompt}
              disabled={!text.trim() || loading}
              className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-40 transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </footer>
      </div>
      <footer className="text-center mt-6 text-xs text-slate-400">
          AI Техническое задание © 2026. Все права защищены.
      </footer>
    </div>
  );
}

export default App;