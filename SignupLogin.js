// for realtime validation

// event listeners
document.getElementById("signup-name").addEventListener("blur", nameCheck);
document.getElementById("signup-email").addEventListener("blur", emailCheck);
document
  .getElementById("signup-password")
  .addEventListener("blur", passwordCheck);
document
  .getElementById("confirm-password")
  .addEventListener("blur", confirmPasswordCheck);
document.getElementById("birthday").addEventListener("blur", dobCheck);

function nameCheck() {
  const name = document.getElementById("signup-name").value.trim();
  const nameError = document.getElementById("nameError");
  const namePattern = /^[a-zA-Z0-9]{4,}$/;
  nameError.textContent = "";

  if (!name) {
    nameError.textContent = "Name is required";
    return false;
  } else if (!namePattern.test(name)) {
    nameError.textContent =
      "Username must be at least 4 characters and alphanumeric.";
    return false;
  }
  return true;
}
function emailCheck() {
  const email = document.getElementById("signup-email").value.trim();
  const emailError = document.getElementById("emailError");
  const emailPattern =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  emailError.textContent = "";

  if (!email) {
    emailError.textContent = "email is required";
    return false;
  } else if (!emailPattern.test(email)) {
    emailError.textContent = "Enter valid email id";
    return false;
  }
  return true;
}
function passwordCheck() {
  const password = document.getElementById("signup-password").value.trim();
  const passwordError = document.getElementById("passwordError");
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  passwordError.textContent = "";

  if (!password) {
    passwordError.textContent = "password is required";
    return false;
  } else if (!passwordPattern.test(password)) {
    passwordError.textContent =
      "Password must contain at least 8 characters, including uppercase, lowercase, number and special character";
    return false;
  }
  return true;
}
function confirmPasswordCheck() {
  const confirmPassword = document
    .getElementById("confirm-password")
    .value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  confirmPasswordError.textContent = "";

  if (!confirmPassword) {
    confirmPasswordError.textContent = "password is required";
    return false;
  } else if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Password not match";
    return false;
  }
  return true;
}
function dobCheck() {
  const dob = document.getElementById("birthday").value;
  const password = document.getElementById("signup-password").value.trim();
  const dobError = document.getElementById("dobError");

  dobError.textContent = "";

  if (!dob) {
    dobError.textContent = "DOB is required";
    return false;
  } else {
    const dobYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    const ageLimitYear = currentYear - 18;

    if (dobYear > ageLimitYear) {
      dobError.textContent = "You must be at least 18 years old";
      return false;
    }
  }
  return true;
}

// signUP form 
document.getElementById("container-login").style.display = "none";
document.getElementById("movie-app-container").style.display = "none";
document.getElementById("container-signup").style.display = "block";

const signUpForm = document.getElementById("signup-form");
document
  .getElementById("signup-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("container-login").style.display = "none";
    document.getElementById("movie-app-container").style.display = "none";
    document.getElementById("container-signup").style.display = "block";

    // form elements
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirmPassword = document
      .getElementById("confirm-password")
      .value.trim();

    const dob = document.getElementById("birthday").value;
    const selectedGender = document.querySelector(
      'input[name="inlineRadioOptions"]:checked'
    );
    const terms = document.getElementById("terms-checkbox").checked;

    // Error boxes
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById(
      "confirmPasswordError"
    );
    const dobError = document.getElementById("dobError");
    const genderError = document.getElementById("genderError");
    const termsError = document.getElementById("termsError");

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    dobError.textContent = "";
    genderError.textContent = "";
    termsError.textContent = "";

    let isValid = true;

    // name check
    const namePattern = /^[a-zA-Z0-9]{4,}$/;
    if (!name) {
      nameError.textContent = "Name is required";
      isValid = false;
    } else if (!namePattern.test(name)) {
      nameError.textContent =
        "Username must be at least 4 characters and alphanumeric.";
      isValid = false;
    }

    // email check
    const emailPattern =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!email) {
      emailError.textContent = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      emailError.textContent = "Enter valid email";
      isValid = false;
    }

    // Password check
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      passwordError.textContent = "password required";
      isValid = false;
    } else if (!passwordPattern.test(password)) {
      passwordError.textContent =
        "Password must contain at least 8 characters, including uppercase, lowercase, number and special character";
      isValid = false;
    }
    // confirm password
    if (!confirmPassword) {
      confirmPasswordError.textContent = "Please enter confirm password";
      isValid = false;
    } else if (password !== confirmPassword) {
      confirmPasswordError.textContent = "password not match";
      isValid = false;
    }
    // DOB check
    if (!dob) {
      dobError.textContent = "Date of Birth is required";
      isValid = false;
    } else {
      const dobYear = new Date(dob).getFullYear();
      const currentYear = new Date().getFullYear();
      const ageLimitYear = currentYear - 18;
      console.log(`current year : ${currentYear}
        DOb Year : ${dobYear}`);
      if (dobYear > ageLimitYear) {
        dobError.textContent = "You must be at least 18 years old";
        isValid = false;
      }
    }

    //     // Gender check
    if (!selectedGender) {
      genderError.textContent = "Please select a gender.";
      isValid = false;
    }
    // Terms check
    if (!terms) {
      termsError.textContent = "You must accept the terms and conditions";
      isValid = false;
    }

    // Local storage
    if (isValid) {
      console.log("Entered.............");
      const userData = {
        name,
        email,
        dob,
        gender: selectedGender.value,
        password,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      alert("Form submitted Successfully");
      document.getElementById("signup-form").reset();
      loginForm();
    }
  });
// //SignUP Form eventListner CLOSE

// // LoginForm
// // ....................
function loginForm() {
  document.getElementById("container-signup").style.display = "none";
  document.getElementById("movie-app-container").style.display = "none";
  document.getElementById("container-login").style.display = "block";
}

// // login button clicked
function loginUser() {
  // error box
  const emailError = document.getElementById("error-email");
  const passwordError = document.getElementById("error-password");
  emailError.textContent = "";
  passwordError.textContent = "";

  const loginEmail = document.getElementById("login-email").value;
  const loginPassword = document.getElementById("login-password").value;
  let isValid = true;
  if (!loginEmail) {
    emailError.textContent = "Enter an email address!";
    isValid = false;
  }
  if (!loginPassword) {
    passwordError.textContent = "Enter password!";
    isValid = false;
  }
  if (!isValid) {
    return;
  }
  // get stored data
  const storedData = localStorage.getItem("userData");
  if (!storedData) {
    alert("No user data found. Please sign up first.");
    return;
  }

  // Parse the JSON string back into an object
  const userData = JSON.parse(storedData);
  const userName = "Hi, " + userData.name;
  const storedEmail = userData.email;
  const storedPassword = userData.password;

  if (loginEmail === storedEmail && loginPassword === storedPassword) {
    alert("Login Successul!");
    document.getElementById("container-login").style.display = "none";
    document.getElementById("movie-app-container").style.display = "block";

    movieApp(userName);
  } else {
    alert("Invalid username or password");
  }
}
