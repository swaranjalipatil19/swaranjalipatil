// Instagram Stories Engine & Viewer
class StoriesController {
  constructor() {
    this.stories = [...INITIAL_STORIES];
    this.currentStoryIndex = 0;
    this.currentSlideIndex = 0;
    this.progressInterval = null;
    this.slideDuration = 5000; // 5 seconds per slide
    this.elapsedTime = 0;
    this.isPaused = false;
    this.modal = document.getElementById('storyModal');
    this.init();
  }

  init() {
    this.renderStoriesTray();
    this.bindEvents();
  }

  renderStoriesTray() {
    const tray = document.getElementById('storiesTray');
    if (!tray) return;

    tray.innerHTML = this.stories.map((story, index) => {
      const isMyStory = story.isSelf;
      const seenClass = story.hasUnseen ? '' : 'seen';
      return `
        <div class="story-bubble" data-story-index="${index}">
          <div class="story-ring ${seenClass} ${isMyStory ? 'my-story' : ''}">
            <img class="story-avatar-img" src="${story.avatar}" alt="${story.username}" loading="lazy" />
          </div>
          <span class="story-username">${isMyStory ? 'Your story' : story.username}</span>
        </div>
      `;
    }).join('');

    // Attach click events
    tray.querySelectorAll('.story-bubble').forEach(bubble => {
      bubble.addEventListener('click', () => {
        const index = parseInt(bubble.dataset.storyIndex, 10);
        this.openStory(index);
      });
    });
  }

  openStory(storyIndex, slideIndex = 0) {
    this.currentStoryIndex = storyIndex;
    this.currentSlideIndex = slideIndex;
    this.isPaused = false;
    this.elapsedTime = 0;
    
    // Mark as seen
    this.stories[storyIndex].hasUnseen = false;
    this.renderStoriesTray();

    this.modal.classList.add('open');
    window.soundEngine.playStoryTick();
    this.renderCurrentSlide();
    this.startProgress();
  }

  closeStory() {
    clearInterval(this.progressInterval);
    this.modal.classList.remove('open');
  }

  renderCurrentSlide() {
    const story = this.stories[this.currentStoryIndex];
    if (!story) return this.closeStory();

    const slide = story.slides[this.currentSlideIndex];
    if (!slide) return this.nextStory();

    // Elements
    const avatarEl = document.getElementById('storyAuthorAvatar');
    const nameEl = document.getElementById('storyAuthorName');
    const timeEl = document.getElementById('storyTimestamp');
    const mediaEl = document.getElementById('storyMediaImg');
    const captionEl = document.getElementById('storyCaption');
    const progressContainer = document.getElementById('storyProgressContainer');

    avatarEl.src = story.avatar;
    nameEl.textContent = story.username;
    timeEl.textContent = slide.timestamp;
    mediaEl.src = slide.mediaUrl;

    if (slide.caption) {
      captionEl.textContent = slide.caption;
      captionEl.style.display = 'block';
    } else {
      captionEl.style.display = 'none';
    }

    // Render progress bars
    progressContainer.innerHTML = story.slides.map((_, i) => {
      let fillClass = '';
      let style = '';
      if (i < this.currentSlideIndex) {
        fillClass = 'completed';
        style = 'width: 100%;';
      }
      return `
        <div class="story-prog-bar">
          <div class="story-prog-fill ${fillClass}" id="storyProgFill_${i}" style="${style}"></div>
        </div>
      `;
    }).join('');
  }

  startProgress() {
    clearInterval(this.progressInterval);
    this.elapsedTime = 0;
    const stepTime = 50;

    this.progressInterval = setInterval(() => {
      if (this.isPaused) return;

      this.elapsedTime += stepTime;
      const percent = Math.min((this.elapsedTime / this.slideDuration) * 100, 100);
      const activeFill = document.getElementById(`storyProgFill_${this.currentSlideIndex}`);
      if (activeFill) {
        activeFill.style.width = `${percent}%`;
      }

      if (this.elapsedTime >= this.slideDuration) {
        this.nextSlide();
      }
    }, stepTime);
  }

  nextSlide() {
    const story = this.stories[this.currentStoryIndex];
    if (this.currentSlideIndex < story.slides.length - 1) {
      this.currentSlideIndex++;
      this.elapsedTime = 0;
      window.soundEngine.playStoryTick();
      this.renderCurrentSlide();
      this.startProgress();
    } else {
      this.nextStory();
    }
  }

  prevSlide() {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.elapsedTime = 0;
      window.soundEngine.playStoryTick();
      this.renderCurrentSlide();
      this.startProgress();
    } else if (this.currentStoryIndex > 0) {
      this.currentStoryIndex--;
      this.currentSlideIndex = this.stories[this.currentStoryIndex].slides.length - 1;
      this.elapsedTime = 0;
      window.soundEngine.playStoryTick();
      this.renderCurrentSlide();
      this.startProgress();
    }
  }

  nextStory() {
    if (this.currentStoryIndex < this.stories.length - 1) {
      this.currentStoryIndex++;
      this.currentSlideIndex = 0;
      this.elapsedTime = 0;
      window.soundEngine.playStoryTick();
      this.renderCurrentSlide();
      this.startProgress();
    } else {
      this.closeStory();
    }
  }

  sendReaction(emoji) {
    window.soundEngine.playHeartBurst();
    const container = document.querySelector('.story-viewer-dialog');
    const particle = document.createElement('div');
    particle.className = 'floating-emoji';
    particle.textContent = emoji;
    container.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1200);

    window.app.showToast(`Reacted with ${emoji} to ${this.stories[this.currentStoryIndex].username}'s story`);
  }

  bindEvents() {
    // Close story button
    document.getElementById('btnCloseStory')?.addEventListener('click', () => this.closeStory());

    // Touch/click navigation
    document.getElementById('storyTouchPrev')?.addEventListener('click', () => this.prevSlide());
    document.getElementById('storyTouchNext')?.addEventListener('click', () => this.nextSlide());

    // Pause on hold
    const viewerDialog = document.querySelector('.story-viewer-dialog');
    if (viewerDialog) {
      const pause = () => { this.isPaused = true; };
      const resume = () => { this.isPaused = false; };

      viewerDialog.addEventListener('mousedown', pause);
      viewerDialog.addEventListener('mouseup', resume);
      viewerDialog.addEventListener('touchstart', pause);
      viewerDialog.addEventListener('touchend', resume);
    }

    // Reaction emojis
    document.querySelectorAll('.story-reaction-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.sendReaction(btn.textContent.trim());
      });
    });

    // Story reply input
    const replyInput = document.getElementById('storyReplyInput');
    replyInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && replyInput.value.trim()) {
        window.soundEngine.playMessageSent();
        window.app.showToast(`Reply sent to ${this.stories[this.currentStoryIndex].username}: "${replyInput.value}"`);
        replyInput.value = '';
      }
    });

    // Keyboard navigation (Escape, Left, Right, Space)
    window.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('open')) return;
      if (e.key === 'Escape') this.closeStory();
      if (e.key === 'ArrowRight') this.nextSlide();
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === ' ') {
        e.preventDefault();
        this.isPaused = !this.isPaused;
      }
    });
  }
}
