import { FormularioComponent } from './app/components/formulario/formulario.component.js';

// Equivalente ao main.ts no Angular (Bootstrapping do AppModule)
document.addEventListener("DOMContentLoaded", () => {
    bootstrapApplication();
});

function bootstrapApplication() {
    // Inicializando o componente de formulário
    new FormularioComponent();
    
    // Outras lógicas/módulos globais da página
    inicializarInteracoesGlobais();
}

function inicializarInteracoesGlobais() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.cursor = "pointer";
        });
    });

    // Lógica para esconder o botão de descida após rolar a tela
    const btnFlutuante = document.querySelector(".btn-flutuante");
    if (btnFlutuante) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                btnFlutuante.classList.add("escondido");
            } else {
                btnFlutuante.classList.remove("escondido");
            }
        });
    }
}