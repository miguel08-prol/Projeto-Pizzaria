function cadastrarSenha() {
  const usuario = document.getElementById("cadastrarUsuario").value.trim();
  const senha = document.getElementById("cadastrarSenha").value;
  const confirmar = document.getElementById("confirmarSenha").value;
  const resposta = document.getElementById("respostaCadastro");

  if (usuario === "Admin345" && senha === "Admin54321" && confirmar === "Admin54321") {
    resposta.textContent = "Cadastro realizado com sucesso!";
    resposta.style.color = "green";

    setTimeout(() => {
      resposta.textContent = "";
      window.location.href = "loginpizza.html";
    }, 1500);
  } else {
    resposta.textContent = "Usuário e/ou senha incorretos. Por favor, preencha corretamente.";
    resposta.style.color = "red";

    setTimeout(() => {
      resposta.textContent = "";
    }, 1000);
  }
}


function paginalogin() {
  setTimeout(() => window.location.href = "loginpizza.html", 0);
}

function voltar() {
  setTimeout(() => window.location.href = "cadastrarsenha.html", 0);
}

function verificarlogin() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  if (usuario === "Admin345" && senha === "Admin54321") {
    exibirMensagemLogin("Login realizado com sucesso!", "green");
    setTimeout(() => window.location.href = "pizzaria.html", 1000);
  } else {
    exibirMensagemLogin("Usuário ou senha incorretos!", "red");
  }
}

function exibirMensagemLogin(texto, cor = "red") {
  const msg = document.getElementById("resultado");
  msg.textContent = texto;
  msg.style.color = cor;
  msg.classList.remove("fade-out");

  setTimeout(() => {
    msg.classList.add("fade-out");
    setTimeout(() => msg.textContent = "", 1000);
  }, 3000);
}

let pizzaria = [];
let Alterar = null;
let vendas = [];

function mostrarSecao(secao) {
    document.getElementById("Cadastro").classList.add("hidden");
    document.getElementById("consulta").classList.add("hidden");
    document.getElementById("venda").classList.add("hidden");
    document.getElementById("relatorio").classList.add("hidden");
    document.getElementById("alterar").classList.add("hidden");

    document.getElementById(secao).classList.remove("hidden");
}

function mostrarMensagem(id, texto, cor = "green") {
    const el = document.getElementById(id);
    el.textContent = texto;
    el.style.color = cor;
    el.classList.remove("fade-out");

    setTimeout(() => {
        el.classList.add("fade-out");
        setTimeout(() => el.textContent = "", 1000);
    }, 3000);
}

function Cadastrar() {
    const tipo = document.getElementById("tipo").value;
    const Ingredientes = document.getElementById("ingre").value;
    const preco = document.getElementById("preco").value;

    if (tipo && Ingredientes && preco) {
        pizzaria.push({ tipo, Ingredientes, preco });
        document.getElementById("tipo").value = "";
        document.getElementById("ingre").value = "";
        document.getElementById("preco").value = "";
        mostrarMensagem('resposta2', 'Pizza adicionada com sucesso!');
        atualizarSabores();
    } else {
        mostrarMensagem('resposta2', 'Por favor, preencha todos os campos', "red");
    }
}

function atualizarSabores() {
    const selectSabor = document.getElementById("venda-sabor");
    if (!selectSabor) return;

    selectSabor.innerHTML = '<option value="">Selecione um sabor</option>';
    pizzaria.forEach((pizza) => {
        const option = document.createElement("option");
        option.value = pizza.tipo;
        option.textContent = pizza.tipo;
        selectSabor.appendChild(option);
    });
}

function preencherPrecoPizza() {
    const saborSelecionado = document.getElementById("venda-sabor").value;
    const pizzaSelecionada = pizzaria.find(pizza => pizza.tipo === saborSelecionado);

    document.getElementById("venda-preco").value = pizzaSelecionada ? pizzaSelecionada.preco : "";
}

function buscarpizza() {
    const busca = document.getElementById("procurar").value.toLowerCase();
    const resultado = pizzaria.filter((pizza) => pizza.tipo.toLowerCase().includes(busca));
    atualizarpizza(resultado);
}

