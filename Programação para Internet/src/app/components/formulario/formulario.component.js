import { ApiService } from '../../services/api.service.js';

export class FormularioComponent {
    constructor() {
        this.apiService = new ApiService();
        this.init();
    }

    // Inicialização Assíncrona para buscar o HTML
    async init() {
        await this.render();
        this.initFormulario();
    }

    async render() {
        try {
            // Busca o HTML do componente usando fetch (requer um servidor local ativo, como o Live Server)
            const response = await fetch('./app/components/formulario/formulario.component.html');
            if (!response.ok) throw new Error('Erro ao carregar o template HTML');
            
            const template = await response.text();
            
            // Injeta o template no seletor correspondente
            const host = document.querySelector('app-formulario');
            if (host) {
                host.innerHTML = template;
            }
        } catch (error) {
            console.error(error);
            const host = document.querySelector('app-formulario');
            if (host) {
                host.innerHTML = '<p style="color:red; text-align:center;">Erro ao carregar o formulário. Certifique-se de estar rodando o projeto em um servidor local (Live Server).</p>';
            }
        }
    }

    initFormulario() {
        this.formulario = document.getElementById("formularioOrcamento");
        this.mensagem = document.getElementById("mensagemSucesso");
        this.campoData = document.getElementById("data");

        // Se o formulário não foi injetado com sucesso, aborta a iniciação dos listeners
        if (!this.formulario || !this.mensagem || !this.campoData) return;

        this.definirDataMinima();
        this.vincularEventos();
    }

    definirDataMinima() {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        this.campoData.min = `${ano}-${mes}-${dia}`;
    }

    vincularEventos() {
        this.formulario.addEventListener("submit", async (event) => {
            event.preventDefault();
            await this.onSubmit();
        });
    }

    async onSubmit() {
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const veiculo = document.getElementById("veiculo").value;
        const servico = document.getElementById("servico").value;
        const data = document.getElementById("data").value;
        const descricao = document.getElementById("mensagem").value;

        const btnSubmit = this.formulario.querySelector('button[type="submit"]');
        const textoOriginal = btnSubmit.textContent;
        
        btnSubmit.textContent = "Enviando...";
        btnSubmit.disabled = true;

        try {
            // Chamada ao serviço de API
            const resposta = await this.apiService.submitOrcamento({ 
                nome, email, telefone, veiculo, servico, data, descricao 
            });
            this.exibirMensagem(resposta.mensagem, "sucesso");
            this.formulario.reset();
        } catch (error) {
            this.exibirMensagem("Erro ao enviar solicitação. Tente novamente mais tarde.", "erro");
        } finally {
            btnSubmit.textContent = textoOriginal;
            btnSubmit.disabled = false;
        }
    }

    exibirMensagem(texto, tipo) {
        this.mensagem.textContent = texto;
        this.mensagem.style.display = "block";
        
        if (tipo === "sucesso") {
            this.mensagem.style.backgroundColor = "#d4edda";
            this.mensagem.style.color = "#155724";
        } else {
            this.mensagem.style.backgroundColor = "#f8d7da";
            this.mensagem.style.color = "#721c24";
        }

        setTimeout(() => {
            this.mensagem.style.display = "none";
        }, 5000);
    }
}
