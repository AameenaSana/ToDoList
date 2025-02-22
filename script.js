

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Task management code
function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else if ([...listContainer.children].some(li => li.textContent.slice(0, -1) === inputBox.value)) {
        alert("Task already exists!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
        saveData();
    }
    inputBox.value = "";
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

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

// Clear all tasks
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

showTask();


let gifs = document.querySelectorAll('.gif');
let currentIndex = 0;

function showNextGif() {
    gifs[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % gifs.length;
    gifs[currentIndex].classList.add('active');
}
setInterval(showNextGif, 3000);
if (gifs.length > 0) {
    setInterval(showNextGif, 12000);
}
function showNextGif() {
    console.log("Switching GIFs..."); // Debugging
    gifs[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % gifs.length;
    gifs[currentIndex].classList.add('active');
}
