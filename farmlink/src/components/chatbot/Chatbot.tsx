"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui";
import { getChatResponse } from "@/utils/chatbot";
import { Bot, Send, Mic, X, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  from: "user" | "bot";
  text: string;
}

interface ChatbotProps {
  userType: "farmer" | "buyer";
}

export function Chatbot({ userType }: ChatbotProps) {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: `Hi! I'm FarmLink AI 🌾 How can I help you ${userType === "farmer" ? "manage your farm" : "with your shopping"}?` }
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    endRef.current?.scrollIntoView({ behavior: "smooth" }); 
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { from: "user", text };
    const responses = getChatResponse(text);
    const botMsg: Message = { from: "bot", text: responses[Math.floor(Math.random() * responses.length)] };
    
    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const startVoice = () => {
    if (!('webkitSpeechRecognition' in window)) { 
      alert("Voice not supported in this browser"); 
      return; 
    }
    
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e: any) => { 
      send(e.results[0][0].transcript); 
    };
    recognition.start();
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setOpen(!open)} 
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-green-700 border-none cursor-pointer text-white shadow-lg hover:shadow-xl transition-all duration-200 z-50 flex items-center justify-center"
      >
        {open ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className={`fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border border-gray-200 ${
          minimized ? "h-12" : "h-[500px]"
        } transition-all duration-300`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <div>
                <div className="font-bold text-sm">FarmLink AI Assistant</div>
                <div className="text-xs opacity-85">Always here to help • Online</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setMinimized(!minimized)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                {minimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          {/* Messages */}
          {!minimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
                {messages.map((message, i) => (
                  <div key={i} className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-6 ${
                      message.from === "user" 
                        ? "bg-gradient-to-r from-green-600 to-green-700 text-white rounded-br-sm" 
                        : "bg-green-50 text-green-800 rounded-bl-sm"
                    }`}>
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={endRef} />
              </div>
              
              {/* Input */}
              <div className="p-3 border-t border-gray-200 flex gap-2">
                <input 
                  value={input} 
                  onChange={e => setInput(e.target.value)} 
                  onKeyDown={e => e.key === "Enter" && send(input)}
                  placeholder="Ask anything..." 
                  className="flex-1 p-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button 
                  onClick={startVoice} 
                  className={`p-2.5 border-none rounded-lg cursor-pointer text-sm transition-colors ${
                    listening ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {listening ? <Mic className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => send(input)} 
                  className="p-2.5 border-none rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white cursor-pointer text-sm hover:from-green-700 hover:to-green-800 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
