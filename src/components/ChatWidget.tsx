import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ArrowRight, Quote, Ticket, User, Phone, MessageSquare } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isRaisingTicket, setIsRaisingTicket] = useState(false);
  const [ticketForm, setTicketForm] = useState({ name: '', phone: '', issue: '' });
  const [messages, setMessages] = useState<{role: 'bot' | 'user', text: string}[]>([
    { role: 'bot', text: 'Namaste! I am your BK Career Academy Assistant. I can help you with UPSC, MPSC or general admissions. How can I assist you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isRaisingTicket]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = message;
    setMessage('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: messages })
      });
      
      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
        
        // If the reply mentions ticket, show the button
        if (data.reply.toLowerCase().includes('ticket')) {
          // No action needed here, the 'Raise Ticket' button is always visible or context-aware
        }
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: "I'm having trouble connecting to my knowledge base. Please try again later or call us directly." }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "Namaste! Our automated systems are resting. Please leave your number or raise a ticket!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRaiseTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTyping(true);
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketForm)
      });
      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: 'bot', text: `✅ Ticket Raised! Ref Name: ${ticketForm.name}. Our mentors will contact you on ${ticketForm.phone} within 24 hours.` }]);
        setIsRaisingTicket(false);
        setTicketForm({ name: '', phone: '', issue: '' });
      }
    } catch (err: any) {
      console.error('Ticket Error:', err);
      setMessages(prev => [...prev, { role: 'bot', text: `Sorry, I couldn't raise the ticket. (${err.message}). Please call us directly.` }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-[90]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-96 bg-white border-2 border-ink overflow-hidden flex flex-col h-[500px] shadow-2xl"
          >
            <div className="p-4 bg-ink flex items-center justify-between relative overflow-hidden">
              <div className="flex items-center gap-3 relative z-10">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-10 h-10 border-2 border-brand bg-ink flex items-center justify-center overflow-hidden shrink-0"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  >
                    <Star className="text-brand" size={20} fill="currentColor" />
                  </motion.div>
                </motion.div>
                <div>
                  <div className="text-white font-display font-bold text-sm uppercase">BK Assistant</div>
                  <div className="text-brand/60 text-[10px] uppercase font-mono">Live Help • Jay Hind</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-brand hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 bg-background scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 px-4 text-[13px] ${msg.role === 'user' ? 'bg-brand text-ink font-semibold' : 'bg-white border-2 border-ink/10 text-ink'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {!isRaisingTicket && (
                <div className="flex justify-start">
                  <button 
                    onClick={() => setIsRaisingTicket(true)}
                    className="flex items-center gap-2 bg-ink text-brand px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider hover:bg-brand hover:text-ink transition-all"
                  >
                    <Ticket size={14} /> Raise a Ticket
                  </button>
                </div>
              )}

              {isRaisingTicket && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border-2 border-brand p-4 space-y-3"
                >
                  <div className="text-[11px] font-bold text-ink uppercase flex items-center gap-2">
                    <Ticket size={14} className="text-brand" /> New Support Ticket
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <User size={12} className="absolute left-3 top-3 text-muted" />
                      <input 
                        placeholder="Your Name"
                        className="w-full pl-8 pr-3 py-2 border border-ink/20 text-xs focus:border-brand outline-none"
                        value={ticketForm.name}
                        onChange={e => setTicketForm({...ticketForm, name: e.target.value})}
                      />
                    </div>
                    <div className="relative">
                      <Phone size={12} className="absolute left-3 top-3 text-muted" />
                      <input 
                        placeholder="Phone Number (10 Digits)"
                        type="tel"
                        maxLength={10}
                        className="w-full pl-8 pr-3 py-2 border border-ink/20 text-xs focus:border-brand outline-none"
                        value={ticketForm.phone}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setTicketForm({...ticketForm, phone: val});
                        }}
                      />
                    </div>
                    <div className="relative">
                      <MessageSquare size={12} className="absolute left-3 top-3 text-muted" />
                      <textarea 
                        placeholder="Describe your issue..."
                        className="w-full pl-8 pr-3 py-2 border border-ink/20 text-xs focus:border-brand outline-none h-16 resize-none"
                        value={ticketForm.issue}
                        onChange={e => setTicketForm({...ticketForm, issue: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleRaiseTicket}
                      disabled={!ticketForm.name || ticketForm.phone.length !== 10 || !ticketForm.issue}
                      className="flex-grow bg-brand text-ink py-2 text-[11px] font-bold uppercase disabled:opacity-50"
                    >
                      Submit Ticket
                    </button>
                    <button 
                      onClick={() => setIsRaisingTicket(false)}
                      className="px-3 border-2 border-ink text-[11px] font-bold uppercase"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-2 border-2 border-ink/10 flex gap-1">
                    <div className="w-1.5 h-1.5 bg-brand animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-brand animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              )}
            </div>

            {!isRaisingTicket && (
              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t-2 border-ink flex gap-2">
                <input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask your query or say 'Help'..."
                  className="flex-grow bg-background border-2 border-ink px-4 py-2.5 text-xs outline-none focus:border-brand"
                />
                <button type="submit" className="w-10 h-10 bg-brand text-ink flex items-center justify-center hover:bg-ink hover:text-brand transition-colors">
                  <ArrowRight size={18} strokeWidth={2.5} />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, x: -2, y: -2 }}
        whileTap={{ scale: 0.95, x: 0, y: 0 }}
        animate={!isOpen ? {
          y: [0, -8, 0],
          scale: [1, 1.02, 1],
        } : { y: 0, scale: 1 }}
        transition={!isOpen ? {
          duration: 3,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          repeatDelay: 2
        } : { duration: 0.3 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand flex items-center justify-center text-ink shadow-[4px_4px_0_0_#1A1A1A] border-[3px] border-ink transform-gpu transition-shadow hover:shadow-[6px_6px_0_0_#1A1A1A]"
      >
        {isOpen ? <X size={28} strokeWidth={3} /> : <MessageSquare size={26} strokeWidth={3} />}
      </motion.button>
    </div>
  );
}
