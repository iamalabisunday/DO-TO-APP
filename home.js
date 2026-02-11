/////////////////////////////////////
// WELCOME USER WITH THIER NAME
/////////////////////////////////////
window.addEventListener("DOMContentLoaded", () => {
  const welcomeName = document.getElementById("highlight-name");
  const userName = JSON.parse(localStorage.getItem("Create Account"));

  if (!userName) {
    welcomeName.textContent = "First name";
    return;
  }

  welcomeName.textContent = userName[0].name.split(" ")[0];
});

/////////////////////////////////////
// SELECTORS
/////////////////////////////////////
const taskBtn = document.getElementById("taskBtn");
const newTaskToggle = document.getElementById("new-task-toggle");
const closeNewTask = document.getElementById("close-new-task");

const newTitle = document.getElementById("new-title");
const newDesc = document.getElementById("new-desc");
const addNewBtn = document.getElementById("addNewBtn");
const newForm = document.getElementById("newForm");
const cancelNewBtn = document.getElementById("cancelNewBtn");

const taskList = document.querySelector(".task-list");
const searchInput = document.querySelector(".search-input");

// Edit modal
const editTaskModal = document.getElementById("edit-task-modal");
const closeBtn = document.getElementById("closeBtn");
const editTitle = document.getElementById("edit-title");
const editDesc = document.getElementById("edit-desc");
const editForm = editTaskModal.querySelector("form");

/////////////////////////////////////
// STATE
/////////////////////////////////////
// Consolidating state into a single source of truth
let tasks = JSON.parse(localStorage.getItem("taskValue")) || [];
let currentEditId = null; // Changed to ID for better reliability

/////////////////////////////////////
// NEW TASK MODAL
/////////////////////////////////////
taskBtn.addEventListener("click", toggleNewTaskModal);
closeNewTask.addEventListener("click", toggleNewTaskModal);

function toggleNewTaskModal() {
  newTaskToggle.classList.toggle("modal-toggle");
}

/////////////////////////////////////
// ADD TASK
/////////////////////////////////////
newForm.addEventListener("submit", addTask);

function addTask(e) {
  e.preventDefault();

  const title = newTitle.value.trim();
  const desc = newDesc.value.trim();

  if (!title || !desc) return;

  const newTask = {
    id: Date.now(), // Unique ID
    title,
    desc,
    completed: false, // Default completion state
  };

  tasks.push(newTask);
  saveAndRender();

  newForm.reset();
  toggleNewTaskModal();
  disableAddBtn();
}

/////////////////////////////////////
// SAVE & RENDER HELPER
/////////////////////////////////////
function saveAndRender() {
  localStorage.setItem("taskValue", JSON.stringify(tasks));
  // Re-run search/filter logic if search input has value, otherwise render all
  handleSearch();
}

/////////////////////////////////////
// RENDER TASKS
/////////////////////////////////////
function renderTasks(tasksToRender = tasks) {
  taskList.innerHTML = "";

  if (tasksToRender.length === 0) {
    // Optional: could add a "No tasks found" message here
    return;
  }

  tasksToRender.forEach(function (task) {
    const taskItemDiv = document.createElement("div");
    taskItemDiv.className = `task-item ${task.completed ? "completed" : ""}`;
    taskItemDiv.dataset.id = task.id; // Store ID on the element

    const taskLeftDiv = document.createElement("div");
    taskLeftDiv.className = "task-left";

    // Mark Complete Icon
    const markCircleCheck = document.createElement("i");
    markCircleCheck.classList.add("fa-circle-check", "check-icon");
    // Toggle solid vs regular based on completion
    if (task.completed) {
      markCircleCheck.classList.add("fa-solid");
    } else {
      markCircleCheck.classList.add("fa-regular");
    }

    const taskInfoDiv = document.createElement("div");
    taskInfoDiv.className = "task-info";

    const titleEl = document.createElement("h3");
    titleEl.textContent = task.title;

    const descEl = document.createElement("p");
    descEl.textContent = task.desc;

    taskInfoDiv.append(titleEl, descEl);
    taskLeftDiv.append(markCircleCheck, taskInfoDiv);

    const taskActionsDiv = document.createElement("div");
    taskActionsDiv.className = "task-actions";

    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square", "edit-icon");

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");

    taskActionsDiv.append(editIcon, deleteIcon);

    taskItemDiv.append(taskLeftDiv, taskActionsDiv);
    taskList.appendChild(taskItemDiv);
  });
}

/////////////////////////////////////
// DISABLE ADD BUTTON
/////////////////////////////////////
function disableAddBtn() {
  addNewBtn.disabled = !(newTitle.value.trim() && newDesc.value.trim());
}

newTitle.addEventListener("input", disableAddBtn);
newDesc.addEventListener("input", disableAddBtn);

/////////////////////////////////////
// CANCEL NEW TASK
/////////////////////////////////////
cancelNewBtn.addEventListener("click", (e) => {
  e.preventDefault();
  newForm.reset();
  disableAddBtn();
  toggleNewTaskModal();
});

/////////////////////////////////////
// TASK ACTIONS (EVENT DELEGATION)
/////////////////////////////////////
taskList.addEventListener("click", (e) => {
  const taskItem = e.target.closest(".task-item");
  if (!taskItem) return;

  const taskId = Number(taskItem.dataset.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) return;

  // MARK AS COMPLETE (Clicking icon OR text)
  if (e.target.closest(".check-icon") || e.target.closest(".task-info")) {
    toggleComplete(taskIndex);
  }

  // DELETE
  if (e.target.closest(".delete-icon")) {
    deleteTask(taskIndex);
  }

  // EDIT
  if (e.target.closest(".edit-icon")) {
    openEditModal(taskIndex);
  }
});

/////////////////////////////////////
// TOGGLE COMPLETE
/////////////////////////////////////
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

/////////////////////////////////////
// DELETE
/////////////////////////////////////
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

/////////////////////////////////////
// EDIT MODAL
/////////////////////////////////////
function openEditModal(index) {
  // We store the ID instead of index for editing to be safe against array mutations
  const task = tasks[index];
  currentEditId = task.id;

  editTitle.value = task.title;
  editDesc.value = task.desc;

  editTaskModal.classList.add("modal-toggle");
}

closeBtn.addEventListener("click", closeEditModal);

function closeEditModal() {
  editTaskModal.classList.remove("modal-toggle");
  currentEditId = null;
}

/////////////////////////////////////
// UPDATE TASK
/////////////////////////////////////
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (currentEditId === null) return;

  const taskIndex = tasks.findIndex((t) => t.id === currentEditId);
  if (taskIndex === -1) return;

  // Update the existing task
  tasks[taskIndex].title = editTitle.value.trim();
  tasks[taskIndex].desc = editDesc.value.trim();

  closeEditModal();
  saveAndRender();
});

/////////////////////////////////////
// SEARCH
/////////////////////////////////////
searchInput.addEventListener("input", handleSearch);

function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();

  // If no query, render all tasks
  if (!query) {
    renderTasks(tasks);
    return;
  }

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(query) ||
      task.desc.toLowerCase().includes(query),
  );

  renderTasks(filteredTasks);
}

/////////////////////////////////////
// INITIAL LOAD
/////////////////////////////////////
renderTasks();
