/////////////////////////////////////
// WELCOME USER
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
let tasks = JSON.parse(localStorage.getItem("taskValue")) || [];
let currentEditIndex = null;

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

  tasks.push({ title, desc, completed: false });
  saveTasks();

  newForm.reset();
  disableAddBtn();
  toggleNewTaskModal();
  renderTasks();
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
});

/////////////////////////////////////
// SAVE TO LOCALSTORAGE
/////////////////////////////////////
function saveTasks() {
  localStorage.setItem("taskValue", JSON.stringify(tasks));
}

/////////////////////////////////////
// RENDER TASKS
/////////////////////////////////////
function renderTasks(list = tasks) {
  taskList.innerHTML = "";

  list.forEach((task) => {
    const index = tasks.indexOf(task);
    taskList.append(createTaskItem(task, index));
  });
}

/////////////////////////////////////
// CREATE TASK ITEM
/////////////////////////////////////
function createTaskItem(task, index) {
  const taskItem = document.createElement("div");
  taskItem.className = "task-item";

  taskItem.innerHTML = `
    <div class="task-left">
      <div class="check-circle ${task.completed ? "completed" : ""}">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <div class="task-info">
        <h3>${task.title}</h3>
        <p>${task.desc}</p>
      </div>
    </div>

    <div class="task-actions">
      <div class="action-icon edit-icon">✏️</div>
      <div class="action-icon delete-icon">🗑️</div>
    </div>
  `;

  return taskItem;
}

/////////////////////////////////////
// TASK ACTIONS (EVENT DELEGATION)
/////////////////////////////////////
taskList.addEventListener("click", (e) => {
  const taskItem = e.target.closest(".task-item");
  if (!taskItem) return;

  const index = [...taskList.children].indexOf(taskItem);

  // COMPLETE
  if (e.target.closest(".check-circle")) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  // DELETE
  if (e.target.closest(".delete-icon")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  // EDIT
  if (e.target.closest(".edit-icon")) {
    openEditModal(index);
  }
});

/////////////////////////////////////
// EDIT MODAL
/////////////////////////////////////
function openEditModal(index) {
  currentEditIndex = index;
  editTitle.value = tasks[index].title;
  editDesc.value = tasks[index].desc;
  editTaskModal.classList.add("modal-toggle");
}

closeBtn.addEventListener("click", closeEditModal);

function closeEditModal() {
  editTaskModal.classList.remove("modal-toggle");
}

/////////////////////////////////////
// UPDATE TASK
/////////////////////////////////////
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (currentEditIndex === null) return;

  tasks[currentEditIndex].title = editTitle.value.trim();
  tasks[currentEditIndex].desc = editDesc.value.trim();

  saveTasks();
  closeEditModal();
  renderTasks();
});

/////////////////////////////////////
// SEARCH
/////////////////////////////////////
searchInput.addEventListener("input", handleSearch);

function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();

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
