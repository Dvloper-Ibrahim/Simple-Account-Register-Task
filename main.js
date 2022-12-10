// Holding Form Inputs
let username = document.querySelector("input[name='username']");
let email = document.querySelector("input[name='email']");
let password = document.querySelector("input[name='password']");
let confirmPass = document.querySelector("input[name='confirm-password']");
let submit = document.querySelector("button.start");

// Displaying Email By Using SessionStorage
if (window.location.href === "http://127.0.0.1:5500/logged-in.html") {
  document.querySelector(".description").innerHTML = JSON.parse(
    sessionStorage.getItem("email")
  );
}

username.oninput = checkUserName;
// Function To Check Username
function checkUserName() {
  let checker = document.querySelector(".check-username");
  let value = username.value;

  // Check For Numbers At The Beginning Or The End
  let noNumsStartOrEnd = /(\b\d\w+|\w+\d\b)/g;

  if (noNumsStartOrEnd.test(value)) {
    checker.innerHTML = "Don't start or end with a number";
    checker.style = "color: red; bottom: -18px; z-index: 0;";
    username.style.backgroundColor = "rgb(255 0 0 / 10%)";
    return false;
  } else if (value.includes("_")) {
    checker.innerHTML = "'_' is not allowed";
    checker.style = "color: red; bottom: -18px; z-index: 0;";
    username.style.backgroundColor = "rgb(255 0 0 / 10%)";
    return false;
  } else if (value.length < 5 || value.length > 15) {
    checker.innerHTML = "Username must contain 5 : 15 characters";
    checker.style = "color: red; bottom: -18px; z-index: 0;";
    username.style.backgroundColor = "rgb(255 0 0 / 10%)";
    return false;
  } else {
    checker.innerHTML = "Valid username";
    checker.style = "color: #12dd12; bottom: -18px; z-index: 0;";
    username.style.backgroundColor = "rgb(0 255 0 / 20%)";
    setTimeout(() => {
      checker.style = "bottom: 0; z-index: -2;";
    }, 1000);
    return true;
  }
}

email.oninput = checkEmail;
// Function To Check Email
function checkEmail() {
  let checker = document.querySelector(".check-email");
  let value = email.value;

  // Email Validation
  let emailRe = /^\w+@\w+\.\w+/g;

  if (!emailRe.test(value)) {
    checker.innerHTML = "Invalid email";
    checker.style = "color: red; bottom: -18px; z-index: 0;";
    email.style.backgroundColor = "rgb(255 0 0 / 10%)";
    return false;
  } else {
    checker.innerHTML = "Valid email";
    checker.style = "color: #12dd12; bottom: -18px; z-index: 0;";
    email.style.backgroundColor = "rgb(0 255 0 / 20%)";
    setTimeout(() => {
      checker.style = "bottom: 0; z-index: -2;";
    }, 1000);
    return true;
  }
}

password.oninput = checkPassword;
// Function To Check Password
function checkPassword() {
  let checker = document.querySelector(".check-password");
  let value = password.value;

  // Password Validation
  let passwordRe = /(\w|\W){8,}/g;

  if (!passwordRe.test(value)) {
    checker.innerHTML = "Password must be at least 8 characters";
    checker.style = "color: red; bottom: -18px; z-index: 0;";
    password.style.backgroundColor = "rgb(255 0 0 / 10%)";
    return false;
  } else {
    checker.innerHTML = "Valid password";
    checker.style = "color: #12dd12; bottom: -18px; z-index: 0;";
    password.style.backgroundColor = "rgb(0 255 0 / 20%)";
    setTimeout(() => {
      checker.style = "bottom: 0; z-index: -2;";
    }, 1000);
    return true;
  }
}

confirmPass.oninput = checkConfirmPass;
// Function To Check Password Confirmation
function checkConfirmPass() {
  let checker = document.querySelector(".check-confirm-password");
  let value = confirmPass.value;

  // Password Validation
  if (value !== password.value) {
    checker.innerHTML = "Please enter the same password correctly";
    checker.style = "color: red; bottom: -20px; z-index: 0;";
    confirmPass.style.backgroundColor = "rgb(255 0 0 / 10%)";
    return false;
  } else {
    checker.innerHTML = "Ok";
    checker.style = "color: #12dd12; bottom: -20px; z-index: 0;";
    confirmPass.style.backgroundColor = "rgb(0 255 0 / 20%)";
    setTimeout(() => {
      checker.style = "bottom: 0; z-index: -2;";
    }, 1000);
    return true;
  }
}

// Function To Submit Data To The API
async function postDataToAPI(e) {
  e.preventDefault();

  let status;
  if (
    checkUserName() &&
    checkEmail() &&
    checkPassword() &&
    checkConfirmPass()
  ) {
    sessionStorage.setItem("email", JSON.stringify(email.value));
    await fetch("https://goldblv.com/api/hiring/tasks/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
        confirm_password: confirmPass.value,
      }),
    })
      .then((res) => {
        status = res.status;
        if (status === 200) {
          window.location.href = "./logged-in.html";
        }
      })
      .catch((e) => console.log(e));
  } else console.error("Please, correct the displayed errors");
}

// Submitting The Form
submit.onclick = postDataToAPI;
