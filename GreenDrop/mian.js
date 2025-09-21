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


document.getElementById('loginForm')?.addEventListener('submit', async (e) => {  
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));  
      alert('Login successful! Welcome, ' + data.user.username);
      window.location.href = 'profile.html';  
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('Network error. Try again.');
  }
});


document.getElementById('registerForm')?.addEventListener('submit', async (e) => {  
  e.preventDefault();
  const first_name = document.getElementById('first_name').value;
  const last_name = document.getElementById('last_name').value;
  const phone_number = document.getElementById('phone_number').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name, last_name, phone_number, username, email, password })
    });
    const data = await response.json();
    if (response.ok) {
      alert(data.message);
      
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Register error:', error);
    alert('Network error. Try again.');
  }
});