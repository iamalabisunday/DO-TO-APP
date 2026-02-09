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

  welcomeName.textContent = `${userName[0].name.split("")[0]}`;
  return true;
});
