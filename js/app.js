document.addEventListener('DOMContentLoaded', function() {
    // Adiciona um evento que será executado quando o DOM estiver completamente carregado.
    const swiper = new Swiper('.swiper', {
        // Cria uma nova instância do Swiper (carrossel), associada ao contêiner com a classe 'swiper'.
        direction: 'horizontal',
        // Define a direção de transição dos slides como horizontal.
        loop: true,
        // Define que o carrossel irá repetir os slides (fará looping).
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
            // Define os botões de navegação para avançar ('.swiper-button-next') e retroceder ('.swiper-button-prev') os slides.
        }
    });

    document.addEventListener('keydown', function (event) {
        // Adiciona um listener para eventos de teclado.
        if(event.key === 'ArrowLeft') {
            swiper.slidePrev();
            // Se a tecla pressionada for a seta para a esquerda, move para o slide anterior.
        } else if(event.key === 'ArrowRight') {
            swiper.slideNext();
            // Se a tecla pressionada for a seta para a direita, move para o próximo slide.
        }
    });

    const gameInput = document.getElementById('gameInput');
    // Seleciona o elemento de entrada de texto com o ID 'gameInput'.

    const games = {
        'MARIO': 0,
        'POKEMON': 1,
        'ZELDA': 2
    };

    gameInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.trim().toLowerCase();
        const slides = document.querySelectorAll('.swiper-slide');
        
        if (!searchTerm) {
            slides.forEach(slide => slide.style.display = 'block');
            return;
        }

        slides.forEach((slide, index) => {
            const title = slide.querySelector('.subtitle').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                slide.style.display = 'block';
                swiper.slideTo(index);
            } else {
                slide.style.display = 'none';
            }
        });
    });

    // Função para criar e mostrar modal
    function createModal(title, content) {
        // Remove qualquer modal existente
        const existingModal = document.querySelector('.modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.className = 'modal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${title}</h2>
                <div class="modal-body">${content}</div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animação de entrada
        requestAnimationFrame(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'translateY(0)';
        });
        
        const closeBtn = modal.querySelector('.close-modal');
        const closeModal = () => {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'translateY(20px)';
            setTimeout(() => modal.remove(), 300);
        };
        
        closeBtn.onclick = closeModal;
        
        modal.onclick = (event) => {
            if (event.target === modal) {
                closeModal();
            }
        };

        // Fechar com ESC
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        // Manipulação dos formulários
        const form = modal.querySelector('form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                // Simular envio do formulário
                modal.querySelector('.modal-content').style.transform = 'scale(0.95)';
                setTimeout(() => {
                    modal.querySelector('.modal-content').style.transform = 'scale(1)';
                    setTimeout(() => {
                        alert('Operação realizada com sucesso!');
                        closeModal();
                    }, 200);
                }, 200);
            });
        }
    }

    // Adicionar listeners para botões de compra
    document.querySelectorAll('.pricing').forEach(button => {
        button.addEventListener('click', () => {
            const gameTitle = button.querySelector('.subtitle').textContent;
            const modalContent = `
                <form class="purchase-form">
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required placeholder="Seu email">
                    </div>
                    <div class="form-group">
                        <label for="payment">Método de Pagamento:</label>
                        <select id="payment" name="payment">
                            <option value="credit">Cartão de Crédito</option>
                            <option value="debit">Cartão de Débito</option>
                            <option value="pix">PIX</option>
                        </select>
                    </div>
                    <button type="submit" class="purchase-button">Finalizar Compra</button>
                </form>
            `;
            createModal(`Comprar ${gameTitle}`, modalContent);
        });
    });

    // Adicionar funcionalidade ao botão de login
    const loginButton = document.querySelector('.login-btn');
    loginButton.addEventListener('click', () => {
        const modalContent = `
            <form class="login-form">
                <div class="form-group">
                    <label for="username">Usuário:</label>
                    <input type="text" id="username" name="username" required placeholder="Seu usuário">
                </div>
                <div class="form-group">
                    <label for="password">Senha:</label>
                    <input type="password" id="password" name="password" required placeholder="Sua senha">
                </div>
                <button type="submit" class="login-button">Entrar</button>
            </form>
        `;
        createModal('Login', modalContent);
    });
});