// Default password (You can change this)
let password = "ngocphuong";
let isOwnerMode = true;
let requirePasswordForShared = false;

// Elements
const loadingScreen = document.getElementById('loadingScreen');
const passwordScreen = document.getElementById('passwordScreen');
const mainContent = document.getElementById('mainContent');
const passwordInput = document.getElementById('passwordInput');
const submitPassword = document.getElementById('submitPassword');
const musicControl = document.getElementById('musicControl');
const bgMusic = document.getElementById('bgMusic');
const heartsContainer = document.getElementById('heartsContainer');
const snowContainer = document.getElementById('snowContainer');
const fireworksContainer = document.getElementById('fireworksContainer');
const toggleHearts = document.getElementById('toggleHearts');
const toggleSnow = document.getElementById('toggleSnow');
const toggleFireworks = document.getElementById('toggleFireworks');
const daysCount = document.getElementById('daysCount');
const anniversaryDate = document.getElementById('anniversaryDate');
const savePassword = document.getElementById('savePassword');
const newPassword = document.getElementById('newPassword');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const requirePassword = document.getElementById('requirePassword');
const returnToEditBtn = document.getElementById('returnToEditBtn');
const sharedTitle = document.querySelector('.shared-title');

// Letter elements
const letterEditor = document.getElementById('letterEditor');
const letterDisplay = document.getElementById('letterDisplay');
const fontSelector = document.getElementById('fontSelector');
const colorPicker = document.getElementById('colorPicker');
const effectBtns = document.querySelectorAll('.effect-btn');
const saveLetter = document.getElementById('saveLetter');
const switchToEditMode = document.getElementById('switchToEditMode');
const cancelEdit = document.getElementById('cancelEdit');
const letterViewMode = document.querySelector('.letter-view-mode');
const letterEditMode = document.querySelector('.letter-edit-mode');

// Tab elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Memory elements
const addMemory = document.getElementById('addMemory');
const memoryModal = document.getElementById('memoryModal');
const closeMemoryModal = document.getElementById('closeMemoryModal');
const memoryForm = document.getElementById('memoryForm');
const memoryDate = document.getElementById('memoryDate');
const memoryText = document.getElementById('memoryText');

// Image elements
const addImage = document.getElementById('addImage');
const imageModal = document.getElementById('imageModal');
const closeImageModal = document.getElementById('closeImageModal');
const imageForm = document.getElementById('imageForm');
const imageUrl = document.getElementById('imageUrl');
const imageCaption = document.getElementById('imageCaption');

// Share elements
const qrCode = document.getElementById('qrCode');
const shareLink = document.getElementById('shareLink');
const copyLinkBtn = document.getElementById('copyLinkBtn');

// Check if we're in shared view mode
function checkSharedMode() {
    const urlParams = new URLSearchParams(window.location.search);
    const shareParam = urlParams.get('share');
    
    if (shareParam) {
        isOwnerMode = false;
        
        // If shared view requires password
        if (urlParams.get('protected') === '1') {
            // Still show password screen
            passwordScreen.style.display = 'flex';
        } else {
            // Skip password for unprotected shares
            passwordScreen.style.display = 'none';
            initializeSharedView();
        }
        
        // Hide owner-only elements
        document.querySelectorAll('.owner-only').forEach(el => {
            el.style.display = 'none';
        });
        
        // Show shared-only elements
        document.querySelectorAll('.shared-only').forEach(el => {
            el.style.display = 'block';
        });
        
        // Show shared title
        sharedTitle.style.display = 'block';
        
        // Set the first tab as active
        document.getElementById('letter').classList.add('active');
        
        // Return button functionality
        returnToEditBtn.addEventListener('click', () => {
            window.location.href = window.location.pathname;
        });
    }
}

// Initialize shared view
function initializeSharedView() {
    mainContent.style.display = 'block';
    
    // Start heart animation
    startHeartsAnimation();
    
    // Play background music
    bgMusic.volume = 0.2;
    bgMusic.play();
}

// Simulating loading time
setTimeout(() => {
    loadingScreen.style.display = 'none';
    
    // Check if we're in shared mode
    checkSharedMode();
}, 2000);

// Generate unique share link
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

