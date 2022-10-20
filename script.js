//Toggle mobile menu
function toggleMobileMenu(menu) {
  menu.classList.toggle("open");
}

//Stat number animation
const counters = document.querySelectorAll(".counter");

counters.forEach((counterFormatted) => {
  counterFormatted.innerText = "0";

  const updateCounter = () => {
    const target = +counterFormatted.getAttribute("data-target");
    const c = +counterFormatted.innerText;
    const increment = target / 400;
    if (c < target) {
      counterFormatted.innerText = `${Math.ceil(c + increment)}`;
      setTimeout(updateCounter, 1);
    } else {
      counterFormatted.innerText = target;
    }
  };
  updateCounter();
});

//form validation
const form = document.getElementById("form");
const inputName = document.getElementById("inputName");
const inputEmail = document.getElementById("inputEmail");
const inputSubject = document.getElementById("inputSubject");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(inputEmail).toLowerCase());
};

const validateInputs = () => {
  const inputNameValue = inputName.value.trim();
  const inputEmailValue = inputEmail.value.trim();
  const inputSubjectValue = inputSubject.value.trim();

  if (inputNameValue === "") {
    setError(inputName, "Your Name is required");
  } else {
    setSuccess(inputName);
  }

  if (inputEmailValue === "") {
    setError(inputEmail, "Email is required");
  } else if (!isValidEmail(inputEmailValue)) {
    setError(inputEmail, "Provide a valid email address");
  } else {
    setSuccess(inputEmail);
  }
  if (inputSubjectValue === "") {
    setError(inputSubject, "A Subject is required");
  } else {
    setSuccess(inputSubject);
  }
};
