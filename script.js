// ---------------------------------------------------------
// CONFIGURATION: Set your birthday here!
// Format: "Month Day, Year HH:MM:SS" (e.g., "Dec 31, 2026 23:59:59")
const BIRTHDAY_DATE = "May 25, 2026 00:00:00";
const CELEBRANT_NAME = "Dear Anushka,Pochaa,Babu,Shona & Annu";
const VALID_DOB = "2006-05-25"; // correct date format for the calendar input
// ---------------------------------------------------------

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const targetDateText = document.getElementById('targetDateText');
const messageEl = document.getElementById('message');
const birthdaySong = document.getElementById('birthdaySong');
const loginScreen = document.getElementById('loginScreen');
const countdownCard = document.getElementById('countdownCard');
const loginForm = document.getElementById('loginForm');
const dobInput = document.getElementById('dobInput');
const loginStatus = document.getElementById('loginStatus');

const targetDate = new Date(BIRTHDAY_DATE);
document.getElementById('celebrantBadge').innerText = `Happy Birthday to you ${CELEBRANT_NAME}!`;

targetDateText.innerText = `Target Date: ${targetDate.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
})}`;

function updateCountdown() {
    const currentTime = new Date();
    const diff = targetDate - currentTime;

    if (diff <= 0) {
        clearInterval(timerInterval);
        daysEl.innerText = "00";
        hoursEl.innerText = "00";
        minutesEl.innerText = "00";
        secondsEl.innerText = "00";

        messageEl.innerText = "🎉 HAPPY BIRTHDAY! Time to Celebrate! 🎈";
        triggerCelebration();
        playSong();
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysEl.innerText = d < 10 ? '0' + d : d;
    hoursEl.innerText = h < 10 ? '0' + h : h;
    minutesEl.innerText = m < 10 ? '0' + m : m;
    secondsEl.innerText = s < 10 ? '0' + s : s;
}

function triggerCelebration() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

function playSong() {
    if (birthdaySong) {
        birthdaySong.play().catch(error => {
            console.log("Audio playback failed. Browser might be blocking autoplay until user interacts.", error);
        });
    }
}

function showHomePage() {
    loginScreen.classList.add('hidden');
    countdownCard.classList.remove('hidden');
    messageEl.innerText = "Welcome back! The countdown begins now. 🎶";
    window.location.hash = 'home';
    updateCountdown();
    playSong();
}

function handleLogin(event) {
    event.preventDefault();
    const dobValue = dobInput.value;

    if (!dobValue) {
        loginStatus.textContent = 'Please select your date of birth from the calendar.';
        return;
    }

    if (dobValue === VALID_DOB) {
        loginStatus.textContent = '';
        showHomePage();
    } else {
        loginStatus.textContent = 'Password incorrect try again.';
        loginStatus.style.color = '#fecaca';
    }
}

loginForm.addEventListener('submit', handleLogin);

dobInput.addEventListener('focus', () => {
    if (typeof dobInput.showPicker === 'function') {
        dobInput.showPicker();
    }
});

const timerInterval = setInterval(updateCountdown, 1000);
updateCountdown();

window.addEventListener('load', () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#f472b6']
    });
});
