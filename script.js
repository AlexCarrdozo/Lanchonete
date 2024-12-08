// Variáveis globais
let carrinhoItens = [];
let carrinhoTotal = 0;

// Aguarda o documento estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos do menu
    const menuToggle = document.querySelector('.menu-toggle');
    const menuLateral = document.querySelector('.menu-lateral');
    
    // Função para alternar o menu
    function toggleMenu(event) {
        event.preventDefault();
        event.stopPropagation();
        menuLateral.classList.toggle('active');
        console.log('Menu clicado'); // Para debug
    }

    // Adiciona o evento de clique ao botão do menu
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
        console.log('Event listener adicionado ao menu'); // Para debug
    } else {
        console.log('Botão do menu não encontrado'); // Para debug
    }

    // Fecha o menu quando clicar fora
    document.addEventListener('click', function(event) {
        if (!menuLateral.contains(event.target) && !menuToggle.contains(event.target)) {
            menuLateral.classList.remove('active');
        }
    });

    // Fecha o menu quando clicar em um link
    const menuLinks = document.querySelectorAll('.menu-items a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuLateral.classList.remove('active');
        });
    });
});

// Toggle do Carrinho
function toggleCarrinho() {
    const carrinho = document.getElementById('carrinho');
    carrinho.style.display = carrinho.style.display === 'block' ? 'none' : 'block';
}

// Adicionar ao Carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinhoItens.push({ nome, preco });
    carrinhoTotal += preco;
    
    atualizarCarrinho();
    mostrarMensagem('Item adicionado ao carrinho!');
    
    // Atualiza o contador do carrinho
    document.getElementById('carrinho-contador').textContent = carrinhoItens.length;
    
    // Atualiza o botão de finalizar
    atualizarBotaoFinalizar();
}

// Atualizar Carrinho
function atualizarCarrinho() {
    const carrinhoItensElement = document.getElementById('carrinho-itens');
    const carrinhoTotalElement = document.getElementById('carrinho-total');
    
    carrinhoItensElement.innerHTML = '';
    carrinhoItens.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'carrinho-item';
        itemElement.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2)}
            <button onclick="removerDoCarrinho(${index})" class="btn-remover">×</button>
        `;
        carrinhoItensElement.appendChild(itemElement);
    });
    
    carrinhoTotalElement.textContent = carrinhoTotal.toFixed(2);
}

// Remover do Carrinho
function removerDoCarrinho(index) {
    carrinhoTotal -= carrinhoItens[index].preco;
    carrinhoItens.splice(index, 1);
    
    atualizarCarrinho();
    document.getElementById('carrinho-contador').textContent = carrinhoItens.length;
    atualizarBotaoFinalizar();
    mostrarMensagem('Item removido do carrinho!');
}

// Atualizar Botão Finalizar
function atualizarBotaoFinalizar() {
    const btnFinalizar = document.getElementById('btn-finalizar');
    btnFinalizar.style.display = carrinhoItens.length > 0 ? 'block' : 'none';
}

// Mostrar Mensagem
function mostrarMensagem(texto) {
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = texto;
    mensagem.style.display = 'block';
    
    setTimeout(() => {
        mensagem.style.display = 'none';
    }, 3000);
}

// Modal
function abrirModal(titulo, descricao, preco, imagem) {
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <button class="modal-fechar" onclick="fecharModal()">&times;</button>
        <img src="${imagem}" alt="${titulo}" class="modal-imagem">
        <h2>${titulo}</h2>
        <p class="modal-descricao">${descricao}</p>
        <p class="modal-preco">R$ ${preco.toFixed(2)}</p>
        <button class="btn-adicionar" onclick="adicionarAoCarrinho('${titulo}', ${preco})">
            Adicionar ao Carrinho
        </button>
    `;
    
    modal.style.display = 'flex';
}

// Funções para os modais específicos
function abrirModalLanches(categoria, opcoes) {
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <button class="modal-fechar" onclick="fecharModal()">&times;</button>
        <h2>Opções de ${categoria}</h2>
        <div class="modal-opcoes">
            ${opcoes.map(opcao => `
                <div class="opcao-bebida">
                    <img src="${opcao.imagem}" alt="${opcao.nome}" 
                         onclick="event.stopPropagation(); abrirImagemModal('${opcao.imagem}', '${opcao.nome}')" 
                         style="cursor: pointer;">
                    <h4>${opcao.nome}</h4>
                    <p>${opcao.descricao}</p>
                    <p class="modal-preco">R$ ${opcao.preco.toFixed(2)}</p>
                    <button class="btn-adicionar" onclick="event.stopPropagation(); adicionarAoCarrinho('${opcao.nome}', ${opcao.preco})">
                        Adicionar ao Carrinho
                    </button>
                </div>
            `).join('')}
        </div>
    `;
    
    modal.style.display = 'flex';
}

function abrirModalBebidas(categoria, opcoes) {
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <button class="modal-fechar" onclick="fecharModal()">&times;</button>
        <h2>Opções de ${categoria}</h2>
        <div class="modal-opcoes">
            ${opcoes.map(opcao => `
                <div class="opcao-bebida">
                    <img src="${opcao.imagem}" alt="${opcao.nome}" 
                         onclick="event.stopPropagation(); abrirImagemModal('${opcao.imagem}', '${opcao.nome}')" 
                         style="cursor: pointer;">
                    <h4>${opcao.nome}</h4>
                    <p>${opcao.descricao}</p>
                    <p class="modal-preco">R$ ${opcao.preco.toFixed(2)}</p>
                    <button class="btn-adicionar" onclick="event.stopPropagation(); adicionarAoCarrinho('${opcao.nome}', ${opcao.preco})">
                        Adicionar ao Carrinho
                    </button>
                </div>
            `).join('')}
        </div>
    `;
    
    modal.style.display = 'flex';
}

