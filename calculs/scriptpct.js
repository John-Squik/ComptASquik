const btnCours = document.getElementById("btn-cours");
const coursList = document.getElementById("cours-list");
const btnCalculs = document.getElementById("btn-calculs");
const calculsList = document.getElementById("calculs-list");
const arrowCours = btnCours.querySelector(".arrow");
const arrowCalculs = btnCalculs.querySelector(".arrow");
btnCours.addEventListener("click", (e) => {
    e.preventDefault();
    calculsList.classList.remove("open");
    arrowCalculs.classList.remove("open");
    coursList.classList.toggle("open");
    arrowCours.classList.toggle("open");
});
btnCalculs.addEventListener("click", (e) => {
    e.preventDefault();
    coursList.classList.remove("open");
    arrowCours.classList.remove("open");
    calculsList.classList.toggle("open");
    arrowCalculs.classList.toggle("open");
});
document.addEventListener("click", (e) => {
    const clickCours =
        coursList.contains(e.target) || btnCours.contains(e.target);
    const clickCalculs =
        calculsList.contains(e.target) || btnCalculs.contains(e.target);
    if (!clickCours && !clickCalculs) {
        coursList.classList.remove("open");
        calculsList.classList.remove("open");
        arrowCours.classList.remove("open");
        arrowCalculs.classList.remove("open");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const percentForm = document.getElementById("percent-form");
    const baseInput = document.getElementById("base-amount");
    const percentInput = document.getElementById("percent");
    const actionSelect = document.getElementById("action");
    const percentValue = document.getElementById("percent-value");
    const percentResult = document.getElementById("percent-result");
    percentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const base = parseFloat(baseInput.value);
        const percent = parseFloat(percentInput.value);
        let result, percentAmount;
        if (actionSelect.value === "add") {
            percentAmount = base * percent / 100;
            result = base + percentAmount;
        } else {
            result = base / (1 + percent / 100);
            percentAmount = base - result;
        }
        percentValue.textContent = `Montant du pourcentage : ${percentAmount.toFixed(2)} €`;
        percentResult.textContent = `Résultat final : ${result.toFixed(2)} €`;
    });
});