// Generate QR code
function generateQRCode(url) {
    if (window.QRCode && qrCode) {
        qrCode.innerHTML = '';
        new QRCode(qrCode, {
            text: url,
            width: 180,
            height: 180,
            colorDark: '#ff6e95',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}

// Update share link when checkbox changes
if (requirePassword) {
    requirePassword.addEventListener('change', () => {
        requirePasswordForShared = requirePassword.checked;
        const newShareLink = generateShareLink();
        shareLink.value = newShareLink;
        generateQRCode(newShareLink);
    });
}

// Set share link
if (shareLink) {
    const uniqueShareLink = generateShareLink();
    shareLink.value = uniqueShareLink;
    generateQRCode(uniqueShareLink);
}

// Copy share link
if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
        shareLink.select();
        document.execCommand('copy');
        showNotification('Đường dẫn đã được sao chép!', 'success');
    });
}

// Check password
submitPassword.addEventListener('click', () => {
    if (passwordInput.value === password) {
        passwordScreen.style.display = 'none';
        
        if (isOwnerMode) {
            mainContent.style.display = 'block';
            
            // Play background music
            bgMusic.volume = 0.3;
            bgMusic.play();
            
            // Start animations if enabled
            if (toggleHearts.checked) {
                startHeartsAnimation();
            }
            
            if (toggleSnow.checked) {
                startSnowAnimation();
            }
            
            if (toggleFireworks.checked) {
                startFireworksAnimation();
            }
        } else {
            initializeSharedView();
        }
    } else {
        passwordInput.classList.add('shake');
        setTimeout(() => {
            passwordInput.classList.remove('shake');
        }, 500);
        showNotification('Mật khẩu không đúng. Vui lòng thử lại!', 'error');
    }
});

// Allow Enter key to submit password
passwordInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        submitPassword.click();
    }
});

// Music control
let isMusicPlaying = false;
if (musicControl) {
    musicControl.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicControl.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            bgMusic.play();
            musicControl.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isMusicPlaying = !isMusicPlaying;
    });
}

// Tab switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Switch between view mode and edit mode for letter
if (switchToEditMode) {
    switchToEditMode.addEventListener('click', () => {
        letterViewMode.style.display = 'none';
        letterEditMode.style.display = 'block';
    });
}

if (cancelEdit) {
    cancelEdit.addEventListener('click', () => {
        letterViewMode.style.display = 'block';
        letterEditMode.style.display = 'none';
    });
}

// Letter formatting
let currentFont = 'font-quicksand';
let currentColor = '#ff6e95';
let currentEffects = [];

if (fontSelector) {
    fontSelector.addEventListener('change', () => {
        currentFont = fontSelector.value;
        updateLetterPreview();
    });
}

if (colorPicker) {
    colorPicker.addEventListener('input', () => {
        currentColor = colorPicker.value;
        updateLetterPreview();
    });
}

effectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const effect = btn.dataset.effect;
        
        if (currentEffects.includes(effect)) {
            // Remove effect if already applied
            currentEffects = currentEffects.filter(e => e !== effect);
            btn.classList.remove('active');
        } else {
            // Add effect
            currentEffects.push(effect);
            btn.classList.add('active');
        }
        
        updateLetterPreview();
    });
});

if (letterEditor) {
    letterEditor.addEventListener('input', updateLetterPreview);
}

function updateLetterPreview() {
    // Apply text formatting
    if (letterDisplay) {
        letterDisplay.className = 'letter ' + currentFont + ' ' + currentEffects.join(' ');
        letterDisplay.style.color = currentColor;
        letterDisplay.textContent = letterEditor ? letterEditor.value : '';
    }
}

if (saveLetter) {
    saveLetter.addEventListener('click', () => {
        // Save letter to localStorage
        const letterData = {
            text: letterEditor.value,
            font: currentFont,
            color: currentColor,
            effects: currentEffects
        };
        
        localStorage.setItem('savedLetter', JSON.stringify(letterData));
        showNotification('Tâm thư đã được lưu thành công!', 'success');
        
        // Switch back to view mode
        letterViewMode.style.display = 'block';
        letterEditMode.style.display = 'none';
        
        // Trigger fireworks
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createFirework();
            }, i * 300);
        }
    });
}