function abrirModalSobremesas(categoria, opcoes) {
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <button class="modal-fechar" onclick="fecharModal()">&times;</button>
        <h2>Opções de ${categoria}</h2>
        <div class="modal-opcoes">
            ${opcoes.map(opcao => `
                <div class="opcao-bebida">
                    <img src="${opcao.imagem}" alt="${opcao.nome}" 
                         onclick="event.stopPropagation(); abrirImagemModal('${opcao.imagem}', '${opcao.nome}')" 
                         style="cursor: pointer;">
                    <h4>${opcao.nome}</h4>
                    <p>${opcao.descricao}</p>
                    <p class="modal-preco">R$ ${opcao.preco.toFixed(2)}</p>
                    <button class="btn-adicionar" onclick="event.stopPropagation(); adicionarAoCarrinho('${opcao.nome}', ${opcao.preco})">
                        Adicionar ao Carrinho
                    </button>
                </div>
            `).join('')}
        </div>
    `;
    
    modal.style.display = 'flex';
}

// Função para abrir imagem em tamanho maior
function abrirImagemModal(src, nome) {
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <button class="modal-fechar" onclick="fecharModal()">&times;</button>
        <img src="${src}" alt="${nome}" class="modal-imagem-grande">
        <h3>${nome}</h3>
    `;
    
    modal.style.display = 'flex';
}

// Fechar Modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

// Finalizar Pedido
function finalizarPedido() {
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    const total = document.getElementById('carrinho-total').textContent;
    
    modalContent.innerHTML = `
        <button class="modal-fechar" onclick="fecharModal()">&times;</button>
        <h2>Finalizar Pedido</h2>
        <form id="formPedido" onsubmit="enviarPedido(event)" class="form-pedido">
            <div class="form-grupo">
                <label for="nome">Nome Completo:</label>
                <input type="text" id="nome" required placeholder="Digite seu nome completo">
            </div>
            
            <div class="form-grupo">
                <label for="celular">Celular:</label>
                <input type="tel" id="celular" required placeholder="(00) 00000-0000">
            </div>
            
            <div class="form-grupo">
                <label for="endereco">Endereço:</label>
                <input type="text" id="endereco" required placeholder="Rua, número">
            </div>
            
            <div class="form-grupo">
                <label for="bairro">Bairro:</label>
                <input type="text" id="bairro" required placeholder="Digite seu bairro">
            </div>
            
            <div class="form-grupo">
                <label for="complemento">Complemento:</label>
                <input type="text" id="complemento" placeholder="Apartamento, bloco, ponto de referência">
            </div>
            
            <div class="resumo-pedido">
                <h3>Resumo do Pedido</h3>
                <div id="itens-resumo">
                    ${Array.from(document.querySelectorAll('#carrinho-itens .carrinho-item'))
                        .map(item => `<p>${item.textContent}</p>`)
                        .join('')}
                </div>
                <p class="total"><strong>Total: R$ ${total}</strong></p>
            </div>

            <button type="submit" class="btn-confirmar">Confirmar Pedido</button>
        </form>
    `;
    
    modal.style.display = 'flex';
    
    // Máscara para o campo de celular
    const celularInput = document.getElementById('celular');
    celularInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = value;
        }
    });
}

function enviarPedido(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const celular = document.getElementById('celular').value;
    const endereco = document.getElementById('endereco').value;
    const bairro = document.getElementById('bairro').value;
    const complemento = document.getElementById('complemento').value;
    const total = document.getElementById('carrinho-total').textContent;
    
    // Pega os itens do carrinho
    const itensCarrinho = Array.from(document.querySelectorAll('#carrinho-itens .carrinho-item'))
        .map(item => item.textContent)
        .join('\n');
    
    // Fecha o modal do formulário
    fecharModal();
    
    // Cria e mostra a mensagem de confirmação
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <button class="modal-fechar" onclick="finalizarCompra()">&times;</button>
        <div class="confirmacao-pedido">
            <i class="fas fa-check-circle"></i>
            <h2>Pedido Confirmado!</h2>
            <div class="dados-pedido">
                <p><strong>Nome:</strong> ${nome}</p>
                <p><strong>Celular:</strong> ${celular}</p>
                <p><strong>Endereço:</strong> ${endereco}</p>
                <p><strong>Bairro:</strong> ${bairro}</p>
                <p><strong>Complemento:</strong> ${complemento}</p>
                <h3>Itens do Pedido:</h3>
                <div class="itens-pedido">
                    ${itensCarrinho}
                </div>
                <p class="total-confirmacao"><strong>Total: R$ ${total}</strong></p>
            </div>
            <button class="btn-ok" onclick="finalizarCompra()">OK</button>
        </div>
    `;
    
    modal.style.display = 'flex';
}

function finalizarCompra() {
    fecharModal();
    limparCarrinho();
}

function limparCarrinho() {
    const carrinhoItens = document.getElementById('carrinho-itens');
    carrinhoItens.innerHTML = '';
    document.getElementById('carrinho-total').textContent = '0.00';
    document.getElementById('carrinho-contador').textContent = '0';
    carrinhoItens = [];
    carrinhoTotal = 0;
    atualizarBotaoFinalizar();
}