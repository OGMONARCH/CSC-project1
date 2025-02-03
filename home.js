// --- Element Selections ---
const taskInput = document.querySelector("#task");
const deadlineInput = document.querySelector("#deadline");
const startTimeInput = document.querySelector("#startTime");
const endTimeInput = document.querySelector("#endTime");
const priorityInputs = document.querySelectorAll("input[name='priority']");
const taskList = document.querySelector("#task-list");
const addTaskBtn = document.querySelector("#add-task-btn");
const filters = document.querySelector("#filters");
const searchBar = document.querySelector("#searchBar");
const themeColorInput = document.querySelector("#themeColor");

// --- Retrieve Tasks from Local Storage (or initialize as empty array) ---
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// --- Function: Add Task ---
function addTask() {
  const taskName = taskInput.value.trim();
  const deadline = deadlineInput.value;
  const startTime = startTimeInput.value;
  const endTime = endTimeInput.value;
  const priority = [...priorityInputs].find(input => input.checked)?.value;

  if (!taskName || !deadline || !startTime || !endTime || !priority) {
    alert("Please fill in all fields!");
    return;
  }

  const newTask = {
    id: Date.now(),
    name: taskName,
    deadline,
    startTime,
    endTime,
    priority,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  resetForm();
}

// --- Function: Render Tasks ---
function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<p class="empty-state">No tasks to show.</p>`;
    return;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>
        <strong>${task.name}</strong> <em>(${task.priority})</em><br>
        Deadline: ${task.deadline}<br>
        Time: ${task.startTime} - ${task.endTime}
      </span>
    `;

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete";
    completeBtn.textContent = task.completed ? "Mark Pending" : "Mark Complete";
    completeBtn.addEventListener("click", () => toggleComplete(task.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// --- Function: Save Tasks to Local Storage ---
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// --- Function: Reset Form ---
function resetForm() {
  taskInput.value = "";
  deadlineInput.value = "";
  startTimeInput.value = "";
  endTimeInput.value = "";
  priorityInputs.forEach(input => (input.checked = false));
}

// --- Function: Toggle Task Completion ---
function toggleComplete(taskId) {
  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

// --- Function: Delete Task ---
function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  renderTasks();
}

// --- Filter Button Functionality ---
filters.addEventListener("click", event => {
  if (event.target.tagName === "BUTTON") {
    const filter = event.target.getAttribute("data-filter");
    renderTasks(filter);
  }
});

// --- Search Bar Functionality ---
searchBar.addEventListener("input", event => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm)
  );
  taskList.innerHTML = "";
  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<p class="empty-state">No tasks match your search.</p>`;
    return;
  }
  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>
        <strong>${task.name}</strong> <em>(${task.priority})</em><br>
        Deadline: ${task.deadline}<br>
        Time: ${task.startTime} - ${task.endTime}
      </span>
    `;
    taskList.appendChild(li);
  });
});

// --- Theme Color Changer ---
themeColorInput.addEventListener("change", () => {
  const newColor = themeColorInput.value;
  document.documentElement.style.setProperty("--primary-color", newColor);
  document.documentElement.style.setProperty("--hover-color", newColor);
});

// --- Load Tasks on DOM Content Loaded ---
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});

// --- Event Listener for Add Task Button ---
addTaskBtn.addEventListener("click", addTask);
