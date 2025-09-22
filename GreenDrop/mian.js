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

// main.js
const API_BASE = 'http://localhost:5000/api';

// Register Form
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
    first_name: document.getElementById('regFirstName').value,
    last_name: document.getElementById('regLastName').value,
    phone_number: document.getElementById('regPhone').value,
    username: document.getElementById('regUsername').value,
    email: document.getElementById('regEmail').value,
    password: document.getElementById('regPassword').value
  };

  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    alert(response.ok ? data.message : data.message);
    if (response.ok) document.getElementById('registerForm').reset();
  } catch (err) {
    alert('Network error. Check if backend is running.');
  }
});

// Login Form
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);  // Store JWT token
      alert(`Welcome, ${data.user.username}!`);
      // Redirect to profile: window.location.href = 'profile.html';
      document.getElementById('userDetails')?.innerHTML = `<p>ID: ${data.user.id}, Points: ${data.user.points}</p>`;
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert('Network error.');
  }
});