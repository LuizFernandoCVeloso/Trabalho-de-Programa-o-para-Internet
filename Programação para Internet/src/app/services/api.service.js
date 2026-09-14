// Equivalent to @Injectable({ providedIn: 'root' })
export class ApiService {
    async submitOrcamento(dados) {
        // Simulando um atraso de rede (Mock API)
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Dados enviados para a API:", dados);
                resolve({ 
                    sucesso: true, 
                    mensagem: `Obrigado, ${dados.nome}! Sua solicitação de orçamento foi registrada com sucesso.` 
                });
            }, 1000);
        });
    }
}
