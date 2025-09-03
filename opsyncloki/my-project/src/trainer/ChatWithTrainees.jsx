import React, { useState } from 'react';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Smile,
  Users,
  User,
  Clock,
  CheckCheck
} from 'lucide-react';

const ChatWithTrainees = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('individual'); // individual, group

  const individualChats = [
    {
      id: 1,
      name: 'Alex Kumar',
      lastMessage: 'Thank you for the feedback on my project!',
      time: '2 min ago',
      unread: 2,
      online: true,
      image: 'https://images.pexels.com/photos/2182975/pexels-photo-2182975.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      lastMessage: 'Can you help me with the Spring Boot assignment?',
      time: '15 min ago',
      unread: 1,
      online: true,
      image: 'https://images.pexels.com/photos/2182976/pexels-photo-2182976.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 3,
      name: 'David Lee',
      lastMessage: 'I have completed the database exercise',
      time: '1 hour ago',
      unread: 0,
      online: false,
      image: 'https://images.pexels.com/photos/2182977/pexels-photo-2182977.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 4,
      name: 'Maria Garcia',
      lastMessage: 'When is the next code review session?',
      time: '2 hours ago',
      unread: 0,
      online: true,
      image: 'https://images.pexels.com/photos/2182978/pexels-photo-2182978.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 5,
      name: 'James Wilson',
      lastMessage: 'Thanks for the additional resources!',
      time: '1 day ago',
      unread: 0,
      online: false,
      image: 'https://images.pexels.com/photos/2182979/pexels-photo-2182979.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const groupChats = [
    {
      id: 101,
      name: 'Java Batch 2025-A',
      lastMessage: 'Alex: Thanks for today\'s session!',
      time: '5 min ago',
      unread: 3,
      members: 28,
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 102,
      name: 'Advanced Group',
      lastMessage: 'Priya: Can we schedule extra practice session?',
      time: '30 min ago',
      unread: 1,
      members: 15,
      image: 'https://images.pexels.com/photos/1181672/pexels-photo-1181672.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 103,
      name: 'Project Team A',
      lastMessage: 'David: I\'ve pushed the latest changes',
      time: '2 hours ago',
      unread: 0,
      members: 6,
      image: 'https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Alex Kumar',
      content: 'Hi sir, I have a question about the Spring Boot assignment',
      time: '10:30 AM',
      isTrainer: false,
      status: 'read'
    },
    {
      id: 2,
      sender: 'You',
      content: 'Sure Alex! What specific part are you having trouble with?',
      time: '10:32 AM',
      isTrainer: true,
      status: 'read'
    },
    {
      id: 3,
      sender: 'Alex Kumar',
      content: 'I\'m having issues with the REST API configuration. The endpoints are not working properly.',
      time: '10:35 AM',
      isTrainer: false,
      status: 'read'
    },
    {
      id: 4,
      sender: 'You',
      content: 'Let me help you with that. Can you share your controller code? Also, make sure you have the @RestController annotation.',
      time: '10:37 AM',
      isTrainer: true,
      status: 'read'
    },
    {
      id: 5,
      sender: 'Alex Kumar',
      content: 'Thank you for the feedback on my project! I\'ll implement the changes you suggested.',
      time: '2 min ago',
      isTrainer: false,
      status: 'delivered'
    }
  ];

  const currentChats = activeTab === 'individual' ? individualChats : groupChats;
  const selectedChatData = currentChats.find(chat => chat.id === selectedChat);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const ChatListItem = ({ chat, isGroup = false }) => (
    <div
      onClick={() => setSelectedChat(chat.id)}
      className={`flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
        selectedChat === chat.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
      }`}
    >
      <div className="relative">
        <img 
          src={chat.image}
          alt={chat.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        {!isGroup && chat.online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
          <span className="text-xs text-gray-500">{chat.time}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
          {chat.unread > 0 && (
            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
              {chat.unread}
            </span>
          )}
        </div>
        {isGroup && (
          <p className="text-xs text-gray-500">{chat.members} members</p>
        )}
      </div>
    </div>
  );

  const MessageBubble = ({ message }) => (
    <div className={`flex ${message.isTrainer ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        message.isTrainer 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-200 text-gray-900'
      }`}>
        {!message.isTrainer && (
          <p className="text-xs font-semibold mb-1">{message.sender}</p>
        )}
        <p className="text-sm">{message.content}</p>
        <div className={`flex items-center justify-end space-x-1 mt-1 ${
          message.isTrainer ? 'text-blue-100' : 'text-gray-500'
        }`}>
          <span className="text-xs">{message.time}</span>
          {message.isTrainer && (
            <CheckCheck size={12} className={message.status === 'read' ? 'text-blue-200' : 'text-blue-300'} />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center">
            <MessageCircle size={20} className="text-pink-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Chat with Trainees</h1>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-[600px] flex">
        {/* Chat List Sidebar */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('individual')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'individual'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <User size={16} />
                <span>Individual</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('group')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === 'group'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Users size={16} />
                <span>Groups</span>
              </div>
            </button>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {currentChats.map((chat) => (
              <ChatListItem 
                key={chat.id} 
                chat={chat} 
                isGroup={activeTab === 'group'} 
              />
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChatData ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={selectedChatData.image}
                    alt={selectedChatData.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedChatData.name}</h3>
                    <p className="text-sm text-gray-500">
                      {activeTab === 'individual' 
                        ? (selectedChatData.online ? 'Online' : 'Last seen 2 hours ago')
                        : `${selectedChatData.members} members`
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <Phone size={18} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <Video size={18} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                    <MoreVertical size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <Paperclip size={18} className="text-gray-600" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                    >
                      <Smile size={16} className="text-gray-600" />
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors duration-200"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a chat</h3>
                <p className="text-gray-600">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Chats</p>
              <p className="text-2xl font-bold text-pink-600">{individualChats.length + groupChats.length}</p>
            </div>
            <MessageCircle size={24} className="text-pink-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread Messages</p>
              <p className="text-2xl font-bold text-red-600">
                {[...individualChats, ...groupChats].reduce((sum, chat) => sum + chat.unread, 0)}
              </p>
            </div>
            <Clock size={24} className="text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Online Students</p>
              <p className="text-2xl font-bold text-green-600">
                {individualChats.filter(chat => chat.online).length}
              </p>
            </div>
            <Users size={24} className="text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Group Chats</p>
              <p className="text-2xl font-bold text-blue-600">{groupChats.length}</p>
            </div>
            <Users size={24} className="text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithTrainees;