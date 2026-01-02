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
document.getElementById("amort-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const prix = parseFloat(document.getElementById("prix").value);
    const valeurResiduelle = parseFloat(document.getElementById("valeur-residuelle").value);
    const duree = parseInt(document.getElementById("duree").value);
    const date = new Date(document.getElementById("date").value);
    const type = document.getElementById("type").value;
    const tableBody = document.querySelector("#table-amort tbody");
    tableBody.innerHTML = "";
    let valeurNette = prix;
    const coefDegressif = 1.5; 
    const anneeMiseService = date.getFullYear();
    const moisMiseService = date.getMonth(); 
    const prorata = (12 - moisMiseService) / 12; 
    let maxDuree = Math.min(duree, 50);
    for (let i = 0; i < maxDuree; i++) {
        const annee = anneeMiseService + i;
        let amortissement = 0;
        switch(type) {
            case "lineaire":
                amortissement = ((prix - valeurResiduelle) / maxDuree) * (i === 0 ? prorata : 1);
                break;
            case "degressif-pur":
                amortissement = (valeurNette) * coefDegressif / maxDuree;
                if (i === 0) amortissement *= prorata;
                if (valeurNette - amortissement < valeurResiduelle) {
                    amortissement = valeurNette - valeurResiduelle;
                }
                break;
            case "degressif-lin":
                const amortLinRestant = (valeurNette - valeurResiduelle) / (maxDuree - i);
                const amortDeg = (valeurNette - valeurResiduelle) * coefDegressif / maxDuree;
                amortissement = amortDeg > amortLinRestant ? amortDeg : amortLinRestant;
                if (i === 0) amortissement *= prorata;
                if (valeurNette - amortissement < valeurResiduelle) {
                    amortissement = valeurNette - valeurResiduelle;
                }
                break;
        }
        amortissement = Math.round(amortissement);
        valeurNette = Math.round(valeurNette - amortissement);
        tableBody.innerHTML += `
            <tr>
                <td>${annee}</td>
                <td>${amortissement}</td>
                <td>${valeurNette}</td>
            </tr>
        `;
        if (valeurNette <= valeurResiduelle) break;
    }
});