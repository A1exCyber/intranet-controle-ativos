const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

document.getElementById("formProduto").addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const numeroSerie = document.getElementById("numeroSerie").value.trim();

    if (!nome || !numeroSerie) {
        alert("Preencha todos os campos");
        return;
    }

    const novoProduto = {
        id: Date.now(), // id simples e funcional
        nome,
        numeroSerie,
        status: "disponivel",
        alocadoPara: null,
        matriculaColaborador: null,
        dataDevolucao: null
    };

    produtos.push(novoProduto);
    localStorage.setItem("produtos", JSON.stringify(produtos));

    window.location.href = "home.html";
});
