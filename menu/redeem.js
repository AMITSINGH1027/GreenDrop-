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

// redeem.js
const API_BASE = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

if (!token) {
  alert('Please login first.');
  window.location.href = 'index.html';
} else {
  window.addEventListener('load', async () => {
    try {
      // Load rewards
      const rewardsResponse = await fetch(`${API_BASE}/redeem`);
      const rewards = await rewardsResponse.json();

      const container = document.getElementById('rewardsContainer');
      rewards.forEach(reward => {
        const div = document.createElement('div');
        div.innerHTML = `
          <h3>${reward.name}</h3>
          <p>${reward.description} - ${reward.points_cost} points (Stock: ${reward.stock})</p>
          <button onclick="redeemReward(${reward.id})">Redeem</button>
        `;
        container.appendChild(div);
      });
    } catch (err) {
      alert('Error loading rewards.');
    }
  });

  window.redeemReward = async (rewardId) => {
    try {
      const response = await fetch(`${API_BASE}/redeem/${rewardId}/redeem`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      alert(response.ok ? data.message : data.message);
      if (response.ok) location.reload();  // Refresh to update list
    } catch (err) {
      alert('Network error.');
    }
  };
}