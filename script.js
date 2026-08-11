const intro = document.getElementById("intro");
const continueButton = document.getElementById("continueButton");

const page = document.getElementById("page");

const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");

const spreads = document.querySelectorAll(".book-spread");

const heartsContainer = document.getElementById("hearts");
const darkHeartsContainer = document.getElementById("darkHearts");


/* =========================
   CURRENT PAGE
========================= */

let currentSpread = 0;


/* =========================
   SHOW SPREAD
========================= */

function showSpread(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= spreads.length) {
        index = spreads.length - 1;
    }

    currentSpread = index;

    spreads.forEach((spread, i) => {

        if (i === currentSpread) {
            spread.classList.add("active");
        } else {
            spread.classList.remove("active");
        }

    });


    /* Disable arrows at beginning/end */

    if (currentSpread === 0) {

        backButton.style.opacity = "0.25";
        backButton.style.pointerEvents = "none";

    } else {

        backButton.style.opacity = "1";
        backButton.style.pointerEvents = "auto";

    }


    if (currentSpread === spreads.length - 1) {

        nextButton.style.opacity = "0.25";
        nextButton.style.pointerEvents = "none";

    } else {

        nextButton.style.opacity = "1";
        nextButton.style.pointerEvents = "auto";

    }
}


/* =========================
   INTRO -> BOOK
========================= */

continueButton.addEventListener("click", () => {

    intro.style.opacity = "0";

    setTimeout(() => {

        intro.style.display = "none";

        page.style.opacity = "1";
        page.style.pointerEvents = "auto";

        showSpread(0);

    }, 1500);

});


/* =========================
   NEXT PAGE
========================= */

nextButton.addEventListener("click", () => {

    showSpread(currentSpread + 1);

});


/* =========================
   PREVIOUS PAGE
========================= */

backButton.addEventListener("click", () => {

    showSpread(currentSpread - 1);

});


/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        showSpread(currentSpread + 1);

    }

    if (event.key === "ArrowLeft") {

        showSpread(currentSpread - 1);

    }

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

setInterval(createHeart, 250);

for (let i = 0; i < 25; i++) {
    createHeart();
}


setInterval(createDarkHeart, 250);

for (let i = 0; i < 35; i++) {
    createDarkHeart();
}


/* =========================
   START ON CHAPTER PAGE
========================= */

showSpread(0);