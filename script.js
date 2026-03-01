let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let lastLapTime = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
    let milliseconds = Math.floor((ms % 1000) / 10);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
   
    return (
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + ":" +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds)
    );
}

startBtn.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.innerText = formatTime(elapsedTime);
        }, 10);
        startBtn.innerText = "Pause";
        startBtn.style.backgroundColor = "#6c63ff"; 
    } else {
        isRunning = false;
        clearInterval(timer);
        startBtn.innerText = "Resume";
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    lastLapTime = 0;
    display.innerText = "00:00:00";
    startBtn.innerText = "Start";
    lapsList.innerHTML = "";
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const currentOverall = elapsedTime;
        const currentLapTime = currentOverall - lastLapTime; 
        
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="lap-count">${(lapsList.children.length + 1).toString().padStart(2, '0')}</span>
            <span class="lap-time">${formatTime(currentLapTime)}</span>
            <span class="overall-time">${formatTime(currentOverall)}</span>
        `;
        
        lapsList.prepend(li);
        lastLapTime = currentOverall; 
    }
});