// Load saved letter if exists
if (localStorage.getItem('savedLetter')) {
    const letterData = JSON.parse(localStorage.getItem('savedLetter'));
    if (letterEditor) letterEditor.value = letterData.text;
    currentFont = letterData.font;
    currentColor = letterData.color;
    currentEffects = letterData.effects;
    
    // Update UI to match saved data
    if (fontSelector) fontSelector.value = currentFont;
    if (colorPicker) colorPicker.value = currentColor;
    
    effectBtns.forEach(btn => {
        const effect = btn.dataset.effect;
        if (currentEffects.includes(effect)) {
            btn.classList.add('active');
        }
    });
    
    updateLetterPreview();
} else {
    // Initialize with default text
    updateLetterPreview();
}

// Show notification
function showNotification(message, type = 'info') {
    notificationText.textContent = message;
    notification.className = 'notification';
    
    if (type === 'success') {
        notification.classList.add('success');
        notification.innerHTML = '<i class="fas fa-check-circle"></i>' + message;
    } else if (type === 'error') {
        notification.classList.add('error');
        notification.innerHTML = '<i class="fas fa-exclamation-circle"></i>' + message;
    } else {
        notification.innerHTML = '<i class="fas fa-info-circle"></i>' + message;
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Hearts animation
function startHeartsAnimation() {
    heartsContainer.innerHTML = '';
    
    // Create 50 hearts
    for (let i = 0; i < 50; i++) {
        createHeart();
    }
    
    // Continue creating hearts
    setInterval(createHeart, 300);
}

function createHeart() {
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
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, (duration + delay) * 1000);
}

// Snow animation
function startSnowAnimation() {
    snowContainer.style.display = 'block';
    snowContainer.innerHTML = '';
    
    // Create 100 snowflakes
    for (let i = 0; i < 100; i++) {
        createSnowflake();
    }
    
    // Continue creating snowflakes
    setInterval(createSnowflake, 200);
}

function createSnowflake() {
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
    
    snowContainer.appendChild(snowflake);
    
    // Remove snowflake after animation completes
    setTimeout(() => {
        snowflake.remove();
    }, (duration + delay) * 1000);
}

// Fireworks animation
function startFireworksAnimation() {
    setInterval(createFirework, 2000);
}

function createFirework() {
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
    // Create particles
    for (let i = 0; i < 40; i++) {
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
        
        // Animation
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
        
        fireworksContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

// Toggle animations
if (toggleHearts) {
    toggleHearts.addEventListener('change', () => {
        if (toggleHearts.checked) {
            startHeartsAnimation();
        } else {
            heartsContainer.innerHTML = '';
        }
    });
}

if (toggleSnow) {
    toggleSnow.addEventListener('change', () => {
        if (toggleSnow.checked) {
            startSnowAnimation();
        } else {
            snowContainer.style.display = 'none';
            snowContainer.innerHTML = '';
        }
    });
}

if (toggleFireworks) {
    toggleFireworks.addEventListener('change', () => {
        if (toggleFireworks.checked) {
            startFireworksAnimation();
        } else {
            fireworksContainer.innerHTML = '';
        }
    });
}

// Calculate days together
function calculateDays() {
    if (!localStorage.getItem('anniversaryDate')) {
        // Default to today if not set
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        localStorage.setItem('anniversaryDate', formattedDate);
        if (anniversaryDate) anniversaryDate.value = formattedDate;
    } else if (anniversaryDate) {
        anniversaryDate.value = localStorage.getItem('anniversaryDate');
    }
    
    updateDaysCount();
}

function updateDaysCount() {
    const startDate = new Date(localStorage.getItem('anniversaryDate'));
    const today = new Date();
    
    // Calculate difference in days
    const timeDiff = today.getTime() - startDate.getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    if (daysCount) {
        daysCount.textContent = dayDiff;
        
        // Make counter animation
        daysCount.classList.add('highlight');
        setTimeout(() => {
            daysCount.classList.remove('highlight');
        }, 1000);
    }
}

calculateDays();

// Save anniversary date
if (anniversaryDate) {
    anniversaryDate.addEventListener('change', () => {
        localStorage.setItem('anniversaryDate', anniversaryDate.value);
        updateDaysCount();
        showNotification('Ngày kỷ niệm đã được cập nhật!', 'success');
    });
}

// Save new password
if (savePassword) {
    savePassword.addEventListener('click', () => {
        if (newPassword.value.trim() !== '') {
            password = newPassword.value;
            localStorage.setItem('password', password);
            showNotification('Mật khẩu đã được cập nhật!', 'success');
            newPassword.value = '';
        } else {
            showNotification('Vui lòng nhập mật khẩu mới!', 'error');
        }
    });
}

// Memory modal
if (addMemory) {
    addMemory.addEventListener('click', () => {
        memoryModal.classList.add('show');
    });
}

if (closeMemoryModal) {
    closeMemoryModal.addEventListener('click', () => {
        memoryModal.classList.remove('show');
    });
}

if (memoryForm) {
    memoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const date = formatDate(memoryDate.value);
        const text = memoryText.value;
        
        if (date && text) {
            addMemoryToTimeline(date, text);
            
            // Save to localStorage
            const memories = JSON.parse(localStorage.getItem('memories') || '[]');
            memories.push({ date, text });
            localStorage.setItem('memories', JSON.stringify(memories));
            
            // Close modal and reset form
            memoryModal.classList.remove('show');
            memoryForm.reset();
            
            showNotification('Kỷ niệm đã được thêm thành công!', 'success');
        }
    });
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
    const timeline = document.getElementById('timelineContainer');
    if (!timeline) return;
    
    const newMemory = document.createElement('div');
    newMemory.classList.add('timeline-item');
    newMemory.innerHTML = `
        <div class="timeline-content">
            <div class="timeline-date"><i class="fas fa-calendar-alt"></i> ${date}</div>
            <div class="timeline-text">${text}</div>
        </div>
    `;
    
    timeline.appendChild(newMemory);
    
    // Add animation
    setTimeout(() => {
        newMemory.style.opacity = 1;
        newMemory.style.transform = 'translateY(0)';
    }, 10);
}

// Image modal
if (addImage) {
    addImage.addEventListener('click', () => {
        imageModal.classList.add('show');
    });
}

if (closeImageModal) {
    closeImageModal.addEventListener('click', () => {
        imageModal.classList.remove('show');
    });
}

if (imageForm) {
    imageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const url = imageUrl.value;
        const caption = imageCaption.value;
        
        if (url) {
            addImageToGallery(url, caption);
            
            // Save to localStorage
            const images = JSON.parse(localStorage.getItem('images') || '[]');
            images.push({ url, caption });
            localStorage.setItem('images', JSON.stringify(images));
            
            // Close modal and reset form
            imageModal.classList.remove('show');
            imageForm.reset();
            
            showNotification('Ảnh đã được thêm thành công!', 'success');
        }
    });
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

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === memoryModal) {
        memoryModal.classList.remove('show');
    }
    if (e.target === imageModal) {
        imageModal.classList.remove('show');
    }
});

