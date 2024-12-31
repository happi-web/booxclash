import "./css/style.css";

// Select the menu and the nav links
const menu = document.getElementById('menu');
const navLinks = document.querySelector('.nav-links');
const navbarDisplay = document.querySelector(".navbar");

// Add an event listener for menu toggle
menu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menu.classList.toggle('active');
  navbarDisplay.appendChild(navLinks);
});

document.getElementById('currentYear').textContent = new Date().getFullYear();
