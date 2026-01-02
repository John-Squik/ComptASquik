document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".parent").forEach(parent => {
    parent.addEventListener("click", () => {
        const targetClass = parent.dataset.target;
        if (!targetClass) return;
        const children = document.querySelectorAll("." + targetClass);
        const arrow = parent.querySelector(".arrow");
        const isOpen = children[0]?.classList.contains("open");
        if (isOpen) {
            children.forEach(child => closeBranch(child));
            arrow?.classList.remove("open");
        } else {
            children.forEach(child => child.classList.add("open"));
            arrow?.classList.add("open");
        }
    });
});
    function closeBranch(element) {
    element.classList.remove("open");
    const arrow = element.querySelector(".arrow");
    arrow?.classList.remove("open");
    if (element.dataset.target) {
        document
            .querySelectorAll("." + element.dataset.target)
            .forEach(sub => closeBranch(sub));
    }
}
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
        const clickDansCours =
            coursList.contains(e.target) || btnCours.contains(e.target);
        const clickDansCalculs =
            calculsList.contains(e.target) || btnCalculs.contains(e.target);
        if (!clickDansCours && !clickDansCalculs) {
            coursList.classList.remove("open");
            calculsList.classList.remove("open");
            arrowCours.classList.remove("open");
            arrowCalculs.classList.remove("open");
        }
    });
});