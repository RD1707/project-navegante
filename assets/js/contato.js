document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const btnSubmit = document.getElementById('btn-submit');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o recarregamento da página

        // Feedback visual (Muda texto do botão)
        const originalBtnText = btnSubmit.innerText;
        btnSubmit.innerText = 'Enviando...';
        btnSubmit.disabled = true;

        // Coleta os dados do formulário
        const formData = new FormData(form);

        // Envia para o FormSubmit via AJAX (sem sair da página)
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                form.reset(); // Limpa o formulário
            } else {
                alert('Ocorreu um erro ao enviar. Por favor, tente novamente ou use nosso e-mail direto.');
            }
        })
        .catch(error => {
            alert('Erro de conexão. Verifique sua internet.');
            console.error('Erro:', error);
        })
        .finally(() => {
            // Restaura o botão
            btnSubmit.innerText = originalBtnText;
            btnSubmit.disabled = false;
        });
    });
});