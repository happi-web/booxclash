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