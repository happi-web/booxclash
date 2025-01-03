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

const tabs = document.querySelectorAll('.tab');
const chatrooms = document.querySelectorAll('.chatroom');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs and chatrooms
    tabs.forEach(t => t.classList.remove('active'));
    chatrooms.forEach(c => c.classList.remove('active'));

    // Add active class to the clicked tab and the corresponding chatroom
    tab.classList.add('active');
    const targetChatroom = document.getElementById(tab.getAttribute('data-target'));
    targetChatroom.classList.add('active');
  });
});

