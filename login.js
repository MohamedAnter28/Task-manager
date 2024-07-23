const form = document.querySelector("form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const emailError = document.querySelector(".email-input .icon-fail");
const passwordError = document.querySelector(".password-input .icon-fail");
const emailSuccess = document.querySelector(".email-input .icon-succes");
const passwordSuccess = document.querySelector(".password-input .icon-succes");
const warnMs = document.querySelector(".warning");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the form from submitting

  const email = emailInput.value;
  const password = passwordInput.value;

  // Check localStorage first
  const storedUsers = JSON.parse(localStorage.getItem('users'));

  if (storedUsers) {
    const storedUser = storedUsers.find(user => user.email === email && user.password === password);

    if (storedUser) {
      window.location.href = 'project.html';
      return;
    }
  }

  // If user not found in localStorage, fetch from data.json
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      const users = data;
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        // Store the user data in localStorage for future logins
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = 'project.html';
      } else {
        // Show warning message if user is not found
        warnMs.classList.add("active");
        setTimeout(() => {
          warnMs.classList.remove("active");
        }, 4000);
      }
    })
    .catch(error => console.error('Error fetching the users:', error));
});



