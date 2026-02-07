const firstName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const nameErrorMess = document.getElementById("nameErrorMessage");
const emailErrorMes = document.getElementById("emailErrorMessage");
const passwordErrorMes = document.getElementById("passwordErrorMessage");
const confirmPasswordErrorMes = document.getElementById(
  "confirmPasswordErrorMessage",
);
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("form");

////////////////////////////////////////////
// // Name Validation
////////////////////////////////////////////
function nameValidation(input) {
  const name = input.value.trim();

  if (!name) {
    nameErrorMess.textContent = "Enter your name";
    return false;
  }

  if (name.length < 3) {
    nameErrorMess.textContent = "Name must be at least 3 characters";
    return false;
  }

  const number = "0123456789";
  const specialicons = "!@#$%^&*()_+=-";

  let hasNumber = false;
  let hasSpecialIcon = false;

  for (let i = 0; i < name.length; i++) {
    if (number.includes(name[i])) hasNumber = true;
    if (specialicons.includes(name[i])) hasSpecialIcon = true;
  }

  if (hasNumber) {
    nameErrorMess.textContent = "Must not contain number";
    return false;
  }

  if (hasSpecialIcon) {
    nameErrorMess.textContent = "Must not contain special icon";
    return false;
  }

  nameErrorMess.textContent = "";
  return true;
}
////////////////////////////////////////////
// // Email Validation
////////////////////////////////////////////
function emailValidation(input) {
  const value = input.value.trim().toLowerCase();

  if (!value) {
    emailErrorMes.textContent = "Enter your email";
    return false;
  }

  if (value === "") {
    emailErrorMes.textContent = "Enter a valid email";
    return false;
  }

  const gamilicons = "@";
  const dotIcon = ".";

  let hasGamilicons = false;
  let hasDotIcon = false;

  for (let i = 0; i < value.length; i++) {
    if (gamilicons.includes(value[i])) hasGamilicons = true;
    if (dotIcon.includes(value[i])) hasDotIcon = true;
  }

  if (!hasGamilicons || !hasDotIcon) {
    emailErrorMes.textContent = "Enter a valid email";
    return false;
  }

  emailErrorMes.textContent = "";
  return true;
}
////////////////////////////////////////////
// Password Validation
////////////////////////////////////////////
function passwordValidation(input) {
  const password = input.value.trim();
  if (!password) {
    passwordErrorMes.textContent = "Enter your password";
    return false;
  }
  if (password === "") {
    passwordErrorMes.textContent = "Enter a valid password";
    return false;
  }
  if (password.length < 8) {
    passwordErrorMes.textContent = "Password must be at least 8 characters";
    return false;
  }

  const number = "0123456789";
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const capitalAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialicons = "!@#$%^&*()_+=-";

  let hasNumber = false;
  let hasAlphabet = false;
  let hasCapitalAlphabet = false;
  let hasSpecialIcon = false;

  for (let i = 0; i < password.length; i++) {
    let chr = password[i];

    if (number.includes(chr)) hasNumber = true;

    if (alphabet.includes(chr)) hasAlphabet = true;

    if (capitalAlphabet.includes(chr)) hasCapitalAlphabet = true;

    if (specialicons.includes(chr)) hasSpecialIcon = true;
  }

  if (!hasNumber) {
    passwordErrorMes.textContent = "Password must contain a number";
    return false;
  }

  if (!hasAlphabet) {
    passwordErrorMes.textContent = "Password must contain an alphabet";
    return false;
  }

  if (!hasCapitalAlphabet) {
    passwordErrorMes.textContent = "Password must contain a capital alphabet";
    return false;
  }

  if (!hasSpecialIcon) {
    passwordErrorMes.textContent = "Password must contain a special icon";
    return false;
  }

  passwordErrorMes.textContent = "";
  return true;
}
////////////////////////////////////////////
// Confirm Password
////////////////////////////////////////////
function confirmPasswordValidation(password, confirmPassword) {
  const passValue = password.value.trim();
  const confirmValue = confirmPassword.value.trim();

  if (!confirmValue) {
    confirmPasswordErrorMes.textContent = "Confirm your password";
    return false;
  }

  if (confirmValue !== passValue) {
    confirmPasswordErrorMes.textContent = "Passwords do not match";
    return false;
  }

  confirmPasswordErrorMes.textContent = "";
  return true;
}

////////////////////////////////////////////
// Enable Button
////////////////////////////////////////////
function checkFormValidity() {
  const isNameValid = nameValidation(firstName);
  const isEmailValid = emailValidation(email);
  const isPasswordValid = passwordValidation(password);
  const isConfirmValid = confirmPasswordValidation(password, confirmPassword);

  if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid) {
    submitBtn.disabled = false;
  }

  return true;
}

////////////////////////////////////////////
// Event Listen
////////////////////////////////////////////
firstName.addEventListener("input", checkFormValidity);
email.addEventListener("input", checkFormValidity);
password.addEventListener("input", checkFormValidity);
confirmPassword.addEventListener("input", checkFormValidity);

////////////////////////////////////////////
// Submit
////////////////////////////////////////////
let createAccount = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dataSave = {
    name: firstName.value,
    email: email.value,
    password: password.value,
  };

  // Push to Arry
  createAccount.push(dataSave);
  console.log(createAccount);

  // Save to local storage
  localStorage.setItem("Create Account", JSON.stringify(createAccount));

  form.reset();
});
