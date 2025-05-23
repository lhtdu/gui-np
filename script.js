// Default password
let password = "np";

// Flag to determine if viewing in shared mode
let isSharedMode = false;

// Global element references
const elements = {};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    cacheElements();
    
    // Check if we're in shared view mode
    checkSharedMode();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load saved data
    loadSavedData();
    
    // Calculate days counter
    calculateDays();
    
    // Initialize letter preview
    updateLetterPreview();
    
    // Simulate loading for 1.5 seconds
    setTimeout(hideLoadingScreen, 1500);
});

// Cache DOM elements
function cacheElements() {
    // Main screens
    elements.loadingScreen = document.getElementById('loadingScreen');
    elements.passwordScreen = document.getElementById('passwordScreen');
    elements.mainContent = document.getElementById('mainContent');
    
    // Password screen elements
    elements.passwordInput = document.getElementById('passwordInput');
    elements.submitPassword = document.getElementById('submitPassword');
    
    // Tab navigation
    elements.tabsContainer = document.getElementById('tabsContainer');
    elements.tabButtons = document.querySelectorAll('.tab-btn');
    elements.tabContents = document.querySelectorAll('.tab-content');
    
    // Shared view elements
    elements.sharedTitle = document.getElementById('sharedTitle');
    elements.returnToEditContainer = document.getElementById('returnToEditContainer');
    elements.returnToEditBtn = document.getElementById('returnToEditBtn');
    
    // Letter elements
    elements.letterTitle = document.getElementById('letterTitle');
    elements.letterDisplay = document.getElementById('letterDisplay');
    elements.letterEditor = document.getElementById('letterEditor');
    elements.letterViewMode = document.querySelector('.letter-view-mode');
    elements.letterEditMode = document.querySelector('.letter-edit-mode');
    elements.switchToEditMode = document.getElementById('switchToEditMode');
    elements.cancelEdit = document.getElementById('cancelEdit');
    elements.saveLetter = document.getElementById('saveLetter');
    elements.fontSelector = document.getElementById('fontSelector');
    elements.colorPicker = document.getElementById('colorPicker');
    elements.effectBtns = document.querySelectorAll('.effect-btn');
    
    // Days counter
    elements.daysCount = document.getElementById('daysCount');
    
    // Settings elements
    elements.anniversaryDate = document.getElementById('anniversaryDate');
    elements.newPassword = document.getElementById('newPassword');
    elements.savePassword = document.getElementById('savePassword');
    elements.toggleHearts = document.getElementById('toggleHearts');
    elements.toggleSnow = document.getElementById('toggleSnow');
    elements.toggleFireworks = document.getElementById('toggleFireworks');
    
    // Animation containers
    elements.heartsContainer = document.getElementById('heartsContainer');
    elements.snowContainer = document.getElementById('snowContainer');
    elements.fireworksContainer = document.getElementById('fireworksContainer');
    
    // Music control
    elements.musicControl = document.getElementById('musicControl');
    elements.bgMusic = document.getElementById('bgMusic');
    
    // Notification
    elements.notification = document.getElementById('notification');
    elements.notificationText = document.getElementById('notificationText');
    
    // Memory elements
    elements.addMemory = document.getElementById('addMemory');
    elements.memoryModal = document.getElementById('memoryModal');
    elements.closeMemoryModal = document.getElementById('closeMemoryModal');
    elements.memoryForm = document.getElementById('memoryForm');
    elements.memoryDate = document.getElementById('memoryDate');
    elements.memoryText = document.getElementById('memoryText');
    elements.timelineContainer = document.getElementById('timelineContainer');
    
    // Image elements
    elements.addImage = document.getElementById('addImage');
    elements.imageModal = document.getElementById('imageModal');
    elements.closeImageModal = document.getElementById('closeImageModal');
    elements.imageForm = document.getElementById('imageForm');
    elements.imageUrl = document.getElementById('imageUrl');
    elements.imageCaption = document.getElementById('imageCaption');
    
    // Share elements
    elements.qrCode = document.getElementById('qrCode');
    elements.shareLink = document.getElementById('shareLink');
    elements.copyLinkBtn = document.getElementById('copyLinkBtn');
    elements.requirePassword = document.getElementById('requirePassword');
}