function atualizarpizza(pizza = pizzaria) {
    const tabela = document.getElementById("pizzas");
    tabela.innerHTML = "";

    pizza.forEach((pizza) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${pizza.tipo}</td>
            <td>${pizza.Ingredientes}</td>
            <td>R$ ${pizza.preco}</td>`;
        tabela.appendChild(linha);
    });
}

function buscarPizzaParaAlterar() {
    const calcular = document.getElementById("alteraração").value.toLowerCase().trim();
    Alterar = pizzaria.find((pizza2) => pizza2.tipo.toLowerCase() === calcular);

    const alterarDiv = document.getElementById("alterar-pizza");

    if (Alterar) {
        alterarDiv.classList.remove("hidden");
        document.getElementById("novo-tipo").value = Alterar.tipo;
        document.getElementById("novo-quanti").value = Alterar.Ingredientes;
        document.getElementById("novo-preco").value = Alterar.preco;
        mostrarMensagem('resposta-alterar', 'Pizza encontrada! Pronta para alteração.');
    } else {
        alterarDiv.classList.add("hidden");
        mostrarMensagem('resposta-alterar', 'Pizza não encontrada.', "red");
    }
}

function alterarPizza() {
    if (Alterar) {
        const novotipo = document.getElementById("novo-tipo").value;
        const novoquanti = document.getElementById("novo-quanti").value;
        const novopreco = document.getElementById("novo-preco").value;

        if (novotipo && novoquanti && novopreco) {
            Alterar.tipo = novotipo;
            Alterar.Ingredientes = novoquanti;
            Alterar.preco = novopreco;

            atualizarpizza();
            atualizarSabores();
            mostrarMensagem('resposta-alterar', 'Pizza alterada com sucesso!');
            document.getElementById("alterar-pizza").classList.add("hidden");
        } else {
            mostrarMensagem('resposta-alterar', 'Por favor, preencha todos os campos.', "red");
        }
    }
}

function Vendas() {
    const comprador = document.getElementById("venda-comprador").value;
    const vendasabor = document.getElementById("venda-sabor").value;
    const vendaquanti = document.getElementById("venda-quantidade").value;
    const vendapreco = document.getElementById("venda-preco").value;

    if (comprador && vendasabor && vendaquanti && vendapreco) {
        vendas.push({ comprador, vendasabor, vendaquanti, vendapreco });
        document.getElementById("venda-comprador").value = "";
        document.getElementById("venda-sabor").value = "";
        document.getElementById("venda-quantidade").value = "";
        document.getElementById("venda-preco").value = "";
        mostrarMensagem('resposta-venda', 'Venda feita com sucesso!');
    } else {
        mostrarMensagem('resposta-venda', 'Por favor, preencha todos os campos', "red");
    }
}

function Buscarcomprador() {
    const buscar = document.getElementById("ver").value.toLowerCase();
    const resultadobusca = vendas.filter((venda) => venda.comprador.toLowerCase().includes(buscar));
    atualizarbusca(resultadobusca);
}

function atualizarbusca(venda = vendas) {
    const relatorio = document.getElementById("tabela-venda");
    relatorio.innerHTML = "";

    let total = 0;

    venda.forEach((venda) => {
        const linhagem = document.createElement("tr");
        linhagem.innerHTML = `
            <td>${venda.comprador}</td>
            <td>${venda.vendasabor}</td>
            <td>${venda.vendaquanti}</td>
            <td>${venda.vendapreco}</td>
            <td>R$ ${(Number(venda.vendapreco) * Number(venda.vendaquanti)).toFixed(2)}</td>`;
        relatorio.appendChild(linhagem);

        total += Number(venda.vendapreco) * Number(venda.vendaquanti);
    });

    const linhaTotal = document.createElement("tr");
    linhaTotal.innerHTML = `
        <td colspan="4" style="text-align:right;"><strong>Total:</strong></td>
        <td><strong>R$ ${total.toFixed(2)}</strong></td>`;
    relatorio.appendChild(linhaTotal);
}
