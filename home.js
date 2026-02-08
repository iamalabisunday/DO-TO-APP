/////////////////////////////////////
// nameInput
/////////////////////////////////////

window.addEventListener("DOMContentLoaded", () => {
  const welcomeName = document.getElementById("highlight-name");
  const userName = JSON.parse(localStorage.getItem("Create Account"));

  if (!userName) {
    welcomeName.textContent = "Welcome";
    return false;
  }

  welcomeName.textContent = `${userName[0].name}`;
  return true;
});
