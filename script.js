const intro = document.getElementById("intro");
const continueButton = document.getElementById("continueButton");
const page = document.getElementById("page");

const heartsContainer = document.getElementById("hearts");
const darkHeartsContainer = document.getElementById("darkHearts");


/* =========================
   CONTINUE BUTTON
========================= */

continueButton.addEventListener("click", () => {

    intro.style.opacity = "0";

    setTimeout(() => {

        intro.style.display = "none";

        page.style.opacity = "1";
        page.style.pointerEvents = "auto";

    }, 1500);

});


/* =========================
   INTRO HEARTS
========================= */

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


/* =========================
   DARK HEARTS
========================= */

function createDarkHeart() {

    const heart = document.createElement("div");

    heart.classList.add("dark-heart");

    heart.textContent = "♥";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (11 + Math.random() * 15) + "px";

    heart.style.animationDuration =
        (7 + Math.random() * 8) + "s";

    heart.style.animationDelay =
        Math.random() * 3 + "s";

    darkHeartsContainer.appendChild(heart);

    heart.addEventListener("animationend", () => {
        heart.remove();
    });
}


/* =========================
   HEART GENERATION
========================= */

/* More hearts on screen at once */
setInterval(createHeart, 250);

for (let i = 0; i < 25; i++) {
    createHeart();
}


/* More dark hearts on the black screen */
setInterval(createDarkHeart, 250);

for (let i = 0; i < 35; i++) {
    createDarkHeart();
}