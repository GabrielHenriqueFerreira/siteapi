// Definir variáveis universais
var valorTotal = [0, 0, 0, 0];
var valorProduto = [0, 500, 5, 3000];
var qtd = [0, 0, 0, 0];

// Trocar o nome pelo inserido no login
function trocarNome() {
	var nome = document.getElementById('nome');
	var usuario = document.getElementById('usuario').value;
	nome.innerHTML = usuario;
}

// Aumentar a quantidade de itens de um produto
function adicionarItem(item) {
	var quantidade = document.getElementById('quantidade' + item);
	var total = document.getElementById('total' + item);
	qtd[item] += 1;
	valorTotal[item] = valorProduto[item] * qtd[item];
	quantidade.innerHTML = qtd[item];
	total.innerHTML = valorTotal[item];
	console.log(quantidade);
	valorCompra();
}

// Diminuir a quantidade de itens de um produto
function removerItem(item) {
	if (qtd[item] > 0) {
		qtd[item] -= 1;
		var quantidade = document.getElementById('quantidade' + item);
		var total = document.getElementById('total' + item);
		quantidade.innerHTML = qtd[item];
		valorTotal[item] = valorProduto[item] * qtd[item];
		total.innerHTML = valorTotal[item];
		valorCompra();
	}
}

// Remover o produto
function removerProduto(produto) {
	var pai = document.getElementById('carrinho');
	var filho = document.getElementById('produto' + produto);
	if (confirm('Confirmar exclusão?')) {
		valorTotal[produto] -= (valorProduto[produto] * qtd[produto]);
		qtd[produto] = 0;
		pai.removeChild(filho);
		valorCompra();
	}
}

// Calcular o valor total da compra
function valorCompra() {
	var valorTotalCompra = document.getElementById('valorTotalCompra');
	var valor = 0;;
	for (var i = 0; i < valorTotal.length; i++) {
		valor += valorTotal[i];
	}
	valorTotalCompra.innerHTML = valor;
	console.log(valorTotal.length);
}

// Finalizar a compra e zerar os valores
function finalizarCompra() {
	var nome = document.getElementById('nome').innerHTML;
	alert('Obrigada pela compra, ' + nome + '!');
	document.location.reload(true);
}