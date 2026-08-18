// Instagram Direct Messages (Chat) Engine
class ChatController {
  constructor() {
    this.chats = [...CHATS_DATA];
    this.activeChatId = this.chats[0]?.id || null;
    this.init();
  }

  init() {
    this.renderConversationsList();
    this.renderActiveChat();
    this.bindEvents();
  }

  renderConversationsList() {
    const listContainer = document.getElementById('chatConversationsList');
    if (!listContainer) return;

    listContainer.innerHTML = this.chats.map(chat => {
      const isActive = chat.id === this.activeChatId;
      const lastMsg = chat.messages[chat.messages.length - 1];
      return `
        <div class="chat-conv-item ${isActive ? 'active' : ''}" data-chat-id="${chat.id}">
          <div class="conv-avatar-box">
            <img class="conv-avatar" src="${chat.user.avatar}" alt="${chat.user.username}" />
            ${chat.user.isOnline ? '<span class="online-indicator"></span>' : ''}
          </div>
          <div class="conv-details">
            <div class="conv-user-name">${chat.user.name}</div>
            <div class="conv-last-msg">${lastMsg ? (lastMsg.sender === 'me' ? 'You: ' : '') + lastMsg.text : 'Active now'}</div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to conversations
    listContainer.querySelectorAll('.chat-conv-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.chatId;
        this.selectChat(id);
      });
    });
  }

  selectChat(chatId) {
    this.activeChatId = chatId;
    this.renderConversationsList();
    this.renderActiveChat();

    // On mobile, mark wrapper as in-chat
    const wrapper = document.querySelector('.messages-wrapper');
    if (wrapper) wrapper.classList.add('in-chat');
  }

  renderActiveChat() {
    const activeChat = this.chats.find(c => c.id === this.activeChatId);
    if (!activeChat) return;

    // Header elements
    const avatarEl = document.getElementById('chatActiveAvatar');
    const nameEl = document.getElementById('chatActiveName');
    const statusEl = document.getElementById('chatActiveStatus');
    const scrollArea = document.getElementById('chatMessagesScroll');

    if (avatarEl) avatarEl.src = activeChat.user.avatar;
    if (nameEl) nameEl.textContent = activeChat.user.name;
    if (statusEl) statusEl.textContent = activeChat.user.isOnline ? 'Active now' : 'Active 2h ago';

    if (scrollArea) {
      scrollArea.innerHTML = activeChat.messages.map(msg => `
        <div class="msg-bubble ${msg.sender === 'me' ? 'sent' : 'received'}">
          <div>${msg.text}</div>
          <div class="msg-time">${msg.time}</div>
        </div>
      `).join('');

      this.scrollToBottom();
    }
  }

  sendMessage(text) {
    if (!text || !text.trim()) return;
    const activeChat = this.chats.find(c => c.id === this.activeChatId);
    if (!activeChat) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = {
      id: 'm_' + Date.now(),
      sender: 'me',
      text: text.trim(),
      time: timeNow
    };

    activeChat.messages.push(newMsg);
    window.soundEngine.playMessageSent();
    this.renderActiveChat();
    this.renderConversationsList();

    // Trigger realistic automated reply
    this.simulateReply(activeChat, text);
  }

  simulateReply(chat, userPrompt) {
    const scrollArea = document.getElementById('chatMessagesScroll');
    if (!scrollArea) return;

    // Add typing bubble indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'msg-bubble received typing-dots';
    typingIndicator.id = 'chatTypingIndicator';
    typingIndicator.innerHTML = `<em>${chat.user.name.split(' ')[0]} is typing...</em>`;
    scrollArea.appendChild(typingIndicator);
    this.scrollToBottom();

    setTimeout(() => {
      typingIndicator.remove();

      let replyText = "That's awesome! Let me check that out right away ✨";
      const lower = userPrompt.toLowerCase();
      if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        replyText = `Hey there! Great to hear from you 😊 How is your creative work going?`;
      } else if (lower.includes('photo') || lower.includes('art') || lower.includes('design')) {
        replyText = `I love that design approach! Keep pushing the creative boundaries 🎨`;
      } else if (lower.includes('code') || lower.includes('ui') || lower.includes('css')) {
        replyText = `The UI looks super crisp and ultra smooth! 🚀`;
      }

      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      chat.messages.push({
        id: 'm_reply_' + Date.now(),
        sender: 'them',
        text: replyText,
        time: timeNow
      });

      window.soundEngine.playMessageReceived();
      this.renderActiveChat();
      this.renderConversationsList();
    }, 1200);
  }

  scrollToBottom() {
    const scrollArea = document.getElementById('chatMessagesScroll');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  bindEvents() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('btnChatSend');

    const handleSend = () => {
      if (chatInput && chatInput.value.trim()) {
        this.sendMessage(chatInput.value);
        chatInput.value = '';
      }
    };

    sendBtn?.addEventListener('click', handleSend);
    chatInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });

    // Mobile back button from chat
    document.getElementById('btnChatBackMobile')?.addEventListener('click', () => {
      document.querySelector('.messages-wrapper')?.classList.remove('in-chat');
    });
  }
}
