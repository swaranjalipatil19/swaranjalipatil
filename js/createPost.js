// Instagram Create Post Studio Controller
class CreatePostController {
  constructor() {
    this.selectedImageUrl = PRESET_PHOTO_OPTIONS[0].url;
    this.activeFilter = 'none';
    this.modal = document.getElementById('createPostModal');
    this.init();
  }

  init() {
    this.renderPresets();
    this.renderFilters();
    this.bindEvents();
  }

  open() {
    this.modal.classList.add('open');
    this.updatePreview();
  }

  close() {
    this.modal.classList.remove('open');
    // Reset form
    const captionEl = document.getElementById('createCaptionInput');
    const locationEl = document.getElementById('createLocationInput');
    if (captionEl) captionEl.value = '';
    if (locationEl) locationEl.value = '';
    this.activeFilter = 'none';
    this.updatePreview();
  }

  renderPresets() {
    const presetContainer = document.getElementById('presetChipsContainer');
    if (!presetContainer) return;

    presetContainer.innerHTML = PRESET_PHOTO_OPTIONS.map((preset, idx) => `
      <button class="preset-chip ${idx === 0 ? 'active' : ''}" data-url="${preset.url}">
        ${preset.name}
      </button>
    `).join('');

    presetContainer.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        presetContainer.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.selectedImageUrl = chip.dataset.url;
        this.updatePreview();
        this.renderFilters(); // Re-render filter thumbnails with new photo
      });
    });
  }

  renderFilters() {
    const container = document.getElementById('filtersCarousel');
    if (!container) return;

    container.innerHTML = PHOTO_FILTERS.map(f => `
      <div class="filter-thumb-card ${f.filter === this.activeFilter ? 'active' : ''}" data-filter="${f.filter}">
        <div class="filter-thumb-img-box">
          <img src="${this.selectedImageUrl}" style="filter: ${f.filter}" alt="${f.name}" />
        </div>
        <span class="filter-name">${f.name}</span>
      </div>
    `).join('');

    container.querySelectorAll('.filter-thumb-card').forEach(card => {
      card.addEventListener('click', () => {
        container.querySelectorAll('.filter-thumb-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.activeFilter = card.dataset.filter;
        this.updatePreview();
        window.soundEngine.playPop();
      });
    });
  }

  updatePreview() {
    const previewImg = document.getElementById('createPreviewImg');
    if (previewImg) {
      previewImg.src = this.selectedImageUrl;
      previewImg.style.filter = this.activeFilter;
    }
  }

  handleFileUpload(file) {
    if (!file || !file.type.startsWith('image/')) {
      window.app.showToast('Please select a valid image file 🖼️');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.selectedImageUrl = e.target.result;
      this.updatePreview();
      this.renderFilters();
      window.app.showToast('Photo uploaded successfully! 📸');
    };
    reader.readAsDataURL(file);
  }

  publishPost() {
    const captionEl = document.getElementById('createCaptionInput');
    const locationEl = document.getElementById('createLocationInput');
    const caption = captionEl ? captionEl.value.trim() : '';
    const location = locationEl ? locationEl.value.trim() : 'San Francisco, CA';

    if (!this.selectedImageUrl) {
      window.app.showToast('Please select or upload a photo first!');
      return;
    }

    const newPost = {
      id: 'post_custom_' + Date.now(),
      user: {
        id: CURRENT_USER.id,
        username: CURRENT_USER.username,
        avatar: CURRENT_USER.avatar,
        isVerified: CURRENT_USER.isVerified,
        location: location || 'Tokyo, Japan'
      },
      mediaUrl: this.selectedImageUrl,
      filter: this.activeFilter,
      likesCount: 1,
      isLiked: true,
      isSaved: false,
      caption: caption || 'New capture ✨ #vibes #photography #aesthetic',
      timestamp: 'JUST NOW',
      comments: []
    };

    // Prepend to posts list
    window.app.posts.unshift(newPost);
    CURRENT_USER.postsCount += 1;

    // Play ding sound
    window.soundEngine.playDing();
    window.app.showToast('Your post was shared successfully! 🎉');

    // Update UI & Navigate to Home Feed
    this.close();
    window.app.renderFeed();
    window.app.renderProfile();
    window.app.navigateTo('home');
  }

  bindEvents() {
    // Close modal
    document.getElementById('btnCloseCreatePost')?.addEventListener('click', () => this.close());

    // Share button
    document.getElementById('btnSharePost')?.addEventListener('click', () => this.publishPost());

    // File input trigger
    const fileInput = document.getElementById('createFileInput');
    const chooseBtn = document.getElementById('btnTriggerUpload');

    chooseBtn?.addEventListener('click', () => fileInput?.click());
    fileInput?.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        this.handleFileUpload(e.target.files[0]);
      }
    });

    // Drag & Drop
    const dropArea = document.getElementById('createPreviewArea');
    if (dropArea) {
      dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.style.opacity = '0.8';
      });
      dropArea.addEventListener('dragleave', () => {
        dropArea.style.opacity = '1';
      });
      dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.style.opacity = '1';
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.handleFileUpload(e.dataTransfer.files[0]);
        }
      });
    }
  }
}
