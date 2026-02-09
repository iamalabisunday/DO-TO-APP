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

taskBtn.addEventListener("click", openTaskModal);
closeNewTask.addEventListener("click", openTaskModal);

function openTaskModal() {
  if (newTaskToggle.classList.contains("modal-toggle")) {
    newTaskToggle.classList.remove("modal-toggle");
    return false;
  }
  newTaskToggle.classList.add("modal-toggle");
  return true;
}

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
