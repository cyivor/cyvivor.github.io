const container = document.getElementById('container');
const imgDir = 'img'
const iconCount = 100;
const icons = [];
const iconTypes = [`${imgDir}/kuromi1.png`, `${imgDir}/kuromi2.png`, `${imgDir}/cat.png`, `${imgDir}/three.png`];
const message = document.getElementById('message');
const userInput = document.getElementById('userInput');
let charIndex = 0;
let text = "hi hany :3";

function createIcon() {
    const icon = document.createElement('div');
    icon.classList.add('icon');
    const img = document.createElement('img');
    img.src = iconTypes[Math.floor(Math.random() * iconTypes.length)];
    icon.appendChild(img);
    container.appendChild(icon);
    icons.push(icon);

    icon.style.left = Math.random() * window.innerWidth + 'px';
    icon.style.top = Math.random() * window.innerHeight + 'px';

    icon.vx = (Math.random() - 0.5) * 3;
    icon.vy = (Math.random() - 0.5) * 3;
}

function updateIcons() {
    icons.forEach(icon => {
        let x = parseFloat(icon.style.left);
        let y = parseFloat(icon.style.top);

        x += icon.vx;
        y += icon.vy;

        if (x < 0 || x > window.innerWidth - 32) icon.vx *= -1;
        if (y < 0 || y > window.innerHeight - 32) icon.vy *= -1;

        icon.style.left = x + 'px';
        icon.style.top = y + 'px';
    });
}

function typeWriter() {
    message.textContent = ""; // Clear existing text
    charIndex = 0;
    const currentText = text;

    function typeNextChar() {
        if (charIndex < currentText.length) {
            message.textContent += currentText.charAt(charIndex);
            charIndex++;
            setTimeout(typeNextChar, 100);
        }
    }

    typeNextChar(); // Start the typing process
}

function createCatPopup() {
    const messageText = message.textContent;
    if (messageText.length > 0) {
        const randomIndex = Math.floor(Math.random() * messageText.length);
        const randomChar = messageText.charAt(randomIndex);

        if (randomChar !== ' ') {
            const charElement = message.childNodes[0].childNodes[randomIndex];
            if (charElement) {
                const rect = charElement.getBoundingClientRect();
                const cat = document.createElement('div');
                cat.classList.add('icon');
                const img = document.createElement('img');
                img.src = 'cat.png';
                cat.appendChild(img);
                container.appendChild(cat);
                cat.style.left = rect.left + 'px';
                cat.style.top = rect.top - 40 + 'px';
                setTimeout(() => cat.remove(), 2000);
            }
        }
    }
}

userInput.addEventListener('input', function() {
    text = userInput.value;
    typeWriter();
});

for (let i = 0; i < iconCount; i++) {
    createIcon();
}

function animate() {
    updateIcons();
    requestAnimationFrame(animate);
}

animate();
typeWriter();
setInterval(createCatPopup, 5000);