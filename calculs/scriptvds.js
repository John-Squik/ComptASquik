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
    const tbody = document.querySelector("#stockTable tbody");
    const btnAdd = document.getElementById("addRow");
    const btnCalc = document.getElementById("calculer");
    btnAdd.addEventListener("click", addRow);
    btnCalc.addEventListener("click", calculer);
    function addRow() {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="date"></td>
            <td>
                <select>
                    <option value="entree">Entrée</option>
                    <option value="sortie">Sortie</option>
                </select>
            </td>
            <td><input type="number" min="0"></td>
            <td><input type="number" min="0" step="0.01"></td>
            <td class="valeur">0.00</td>
        `;
        tbody.appendChild(row);
    }
    function calculer() {
        const methode = document.getElementById("methode").value;
        const rows = Array.from(document.querySelectorAll("#stockTable tbody tr"))
            .map((row, index) => {
                const dateValue = row.children[0].querySelector("input").value;
                return {
                    index,
                    date: dateValue ? new Date(dateValue) : null,
                    type: row.children[1].querySelector("select").value,
                    qte: Number(row.children[2].querySelector("input").value) || 0,
                    prix: Number(row.children[3].querySelector("input").value) || 0,
                    celluleValeur: row.querySelector(".valeur")
                };
            })
            .sort((a, b) => {
                if (a.date && b.date) return a.date - b.date;
                if (a.date) return -1;
                if (b.date) return 1;
                return a.index - b.index;
            });
        let stockQte = 0;
        let stockVal = 0;
        let lotsPEPS = [];
        rows.forEach(r => r.celluleValeur.textContent = "0.00");
        rows.forEach(ligne => {
            if (ligne.type === "entree" && ligne.qte > 0) {
                if (methode === "PEPS") {
                    lotsPEPS.push({
                        qte: ligne.qte,
                        prix: ligne.prix
                    });
                }
                stockQte += ligne.qte;
                stockVal += ligne.qte * ligne.prix;
                ligne.celluleValeur.textContent = (ligne.qte * ligne.prix).toFixed(2);
            }
            if (ligne.type === "sortie" && ligne.qte > 0) {
                let valeurSortie = 0;
                if (methode === "CUMP") {
                    const cump = stockQte > 0 ? stockVal / stockQte : 0;
                    valeurSortie = ligne.qte * cump;
                }
                if (methode === "PEPS") {
                    let reste = ligne.qte;
                    while (reste > 0 && lotsPEPS.length > 0) {
                        const lot = lotsPEPS[0];
                        if (lot.qte <= reste) {
                            valeurSortie += lot.qte * lot.prix;
                            reste -= lot.qte;
                            lotsPEPS.shift();
                        } else {
                            valeurSortie += reste * lot.prix;
                            lot.qte -= reste;
                            reste = 0;
                        }
                    }
                }
                stockQte -= ligne.qte;
                stockVal -= valeurSortie;
                ligne.celluleValeur.textContent = "-" + valeurSortie.toFixed(2);
            }
        });
        const cumpFinal = stockQte > 0 ? stockVal / stockQte : 0;
        document.getElementById("stockQte").textContent = stockQte;
        document.getElementById("stockVal").textContent = stockVal.toFixed(2);
        document.getElementById("stockCUMP").textContent = cumpFinal.toFixed(2);
    }
});