// Check if we're in shared mode
function checkSharedMode() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if there's a share parameter
    if (urlParams.get('share')) {
        isSharedMode = true;
        document.body.classList.add('shared-mode');
        
        // Check if password protection is enabled
        const isProtected = urlParams.get('protected') === '1';
        
        // If it's not password protected, skip the password screen
        if (!isProtected) {
            elements.passwordScreen.style.display = 'none';
            showMainContent();
        }
    }
}

// Set up event listeners
function setupEventListeners() {
    // Password submit
    elements.submitPassword.addEventListener('click', checkPassword);
    elements.passwordInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    // Tab switching
    elements.tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });
    
    // Letter editing
    if (elements.switchToEditMode) {
        elements.switchToEditMode.addEventListener('click', showLetterEditMode);
    }
    
    if (elements.cancelEdit) {
        elements.cancelEdit.addEventListener('click', hideLetterEditMode);
    }
    
    if (elements.saveLetter) {
        elements.saveLetter.addEventListener('click', saveLetter);
    }
    
    // Letter formatting
    if (elements.fontSelector) {
        elements.fontSelector.addEventListener('change', updateLetterPreview);
    }
    
    if (elements.colorPicker) {
        elements.colorPicker.addEventListener('input', updateLetterPreview);
    }
    
    if (elements.letterEditor) {
        elements.letterEditor.addEventListener('input', updateLetterPreview);
    }
    
    elements.effectBtns.forEach(btn => {
        btn.addEventListener('click', toggleEffect);
    });
    
    // Music control
    if (elements.musicControl) {
        elements.musicControl.addEventListener('click', toggleMusic);
    }
    
    // Animation toggles
    if (elements.toggleHearts) {
        elements.toggleHearts.addEventListener('change', toggleHeartsAnimation);
    }
    
    if (elements.toggleSnow) {
        elements.toggleSnow.addEventListener('change', toggleSnowAnimation);
    }
    
    if (elements.toggleFireworks) {
        elements.toggleFireworks.addEventListener('change', toggleFireworksAnimation);
    }
    
    // Date picker
    if (elements.anniversaryDate) {
        elements.anniversaryDate.addEventListener('change', saveAnniversaryDate);
    }
    
    // Password change
    if (elements.savePassword) {
        elements.savePassword.addEventListener('click', changePassword);
    }
    
    // Return to edit mode
    if (elements.returnToEditBtn) {
        elements.returnToEditBtn.addEventListener('click', returnToEditMode);
    }
    
    // Memory modal
    if (elements.addMemory) {
        elements.addMemory.addEventListener('click', showMemoryModal);
    }
    
    if (elements.closeMemoryModal) {
        elements.closeMemoryModal.addEventListener('click', hideMemoryModal);
    }
    
    if (elements.memoryForm) {
        elements.memoryForm.addEventListener('submit', saveMemory);
    }
    
    // Image modal
    if (elements.addImage) {
        elements.addImage.addEventListener('click', showImageModal);
    }
    
    if (elements.closeImageModal) {
        elements.closeImageModal.addEventListener('click', hideImageModal);
    }
    
    if (elements.imageForm) {
        elements.imageForm.addEventListener('submit', saveImage);
    }
    
    // Share link
    if (elements.requirePassword) {
        elements.requirePassword.addEventListener('change', updateShareLink);
    }
    
    if (elements.copyLinkBtn) {
        elements.copyLinkBtn.addEventListener('click', copyShareLink);
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === elements.memoryModal) {
            hideMemoryModal();
        }
        if (e.target === elements.imageModal) {
            hideImageModal();
        }
    });
    
    // Social media share
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', shareSocial);
    });
}

