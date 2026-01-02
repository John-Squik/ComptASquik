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
    const form = document.getElementById("tva-form");
    const montantInput = document.getElementById("montant");
    const baseSelect = document.getElementById("base");
    const tauxSelect = document.getElementById("taux");
    const tvaResult = document.getElementById("tva-result");
    const totalResult = document.getElementById("total-result");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const montant = parseFloat(montantInput.value);
        const taux = parseFloat(tauxSelect.value);
        const base = baseSelect.value;
        let tva, total;
        if(base === "ht") {
            tva = montant * (taux / 100);
            total = montant + tva;
        } else {
            tva = montant * (taux / (100 + taux));
            total = montant;
        }
        tvaResult.textContent = `TVA : ${tva.toFixed(2)} €`;
        totalResult.textContent = base === "ht" 
            ? `Montant TTC : ${total.toFixed(2)} €` 
            : `Montant HT : ${(total - tva).toFixed(2)} €`;
    });
});