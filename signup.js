document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usernameInput = document.querySelector("#username");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");
    const passwordInput = document.querySelector("#password");

    const usernamesucces = document.querySelector(".username-input .icon-succes");
    const usernameError = document.querySelector(".username-input .icon-fail");
    const emailsucces = document.querySelector(".email-input .icon-succes");
    const emailError = document.querySelector(".email-input .icon-fail");
    const phonesucces = document.querySelector(".phone-input .icon-succes");
    const phoneError = document.querySelector(".phone-input .icon-fail");
    const passwordsucces = document.querySelector(".password-input .icon-succes");
    const passwordError = document.querySelector(".password-input .icon-fail");

    const usernamePattern = /^[a-zA-Z0-9_ ]{3,20}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    const phonePattern = /^\+\d{2}\d{10}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

    let hasError = false;

    if (!usernamePattern.test(usernameInput.value.trim())) {
      usernamesucces.classList.remove("active");
      usernameError.classList.add("active");
      hasError = true;
    } else {
      usernameError.classList.remove("active");
      usernamesucces.classList.add("active");
    }

    if (!emailPattern.test(emailInput.value.trim())) {
      emailsucces.classList.remove("active");
      emailError.classList.add("active");
      hasError = true;
    } else {
      emailError.classList.remove("active");
      emailsucces.classList.add("active");
    }

    if (!phonePattern.test(phoneInput.value.trim())) {
      phonesucces.classList.remove("active");
      phoneError.classList.add("active");
      hasError = true;
    } else {
      phoneError.classList.remove("active");
      phonesucces.classList.add("active");
    }

    if (!passwordPattern.test(passwordInput.value.trim())) {
      passwordsucces.classList.remove("active");
      passwordError.classList.add("active");
      hasError = true;
    } else {
      passwordError.classList.remove("active");
      passwordsucces.classList.add("active");
    }

    if (!hasError) {
      // جمع البيانات
      const data = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        password: passwordInput.value.trim()
      };

      try {
        // تخزين البيانات في Local Storage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(data);
        localStorage.setItem('users', JSON.stringify(users));

        console.log('Success:', data);

      
        window.location.href = './index.html'; 

      } catch (error) {
        console.error('Error:', error);
      }

      
      document.querySelectorAll("i").forEach((e) => {
        e.classList.remove("active");
      });

      document.querySelectorAll("input").forEach((e) => {
        e.value = "";
      });
    }
  });
});