// Load saved data from localStorage
function loadSavedData() {
    // Load saved password if exists
    if (localStorage.getItem('password')) {
        password = localStorage.getItem('password');
    }
    
    // Load saved letter
    if (localStorage.getItem('savedLetter')) {
        const letterData = JSON.parse(localStorage.getItem('savedLetter'));
        
        if (elements.letterEditor) {
            elements.letterEditor.value = letterData.text || '';
        }
        
        // Apply formatting
        if (elements.fontSelector) {
            elements.fontSelector.value = letterData.font || 'font-quicksand';
        }
        
        if (elements.colorPicker) {
            elements.colorPicker.value = letterData.color || '#ff6e95';
        }
        
        // Apply effects
        if (letterData.effects && letterData.effects.length > 0) {
            elements.effectBtns.forEach(btn => {
                if (letterData.effects.includes(btn.dataset.effect)) {
                    btn.classList.add('active');
                }
            });
        }
    }
    
    // Load animation settings
    if (localStorage.getItem('animations')) {
        const animations = JSON.parse(localStorage.getItem('animations'));
        
        if (elements.toggleHearts) {
            elements.toggleHearts.checked = animations.hearts ?? true;
        }
        
        if (elements.toggleSnow) {
            elements.toggleSnow.checked = animations.snow ?? false;
        }
        
        if (elements.toggleFireworks) {
            elements.toggleFireworks.checked = animations.fireworks ?? false;
        }
    }
    
    // Set share link
    if (!isSharedMode && elements.shareLink) {
        const uniqueShareLink = generateShareLink();
        elements.shareLink.value = uniqueShareLink;
        generateQRCode(uniqueShareLink);
    }
    
    // Load saved memories
    if (localStorage.getItem('memories') && elements.timelineContainer) {
        const memories = JSON.parse(localStorage.getItem('memories'));
        
        // Clear default memories
        elements.timelineContainer.innerHTML = '';
        
        // Add saved memories
        memories.forEach(memory => {
            addMemoryToTimeline(memory.date, memory.text);
        });
    }
    
    // Load saved images
    if (localStorage.getItem('images')) {
        const images = JSON.parse(localStorage.getItem('images'));
        
        // Add saved images
        images.forEach(image => {
            addImageToGallery(image.url, image.caption);
        });
    }
}

// Hide loading screen
function hideLoadingScreen() {
    if (elements.loadingScreen) {
        elements.loadingScreen.style.display = 'none';
    }
}

// Check password
function checkPassword() {
    if (elements.passwordInput.value === password) {
        elements.passwordScreen.style.display = 'none';
        showMainContent();
        
        // Play background music
        if (elements.bgMusic) {
            elements.bgMusic.volume = 0.3;
            elements.bgMusic.play();
        }
    } else {
        elements.passwordInput.classList.add('shake');
        setTimeout(() => {
            elements.passwordInput.classList.remove('shake');
        }, 500);
        showNotification('Mật khẩu không đúng. Vui lòng thử lại!', 'error');
    }
}

// Show main content
function showMainContent() {
    if (elements.mainContent) {
        elements.mainContent.style.display = 'block';
        
        // Start animations based on settings
        if (!isSharedMode) {
            if (elements.toggleHearts && elements.toggleHearts.checked) {
                startHeartsAnimation();
            }
            
            if (elements.toggleSnow && elements.toggleSnow.checked) {
                startSnowAnimation();
            }
            
            if (elements.toggleFireworks && elements.toggleFireworks.checked) {
                startFireworksAnimation();
            }
        } else {
            // In shared mode, only show hearts animation
            startHeartsAnimation();
        }
    }
}

