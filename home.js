/////////////////////////////////////
// nameInput
/////////////////////////////////////
window.addEventListener("DOMContentLoaded", () => {
  const welcomeName = document.getElementById("highlight-name");
  const userName = JSON.parse(localStorage.getItem("Create Account"));

  if (!userName) {
    welcomeName.textContent = "First name";
    return false;
  }
  const firstName = userName[0].name.split(" ")[0];
  welcomeName.textContent = `${firstName}`;
  return true;
});

/////////////////////////////////////
// New Task - Open and close New Task Modal
/////////////////////////////////////
const taskBtn = document.getElementById("taskBtn");
const newTaskToggle = document.getElementById("new-task-toggle");
const closeNewTask = document.getElementById("close-new-task");

taskBtn.addEventListener("click", openCloseTaskModal);
closeNewTask.addEventListener("click", openCloseTaskModal);

function openCloseTaskModal() {
  if (newTaskToggle.classList.contains("modal-toggle")) {
    newTaskToggle.classList.remove("modal-toggle");
    return false;
  }
  newTaskToggle.classList.add("modal-toggle");
  return true;
}

/////////////////////////////////////
// New Task Modal Form
/////////////////////////////////////
const newTitle = document.getElementById("new-title");
const newDesc = document.getElementById("new-desc");
const addNewBtn = document.getElementById("addNewBtn");
const form = document.getElementById("newForm");

form.addEventListener("submit", newTaskValue);

let newTaskDatas = [];

function newTaskValue(e) {
  e.preventDefault();

  const title = newTitle.value.trim();
  const desc = newDesc.value.trim();

  const newTaskData = {
    title,
    desc,
  };

  newTaskDatas.push(newTaskData);

  localStorage.setItem("taskValue", JSON.stringify(newTaskDatas));

  form.reset();
  openCloseTaskModal();
  fetchItems();
}

/////////////////////////////////////
// Disable Btn
/////////////////////////////////////
function disableNewBtn() {
  const title = newTitle.value.trim();
  const desc = newDesc.value.trim();

  if (!(title && desc)) {
    addNewBtn.disabled = true;
  } else {
    addNewBtn.disabled = false;
  }
}

/////////////////////////////////////
// Even Listener
/////////////////////////////////////
newTitle.addEventListener("input", disableNewBtn);
newDesc.addEventListener("input", disableNewBtn);

/////////////////////////////////////
// clear New Task Modal Form
/////////////////////////////////////
const cancelNewBtn = document.getElementById("cancelNewBtn");

cancelNewBtn.addEventListener("click", clearTaskValue);

function clearTaskValue(e) {
  e.preventDefault();
  form.reset();
}

/////////////////////////////////////
// fetch data from localStage
/////////////////////////////////////
function fetchItems() {
  if (localStorage.getItem("taskValue")) {
    researchIteams = JSON.parse(localStorage.getItem("taskValue"));
  }
}

fetchItems();

//////////////////////////////////////////
// Print Data from LocalStroge on the UI
//////////////////////////////////////////
function printItems() {}

/////////////////////////////////////
// Edit Task - Open and close New Task Modal
/////////////////////////////////////
const editIcon = document.getElementById("editIcon");
const editTaskModal = document.getElementById("edit-task-modal");
const closeBtn = document.getElementById("closeBtn");

editIcon.addEventListener("click", openEditModal);
closeBtn.addEventListener("click", openEditModal);

function openEditModal() {
  if (editTaskModal.classList.contains("modal-toggle")) {
    editTaskModal.classList.remove("modal-toggle");
    return false;
  }
  editTaskModal.classList.add("modal-toggle");
  return true;
}
