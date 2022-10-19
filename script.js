function toggleMobileMenu(menu) {
  menu.classList.toggle("open");
}

const counters = document.querySelectorAll(".counter");

counters.forEach((counterFormatted) => {
  counterFormatted.innerText = "0";

  const updateCounter = () => {
    const target = +counterFormatted.getAttribute("data-target");
    const c = +counterFormatted.innerText;
    const increment = target / 250;
    if (c < target) {
      counterFormatted.innerText = `${Math.ceil(c + increment)}`;
      setTimeout(updateCounter, 1);
    } else {
      counterFormatted.innerText = target;
    }
  };
  updateCounter();
});
