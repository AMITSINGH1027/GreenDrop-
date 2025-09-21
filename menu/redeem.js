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
    let cards = document.querySelectorAll('.reward-card');
    let found = false;

    cards.forEach(card => {
        // Title text reward name + points (p tag)
        let details = card.querySelector('p').textContent.toLowerCase();

        if (details.includes(query)) {
            card.style.display = 'block';  // show card
            found = true;
        } else {
            card.style.display = 'none';   // hide card
        }
    });

    // Show or hide "No Results Found"
    document.getElementById('noResults').style.display = found ? 'none' : 'block';
});