// Switch between tabs
function switchTab(tabId) {
    // Remove active class from all buttons and contents
    elements.tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    elements.tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to clicked button and corresponding content
    const activeTabBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    if (activeTabBtn) {
        activeTabBtn.classList.add('active');
    }
    
    const activeContent = document.getElementById(tabId);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

// Letter Editing Functions
function showLetterEditMode() {
    elements.letterViewMode.style.display = 'none';
    elements.letterEditMode.style.display = 'block';
}

function hideLetterEditMode() {
    elements.letterViewMode.style.display = 'block';
    elements.letterEditMode.style.display = 'none';
}

function updateLetterPreview() {
    if (!elements.letterDisplay) return;
    
    // Get current font
    const font = elements.fontSelector ? elements.fontSelector.value : 'font-quicksand';
    
    // Get current color
    const color = elements.colorPicker ? elements.colorPicker.value : '#ff6e95';
    
    // Get active effects
    let effects = [];
    elements.effectBtns.forEach(btn => {
        if (btn.classList.contains('active')) {
            effects.push(btn.dataset.effect);
        }
    });
    
    // Get text content
    const text = elements.letterEditor ? elements.letterEditor.value : '';
    
    // Update the preview
    elements.letterDisplay.className = 'letter ' + font + ' ' + effects.join(' ');
    elements.letterDisplay.style.color = color;
    elements.letterDisplay.textContent = text;
}

function toggleEffect() {
    const effect = this.dataset.effect;
    
    if (this.classList.contains('active')) {
        this.classList.remove('active');
    } else {
        this.classList.add('active');
    }
    
    updateLetterPreview();
}

function saveLetter(e) {
    if (e) e.preventDefault();
    
    // Get current font
    const font = elements.fontSelector ? elements.fontSelector.value : 'font-quicksand';
    
    // Get current color
    const color = elements.colorPicker ? elements.colorPicker.value : '#ff6e95';
    
    // Get active effects
    let effects = [];
    elements.effectBtns.forEach(btn => {
        if (btn.classList.contains('active')) {
            effects.push(btn.dataset.effect);
        }
    });
    
    // Get text content
    const text = elements.letterEditor ? elements.letterEditor.value : '';
    
    // Save to localStorage
    const letterData = { text, font, color, effects };
    localStorage.setItem('savedLetter', JSON.stringify(letterData));
    
    // Show success message
    showNotification('Tâm thư đã được lưu thành công!', 'success');
    
    // Switch back to view mode
    hideLetterEditMode();
    
    // Trigger fireworks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 300);
    }
    
    // Update share link if necessary
    if (elements.shareLink) {
        updateShareLink();
    }
}

// Animation Functions
function startHeartsAnimation() {
    if (!elements.heartsContainer) return;
    
    // Clear existing hearts
    elements.heartsContainer.innerHTML = '';
    
    // Create initial hearts
    const heartCount = window.innerWidth < 768 ? 20 : 40;
    for (let i = 0; i < heartCount; i++) {
        createHeart();
    }
    
    // Continue creating hearts
    heartInterval = setInterval(createHeart, 300);
}

function createHeart() {
    if (!elements.heartsContainer) return;
    
    const heart = document.createElement('div');
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    heart.classList.add('heart');
    
    // Random position and size
    const size = Math.random() * 20 + 10;
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = size + 'px';
    
    // Random animation duration
    const duration = Math.random() * 15 + 5;
    heart.style.animationDuration = duration + 's';
    
    // Random delay
    const delay = Math.random() * 5;
    heart.style.animationDelay = delay + 's';
    
    // Random color
    const colors = ['#ff6e95', '#ff9eb5', '#ff5376', '#ff8da6'];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    elements.heartsContainer.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        if (heart.parentNode === elements.heartsContainer) {
            elements.heartsContainer.removeChild(heart);
        }
    }, (duration + delay) * 1000);
}

