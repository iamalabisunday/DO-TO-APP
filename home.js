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
// Opena Task
/////////////////////////////////////
const taskBtn = document.getElementById("taskBtn");
const newTaskToggle = document.getElementById("new-task-toggle");

taskBtn.addEventListener("click", openTaskModal);

function openTaskModal() {
  if (newTaskToggle.classList.contains("modal-toggle")) {
    newTaskToggle.classList.remove("modal-toggle");
    return false;
  }
  newTaskToggle.classList.add("modal-toggle");
  return true;
}

/////////////////////////////////////
// close New Task Modal
/////////////////////////////////////
const closeNewTask = document.getElementById("close-new-task");

newTaskToggle.addEventListener("click", closeTaskModal);

function closeTaskModal() {
  if (closeNewTask.classList.contains("new-task-modal")) {
    closeNewTask.classList.remove("new-task-modal");
    return false;
  }
  closeNewTask.classList.add("new-task-modal");
  return true;
}
