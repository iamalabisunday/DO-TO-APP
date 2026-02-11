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
let toDOTasks = [];

newForm.addEventListener("submit", addTask);

function addTask(e) {
  e.preventDefault();

  const title = newTitle.value.trim();
  const desc = newDesc.value.trim();

  if (!title || !desc) return;

  const toDOTask = { title, desc };

  toDOTasks.push(toDOTask);

  localStorage.setItem("taskValue", JSON.stringify(toDOTasks));

  newForm.reset();
  toggleNewTaskModal();
  printItemsOnUI();
}

/////////////////////////////////////
//Fetch data from LS
/////////////////////////////////////

function fetchtasks() {
  if (localStorage.getItem("taskValue")) {
    toDOTasks = JSON.parse(localStorage.getItem("taskValue"));
  }
  printItemsOnUI();
}

fetchtasks();

/////////////////////////////////////
// Print Data From Local Storageon the UI
/////////////////////////////////////

function printItemsOnUI() {
  taskList.innerHTML = "";

  toDOTasks.forEach(function (item) {
    let title = item.title;
    let desc = item.desc;

    const taskItemDiv = document.createElement("div");
    taskItemDiv.className = "task-item";

    const taskLeftDiv = document.createElement("div");
    taskLeftDiv.className = "task-left";

    const markCircleCheck = document.createElement("i");
    markCircleCheck.classList.add("fa-solid", "fa-circle-check");

    const taskInfoDiv = document.createElement("div");
    taskInfoDiv.className = "task-info";

    const titleEl = document.createElement("h3");
    titleEl.textContent = title;

    const descEl = document.createElement("p");
    descEl.textContent = desc;

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
});

/////////////////////////////////////
// TASK ACTIONS (EVENT DELEGATION)
/////////////////////////////////////
taskList.addEventListener("click", (e) => {
  const taskItem = e.target.closest(".task-item");
  if (!taskItem) return;

  const index = [...taskList.children].indexOf(taskItem);

  // DELETE
  if (e.target.closest(".delete-icon")) {
    deleteTask(index);
  }

  // EDIT
  if (e.target.closest(".edit-icon")) {
    openEditModal(index);
  }
});

/////////////////////////////////////
// DELETE
/////////////////////////////////////

function deleteTask(index) {
  // Remove the task at that index
  toDOTasks.splice(index, 1);

  // Update localStorage
  localStorage.setItem("taskValue", JSON.stringify(toDOTasks));

  // Re-render UI
  fetchtasks();
}

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
  printItemsOnUI();
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

  printItemsOnUI(filteredTasks);
}

/////////////////////////////////////
// INITIAL LOAD
/////////////////////////////////////
printItemsOnUI();
