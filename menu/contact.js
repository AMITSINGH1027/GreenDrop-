
  // FAQ Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const answer = item.querySelector('.faq-answer');
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Form Submission (Basic JS - for demo)
  document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();
    alert('Thank you! Your message has been sent.');
    this.reset();
  });

  const menuBtn = document.querySelector(".menu-btn");
const sidePanel = document.getElementById("sidePanel");

// Toggle menu open/close
menuBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent click bubbling
  sidePanel.classList.toggle("show");
});

// Close if click outside panel
document.addEventListener("click", (e) => {
  if (sidePanel.classList.contains("show") && !sidePanel.contains(e.target) && !menuBtn.contains(e.target)) {
    sidePanel.classList.remove("show");
  }
});

document.getElementById('contactForm')

// contact.js
const API_BASE = 'http://localhost:5000/api';

document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
    reason: document.getElementById('reason').value,
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch(`${API_BASE}/contact/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    alert(response.ok ? data.message : data.message);
    if (response.ok) e.target.reset();
  } catch (err) {
    alert('Network error.');
  }
});