// Instagram Mock Data Store
const CURRENT_USER = {
  id: 'user_current',
  username: 'swara_creatives',
  name: 'Swaranjali ✨',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  bio: 'Visual Creator & UI/UX Designer 🎨\nBuilding aesthetic digital dreams 💫\n📍 Tokyo / San Francisco\n👇 Check my latest designs',
  website: 'https://swara-portfolio.design',
  postsCount: 24,
  followersCount: 14200,
  followingCount: 480,
  isVerified: true,
  highlights: [
    { id: 'h1', title: 'Travel ✈️', cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop&q=80' },
    { id: 'h2', title: 'Design 💡', cover: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=200&auto=format&fit=crop&q=80' },
    { id: 'h3', title: 'Life ☕', cover: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=200&auto=format&fit=crop&q=80' },
    { id: 'h4', title: 'Tech 💻', cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&auto=format&fit=crop&q=80' },
    { id: 'h5', title: 'Vibes 🎵', cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&auto=format&fit=crop&q=80' }
  ]
};

const INITIAL_STORIES = [
  {
    id: 's_my',
    userId: 'user_current',
    username: 'Your story',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    hasUnseen: false,
    isSelf: true,
    slides: [
      {
        id: 's_my_1',
        mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&auto=format&fit=crop&q=80',
        timestamp: '1h',
        caption: 'Morning paradise waves 🌊☀️'
      }
    ]
  },
  {
    id: 's1',
    userId: 'u_elena',
    username: 'elena_art',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    hasUnseen: true,
    slides: [
      {
        id: 's1_1',
        mediaUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1080&auto=format&fit=crop&q=80',
        timestamp: '2h',
        caption: 'Late night oil canvas painting in progress 🎨'
      },
      {
        id: 's1_2',
        mediaUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1080&auto=format&fit=crop&q=80',
        timestamp: '1h',
        caption: 'Studio details ✨ #artlife'
      }
    ]
  },
  {
    id: 's2',
    userId: 'u_marcus',
    username: 'marcus_lens',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    hasUnseen: true,
    slides: [
      {
        id: 's2_1',
        mediaUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1080&auto=format&fit=crop&q=80',
        timestamp: '3h',
        caption: 'Yosemite dawn reflection 🏔️'
      }
    ]
  },
  {
    id: 's3',
    userId: 'u_aurora',
    username: 'aurora.codes',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    hasUnseen: true,
    slides: [
      {
        id: 's3_1',
        mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1080&auto=format&fit=crop&q=80',
        timestamp: '4h',
        caption: 'Debugging with neon lights and lofi vibes 💻🌙'
      },
      {
        id: 's3_2',
        mediaUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1080&auto=format&fit=crop&q=80',
        timestamp: '2h',
        caption: 'New mechanical keyboard build complete ⌨️🤍'
      }
    ]
  },
  {
    id: 's4',
    userId: 'u_kyoto_vibes',
    username: 'kyoto_travel',
    avatar: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?w=200&auto=format&fit=crop&q=80',
    hasUnseen: true,
    slides: [
      {
        id: 's4_1',
        mediaUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1080&auto=format&fit=crop&q=80',
        timestamp: '5h',
        caption: 'Bamboo groves of Arashiyama in morning mist 🎋'
      }
    ]
  },
  {
    id: 's5',
    userId: 'u_sophia',
    username: 'sophia.gourmet',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    hasUnseen: true,
    slides: [
      {
        id: 's5_1',
        mediaUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1080&auto=format&fit=crop&q=80',
        timestamp: '6h',
        caption: 'Handcrafted artisan glazed donuts 🍩☕'
      }
    ]
  },
  {
    id: 's6',
    userId: 'u_david_arch',
    username: 'david_spaces',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    hasUnseen: true,
    slides: [
      {
        id: 's6_1',
        mediaUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080&auto=format&fit=crop&q=80',
        timestamp: '7h',
        caption: 'Minimalist concrete villa in Copenhagen 🏛️'
      }
    ]
  }
];

const INITIAL_POSTS = [
  {
    id: 'post_1',
    user: {
      id: 'u_elena',
      username: 'elena_art',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      isVerified: true,
      location: 'Florence, Italy'
    },
    mediaUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80',
    likesCount: 3842,
    isLiked: false,
    isSaved: false,
    caption: 'Finished this dreamy pastel series after 3 weeks of work! Which color palette speaks to you the most? 🎨✨ #art #contemporary #pastelvibes #gallery #artistsoninstagram',
    timestamp: '2 HOURS AGO',
    comments: [
      { id: 'c1', username: 'marcus_lens', text: 'The light composition in this is unreal! 🔥', isLiked: false, timestamp: '1h' },
      { id: 'c2', username: 'aurora.codes', text: 'Instantly saved for inspiration ✨', isLiked: true, timestamp: '45m' },
      { id: 'c3', username: 'swara_creatives', text: 'Absolutely gorgeous palette Elena! ❤️', isLiked: true, timestamp: '30m' }
    ]
  },
  {
    id: 'post_2',
    user: {
      id: 'u_kyoto_vibes',
      username: 'kyoto_travel',
      avatar: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?w=200&auto=format&fit=crop&q=80',
      isVerified: true,
      location: 'Kyoto, Japan'
    },
    mediaUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&auto=format&fit=crop&q=80',
    likesCount: 12480,
    isLiked: true,
    isSaved: true,
    caption: 'Golden hour falling gently through the historical temple gardens of Kyoto. There is a tranquil poetry here that resets your mind completely 🌸⛩️ #JapanTravel #KyotoMoments #Wanderlust',
    timestamp: '5 HOURS AGO',
    comments: [
      { id: 'c4', username: 'david_spaces', text: 'Architectural harmony with nature at its peak ⛩️', isLiked: true, timestamp: '3h' },
      { id: 'c5', username: 'sophia.gourmet', text: 'Adding this to my bucket list immediately!', isLiked: false, timestamp: '2h' }
    ]
  },
  {
    id: 'post_3',
    user: {
      id: 'u_aurora',
      username: 'aurora.codes',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      isVerified: false,
      location: 'San Francisco, CA'
    },
    mediaUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    likesCount: 6819,
    isLiked: false,
    isSaved: false,
    caption: 'Dark mode setup upgrade complete! 🔮 Cyberpunk glow + mechanical switches = peak developer flow state 🚀 What music do you listen to while coding? #devlife #setupwars #codingvibes #neon',
    timestamp: '8 HOURS AGO',
    comments: [
      { id: 'c6', username: 'swara_creatives', text: 'That ambient lighting is 10/10 🤩', isLiked: true, timestamp: '6h' },
      { id: 'c7', username: 'marcus_lens', text: 'Synthwave beats all day long 🎧', isLiked: false, timestamp: '4h' }
    ]
  },
  {
    id: 'post_4',
    user: {
      id: 'u_david_arch',
      username: 'david_spaces',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      isVerified: true,
      location: 'Copenhagen, Denmark'
    },
    mediaUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    likesCount: 9240,
    isLiked: false,
    isSaved: false,
    caption: 'Nordic minimalism meets warm organic elements. Floor to ceiling glass brings the forest right inside the living room 🌿 #InteriorDesign #Architecture #ScandinavianDesign',
    timestamp: '1 DAY AGO',
    comments: [
      { id: 'c8', username: 'elena_art', text: 'Such peaceful energy in this space 🕊️', isLiked: false, timestamp: '18h' }
    ]
  }
];

const EXPLORE_GRID_ITEMS = [
  { id: 'exp_1', mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80', likes: '18.2K', comments: '342', type: 'image', span: 'span-2' },
  { id: 'exp_2', mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80', likes: '8.4K', comments: '120', type: 'image' },
  { id: 'exp_3', mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80', likes: '22.1K', comments: '504', type: 'reel' },
  { id: 'exp_4', mediaUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80', likes: '14.9K', comments: '289', type: 'image' },
  { id: 'exp_5', mediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80', likes: '31.5K', comments: '810', type: 'reel' },
  { id: 'exp_6', mediaUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80', likes: '9.8K', comments: '194', type: 'image' },
  { id: 'exp_7', mediaUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=80', likes: '45.1K', comments: '1.2K', type: 'image', span: 'span-2' },
  { id: 'exp_8', mediaUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80', likes: '11.3K', comments: '230', type: 'image' },
  { id: 'exp_9', mediaUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80', likes: '16.7K', comments: '412', type: 'image' },
  { id: 'exp_10', mediaUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=80', likes: '28.9K', comments: '670', type: 'reel' },
  { id: 'exp_11', mediaUrl: 'https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=600&auto=format&fit=crop&q=80', likes: '7.2K', comments: '98', type: 'image' },
  { id: 'exp_12', mediaUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80', likes: '34.0K', comments: '890', type: 'image' }
];

const REELS_DATA = [
  {
    id: 'reel_1',
    user: {
      username: 'aurora.codes',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      isVerified: false
    },
    caption: 'Top 3 Chrome DevTools features you did not know existed! 💡⚡ Save for later #coding #webdev #tips #frontend',
    audioTitle: 'aurora.codes • Original Audio (Lofi Beat)',
    mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    gradientBg: 'linear-gradient(135deg, #1e0533, #110022)',
    likesCount: 54320,
    isLiked: false,
    commentsCount: 1420,
    sharesCount: 8900
  },
  {
    id: 'reel_2',
    user: {
      username: 'marcus_lens',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      isVerified: true
    },
    caption: 'Catching the sunrise above the cloud inversion at Mount Rainier 🏔️☁️ Pure magic #cinematic #travel #nature #outdoors',
    audioTitle: 'Hans Zimmer • Time (Ambient Remix)',
    mediaUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    gradientBg: 'linear-gradient(135deg, #09203f, #537895)',
    likesCount: 128900,
    isLiked: true,
    commentsCount: 3820,
    sharesCount: 24500
  },
  {
    id: 'reel_3',
    user: {
      username: 'sophia.gourmet',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
      isVerified: true
    },
    caption: 'Making fresh 72-hour sourdough croissants from scratch 🥐 Golden layers & buttery flakes! #baking #foodie #satisfying',
    audioTitle: 'sophia.gourmet • ASMR Kitchen Sounds',
    mediaUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
    gradientBg: 'linear-gradient(135deg, #3a1c00, #613002)',
    likesCount: 89300,
    isLiked: false,
    commentsCount: 2100,
    sharesCount: 17400
  }
];

const SUGGESTIONS_DATA = [
  {
    id: 'sug_1',
    username: 'design_nexus',
    name: 'UI/UX Inspiration Hub',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    subtitle: 'Followed by elena_art + 12 more',
    isFollowing: false
  },
  {
    id: 'sug_2',
    username: 'minimal_spaces',
    name: 'Minimal Architecture',
    avatar: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=100&auto=format&fit=crop&q=80',
    subtitle: 'Suggested for you',
    isFollowing: false
  },
  {
    id: 'sug_3',
    username: 'lofi_cafe',
    name: 'Chill Vibes & Beats',
    avatar: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100&auto=format&fit=crop&q=80',
    subtitle: 'New to Instagram',
    isFollowing: false
  },
  {
    id: 'sug_4',
    username: 'tokyo_drift',
    name: 'Tokyo Nightscapes',
    avatar: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=100&auto=format&fit=crop&q=80',
    subtitle: 'Followed by kyoto_travel',
    isFollowing: false
  }
];

const CHATS_DATA = [
  {
    id: 'chat_1',
    user: {
      username: 'elena_art',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      isOnline: true,
      isVerified: true
    },
    messages: [
      { id: 'm1', sender: 'them', text: 'Hey Swara! Loved your new UI project mockups 😍', time: '10:30 AM' },
      { id: 'm2', sender: 'me', text: 'Thank you so much Elena! How is your art gallery exhibition coming along?', time: '10:32 AM' },
      { id: 'm3', sender: 'them', text: 'Almost ready! Opening night is this Friday. You should definitely come! 🥂🎨', time: '10:35 AM' }
    ]
  },
  {
    id: 'chat_2',
    user: {
      username: 'aurora.codes',
      name: 'Aurora Lin',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      isOnline: true,
      isVerified: false
    },
    messages: [
      { id: 'm4', sender: 'them', text: 'Hey! Did you check out the new CSS color-mix and animation features?', time: 'Yesterday' },
      { id: 'm5', sender: 'me', text: 'Yes! Implementing them right now in our app! 🚀', time: 'Yesterday' }
    ]
  },
  {
    id: 'chat_3',
    user: {
      username: 'marcus_lens',
      name: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      isOnline: false,
      isVerified: true
    },
    messages: [
      { id: 'm6', sender: 'them', text: 'Sent you high-res raw photos from Yosemite trail 📷', time: '2d ago' },
      { id: 'm7', sender: 'me', text: 'Got them, they look breathtaking! 🙏', time: '2d ago' }
    ]
  }
];

const NOTIFICATIONS_DATA = [
  {
    id: 'notif_1',
    user: { username: 'elena_art', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
    text: 'liked your photo.',
    targetImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100&auto=format&fit=crop&q=80',
    time: '5m',
    type: 'like'
  },
  {
    id: 'notif_2',
    user: { username: 'aurora.codes', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' },
    text: 'commented: "That ambient lighting is 10/10 🤩"',
    targetImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=80',
    time: '42m',
    type: 'comment'
  },
  {
    id: 'notif_3',
    user: { username: 'design_nexus', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
    text: 'started following you.',
    time: '2h',
    type: 'follow',
    isFollowing: false
  },
  {
    id: 'notif_4',
    user: { username: 'kyoto_travel', avatar: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?w=100&auto=format&fit=crop&q=80' },
    text: 'mentioned you in a story: "Shoutout to @swara_creatives ✨"',
    time: '1d',
    type: 'mention'
  }
];

const PRESET_PHOTO_OPTIONS = [
  { name: 'Tokyo Neon', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&auto=format&fit=crop&q=80' },
  { name: 'Ocean Sunset', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80' },
  { name: 'Mountain Mist', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80' },
  { name: 'Cyberpunk Code', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80' },
  { name: 'Modern Architecture', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80' },
  { name: 'Coffee & Journal', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80' }
];

const PHOTO_FILTERS = [
  { id: 'normal', name: 'Normal', filter: 'none' },
  { id: 'clarendon', name: 'Clarendon', filter: 'contrast(1.2) saturate(1.25) brightness(1.05)' },
  { id: 'gingham', name: 'Gingham', filter: 'brightness(1.05) hue-rotate(-10deg) sepia(0.08)' },
  { id: 'juno', name: 'Juno', filter: 'contrast(1.15) saturate(1.4) hue-rotate(-5deg)' },
  { id: 'lark', name: 'Lark', filter: 'contrast(0.9) brightness(1.18) saturate(1.1)' },
  { id: 'ludwig', name: 'Ludwig', filter: 'contrast(1.05) brightness(1.05) saturate(0.85) sepia(0.1)' },
  { id: 'moon', name: 'Moon (B&W)', filter: 'grayscale(1) contrast(1.1) brightness(1.1)' },
  { id: 'valencia', name: 'Valencia', filter: 'sepia(0.25) contrast(1.08) brightness(1.08) saturate(1.15)' },
  { id: 'vintage', name: 'Vintage', filter: 'sepia(0.5) contrast(0.95) saturate(1.3) hue-rotate(-15deg)' }
];
