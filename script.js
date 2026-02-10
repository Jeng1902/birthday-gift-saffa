function unwrapGift() {
    const overlay = document.getElementById('gift-overlay');
    const mainContent = document.getElementById('main-content');
    overlay.style.transform = 'translateY(-100%)';
    mainContent.classList.remove('hidden');
    
    plantGarden();

    setTimeout(() => {
        window.scrollTo(0, 0);
        document.querySelector('.reveal').classList.add('active');
    }, 500);
}

function plantGarden() {
    const meadow = document.querySelector('.flower-meadow');
    const screenWidth = window.innerWidth;
    const flowerCount = Math.floor(screenWidth / 22); // Extra thick

    meadow.innerHTML = ''; 

    for (let i = 0; i < flowerCount; i++) {
        const lily = document.createElement('div');
        lily.className = 'lily-real';
        
        const randomLeft = (i * 22) + (Math.random() * 10);
        const randomHeight = 130 + Math.random() * 150;
        const randomDelay = Math.random() * 2;
        
        lily.style.left = `${randomLeft}px`;
        lily.style.animation = `sway ${3 + Math.random() * 2}s infinite ease-in-out ${randomDelay}s`;
        
        // This 'bottom' on the bloom-box MUST match the 'height' of the stem
        lily.innerHTML = `
            <div class="bloom-box" style="bottom: ${randomHeight}px;">
                <div class="petal-real" style="transform: rotate(0deg);"></div>
                <div class="petal-real" style="transform: rotate(72deg);"></div>
                <div class="petal-real" style="transform: rotate(144deg);"></div>
                <div class="petal-real" style="transform: rotate(216deg);"></div>
                <div class="petal-real" style="transform: rotate(288deg);"></div>
                <div class="center-dot"></div>
            </div>
            <div class="stem" style="height: ${randomHeight}px;"></div>
        `;
        meadow.appendChild(lily);
    }
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function createPetal() {
    const petals = ['🌸', '🤍', '🍃', '✨'];
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = Math.random() * 15 + 10 + "px";
    petal.style.animationDuration = Math.random() * 3 + 4 + "s";
    petal.style.opacity = Math.random() * 0.6 + 0.4;
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 7000);
}
setInterval(createPetal, 450);

// Confetti Logic
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];

function startConfetti() {
    if (particles.length > 0) return;
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 5 + 2,
            d: Math.random() * 2 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 85%)`
        });
    }
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.fill();
        p.y += p.d;
        if (p.y > canvas.height) p.y = -20;
    });
    requestAnimationFrame(animate);
}

window.addEventListener("scroll", () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        startConfetti();
    }
});