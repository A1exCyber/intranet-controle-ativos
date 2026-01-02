// Carrega produtos ao abrir a página
document.addEventListener("DOMContentLoaded", carregarProdutos);

function carregarProdutos() {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    produtos.forEach((produto, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
        <strong>${produto.nome}</strong><br>
        Nº de Série: ${produto.numeroSerie}<br>
        Status: <span class="status ${produto.status}">${produto.status}</span><br>

        Alocado para: ${produto.alocadoPara ?? "—"}<br>
        Matrícula Colaborador: ${produto.matriculaColaborador ?? "—"} <br>
        Data de retorno: ${produto.dataDevolucao ?? "—"} <br>`;

        const actions = document.createElement("div");
        actions.className = "acoes";

        //actions.appendChild(btnDevolver);
        //actions.appendChild(btnRemover);



        if (produto.status === "disponivel") {
            const btnLocar = document.createElement("button");
            btnLocar.textContent = "Locar";
            btnLocar.onclick = () => {
                window.location.href = `locarProduto.html?id=${produto.id}`;
            };
            //li.appendChild(btnLocar);
            actions.appendChild(btnLocar);
        } else {
            const btnDevolver = document.createElement("button");
            btnDevolver.textContent = "Devolver";
            btnDevolver.onclick = () => devolverProduto(produto.id);
            actions.appendChild(btnDevolver);
        }

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";

        if (produto.status === 'locado') {
            btnRemover.disabled = true;
            btnRemover.title = "Item locado não pode ser removido";
        } else {
            btnRemover.onclick = () => removerProduto(produto.id);
        }

        actions.appendChild(btnRemover);
        li.appendChild(actions);
        lista.appendChild(li);
    });
}

function devolverProduto(id) {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    produto.status = "disponivel";
    produto.alocadoPara = null;
    produto.dataDevolucao = null;
    produto.matriculaColaborador = null;

    localStorage.setItem("produtos", JSON.stringify(produtos));
    carregarProdutos();
}

function removerProduto(id) {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const novosProdutos = produtos.filter(p => p.id !== id);

    localStorage.setItem("produtos", JSON.stringify(novosProdutos));
    carregarProdutos();
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

document.getElementById("btnCadastro").addEventListener("click", () => {
    window.location.href = "cadastroProduto.html";
});