function toggleHeartsAnimation() {
    if (!elements.heartsContainer) return;
    
    if (elements.toggleHearts && elements.toggleHearts.checked) {
        startHeartsAnimation();
    } else {
        clearInterval(heartInterval);
        elements.heartsContainer.innerHTML = '';
    }
    
    // Save setting
    saveAnimationSettings();
}

function startSnowAnimation() {
    if (!elements.snowContainer) return;
    
    // Display snow container
    elements.snowContainer.style.display = 'block';
    
    // Clear existing snowflakes
    elements.snowContainer.innerHTML = '';
    
    // Create initial snowflakes
    const snowCount = window.innerWidth < 768 ? 50 : 100;
    for (let i = 0; i < snowCount; i++) {
        createSnowflake();
    }
    
    // Continue creating snowflakes
    snowInterval = setInterval(createSnowflake, 200);
}

function createSnowflake() {
    if (!elements.snowContainer) return;
    
    const snowflake = document.createElement('div');
    snowflake.innerHTML = '❄';
    snowflake.classList.add('snowflake');
    
    // Random position and size
    const size = Math.random() * 15 + 5;
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.fontSize = size + 'px';
    
    // Random animation duration
    const duration = Math.random() * 15 + 5;
    snowflake.style.animationDuration = duration + 's';
    
    // Random delay
    const delay = Math.random() * 5;
    snowflake.style.animationDelay = delay + 's';
    
    elements.snowContainer.appendChild(snowflake);
    
    // Remove snowflake after animation completes
    setTimeout(() => {
        if (snowflake.parentNode === elements.snowContainer) {
            elements.snowContainer.removeChild(snowflake);
        }
    }, (duration + delay) * 1000);
}

function toggleSnowAnimation() {
    if (!elements.snowContainer) return;
    
    if (elements.toggleSnow && elements.toggleSnow.checked) {
        startSnowAnimation();
    } else {
        clearInterval(snowInterval);
        elements.snowContainer.style.display = 'none';
        elements.snowContainer.innerHTML = '';
    }
    
    // Save setting
    saveAnimationSettings();
}

function startFireworksAnimation() {
    if (!elements.fireworksContainer) return;
    
    // Start creating fireworks
    fireworksInterval = setInterval(createFirework, 2000);
}

