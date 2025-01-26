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
    listContainer.innerHTML = localStorage.getItem("data") || "";
    if (listContainer.innerHTML === "") {
        listContainer.innerHTML = "<p style='color: #888; text-align: center;'>No tasks available</p>";
    }
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
    // Remove the active class from the current gif
    gifs[currentIndex].classList.remove('active');
    
    // Update the index and ensure it loops back around when it reaches the end
    currentIndex = (currentIndex + 1) % gifs.length;
    
    // Add the active class to the next gif
    gifs[currentIndex].classList.add('active');
}

// Start the GIF slideshow (change GIF every 3 seconds)
setInterval(showNextGif, 3000);