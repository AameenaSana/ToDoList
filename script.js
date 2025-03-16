import { startTaskTimers, formatTime } from './time.js';

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Get ALL elements first
    const inputBox = document.getElementById("input-box");
    const timeInput = document.getElementById("timeInput");
    const addButton = document.getElementById("addButton");
    const listContainer = document.getElementById("list-container");
    const clearAllButton = document.getElementById("clear-all");

    // 2. Add event listeners properly
    addButton.addEventListener("click", addTask);
    clearAllButton.addEventListener("click", clearAll);
    inputBox.addEventListener("keypress", handleEnter);

    // 3. Initialize app
    showTasks();
    startTaskTimers(todoList);

    function addTask() {
        const taskText = inputBox.value.trim();
        const timeLimit = parseInt(timeInput.value);

        if (!taskText || isNaN(timeLimit)) {
            alert("Please fill both fields!");
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            deadline: Date.now() + timeLimit * 60000,
            checked: false
        };

        todoList.push(newTask);
        saveData();
        showTasks();
        startTaskTimers([newTask]);

        inputBox.value = "";
        timeInput.value = "";
    }

    function handleEnter(e) {
        if (e.key === "Enter") addTask();
    }

    function showTasks() {
        listContainer.innerHTML = todoList.map(task => `
            <li data-task-id="${task.id}" class="${task.checked ? 'checked' : ''}">
                ${task.text}
                <span class="timer" id="timer-${task.id}">
                    ${formatTime(task.deadline - Date.now())}
                </span>
                <span class="delete-btn">×</span>
            </li>
        `).join("");
    }

    function saveData() {
        localStorage.setItem("todoList", JSON.stringify(todoList));
    }

    function clearAll() {
        if (confirm("Clear all tasks?")) {
            todoList = [];
            saveData();
            showTasks();
        }
    }

    // Task interactions
    listContainer.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if (!li) return;

        if (e.target.classList.contains("delete-btn")) {
            const taskId = parseInt(li.dataset.taskId);
            todoList = todoList.filter(task => task.id !== taskId);
            li.remove();
            saveData();
        } else {
            const taskId = parseInt(li.dataset.taskId);
            const task = todoList.find(t => t.id === taskId);
            task.checked = !task.checked;
            li.classList.toggle("checked");
            saveData();
        }
    });
});