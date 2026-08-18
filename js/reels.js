// Instagram Reels View Controller
class ReelsController {
  constructor() {
    this.reels = [...REELS_DATA];
    this.isMuted = false;
    this.init();
  }

  init() {
    this.renderReels();
  }

  renderReels() {
    const container = document.getElementById('reelsContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="reels-slider" id="reelsSlider">
        ${this.reels.map(reel => this.createReelCard(reel)).join('')}
      </div>
    `;

    this.bindEvents();
  }

  createReelCard(reel) {
    const likeIconSvg = reel.isLiked
      ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;

    return `
      <div class="reel-card" data-reel-id="${reel.id}">
        <div class="reel-video-wrapper" style="background: ${reel.gradientBg}">
          <img src="${reel.mediaUrl}" alt="Reel media" loading="lazy" />
          <div class="reel-gradient-overlay"></div>
          
          <button class="reel-sound-btn" data-action="toggle-sound">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </button>

          <div class="reel-bottom-content">
            <div class="reel-author-row">
              <img class="reel-author-avatar" src="${reel.user.avatar}" alt="${reel.user.username}" />
              <span class="reel-author-name">@${reel.user.username}</span>
              <button class="btn-reel-follow" data-action="follow">Follow</button>
            </div>
            <p class="reel-caption">${reel.caption}</p>
            <div class="reel-audio-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>${reel.audioTitle}</span>
            </div>
          </div>

          <div class="reel-side-actions">
            <div class="reel-action-unit">
              <button class="${reel.isLiked ? 'liked' : ''}" data-action="like-reel">
                ${likeIconSvg}
              </button>
              <span class="reel-likes-num">${reel.likesCount.toLocaleString()}</span>
            </div>

            <div class="reel-action-unit" data-action="comment-reel">
              <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </button>
              <span>${reel.commentsCount.toLocaleString()}</span>
            </div>

            <div class="reel-action-unit" data-action="share-reel">
              <button>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
              <span>${reel.sharesCount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const slider = document.getElementById('reelsSlider');
    if (!slider) return;

    slider.addEventListener('click', (e) => {
      const card = e.target.closest('.reel-card');
      if (!card) return;
      const reelId = card.dataset.reelId;
      const reel = this.reels.find(r => r.id === reelId);
      if (!reel) return;

      // Like reel button
      const likeBtn = e.target.closest('[data-action="like-reel"]');
      if (likeBtn) {
        reel.isLiked = !reel.isLiked;
        reel.likesCount += reel.isLiked ? 1 : -1;
        window.soundEngine.playHeartBurst();
        this.renderReels();
        return;
      }

      // Follow button
      const followBtn = e.target.closest('[data-action="follow"]');
      if (followBtn) {
        const isFollowed = followBtn.textContent === 'Following';
        followBtn.textContent = isFollowed ? 'Follow' : 'Following';
        followBtn.style.background = isFollowed ? 'rgba(255, 255, 255, 0.2)' : '#ffffff';
        followBtn.style.color = isFollowed ? 'white' : 'black';
        window.app.showToast(`${isFollowed ? 'Unfollowed' : 'Now following'} @${reel.user.username}`);
        return;
      }

      // Share button
      const shareBtn = e.target.closest('[data-action="share-reel"]');
      if (shareBtn) {
        window.app.showToast('Reel link copied to clipboard! 📋');
        return;
      }

      // Sound button
      const soundBtn = e.target.closest('[data-action="toggle-sound"]');
      if (soundBtn) {
        const isMuted = window.soundEngine.toggleMute();
        window.app.showToast(isMuted ? 'Sound muted 🔇' : 'Sound unmuted 🔊');
        return;
      }
    });
  }
}
