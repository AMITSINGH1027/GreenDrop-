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

// Search Box Functionality - Real-time search
document.querySelector('.search-box input').addEventListener('keyup', function () {
    let query = this.value.toLowerCase();
    let cards = document.querySelectorAll('.machine-card');
    let found = false;

    cards.forEach(card => {
        let title = card.querySelector('h3').textContent.toLowerCase();
        let location = card.querySelector('p').textContent.toLowerCase();

        if (title.includes(query) || location.includes(query)) {
            card.style.display = 'block';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });

    // Show or hide "No Results Found"
    document.getElementById('noResults').style.display = found ? 'none' : 'block';
});