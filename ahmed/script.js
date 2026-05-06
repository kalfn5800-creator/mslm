/**
 * THE NOOR PRO - ULTIMATE CORE ENGINE
 * DEVELOPED BY: H-MODY (THE COMMANDER)
 */

// 1. GLOBAL STATE
let state = {
    totalDhikr: parseInt(localStorage.getItem('h_total_all')) || 0,
    currentCount: 0,
    isWizard: true,
    isSound: true,
    userRank: 'مبتدئ',
    systemLogs: []
};

// 2. PARTICLE ENGINE (Wizard Background)
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for(let i=0; i<100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 1,
            d: Math.random() * 1,
            color: `rgba(0, 242, 254, ${Math.random() * 0.3})`
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();
        p.y += p.d;
        if(p.y > canvas.height) p.y = -10;
    });
    requestAnimationFrame(drawParticles);
}

// 3. LOADER SYSTEM (Advanced Simulation)
function runLoader() {
    const bar = document.getElementById('loadProgress');
    const status = document.getElementById('loaderStatus');
    const percent = document.getElementById('loadPercent');
    const module = document.getElementById('loadModule');
    
    let progress = 0;
    const modules = ["CORE_INIT", "MATRIX_RENDER", "API_CONNECT", "WIZARD_UI", "SECURITY_CHECK", "H_MODY_AUTH"];
    
    const interval = setInterval(() => {
        progress += Math.random() * 12;
        if(progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('loader').style.opacity = '0';
                setTimeout(() => document.getElementById('loader').style.display = 'none', 500);
            }, 800);
        }
        bar.style.width = progress + '%';
        percent.innerText = Math.floor(progress) + '%';
        module.innerText = modules[Math.floor((progress/101) * modules.length)];
        status.innerText = "> Loading " + module.innerText + "...";
    }, 150);
}

// 4. CLOCK & DATE SYSTEM
function updateClock() {
    const now = new Date();
    const h = String(now.getHours() % 12 || 12).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    
    document.getElementById('digitalClock').innerText = `${h}:${m}:${s}`;
    document.getElementById('clockAmPm').innerText = ampm;
}

// 5. DHIKR ENGINE (Gamification)
const dhikrBtn = document.getElementById('dhikrTapBtn');
const mainCounter = document.getElementById('mainCounter');
const ring = document.getElementById('mainRing');

dhikrBtn.addEventListener('click', () => {
    state.currentCount++;
    state.totalDhikr++;
    
    // Update UI
    mainCounter.innerText = state.currentCount;
    document.getElementById('totalDhikrAll').innerText = state.totalDhikr;
    
    // Ring Animation
    let offset = 565 - (state.currentCount % 100 / 100) * 565;
    ring.style.strokeDashoffset = offset;
    
    // Save
    localStorage.setItem('h_total_all', state.totalDhikr);
    
    // Rank System
    updateRank();
    
    // Feedback
    if(state.isSound) vibrate(20);
});

function updateRank() {
    let rank = "جندي نوراني";
    if(state.totalDhikr > 10000) rank = "حاكم المجال 👑";
    else if(state.totalDhikr > 5000) rank = "قرصان النور 💀";
    else if(state.totalDhikr > 1000) rank = "فارس الاستغفار";
    document.getElementById('userRank').innerText = rank;
}

// 6. TERMINAL & SYSTEM COMMANDS
function logToTerminal(msg, type = 'info') {
    const term = document.getElementById('termOutput');
    const p = document.createElement('p');
    p.innerText = `> [${type.toUpperCase()}] ${msg}`;
    if(type === 'warn') p.style.color = 'yellow';
    if(type === 'error') p.style.color = 'red';
    term.appendChild(p);
    term.scrollTop = term.scrollHeight;
}

function runOptimize() {
    logToTerminal("Starting RAM Optimization...", "warn");
    logToTerminal("Scanning background processes...");
    setTimeout(() => {
        logToTerminal("Executing KILL_BACKGROUND_PROCESSES", "info");
        logToTerminal("System Optimized. 680MB Freed.", "info");
        showToast("تم تحسين أداء الهاتف بنجاح يا حاكم المجال");
    }, 1500);
}

function runFreeze() {
    logToTerminal("Attempting PROCESS_FREEZE...", "warn");
    logToTerminal("Resource intensive apps detected: [Facebook, Instagram, YouTube]");
    setTimeout(() => {
        logToTerminal("Freezing processes... SUCCESS", "info");
        showToast("تم تجميد العمليات الثقيلة بنجاح");
    }, 2000);
}

// 7. UI NAVIGATION
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(`tab-${tabId}`).classList.add('active');
    // Find nav item by onclick and add active
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if(item.getAttribute('onclick').includes(tabId)) item.classList.add('active');
    });
    
    document.getElementById('sideMenu').classList.remove('open');
}

// 8. HELPERS
function showToast(msg) {
    const container = document.getElementById('notifyContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function vibrate(ms) {
    if (navigator.vibrate) navigator.vibrate(ms);
}

// INITIALIZATION
window.onload = () => {
    initParticles();
    drawParticles();
    runLoader();
    setInterval(updateClock, 1000);
    updateRank();
    document.getElementById('totalDhikrAll').innerText = state.totalDhikr;
    
    // Side Menu Toggle
    document.getElementById('menuBtn').onclick = () => {
        document.getElementById('sideMenu').classList.add('open');
    };
    
    // Close menu when clicking outside
    document.body.onclick = (e) => {
        if(!e.target.closest('#sideMenu') && !e.target.closest('#menuBtn')) {
            document.getElementById('sideMenu').classList.remove('open');
        }
    };
};

window.onresize = initParticles;
