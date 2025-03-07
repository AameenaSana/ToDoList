export function startTaskTimers(tasks) {
    console.log("Starting task timers for:", tasks);

    tasks.forEach(task => {
        const timerElement = document.getElementById(`timer-${task.id}`);
        console.log(`Checking task ${task.id}:`, task);

        if (!timerElement) {
            console.error(`Timer element not found for task ${task.id}`);
            return;
        }

        function updateTimer() {
            const now = new Date().getTime();
            const timeLeft = task.deadline - now;

            if (timeLeft <= 0) {
                console.log(`Task ${task.id} time is up!`);
                timerElement.innerHTML = "Time's up!";
                clearInterval(timerInterval);
                removeTaskFromUI(task.id);
            } else {
                timerElement.innerHTML = formatTime(timeLeft);
            }
        }

        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);

        scheduleAlarms(task);
    });
}


function scheduleAlarms(task) {
    const now = new Date().getTime();
    const timeRemaining = task.deadline - now;
    const fiveMinBefore = task.deadline - 5 * 60 * 1000;

    if (fiveMinBefore > now) {
        setTimeout(() => {
            playAlarm();
            alert(`Reminder: Task "${task.text}" is due in 5 minutes!`);
        }, fiveMinBefore - now);
    }

    if (timeRemaining > 0) {
        setTimeout(() => {
            playAlarm();
            alert(`Time's up! Task "${task.text}" is now due.`);
        }, timeRemaining);
    }
}

function playAlarm() {
    const audio = new Audio('alarm.mp3');
    audio.play().catch(error => console.log("Autoplay failed: ", error));
}

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60)) % 60;
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours}h ${minutes}m ${seconds}s`;
}

function removeTaskFromUI(taskId) {
    const taskElement = document.getElementById(`task-${taskId}`);
    if (taskElement) {
        taskElement.classList.add("expired");
        setTimeout(() => taskElement.remove(), 2000);
    }
}
