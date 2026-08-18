// ==========================================================================
// MAIN INSTAGRAM APPLICATION CONTROLLER
// ==========================================================================

class InstagramApp {
  constructor() {
    this.posts = [...INITIAL_POSTS];
    this.suggestions = [...SUGGESTIONS_DATA];
    this.notifications = [...NOTIFICATIONS_DATA];
    this.exploreItems = [...EXPLORE_GRID_ITEMS];
    this.currentTab = 'home';
    this.profileTab = 'posts';
    this.theme = localStorage.getItem('ig_theme') || 'dark';

    this.init();
  }

  init() {
    this.applyTheme(this.theme);
    this.renderAll();
    this.bindNavigation();
    this.bindSearchDrawer();
    this.bindNotificationsDrawer();
    this.bindEditProfileModal();
    this.bindThemeToggle();

    // Initialize sub-controllers
    this.storiesCtrl = new StoriesController();
    this.reelsCtrl = new ReelsController();
    this.chatCtrl = new ChatController();
    this.createPostCtrl = new CreatePostController();
  }

  applyTheme(theme) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ig_theme', theme);

    const themeLabel = document.getElementById('themeToggleLabel');
    if (themeLabel) {
      themeLabel.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
  }

  toggleTheme() {
    const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
    this.showToast(`Switched to ${nextTheme.toUpperCase()} mode`);
    window.soundEngine.playPop();
  }

  renderAll() {
    this.renderFeed();
    this.renderSuggestions();
    this.renderExplore();
    this.renderProfile();
    this.renderNotifications();
  }

