"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareCode, X, Send, Bot, Terminal, User, Sparkles } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const PRE_CODED_QA = [
  {
    keywords: ["finance", "mba", "nirma", "education"],
    text: "Bhavnish is currently pursuing an MBA in Finance and Digital Transformation at Nirma University (2025-2027), following his B.Tech in Computer Science from the same university (82.90% CGPA). This gives him a unique ability to apply code to financial analysis."
  },
  {
    keywords: ["project", "projects", "work", "portfolio"],
    text: "Some of Bhavnish's top projects include:\n1. AI-Based Test Automation Agent (LangChain + Selenium)\n2. Blockchain Degree Verification System (Solidity + React)\n3. ElectroCast: Electricity Demand Forecasting (Random Forest + Streamlit)\n4. Android Malware Detection (97.2% accuracy, presented at ICIT 2025)."
  },
  {
    keywords: ["skill", "skills", "tools", "python"],
    text: "His skills span:\n- BI & Analytics: Power BI, Tableau, Advanced Excel, SPSS, Alteryx\n- Programming: Python, SQL, JavaScript, Kotlin, Solidity\n- Core: Data Interpretation, Corporate Finance, Predictive Modeling, Machine Learning."
  },
  {
    keywords: ["power bi", "bi", "internship", "cognifyz"],
    text: "Bhavnish completed a Power BI Internship at Cognifyz Technologies (Jul-Aug 2025). He built interactive management dashboards, ran complex DAX calculations, and blended multiple sales datasets to produce operational insights."
  },
  {
    keywords: ["contact", "email", "phone", "linkedin"],
    text: "You can connect with Bhavnish directly:\n- Email: bhavnishnanda9933@gmail.com\n- LinkedIn: linkedin.com/in/bhavnishnanda/\n- GitHub: github.com/Bhavnish10\n- Or submit the Contact Form on this page!"
  }
];

const DEFAULT_BOT_REPLY = "I am Bhavnish's AI representative. Try asking me about his 'finance skills', 'Power BI internship', 'projects', or his 'B.Tech + MBA timeline'!";

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "Greetings! I am Bhavnish's AI representative. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: "user", text }]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking and typewriter typing
    setTimeout(() => {
      let matchedReply = DEFAULT_BOT_REPLY;
      const lowerText = text.toLowerCase();

      for (const qa of PRE_CODED_QA) {
        if (qa.keywords.some(keyword => lowerText.includes(keyword))) {
          matchedReply = qa.text;
          break;
        }
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { sender: "bot", text: matchedReply }]);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          /* Expanded Panel */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 sm:w-96 h-[450px] rounded-2xl glass-panel bg-slate-950/95 border-slate-800 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/60 px-4 py-3">
              <div className="flex items-center gap-2 text-primary-light">
                <Bot className="w-4.5 h-4.5 animate-pulse" />
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">
                    Bhavnish AI Agent
                  </h4>
                  <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest block">
                    Online / Direct Response
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 items-start ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border text-[10px] ${
                      msg.sender === "user"
                        ? "bg-slate-900 border-slate-800 text-slate-300"
                        : "bg-primary/10 border-primary/20 text-primary-light"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-xs max-w-[75%] leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-primary text-white"
                        : "bg-slate-900/80 border border-slate-850 text-slate-300"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border bg-primary/10 border-primary/20 text-primary-light">
                    <Bot className="w-3.5 h-3.5 animate-bounce" />
                  </div>
                  <div className="bg-slate-900/80 border border-slate-850 rounded-2xl px-3.5 py-2.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Quick Questions Grid */}
            <div className="px-4 py-2 border-t border-slate-900 bg-slate-900/10 flex flex-wrap gap-1.5">
              {[
                "Timeline?",
                "Projects?",
                "Skills?",
                "Contact?"
              ].map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(query)}
                  className="px-2 py-1 rounded-md border border-slate-800 bg-slate-950/40 text-[9px] font-mono text-slate-400 hover:border-primary-light hover:text-white cursor-pointer transition-all"
                >
                  {query}
                </button>
              ))}
            </div>

            {/* Footer Input */}
            <div className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2">
              <input
                type="text"
                placeholder="Ask about skills, timeline, projects..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-slate-900 border border-slate-800 focus:border-primary-light/40 focus:ring-1 focus:ring-primary-light/20 text-slate-200 text-xs py-2 px-3 rounded-xl outline-none"
              />
              <button
                onClick={() => handleSend()}
                className="bg-primary hover:bg-primary-light text-white p-2 rounded-xl cursor-pointer transition-colors focus:outline-none flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Closed Floating Button */
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-accent-purple text-white flex items-center justify-center cursor-pointer shadow-[0_4px_20px_rgba(0,102,255,0.4)] border border-white/10 hover:shadow-[0_4px_25px_rgba(0,102,255,0.6)] focus:outline-none relative group"
          >
            {/* Animated outer pulsing ring */}
            <span className="absolute -inset-1.5 rounded-full border border-primary-light/30 animate-ping opacity-60 pointer-events-none" />
            <MessageSquareCode className="w-6 h-6 transition-transform group-hover:rotate-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
