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
document.getElementById("loan-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const capital = parseFloat(document.getElementById("capital").value);
    const taux = parseFloat(document.getElementById("taux").value) / 100;
    const duree = parseInt(document.getElementById("duree").value);
    const dateDebut = new Date(document.getElementById("date").value);
    const type = document.getElementById("type").value;
    if (capital <= 0 || taux < 0 || duree <= 0 || duree > 25) return alert("Vérifiez vos saisies !");
    let tableHTML = `<table>
        <tr>
            <th>Année</th>
            <th>Date</th>
            <th>Capital restant dû</th>
            <th>Remboursement capital</th>
            <th>Intérêts</th>
            <th>Annuités / Amortissement</th>
            <th>Paiement mensuel</th>
        </tr>`;
    if(type === "annuite") {
        const annuite = capital * (taux*(1+taux)**duree)/((1+taux)**duree - 1);
        let capitalRestant = capital;
        for(let i=0;i<duree;i++){
            const interets = capitalRestant * taux;
            const remCapital = annuite - interets;
            const paiementMensuel = annuite / 12;
            const date = new Date(dateDebut);
            date.setFullYear(date.getFullYear() + i);
            tableHTML += `<tr>
                <td>${i+1}</td>
                <td>${date.toLocaleDateString('fr-FR')}</td>
                <td>${capitalRestant.toFixed(2)} €</td>
                <td>${remCapital.toFixed(2)} €</td>
                <td>${interets.toFixed(2)} €</td>
                <td>${annuite.toFixed(2)} €</td>
                <td>${paiementMensuel.toFixed(2)} €</td>
            </tr>`;
            capitalRestant -= remCapital;
            capitalRestant = parseFloat(capitalRestant.toFixed(2));
        }

    } else {
        const amortissementConst = capital / duree;
        let capitalRestant = capital;
        for(let i=0;i<duree;i++){
            const interets = capitalRestant * taux;
            const annuite = amortissementConst + interets;
            const paiementMensuel = annuite / 12;
            const date = new Date(dateDebut);
            date.setFullYear(date.getFullYear() + i);
            tableHTML += `<tr>
                <td>${i+1}</td>
                <td>${date.toLocaleDateString('fr-FR')}</td>
                <td>${capitalRestant.toFixed(2)} €</td>
                <td>${amortissementConst.toFixed(2)} €</td>
                <td>${interets.toFixed(2)} €</td>
                <td>${annuite.toFixed(2)} €</td>
                <td>${paiementMensuel.toFixed(2)} €</td>
            </tr>`;
            capitalRestant -= amortissementConst;
            capitalRestant = parseFloat(capitalRestant.toFixed(2));
        }
    }
    tableHTML += "</table>";
    document.getElementById("result").innerHTML = tableHTML;
});