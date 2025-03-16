const activeTimers = new Map();

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
                timerElement.style.color = "#ff0000";
                timerElement.style.fontWeight = "bold";
            }
        };

        activeTimers.set(task.id, setInterval(update, 1000));
        update();
    });
}
