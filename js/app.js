// Auto-lo// Auto-load templates from JSON + Coverflow rotation
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("coverflow-container");

  fetch("data/templates.json")
    .then(res => res.json())
    .then(data => {
      data.templates.forEach((tpl, i) => {
        const card = document.createElement("div");
        card.className = "coverflow-card";
        card.style.backgroundImage = `url(${tpl.image})`;
        card.innerHTML = `<span>${tpl.name}</span>`;
        container.appendChild(card);
      });

      initCoverflow();
    });
});

function initCoverflow() {
  const cards = document.querySelectorAll(".coverflow-card");
  let angle = 0;

  function rotate() {
    cards.forEach((card, i) => {
      const offset = i - (cards.length / 2);
      const theta = offset * 40 + angle;
      card.style.transform = `rotateY(${theta}deg) translateZ(300px)`;
      card.style.opacity = Math.abs(offset) > 2 ? "0.3" : "1";
    });
    angle -= 1; // auto rotation speed
    requestAnimationFrame(rotate);
  }

  rotate();
}
