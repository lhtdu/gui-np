// Default password (You can change this)
let password = "iloveyou";

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

// Simulating loading time
setTimeout(() => {
    loadingScreen.style.display = 'none';
}, 2000);

// Generate unique share link
function generateShareLink() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?share=${result}`;
}

// Generate QR code
function generateQRCode(url) {
    if (window.QRCode) {
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

// Set share link
const uniqueShareLink = generateShareLink();
shareLink.value = uniqueShareLink;
generateQRCode(uniqueShareLink);

// Copy share link
copyLinkBtn.addEventListener('click', () => {
    shareLink.select();
    document.execCommand('copy');
    showNotification('Đường dẫn đã được sao chép!', 'success');
});

// Check password
submitPassword.addEventListener('click', () => {
    if (passwordInput.value === password) {
        passwordScreen.style.display = 'none';
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
switchToEditMode.addEventListener('click', () => {
    letterViewMode.style.display = 'none';
    letterEditMode.style.display = 'block';
});

cancelEdit.addEventListener('click', () => {
    letterViewMode.style.display = 'block';
    letterEditMode.style.display = 'none';
});

// Letter formatting
let currentFont = 'font-quicksand';
let currentColor = '#ff6e95';
let currentEffects = [];

fontSelector.addEventListener('change', () => {
    currentFont = fontSelector.value;
    updateLetterPreview();
});

colorPicker.addEventListener('input', () => {
    currentColor = colorPicker.value;
    updateLetterPreview();
});

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

letterEditor.addEventListener('input', updateLetterPreview);

function updateLetterPreview() {
    // Apply text formatting
    letterDisplay.className = 'letter ' + currentFont + ' ' + currentEffects.join(' ');
    letterDisplay.style.color = currentColor;
    letterDisplay.textContent = letterEditor.value;
}

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

// Load saved letter if exists
if (localStorage.getItem('savedLetter')) {
    const letterData = JSON.parse(localStorage.getItem('savedLetter'));
    letterEditor.value = letterData.text;
    currentFont = letterData.font;
    currentColor = letterData.color;
    currentEffects = letterData.effects;
    
    // Update UI to match saved data
    fontSelector.value = currentFont;
    colorPicker.value = currentColor;
    
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
toggleHearts.addEventListener('change', () => {
    if (toggleHearts.checked) {
        startHeartsAnimation();
    } else {
        heartsContainer.innerHTML = '';
    }
});

toggleSnow.addEventListener('change', () => {
    if (toggleSnow.checked) {
        startSnowAnimation();
    } else {
        snowContainer.style.display = 'none';
        snowContainer.innerHTML = '';
    }
});

toggleFireworks.addEventListener('change', () => {
    if (toggleFireworks.checked) {
        startFireworksAnimation();
    } else {
        fireworksContainer.innerHTML = '';
    }
});

// Calculate days together
function calculateDays() {
    if (!localStorage.getItem('anniversaryDate')) {
        // Default to today if not set
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        localStorage.setItem('anniversaryDate', formattedDate);
        anniversaryDate.value = formattedDate;
    } else {
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
    
    daysCount.textContent = dayDiff;
    
    // Make counter animation
    daysCount.classList.add('highlight');
    setTimeout(() => {
        daysCount.classList.remove('highlight');
    }, 1000);
}

calculateDays();

// Save anniversary date
anniversaryDate.addEventListener('change', () => {
    localStorage.setItem('anniversaryDate', anniversaryDate.value);
    updateDaysCount();
    showNotification('Ngày kỷ niệm đã được cập nhật!', 'success');
});

// Save new password
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

// Memory modal
addMemory.addEventListener('click', () => {
    memoryModal.classList.add('show');
});

closeMemoryModal.addEventListener('click', () => {
    memoryModal.classList.remove('show');
});

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
addImage.addEventListener('click', () => {
    imageModal.classList.add('show');
});

closeImageModal.addEventListener('click', () => {
    imageModal.classList.remove('show');
});

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

function addImageToGallery(url, caption) {
    const gallery = document.querySelector('.gallery');
    const addImageBtn = document.getElementById('addImage');
    
    const newImage = document.createElement('div');
    newImage.classList.add('gallery-item');
    newImage.innerHTML = `
        <img src="${url}" alt="${caption}">
        <div class="caption">${caption}</div>
    `;
    
    // Insert before the "Add Image" button
    gallery.insertBefore(newImage, addImageBtn.nextSibling);
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
    
    // Clear default memories
    timeline.innerHTML = '';
    
    memories.forEach(memory => {
        addMemoryToTimeline(memory.date, memory.text);
    });
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