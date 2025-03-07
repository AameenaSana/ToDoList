import { startTaskTimers } from './time.js';

let todoList = [];
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded!");

    const inputBox = document.getElementById("input-box");
    const timeInput = document.getElementById("timeInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const listContainer = document.getElementById("list-container");

    console.log("inputBox:", inputBox);
    console.log("timeInput:", timeInput);
    console.log("addTaskBtn:", addTaskBtn);
    console.log("listContainer:", listContainer);

   
    function addTask() {
        const taskText = inputBox.value.trim();
        const timeLimit = parseInt(timeInput.value); // Time in minutes

        if (taskText === '') {
            alert("You must write something!");
            return;
        }

        if ([...listContainer.children].some(li => li.textContent.slice(0, -1) === taskText)) {
            alert("Task already exists!");
            return;
        }

        // Create task element
        let li = document.createElement("li");
        li.innerHTML = `${taskText} <span>\u00d7</span>`;
        
        listContainer.appendChild(li);

        // Save to localStorage
        saveData();

        // Add the task with a timer
        if (!isNaN(timeLimit) && timeLimit > 0) {
            const task = {
                id: Date.now(),
                text: taskText,
                deadline: new Date().getTime() + timeLimit * 60000, // Convert minutes to ms
            };
            todoList.push(task);
            renderTask(task);
            startTaskTimers([task]); // Start countdown
        }

        inputBox.value = "";
        timeInput.value = ""; // Clear inputs
    }

    function renderTask(task) {
        const taskList = document.getElementById("taskList");
        const taskElement = document.createElement("div");
        taskElement.id = `task-${task.id}`;
        taskElement.innerHTML = `
            <p>${task.text}</p>
            <span id="timer-${task.id}"></span>
        `;
        taskList.appendChild(taskElement);
    }

    // Attach addTask to button click
    addTaskBtn.addEventListener("click", addTask);

    function saveData() {
        localStorage.setItem("data", listContainer.innerHTML);
    }

    function showTask() {
        let savedData = localStorage.getItem("data");
        if (savedData && savedData.includes("No tasks available")) {
            savedData = ""; // Remove the unwanted message
        }
        listContainer.innerHTML = savedData || "";
    }

    showTask();

    listContainer.addEventListener("click", function(e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            saveData();
        }
    });

    document.getElementById("clear-all").addEventListener("click", function() {
        if (confirm("Are you sure you want to clear all tasks?")) {
            listContainer.innerHTML = "";
            saveData();
        }
    });

    inputBox.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            addTask();
        }
    });

    // GIF Slideshow
    let gifs = document.querySelectorAll('.gif');
    let currentIndex = 0;

    if (gifs.length > 0) {
        function showNextGif() {
            console.log("Switching GIFs...");
            gifs[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % gifs.length;
            gifs[currentIndex].classList.add('active');
        }

        setInterval(showNextGif, 25000);
    }

    window.addTask = addTask;
});
