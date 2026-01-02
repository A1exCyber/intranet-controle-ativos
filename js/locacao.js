const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
const produto = produtos.find(p => p.id === id);

if (!produto) {
    alert("Produto não encontrado");
    window.location.href = "home.html";    
}

document.getElementById("formLocacao")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const alocadoPara = document.getElementById("alocadoPara").value.trim();
    const matricula = document.getElementById("matricula").value.trim();
    const dataDevolucao = document.getElementById("dataDevolucao").value;

    if (!alocadoPara || !matricula || !dataDevolucao) {
        alert("Preencha todos os campos");
        return; //
    }

    produto.status = "locado";
    produto.alocadoPara = alocadoPara;
    produto.matriculaColaborador = matricula;
    produto.dataDevolucao = dataDevolucao;

    localStorage.setItem("produtos", JSON.stringify(produtos));

    window.location.href = "home.html"; 
});
