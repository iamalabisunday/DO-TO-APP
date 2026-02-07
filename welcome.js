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
// Login Validation
/////////////////////////////////////
function loginValidation() {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (!emailValue) {
    emailErrorMessage.textContent = "Enter your email";
    return false;
  }

  if (!passwordValue) {
    passwordErrorMessage.textContent = "Enter your password";
    return false;
  }

  const matchedUser = users.find(
    (user) => user.email === emailValue && user.password === passwordValue,
  );

  if (!matchedUser) {
    emailErrorMessage.textContent = "Invalid email";
    passwordErrorMessage.textContent = "Invalid password";
    return false;
  }

  emailErrorMessage.textContent = "";
  passwordErrorMessage.textContent = "";
  return true;
}

/////////////////////////////////
// Enable Button
/////////////////////////////////
function enableButton() {
  submitBtn.disabled = !loginValidation();
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

  // if (loginValidation()) {
  //   return true;
  // }
  return (window.location.href = "home.html");
});
