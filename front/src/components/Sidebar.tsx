import React, { useState } from 'react';
import { MessageCircle, Users, X, Send } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  unread: number;
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Mock data - In a real app, this would come from your backend
  const chats: Chat[] = [
    { id: '1', name: 'Book Club - Fiction', lastMessage: 'What did you think of chapter 5?', unread: 2 },
    { id: '2', name: 'Fantasy Readers', lastMessage: 'New recommendation!', unread: 0 },
    { id: '3', name: 'Writing Workshop', lastMessage: 'Meeting tomorrow at 6 PM', unread: 1 },
  ];

  const messages: Message[] = [
    { id: '1', sender: 'Alice', content: 'Has anyone read The Midnight Library?', timestamp: new Date() },
    { id: '2', sender: 'Bob', content: 'Yes! It was amazing!', timestamp: new Date() },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-30"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center bg-indigo-600 text-white">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <h2 className="font-semibold">Reading Communities</h2>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat List / Chat View */}
          <div className="flex-1 overflow-y-auto">
            {!activeChat ? (
              // Chat List
              <div className="divide-y">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setActiveChat(chat.id)}
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{chat.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && (
                        <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Chat View
              <div className="flex flex-col h-full">
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center">
                  <button
                    onClick={() => setActiveChat(null)}
                    className="mr-2 text-gray-600 hover:text-gray-900"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <h3 className="font-medium">
                    {chats.find(chat => chat.id === activeChat)?.name}
                  </h3>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex flex-col">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-medium text-sm text-gray-900">
                          {message.sender}
                        </span>
                        <span className="text-xs text-gray-500">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-800 bg-gray-100 rounded-lg p-3">
                        {message.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}