document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const btnSubmit = document.getElementById('btn-submit');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const originalBtnText = btnSubmit.innerText;
        btnSubmit.innerText = 'Enviando...';
        btnSubmit.disabled = true;

        const formData = new FormData(form);

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
                form.reset(); 
            } else {
                alert('Ocorreu um erro ao enviar. Por favor, tente novamente ou use nosso e-mail direto.');
            }
        })
        .catch(error => {
            alert('Erro de conexão. Verifique sua internet.');
            console.error('Erro:', error);
        })
        .finally(() => {
            btnSubmit.innerText = originalBtnText;
            btnSubmit.disabled = false;
        });
    });
});