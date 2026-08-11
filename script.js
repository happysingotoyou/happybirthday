const intro = document.getElementById("intro");
const continueButton = document.getElementById("continueButton");

continueButton.addEventListener("click", () => {

    intro.style.opacity = "0";

    setTimeout(() => {
        intro.style.display = "none";
    }, 1500);

});