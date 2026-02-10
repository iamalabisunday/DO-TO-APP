const email = document.getElementById("email");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const emailErrorMessage = document.getElementById("emailErrorMessage");
const passwordErrorMessage = document.getElementById("passwordErrorMessage");
const form = document.getElementById("form");

/////////////////////////////////////
// Getting Data from Local Storage
/////////////////////////////////////
const users = JSON.parse(localStorage.getItem("Create Account")) || [];

/////////////////////////////////////
// Email Validation
/////////////////////////////////////
function emailLoginValidation() {
  const emailValue = email.value.trim();

  if (!emailValue) {
    emailErrorMessage.textContent = "Enter your email";
    return false;
  }

  const matchedUser = users.find((user) => user.email === emailValue);

  if (!matchedUser) {
    emailErrorMessage.textContent = "Invalid email";
    return false;
  }

  emailErrorMessage.textContent = "";
  return true;
}

/////////////////////////////////////
// Password Validation
/////////////////////////////////////
function passwordLoginValidation() {
  const passwordValue = password.value.trim();

  if (!passwordValue) {
    passwordErrorMessage.textContent = "Enter your password";
    return false;
  }

  const matchedUser = users.find((user) => user.password === passwordValue);

  if (!matchedUser) {
    passwordErrorMessage.textContent = "Invalid password";
    return false;
  }

  passwordErrorMessage.textContent = "";
  return true;
}

/////////////////////////////////
// Enable Button
/////////////////////////////////
function enableButton() {
  submitBtn.disabled = !(emailLoginValidation() && passwordLoginValidation());
  return true;
}

////////////////////////////////////
// Event Listen
////////////////////////////////////
email.addEventListener("input", enableButton);
password.addEventListener("input", enableButton);

/////////////////////////////////////
// Submit
/////////////////////////////////////
form.addEventListener("submit", (e) => {
  e.preventDefault();

  window.location.href = "home.html";
});
