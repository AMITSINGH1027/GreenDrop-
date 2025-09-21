
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