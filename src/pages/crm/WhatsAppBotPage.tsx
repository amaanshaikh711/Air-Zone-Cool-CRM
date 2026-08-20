import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  CheckCircle2,
  Phone,
  Sparkles,
  RotateCcw,
  Wrench,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/ui/Badge';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  options?: string[];
  isAction?: boolean;
}

export const WhatsAppBotPage: React.FC = () => {
  const { addLead, addJob, showToast } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: '👋 Namaste! Welcome to Air Zone Cool HVAC Mumbai. I am your 24x7 AI Service Assistant. How can we help you today?',
      time: '10:00 AM',
      options: ['Book AC Repair & Diagnosis', 'Annual Maintenance Contract (AMC)', 'New AC Installation', 'Check Existing Job Status'],
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [step, setStep] = useState<number>(0);
  const [bookingData, setBookingData] = useState<{
    service?: string;
    brand?: string;
    name?: string;
    phone?: string;
    location?: string;
    issue?: string;
  }>({});

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleOptionClick = (option: string) => {
    handleUserReply(option);
  };

  const handleUserReply = (text: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: timeNow,
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Chatbot Flow Logic
    setTimeout(() => {
      processBotResponse(text, timeNow);
    }, 600);
  };

  const processBotResponse = (userText: string, timeNow: string) => {
    if (step === 0) {
      // User picked service type
      setBookingData(prev => ({ ...prev, service: userText }));
      setStep(1);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `Great! Which AC brand do you have installed? Our technicians are factory-certified for:`,
          time: timeNow,
          options: ['Daikin', 'Mitsubishi Electric', 'Samsung', 'Other Brand'],
        },
      ]);
    } else if (step === 1) {
      // User picked brand
      setBookingData(prev => ({ ...prev, brand: userText }));
      setStep(2);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `Got it (${userText} AC). Please briefly describe the issue or requirement (e.g., Not cooling, water leakage, strange noise, or routine servicing):`,
          time: timeNow,
          options: ['No cooling / warm air', 'Water leakage from indoor unit', 'PCB Error code blinking', 'Gas charging required'],
        },
      ]);
    } else if (step === 2) {
      // User described problem
      setBookingData(prev => ({ ...prev, issue: userText }));
      setStep(3);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `Understood. Where in Mumbai should we dispatch the technician? (e.g. Andheri West, Bandra, Powai, Malad, Juhu):`,
          time: timeNow,
          options: ['Andheri West', 'Bandra West', 'Powai', 'Malad West', 'South Mumbai'],
        },
      ]);
    } else if (step === 3) {
      // User selected locality
      setBookingData(prev => ({ ...prev, location: userText }));
      setStep(4);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `Please enter your Full Name and Contact Mobile Number to confirm booking:`,
          time: timeNow,
        },
      ]);
    } else if (step === 4) {
      // User gave name & phone
      const name = userText.split(' ')[0] || 'Customer';
      const phone = userText.match(/\d{10}/) ? userText.match(/\d{10}/)![0] : '9820199999';

      const finalData = { ...bookingData, name: userText, phone };
      setBookingData(finalData);
      setStep(5);

      // Auto create lead & job in CRM!
      addLead({
        name: userText,
        phone: phone,
        email: `${name.toLowerCase()}@client.com`,
        service: finalData.service || 'AC Repair',
        acBrand: (finalData.brand as any) || 'Daikin',
        acUnits: 1,
        location: finalData.location || 'Mumbai',
        status: 'New',
        priority: 'Urgent',
        source: 'WhatsApp Bot',
        estimatedValue: 2500,
        notes: `WhatsApp Booking: ${finalData.issue || 'Diagnostic required'}`,
      });

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `🎉 Booking Confirmed! We have automatically created Service Job & Lead in our CRM dispatch queue. A certified ${finalData.brand || 'HVAC'} technician will arrive within 2 hours.`,
          time: timeNow,
          isAction: true,
        },
        {
          id: `bot-${Date.now() + 1}`,
          sender: 'bot',
          text: `📋 Summary:\n• Customer: ${userText}\n• Service: ${finalData.service}\n• Brand: ${finalData.brand}\n• Location: ${finalData.location}\n• Priority: Urgent Emergency Dispatch\n\nNeed to book another service?`,
          time: timeNow,
          options: ['Restart WhatsApp Assistant'],
        },
      ]);

      showToast('success', 'Lead Created from WhatsApp', `Inquiry from ${userText} logged in CRM.`);
    } else {
      // Reset
      setStep(0);
      setBookingData({});
      setMessages([
        {
          id: '1',
          sender: 'bot',
          text: '👋 Namaste! Welcome to Air Zone Cool HVAC Mumbai. How can we help you today?',
          time: timeNow,
          options: ['Book AC Repair & Diagnosis', 'Annual Maintenance Contract (AMC)', 'New AC Installation'],
        },
      ]);
    }
  };

  const handleReset = () => {
    setStep(0);
    setBookingData({});
    setMessages([
      {
        id: '1',
        sender: 'bot',
        text: '👋 Namaste! Welcome to Air Zone Cool HVAC Mumbai. I am your 24x7 AI Service Assistant. How can we help you today?',
        time: '10:00 AM',
        options: ['Book AC Repair & Diagnosis', 'Annual Maintenance Contract (AMC)', 'New AC Installation'],
      },
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Interactive WhatsApp Bot & Auto-Booking Simulator
            </h1>
            <Badge variant="success" size="sm">24/7 Auto-Pilot</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Test the live conversational customer booking flow that automatically registers leads and schedules jobs in the CRM
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-200"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Simulation</span>
        </button>
      </div>

      {/* WhatsApp Interface Mockup */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
        {/* WhatsApp Top bar */}
        <div className="bg-emerald-700 dark:bg-emerald-800 text-white p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 dark:bg-emerald-700 flex items-center justify-center font-bold text-base border-2 border-emerald-400">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm flex items-center gap-1.5">
                Air Zone Cool Official
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              </div>
              <div className="text-[11px] text-emerald-100 dark:text-emerald-200">Online • Automated HVAC Dispatch Bot</div>
            </div>
          </div>

          <Badge variant="success" size="sm">Verified Business</Badge>
        </div>

        {/* Chat Messages Body */}
        <div className="p-4 sm:p-6 bg-slate-100/90 dark:bg-slate-950/90 min-h-[420px] max-h-[500px] overflow-y-auto space-y-4 text-xs font-sans">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl space-y-1.5 shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 dark:bg-emerald-700 text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/80 dark:border-slate-700'
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                <div className={`text-[9px] text-right ${msg.sender === 'user' ? 'text-emerald-100' : 'text-slate-400'}`}>{msg.time}</div>
              </div>

              {/* Quick option buttons for Bot messages */}
              {msg.options && msg.options.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[85%]">
                  {msg.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(opt)}
                      className="px-3 py-1.5 bg-white dark:bg-emerald-950/80 hover:bg-emerald-50 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-600/60 text-emerald-700 dark:text-emerald-300 rounded-xl text-[11px] font-semibold transition-all shadow-2xs cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={e => {
            e.preventDefault();
            if (inputVal.trim()) handleUserReply(inputVal.trim());
          }}
          className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Type your message or details..."
            className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl disabled:opacity-40 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
