const loginUserBox = document.getElementById("login-user-box");
const loginAdminBox = document.getElementById("login-admin-box");
const registerBox = document.getElementById("register-box");
const adminBox = document.getElementById("admin-box");
const toggleButtons = document.getElementById("toggle-buttons");
const toggleTitle = document.getElementById("toggle-title");

function showForm(formType) {
  // Hide all forms
  loginUserBox.classList.remove("active");
  loginAdminBox.classList.remove("active");
  registerBox.classList.remove("active");
  adminBox.classList.remove("active");

  if (formType === "login-user") {
    loginUserBox.classList.add("active");
    toggleTitle.textContent = "New here?";
    toggleButtons.innerHTML = `
      <button onclick="showForm('register')">Register as User</button>
      <button onclick="showForm('admin')">Register as Admin</button>
    `;
  } 
  else if (formType === "login-admin") {
    loginAdminBox.classList.add("active");
    toggleTitle.textContent = "New here?";
    toggleButtons.innerHTML = `
      <button onclick="showForm('register')">Register as User</button>
      <button onclick="showForm('admin')">Register as Admin</button>
    `;
  } 
  else if (formType === "register") {
    registerBox.classList.add("active");
    toggleTitle.textContent = "Already Registered?";
    toggleButtons.innerHTML = `
      <button onclick="showForm('login-user')">Login as User</button>
      <button onclick="showForm('login-admin')">Login as Admin</button>
    `;
  } 
  else if (formType === "admin") {
    adminBox.classList.add("active");
    toggleTitle.textContent = "Already Registered?";
    toggleButtons.innerHTML = `
      <button onclick="showForm('login-user')">Login as User</button>
      <button onclick="showForm('login-admin')">Login as Admin</button>
    `;
  }
}

// Default User Login open hoga
showForm("login-user");