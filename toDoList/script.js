const myinput = document.getElementById("myInput");
const btn = document.querySelector(".btn");
const taskList = document.getElementById("taskList");

function addTask() {
    const taskText = myinput.value.trim();
    if(myinput.value !== "") {
        const newTask = document.createElement("li");
        const textSpan = document.createElement("span");
        textSpan.textContent = taskText;
        newTask.appendChild(textSpan);
        
        const deleteBtn = document.createElement("img");
        deleteBtn.src = "assets/close.png";
        deleteBtn.alt  = "Delete";
        deleteBtn.classList.add("deleteBtn");
        newTask.appendChild(deleteBtn);
        taskList.appendChild(newTask);

        myinput.value = "";
        addTaskEventListeners(newTask, deleteBtn)
        saveTasks();
    }
    else {
        alert("Please enter a task!")
    }
}

function addTaskEventListeners(newTask, deleteBtn) {
    newTask.addEventListener("click", (e) => {
        if(e.target.tagName === "LI") {
            e.target.classList.toggle("checkedTask");
            saveTasks();
        }
    });

    deleteBtn.addEventListener("click", (e) =>  {
        e.stopPropagation();
        newTask.remove();
        saveTasks();
    });
}

btn.addEventListener("click", addTask);
myinput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        addTask();
    }
});

function saveTasks() {
    localStorage.setItem("data", taskList.innerHTML);
}

function showSavedTasks()  {
    taskList.innerHTML = localStorage.getItem("data") || "";
    const tasks = taskList.querySelectorAll("li");
    tasks.forEach(task => {
        const deleteBtn = task.querySelector(".deleteBtn");
        addTaskEventListeners(task, deleteBtn);
    });
}

showSavedTasks();