// Social media share buttons
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const url = encodeURIComponent(shareLink.value);
        const text = encodeURIComponent('Xem tâm thư yêu thương của tôi!');
        let shareUrl;
        
        if (btn.classList.contains('facebook')) {
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        } else if (btn.classList.contains('twitter')) {
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        } else if (btn.classList.contains('whatsapp')) {
            shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
        } else if (btn.classList.contains('telegram')) {
            shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
        }
        
        window.open(shareUrl, '_blank', 'width=600,height=400');
    });
});

// Load saved memories if exist
if (localStorage.getItem('memories')) {
    const memories = JSON.parse(localStorage.getItem('memories'));
    const timeline = document.getElementById('timelineContainer');
    
    if (timeline) {
        // Clear default memories
        timeline.innerHTML = '';
        
        memories.forEach(memory => {
            addMemoryToTimeline(memory.date, memory.text);
        });
    }
}

// Load saved images if exist
if (localStorage.getItem('images')) {
    const images = JSON.parse(localStorage.getItem('images'));
    
    images.forEach(image => {
        addImageToGallery(image.url, image.caption);
    });
}

// Load saved password if exists
if (localStorage.getItem('password')) {
    password = localStorage.getItem('password');
}

// Fix for mobile viewport height issues
function setMobileHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set the height initially and on resize
setMobileHeight();
window.addEventListener('resize', () => {
    setMobileHeight();
});

// Add event listener to detect orientation change on mobile
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        setMobileHeight();
    }, 200);
});
