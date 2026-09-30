'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Search } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  name: string;
  employeeId: string;
  messages: Message[];
}

interface ChatBoxProps {
  currentUserId: string;
}

export default function ChatBox({ currentUserId }: ChatBoxProps) {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'System User',
      employeeId: 'IT01001',
      messages: [
        {
          id: 'm1',
          senderId: 'IT01001',
          senderName: 'System User',
          text: 'Hello! Kemon achen?',
          timestamp: '10:00 AM',
        },
        {
          id: 'm2',
          senderId: currentUserId,
          senderName: 'You',
          text: 'Bhalo achi. Bolo ki khobor?',
          timestamp: '10:05 AM',
        },
      ],
    },
    {
      id: '2',
      name: 'Team Member',
      employeeId: 'IT01002',
      messages: [
        {
          id: 'm3',
          senderId: 'IT01002',
          senderName: 'Team Member',
          text: 'Sir, leave request check korechen?',
          timestamp: '09:30 AM',
        },
      ],
    },
  ]);

  const [selectedChatId, setSelectedChatId] = useState<string>('1');
  const [inputText, setInputText] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeConversation = conversations.find((c) => c.id === selectedChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: 'You',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === selectedChatId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
          };
        }
        return conv;
      }),
    );

    setInputText('');
  };

  return (
    <div className="flex h-[calc(100vh-8.5rem)] bg-zinc-900/40 border border-zinc-800/80 rounded-2xl overflow-hidden">
      {/* Left Sidebar: Conversation List */}
      <div className="w-80 border-r border-zinc-800/80 flex flex-col bg-zinc-950/20">
        <div className="p-4 border-b border-zinc-800/80 space-y-3">
          <h2 className="text-sm font-bold text-white">Messages</h2>
          <div className="relative">
            <Search className="absolute inset-y-0 left-3 my-auto w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-1.5 pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedChatId(conv.id)}
              className={`p-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${
                selectedChatId === conv.id
                  ? 'bg-indigo-600/20 border border-indigo-500/30 text-white'
                  : 'hover:bg-zinc-800/40 text-zinc-400'
              }`}>
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs uppercase shrink-0">
                {conv.name.slice(0, 2)}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-white truncate">
                  {conv.name}
                </h4>
                <p className="text-[10px] text-zinc-500 truncate">
                  {conv.employeeId}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Area: Chat Panel */}
      <div className="flex-1 flex flex-col bg-zinc-950/40">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-zinc-800/80 flex items-center gap-3 bg-zinc-900/20">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs uppercase">
                {activeConversation.name.slice(0, 2)}
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">
                  {activeConversation.name}
                </h3>
                <span className="text-[10px] text-zinc-500">
                  {activeConversation.employeeId}
                </span>
              </div>
            </div>

            {/* Messaging Area (Scrollable with hidden scrollbar and auto-scroll) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {activeConversation.messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-xs text-zinc-500">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                activeConversation.messages.map((msg) => {
                  const isMe = msg.senderId === currentUserId;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`max-w-md rounded-2xl px-4 py-2.5 text-xs ${
                          isMe
                            ? 'bg-indigo-600 text-white rounded-br-none'
                            : 'bg-zinc-800 text-zinc-200 rounded-bl-none border border-zinc-700/50'
                        }`}>
                        <p>{msg.text}</p>
                      </div>
                      <span className="text-[9px] text-zinc-500 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Box */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-zinc-800/80 bg-zinc-900/20 flex items-center gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-md shadow-indigo-600/30">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs text-zinc-500">
            Select a conversation to start messaging.
          </div>
        )}
      </div>
    </div>
  );
}
