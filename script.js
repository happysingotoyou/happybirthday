const intro = document.getElementById("intro");
const continueButton = document.getElementById("continueButton");
const heartsContainer = document.getElementById("hearts");


/* =========================
   CONTINUE BUTTON
========================= */

continueButton.addEventListener("click", () => {

    intro.style.opacity = "0";

    setTimeout(() => {

        intro.style.display = "none";

    }, 1500);

});


/* =========================
   CREATE FLOATING HEART
========================= */

function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("heart-particle");

    heart.textContent = "♥";


    /* Random horizontal position */

    heart.style.left =
        Math.random() * 100 + "%";


    /* Random size */

    heart.style.fontSize =
        (12 + Math.random() * 18) + "px";


    /* Random floating speed */

    heart.style.animationDuration =
        (6 + Math.random() * 7) + "s";


    /* Random starting delay */

    heart.style.animationDelay =
        Math.random() * 2 + "s";


    heartsContainer.appendChild(heart);


    /* Remove heart when animation finishes */

    heart.addEventListener("animationend", () => {

        heart.remove();

    });

}


/* =========================
   CONTINUOUS HEARTS
========================= */

setInterval(createHeart, 500);


/* =========================
   INITIAL HEARTS
========================= */

for (let i = 0; i < 8; i++) {

    createHeart();

}