  // ------------------------------------------------------------------------
  // NAVIGATION & ROUTING
  // ------------------------------------------------------------------------
  navigateTo(tabName) {
    this.currentTab = tabName;
    window.soundEngine.playPop();

    // Close drawers if open
    this.closeDrawers();

    // Update active class on nav items
    document.querySelectorAll('.nav-item').forEach(item => {
      const tab = item.dataset.tab;
      if (tab === tabName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update bottom nav mobile items
    document.querySelectorAll('.mobile-bottom-nav .nav-item').forEach(item => {
      if (item.dataset.tab === tabName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Switch view sections
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const targetSection = document.getElementById(`view_${tabName}`);
    if (targetSection) {
      targetSection.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (tabName === 'reels') {
      this.reelsCtrl.renderReels();
    } else if (tabName === 'messages') {
      this.chatCtrl.renderActiveChat();
    } else if (tabName === 'profile') {
      this.renderProfile();
    }
  }

  closeDrawers() {
    document.getElementById('searchDrawer')?.classList.remove('open');
    document.getElementById('notificationsDrawer')?.classList.remove('open');
    document.querySelector('.sidebar')?.classList.remove('sidebar-collapsed');
  }

  toggleSearchDrawer() {
    const drawer = document.getElementById('searchDrawer');
    const notifDrawer = document.getElementById('notificationsDrawer');
    const sidebar = document.querySelector('.sidebar');

    notifDrawer?.classList.remove('open');
    const isOpen = drawer?.classList.toggle('open');
    if (isOpen) {
      sidebar?.classList.add('sidebar-collapsed');
      document.getElementById('searchDrawerInput')?.focus();
    } else {
      sidebar?.classList.remove('sidebar-collapsed');
    }
    window.soundEngine.playPop();
  }

  toggleNotificationsDrawer() {
    const drawer = document.getElementById('notificationsDrawer');
    const searchDrawer = document.getElementById('searchDrawer');
    const sidebar = document.querySelector('.sidebar');

    searchDrawer?.classList.remove('open');
    const isOpen = drawer?.classList.toggle('open');
    if (isOpen) {
      sidebar?.classList.add('sidebar-collapsed');
    } else {
      sidebar?.classList.remove('sidebar-collapsed');
    }
    window.soundEngine.playPop();
  }

  // ------------------------------------------------------------------------
  // FEED RENDERING & POST INTERACTIONS
  // ------------------------------------------------------------------------
  renderFeed() {
    const feedContainer = document.getElementById('feedPostsList');
    if (!feedContainer) return;

    feedContainer.innerHTML = this.posts.map(post => this.createPostHTML(post)).join('');
    this.bindPostInteractions();
  }

  createPostHTML(post) {
    const isLiked = post.isLiked;
    const isSaved = post.isSaved;
    const heartSvg = isLiked
      ? `<svg viewBox="0 0 24 24" width="24" height="24" fill="#ff3040"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
      : `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

    const saveSvg = isSaved
      ? `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`
      : `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;

    const filterStyle = post.filter ? `filter: ${post.filter};` : '';

    return `
      <article class="feed-post" data-post-id="${post.id}">
        <!-- Post Header -->
        <div class="post-header">
          <div class="post-user-meta">
            <div class="post-user-avatar">
              <img src="${post.user.avatar}" alt="${post.user.username}" loading="lazy" />
            </div>
            <div class="post-user-text">
              <div class="post-user-name-row">
                <span class="post-username">${post.user.username}</span>
                ${post.user.isVerified ? '<span class="badge-verified"><svg width="14" height="14" viewBox="0 0 24 24" fill="#0095f6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></span>' : ''}
                <span class="post-dot-sep">•</span>
                <span class="post-time-ago">${post.timestamp}</span>
              </div>
              ${post.user.location ? `<span class="post-location">${post.user.location}</span>` : ''}
            </div>
          </div>
          <button class="btn-post-options" aria-label="More options">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>

        <!-- Post Media -->
        <div class="post-media-box">
          <img src="${post.mediaUrl}" style="${filterStyle}" alt="Post photo" loading="lazy" />
          <div class="heart-burst-overlay">
            <svg viewBox="0 0 24 24" width="90" height="90" fill="#ff3040"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
        </div>

        <!-- Action Bar -->
        <div class="post-actions-bar">
          <div class="post-actions-left">
            <button class="action-btn ${isLiked ? 'liked' : ''}" data-action="like-post" title="Like">
              ${heartSvg}
            </button>
            <button class="action-btn" data-action="focus-comment" title="Comment">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </button>
            <button class="action-btn" data-action="share-post" title="Share">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
          <button class="action-btn ${isSaved ? 'saved' : ''}" data-action="save-post" title="Save">
            ${saveSvg}
          </button>
        </div>

        <!-- Details & Captions -->
        <div class="post-details">
          <div class="likes-count-text">${post.likesCount.toLocaleString()} likes</div>
          <div class="post-caption-box">
            <span class="caption-username">${post.user.username}</span>
            <span>${this.formatCaptionText(post.caption)}</span>
          </div>

          ${post.comments.length > 2 ? `<div class="btn-view-comments" data-action="view-all-comments">View all ${post.comments.length} comments</div>` : ''}

          <div class="post-comments-preview">
            ${post.comments.slice(-2).map(c => `
              <div class="comment-row" data-comment-id="${c.id}">
                <div class="comment-row-text">
                  <span class="c-user">${c.username}</span>
                  <span>${c.text}</span>
                </div>
                <button class="btn-like-comment ${c.isLiked ? 'liked' : ''}" data-action="like-comment">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="${c.isLiked ? '#ff3040' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Add Comment Input -->
        <div class="post-add-comment">
          <button class="btn-emoji-picker-toggle" data-action="toggle-emoji-picker" title="Emoji">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </button>
          <input type="text" class="comment-input-field" placeholder="Add a comment..." />
          <button class="btn-submit-comment" data-action="submit-comment">Post</button>
        </div>
      </article>
    `;
  }

  formatCaptionText(caption) {
    if (!caption) return '';
    // Format hashtags into clickable spans
    return caption.replace(/(#\w+)/g, '<span class="hashtag">$1</span>');
  }

  bindPostInteractions() {
    const feed = document.getElementById('feedPostsList');
    if (!feed) return;

    // Remove prior listeners by cloning or direct delegation
    feed.onclick = (e) => {
      const postCard = e.target.closest('.feed-post');
      if (!postCard) return;
      const postId = postCard.dataset.postId;
      const post = this.posts.find(p => p.id === postId);
      if (!post) return;

      // Like Post button
      const likeBtn = e.target.closest('[data-action="like-post"]');
      if (likeBtn) {
        this.toggleLikePost(post, postCard);
        return;
      }

      // Save Post button
      const saveBtn = e.target.closest('[data-action="save-post"]');
      if (saveBtn) {
        post.isSaved = !post.isSaved;
        window.soundEngine.playPop();
        this.showToast(post.isSaved ? 'Saved to collection 🔖' : 'Removed from collection');
        this.renderFeed();
        return;
      }

      // Share button
      const shareBtn = e.target.closest('[data-action="share-post"]');
      if (shareBtn) {
        this.showToast('Post link copied to clipboard! 📋');
        return;
      }

      // Focus Comment
      const commentBtn = e.target.closest('[data-action="focus-comment"]');
      if (commentBtn) {
        const input = postCard.querySelector('.comment-input-field');
        input?.focus();
        return;
      }

      // Like comment
      const likeCommentBtn = e.target.closest('[data-action="like-comment"]');
      if (likeCommentBtn) {
        const commentRow = e.target.closest('.comment-row');
        const cId = commentRow?.dataset.commentId;
        const comment = post.comments.find(c => c.id === cId);
        if (comment) {
          comment.isLiked = !comment.isLiked;
          window.soundEngine.playPop();
          this.renderFeed();
        }
        return;
      }

      // Submit Comment
      const submitCommentBtn = e.target.closest('[data-action="submit-comment"]');
      if (submitCommentBtn) {
        this.submitComment(post, postCard);
        return;
      }

      // Emoji picker toggle
      const emojiToggle = e.target.closest('[data-action="toggle-emoji-picker"]');
      if (emojiToggle) {
        const input = postCard.querySelector('.comment-input-field');
        if (input) {
          const quickEmojis = ['❤️', '🔥', '✨', '👏', '😍', '🙌'];
          const randomEmoji = quickEmojis[Math.floor(Math.random() * quickEmojis.length)];
          input.value += randomEmoji;
          input.dispatchEvent(new Event('input'));
          input.focus();
        }
        return;
      }
    };

    // Double tap on media
    feed.querySelectorAll('.post-media-box').forEach(mediaBox => {
      let lastTap = 0;
      mediaBox.addEventListener('click', (e) => {
        const now = Date.now();
        if (now - lastTap < 300) {
          // Double tap detected!
          const postCard = mediaBox.closest('.feed-post');
          const postId = postCard?.dataset.postId;
          const post = this.posts.find(p => p.id === postId);
          if (post) {
            this.triggerHeartBurst(mediaBox);
            if (!post.isLiked) {
              this.toggleLikePost(post, postCard);
            } else {
              window.soundEngine.playHeartBurst();
            }
          }
        }
        lastTap = now;
      });
    });

    // Enable/disable Post button on input
    feed.querySelectorAll('.comment-input-field').forEach(input => {
      const postCard = input.closest('.feed-post');
      const submitBtn = postCard.querySelector('.btn-submit-comment');

      input.addEventListener('input', () => {
        if (input.value.trim().length > 0) {
          submitBtn.classList.add('active');
        } else {
          submitBtn.classList.remove('active');
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const postId = postCard.dataset.postId;
          const post = this.posts.find(p => p.id === postId);
          if (post) this.submitComment(post, postCard);
        }
      });
    });
  }

  toggleLikePost(post, postCard) {
    post.isLiked = !post.isLiked;
    post.likesCount += post.isLiked ? 1 : -1;

    if (post.isLiked) {
      window.soundEngine.playHeartBurst();
    } else {
      window.soundEngine.playPop();
    }

    this.renderFeed();
  }

  triggerHeartBurst(mediaBox) {
    const heartOverlay = mediaBox.querySelector('.heart-burst-overlay');
    if (heartOverlay) {
      heartOverlay.classList.remove('burst');
      // Trigger reflow
      void heartOverlay.offsetWidth;
      heartOverlay.classList.add('burst');
      window.soundEngine.playHeartBurst();
    }
  }

  submitComment(post, postCard) {
    const input = postCard.querySelector('.comment-input-field');
    if (!input || !input.value.trim()) return;

    post.comments.push({
      id: 'c_' + Date.now(),
      username: CURRENT_USER.username,
      text: input.value.trim(),
      isLiked: false,
      timestamp: 'Just now'
    });

    window.soundEngine.playPop();
    this.showToast('Comment posted! 💬');
    this.renderFeed();
  }

  // ------------------------------------------------------------------------
  // SUGGESTIONS & EXPLORE & NOTIFICATIONS
  // ------------------------------------------------------------------------
  renderSuggestions() {
    const container = document.getElementById('suggestionsList');
    if (!container) return;

    container.innerHTML = this.suggestions.map(s => `
      <div class="suggestion-item" data-suggestion-id="${s.id}">
        <img class="suggestion-avatar" src="${s.avatar}" alt="${s.username}" />
        <div class="suggestion-info">
          <span class="username">${s.username}</span>
          <span class="subtitle">${s.subtitle}</span>
        </div>
        <button class="btn-follow-toggle ${s.isFollowing ? 'following' : ''}">
          ${s.isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    `).join('');

    container.querySelectorAll('.btn-follow-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.suggestion-item');
        const id = item.dataset.suggestionId;
        const suggestion = this.suggestions.find(s => s.id === id);
        if (suggestion) {
          suggestion.isFollowing = !suggestion.isFollowing;
          btn.textContent = suggestion.isFollowing ? 'Following' : 'Follow';
          btn.classList.toggle('following', suggestion.isFollowing);
          window.soundEngine.playPop();
          this.showToast(suggestion.isFollowing ? `Followed @${suggestion.username}` : `Unfollowed @${suggestion.username}`);
        }
      });
    });
  }

  renderExplore() {
    const grid = document.getElementById('exploreGrid');
    if (!grid) return;

    grid.innerHTML = this.exploreItems.map(item => `
      <div class="explore-item ${item.span || ''}" data-explore-id="${item.id}">
        <img src="${item.mediaUrl}" alt="Explore visual" loading="lazy" />
        ${item.type === 'reel' ? `
          <div class="explore-item-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
          </div>
        ` : ''}
        <div class="explore-overlay">
          <div class="explore-stat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span>${item.likes}</span>
          </div>
          <div class="explore-stat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            <span>${item.comments}</span>
          </div>
        </div>
      </div>
    `).join('');

    grid.querySelectorAll('.explore-item').forEach(item => {
      item.addEventListener('click', () => {
        window.soundEngine.playPop();
        this.showToast('Opening explore post...');
      });
    });
  }

  renderProfile() {
    const usernameEl = document.getElementById('profileUsername');
    const fullnameEl = document.getElementById('profileFullName');
    const bioEl = document.getElementById('profileBio');
    const websiteEl = document.getElementById('profileWebsite');
    const avatarEl = document.getElementById('profileAvatarImg');
    const postsCountEl = document.getElementById('profilePostsCount');
    const followersCountEl = document.getElementById('profileFollowersCount');
    const followingCountEl = document.getElementById('profileFollowingCount');

    if (usernameEl) usernameEl.textContent = CURRENT_USER.username;
    if (fullnameEl) fullnameEl.textContent = CURRENT_USER.name;
    if (bioEl) bioEl.textContent = CURRENT_USER.bio;
    if (websiteEl) {
      websiteEl.textContent = CURRENT_USER.website.replace('https://', '');
      websiteEl.href = CURRENT_USER.website;
    }
    if (avatarEl) avatarEl.src = CURRENT_USER.avatar;
    if (postsCountEl) postsCountEl.textContent = this.posts.length;
    if (followersCountEl) followersCountEl.textContent = CURRENT_USER.followersCount.toLocaleString();
    if (followingCountEl) followingCountEl.textContent = CURRENT_USER.followingCount.toLocaleString();

    // Render Highlights
    const highlightsContainer = document.getElementById('profileHighlights');
    if (highlightsContainer) {
      highlightsContainer.innerHTML = CURRENT_USER.highlights.map(h => `
        <div class="highlight-bubble">
          <div class="highlight-ring">
            <img src="${h.cover}" alt="${h.title}" />
          </div>
          <span class="highlight-title">${h.title}</span>
        </div>
      `).join('');
    }

    // Render Profile Grid
    this.renderProfileGrid();
  }

  renderProfileGrid() {
    const grid = document.getElementById('profilePostsGrid');
    if (!grid) return;

    let itemsToDisplay = [];
    if (this.profileTab === 'posts') {
      itemsToDisplay = this.posts;
    } else if (this.profileTab === 'saved') {
      itemsToDisplay = this.posts.filter(p => p.isSaved);
    } else {
      itemsToDisplay = this.posts.slice(0, 2);
    }

    if (itemsToDisplay.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: span 3; text-align: center; padding: 40px; color: var(--text-muted);">
          <h3>No posts saved yet</h3>
          <p>When you save photos and reels, they will appear here.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = itemsToDisplay.map(post => `
      <div class="profile-post-card" data-post-id="${post.id}">
        <img src="${post.mediaUrl}" style="${post.filter ? `filter: ${post.filter};` : ''}" alt="Profile post" />
        <div class="explore-overlay">
          <div class="explore-stat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span>${post.likesCount}</span>
          </div>
          <div class="explore-stat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            <span>${post.comments.length}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderNotifications() {
    const list = document.getElementById('notifList');
    if (!list) return;

    list.innerHTML = this.notifications.map(n => `
      <div class="notif-item">
        <img class="notif-avatar" src="${n.user.avatar}" alt="${n.user.username}" />
        <div class="notif-text">
          <strong>${n.user.username}</strong> ${n.text}
          <span class="time">${n.time}</span>
        </div>
        ${n.targetImage ? `<img class="notif-thumb" src="${n.targetImage}" alt="Thumb" />` : ''}
        ${n.type === 'follow' ? `<button class="btn-profile-action primary" style="padding: 4px 10px; font-size: 11px;">Follow Back</button>` : ''}
      </div>
    `).join('');
  }

  // ------------------------------------------------------------------------
  // EVENT BINDINGS
  // ------------------------------------------------------------------------
  bindNavigation() {
    // Desktop Nav Items
    document.querySelectorAll('.sidebar .nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.dataset.tab;
        if (tab === 'search') {
          this.toggleSearchDrawer();
        } else if (tab === 'notifications') {
          this.toggleNotificationsDrawer();
        } else if (tab === 'create') {
          this.createPostCtrl.open();
        } else if (tab) {
          this.navigateTo(tab);
        }
      });
    });

    // Mobile Bottom Nav Items
    document.querySelectorAll('.mobile-bottom-nav .nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.dataset.tab;
        if (tab === 'create') {
          this.createPostCtrl.open();
        } else if (tab) {
          this.navigateTo(tab);
        }
      });
    });

    // Profile Tabs
    document.querySelectorAll('.profile-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.profile-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.profileTab = btn.dataset.ptab;
        window.soundEngine.playPop();
        this.renderProfileGrid();
      });
    });

    // Edit Profile Modal Open
    document.getElementById('btnEditProfile')?.addEventListener('click', () => {
      document.getElementById('editProfileModal')?.classList.add('open');
      window.soundEngine.playPop();
    });

    // Share Profile button
    document.getElementById('btnShareProfile')?.addEventListener('click', () => {
      this.showToast('Profile link copied to clipboard! 📋');
    });
  }

  bindSearchDrawer() {
    const searchInput = document.getElementById('searchDrawerInput');
    const searchResults = document.getElementById('searchResults');

    searchInput?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        searchResults.innerHTML = '<div style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px;">Recent searches will appear here</div>';
        return;
      }

      // Filter users and tags
      const matchedPosts = this.posts.filter(p => p.user.username.toLowerCase().includes(q) || p.caption.toLowerCase().includes(q));
      searchResults.innerHTML = `
        <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">Results for "${q}"</div>
        ${matchedPosts.map(p => `
          <div class="notif-item">
            <img class="notif-avatar" src="${p.user.avatar}" />
            <div class="notif-text">
              <strong>${p.user.username}</strong>
              <div style="color: var(--text-muted); font-size: 12px;">${p.user.location || 'Instagram Creator'}</div>
            </div>
          </div>
        `).join('')}
      `;
    });
  }

  bindNotificationsDrawer() {
    // Drawer interaction helpers
  }

  bindEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    const closeBtn = document.getElementById('btnCloseEditProfile');
    const saveBtn = document.getElementById('btnSaveProfile');

    closeBtn?.addEventListener('click', () => modal?.classList.remove('open'));

    saveBtn?.addEventListener('click', () => {
      const name = document.getElementById('editNameInput')?.value;
      const username = document.getElementById('editUsernameInput')?.value;
      const bio = document.getElementById('editBioInput')?.value;
      const website = document.getElementById('editWebsiteInput')?.value;

      if (name) CURRENT_USER.name = name;
      if (username) CURRENT_USER.username = username;
      if (bio) CURRENT_USER.bio = bio;
      if (website) CURRENT_USER.website = website;

      modal?.classList.remove('open');
      window.soundEngine.playDing();
      this.showToast('Profile updated successfully! ✨');
      this.renderProfile();
    });
  }

  bindThemeToggle() {
    document.getElementById('btnThemeToggle')?.addEventListener('click', () => this.toggleTheme());
  }

  showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}

// Start Application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new InstagramApp();
});
