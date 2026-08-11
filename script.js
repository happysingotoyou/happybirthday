const heartsContainer = document.getElementById("hearts");

function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("heart-particle");

    heart.textContent = "♥";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (12 + Math.random() * 18) + "px";

    heart.style.animationDuration =
        (6 + Math.random() * 7) + "s";

    heart.style.animationDelay =
        Math.random() * 2 + "s";

    heartsContainer.appendChild(heart);

    heart.addEventListener("animationend", () => {
        heart.remove();
    });
}


/* Create hearts continuously */

setInterval(createHeart, 500);


/* Initial hearts */

for (let i = 0; i < 8; i++) {
    createHeart();
}