function createFirework() {
    if (!elements.fireworksContainer) return;
    
    // Random position
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * (window.innerHeight / 2);
    
    // Random color
    const colors = ['#ff6e95', '#a269ff', '#ffcc4d', '#ff9eb5', '#c8a6ff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Create explosion
    setTimeout(() => {
        createExplosion(posX, posY, color);
    }, 300);
}

function createExplosion(x, y, color) {
    if (!elements.fireworksContainer) return;
    
    // Create particles
    const particleCount = window.innerWidth < 768 ? 20 : 40;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('firework');
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 10px 2px ${color}`;
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 100 + 50;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        // Add animation
        particle.animate(
            [
                { transform: 'translate(0, 0) scale(0)', opacity: 1 },
                { transform: `translate(${vx}px, ${vy}px) scale(1)`, opacity: 0 }
            ],
            {
                duration: 1500,
                easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
            }
        );
        
        elements.fireworksContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode === elements.fireworksContainer) {
                elements.fireworksContainer.removeChild(particle);
            }
        }, 1500);
    }
}

function toggleFireworksAnimation() {
    if (!elements.fireworksContainer) return;
    
    if (elements.toggleFireworks && elements.toggleFireworks.checked) {
        startFireworksAnimation();
    } else {
        clearInterval(fireworksInterval);
        elements.fireworksContainer.innerHTML = '';
    }
    
    // Save setting
    saveAnimationSettings();
}

function saveAnimationSettings() {
    const animations = {
        hearts: elements.toggleHearts ? elements.toggleHearts.checked : true,
        snow: elements.toggleSnow ? elements.toggleSnow.checked : false,
        fireworks: elements.toggleFireworks ? elements.toggleFireworks.checked : false
    };
    
    localStorage.setItem('animations', JSON.stringify(animations));
}

// Days counter functions
function calculateDays() {
    if (!elements.daysCount) return;
    
    // If no anniversary date is saved, set to current date
    if (!localStorage.getItem('anniversaryDate')) {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        localStorage.setItem('anniversaryDate', formattedDate);
        
        if (elements.anniversaryDate) {
            elements.anniversaryDate.value = formattedDate;
        }
    } else if (elements.anniversaryDate) {
        elements.anniversaryDate.value = localStorage.getItem('anniversaryDate');
    }
    
    updateDaysCount();
}

function updateDaysCount() {
    if (!elements.daysCount) return;
    
    const startDate = new Date(localStorage.getItem('anniversaryDate'));
    const today = new Date();
    
    // Calculate difference in days
    const timeDiff = today.getTime() - startDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    elements.daysCount.textContent = dayDiff;
    
    // Add animation
    elements.daysCount.classList.add('highlight');
    setTimeout(() => {
        elements.daysCount.classList.remove('highlight');
    }, 1000);
}

function saveAnniversaryDate() {
    if (!elements.anniversaryDate) return;
    
    localStorage.setItem('anniversaryDate', elements.anniversaryDate.value);
    updateDaysCount();
    showNotification('Ngày kỷ niệm đã được cập nhật!', 'success');
}

// Music control
let isMusicPlaying = false;
function toggleMusic() {
    if (!elements.bgMusic || !elements.musicControl) return;
    
    if (isMusicPlaying) {
        elements.bgMusic.pause();
        elements.musicControl.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        elements.bgMusic.play();
        elements.musicControl.innerHTML = '<i class="fas fa-pause"></i>';
    }
    
    isMusicPlaying = !isMusicPlaying;
}

// Change password
function changePassword() {
    if (!elements.newPassword) return;
    
    if (elements.newPassword.value.trim() !== '') {
        password = elements.newPassword.value.trim();
        localStorage.setItem('password', password);
        showNotification('Mật khẩu đã được cập nhật!', 'success');
        elements.newPassword.value = '';
    } else {
        showNotification('Vui lòng nhập mật khẩu mới!', 'error');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    if (!elements.notification || !elements.notificationText) return;
    
    elements.notificationText.textContent = message;
    elements.notification.className = 'notification';
    
    if (type === 'success') {
        elements.notification.classList.add('success');
        elements.notification.innerHTML = '<i class="fas fa-check-circle"></i>' + message;
    } else if (type === 'error') {
        elements.notification.classList.add('error');
        elements.notification.innerHTML = '<i class="fas fa-exclamation-circle"></i>' + message;
    } else {
        elements.notification.innerHTML = '<i class="fas fa-info-circle"></i>' + message;
    }
    
    elements.notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        elements.notification.classList.remove('show');
    }, 3000);
}

// Return to edit mode
function returnToEditMode() {
    window.location.href = window.location.pathname;
}

// Memory functions
function showMemoryModal() {
    if (!elements.memoryModal) return;
    elements.memoryModal.classList.add('show');
}

function hideMemoryModal() {
    if (!elements.memoryModal) return;
    elements.memoryModal.classList.remove('show');
}

function saveMemory(e) {
    e.preventDefault();
    
    if (!elements.memoryDate || !elements.memoryText || !elements.timelineContainer) return;
    
    const date = formatDate(elements.memoryDate.value);
    const text = elements.memoryText.value;
    
    if (date && text) {
        // Add memory to timeline
        addMemoryToTimeline(date, text);
        
        // Save to localStorage
        const memories = JSON.parse(localStorage.getItem('memories') || '[]');
        memories.push({ date, text });
        localStorage.setItem('memories', JSON.stringify(memories));
        
        // Close modal and reset form
        hideMemoryModal();
        elements.memoryForm.reset();
        
        showNotification('Kỷ niệm đã được thêm thành công!', 'success');
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function addMemoryToTimeline(date, text) {
    if (!elements.timelineContainer) return;
    
    const newMemory = document.createElement('div');
    newMemory.classList.add('timeline-item');
    newMemory.innerHTML = `
        <div class="timeline-content">
            <div class="timeline-date"><i class="fas fa-calendar-alt"></i> ${date}</div>
            <div class="timeline-text">${text}</div>
        </div>
    `;
    
    elements.timelineContainer.appendChild(newMemory);
    
    // Add animation
    setTimeout(() => {
        newMemory.style.opacity = 1;
        newMemory.style.transform = 'translateY(0)';
    }, 10);
}

// Image functions
function showImageModal() {
    if (!elements.imageModal) return;
    elements.imageModal.classList.add('show');
}

function hideImageModal() {
    if (!elements.imageModal) return;
    elements.imageModal.classList.remove('show');
}

function saveImage(e) {
    e.preventDefault();
    
    if (!elements.imageUrl || !elements.imageCaption) return;
    
    const url = elements.imageUrl.value;
    const caption = elements.imageCaption.value;
    
    if (url) {
        // Add image to gallery
        addImageToGallery(url, caption);
        
        // Save to localStorage
        const images = JSON.parse(localStorage.getItem('images') || '[]');
        images.push({ url, caption });
        localStorage.setItem('images', JSON.stringify(images));
        
        // Close modal and reset form
        hideImageModal();
        elements.imageForm.reset();
        
        showNotification('Ảnh đã được thêm thành công!', 'success');
    }
}

function addImageToGallery(url, caption) {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;
    
    const addImageBtn = document.getElementById('addImage');
    
    const newImage = document.createElement('div');
    newImage.classList.add('gallery-item');
    newImage.innerHTML = `
        <img src="${url}" alt="${caption}">
        <div class="caption">${caption}</div>
    `;
    
    // Insert before the "Add Image" button or at the beginning
    if (addImageBtn) {
        gallery.insertBefore(newImage, addImageBtn.nextSibling);
    } else {
        gallery.prepend(newImage);
    }
}

// Share functions
let requirePasswordForShared = false;

function updateShareLink() {
    if (!elements.shareLink || !elements.requirePassword) return;
    
    requirePasswordForShared = elements.requirePassword.checked;
    const newShareLink = generateShareLink();
    elements.shareLink.value = newShareLink;
    
    generateQRCode(newShareLink);
}

function generateShareLink() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    const baseUrl = window.location.origin + window.location.pathname;
    const protectedParam = requirePasswordForShared ? '&protected=1' : '';
    return `${baseUrl}?share=${result}${protectedParam}`;
}

function generateQRCode(url) {
    if (!window.QRCode || !elements.qrCode) return;
    
    elements.qrCode.innerHTML = '';
    
    try {
        new QRCode(elements.qrCode, {
            text: url,
            width: 180,
            height: 180,
            colorDark: '#ff6e95',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    } catch (error) {
        console.error('QR Code generation error:', error);
    }
}

function copyShareLink() {
    if (!elements.shareLink) return;
    
    elements.shareLink.select();
    document.execCommand('copy');
    showNotification('Đường dẫn đã được sao chép!', 'success');
}

// Social media share
function shareSocial() {
    if (!elements.shareLink) return;
    
    const url = encodeURIComponent(elements.shareLink.value);
    const text = encodeURIComponent('Xem tâm thư yêu thương của tôi!');
    let shareUrl;
    
    if (this.classList.contains('facebook')) {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (this.classList.contains('twitter')) {
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (this.classList.contains('whatsapp')) {
        shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
    } else if (this.classList.contains('telegram')) {
        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Global intervals for animations
let heartInterval, snowInterval, fireworksInterval;

// Start the application
// Note: The application is initialized through the DOMContentLoaded event listener at the top
