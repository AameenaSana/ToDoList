const activeTimers = new Map();
const alarmSound = new Audio("alarm.mp3"); // Load the alarm sound
alarmSound.loop = true; // Make the alarm play continuously

export function formatTime(ms) {
    if (ms <= 0) return "TIME'S UP!";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
}

export function startTaskTimers(tasks) {
    tasks.forEach(task => {
        if (activeTimers.has(task.id)) return;

        const update = () => {
            const now = Date.now();
            const timeLeft = task.deadline - now;
            const timerElement = document.getElementById(`timer-${task.id}`);

            if (!timerElement) {
                clearInterval(activeTimers.get(task.id));
                activeTimers.delete(task.id);
                return;
            }

            timerElement.textContent = formatTime(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(activeTimers.get(task.id));
                activeTimers.delete(task.id);
                timerElement.textContent = "TIME'S UP!";
                timerElement.style.color = "#000000";
                timerElement.style.fontWeight = "bold";

                // Play alarm & show stop button
                alarmSound.play();
                showStopAlarmPopup();
            }
        };

        activeTimers.set(task.id, setInterval(update, 1000));
        update();
    });
}

// Function to show the stop alarm popup
function showStopAlarmPopup() {
    // Check if popup already exists
    if (document.getElementById("alarm-popup")) return;

    const popup = document.createElement("div");
    popup.id = "alarm-popup";
    popup.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    background: white; padding: 20px; box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
                    border-radius: 8px; text-align: center; z-index: 1000;">
            <p style="font-size: 18px; font-weight: bold;">Time's up! Click below to stop the alarm.</p>
            <button id="stopAlarmButton" style="background: black; color: white; border: none;
                    padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 5px;">
                Stop Alarm
            </button>
        </div>
    `;
    document.body.appendChild(popup);

    // Add event listener to stop the alarm
    document.getElementById("stopAlarmButton").addEventListener("click", stopAlarm);
}

// Function to stop the alarm
function stopAlarm() {
    alarmSound.pause();
    alarmSound.currentTime = 0; // Reset sound
    document.getElementById("alarm-popup").remove(); // Remove popup
}
