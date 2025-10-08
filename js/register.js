const formulario = document.getElementById('formulario');
const matriculaInput = document.getElementById('mf');
const senhaInput = document.getElementById('senha');
const cpfInput = document.getElementById('cpf');
const mensagemElement = document.getElementById('mensagem');

const MIN_MF_LENGTH = 8;
const MAX_MF_LENGTH = 14;
const CPF_LENGTH = 11; 
const MIN_PASSWORD_LENGTH = 8;

formulario.addEventListener('submit', function(evento) {

    evento.preventDefault(); 
    
    mensagemElement.textContent = '';
    mensagemElement.style.color = 'black';

    const matricula = matriculaInput.value.trim();
    const senha = senhaInput.value;
    const cpf = cpfInput.value.replace(/[^0-9]/g, '');

    if (!cpf || !matricula || !senha) {
        mensagemElement.textContent = 'Por favor, preencha o CPF, matrícula e a senha.';
        mensagemElement.style.color = 'orange';
        return;
    }

    if (isNaN(cpf) || cpf.length !== CPF_LENGTH) {
        mensagemElement.textContent = `O CPF deve conter exatamente ${CPF_LENGTH} dígitos numéricos.`;
        mensagemElement.style.color = 'red';
        return;
    }
    
    if (isNaN(matricula)) {
        mensagemElement.textContent = 'A Matrícula Funcional deve conter apenas números.';
        mensagemElement.style.color = 'red';
        return;
    }
    
    if (matricula.length < MIN_MF_LENGTH || matricula.length > MAX_MF_LENGTH) {
        mensagemElement.textContent = `A Matrícula deve ter entre ${MIN_MF_LENGTH} e ${MAX_MF_LENGTH} dígitos.`;
        mensagemElement.style.color = 'red';
        return;
    }

    const regexSenha = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{${MIN_PASSWORD_LENGTH},}$`);
    
    if (!regexSenha.test(senha)) {
        mensagemElement.textContent = `A senha deve ter no mínimo ${MIN_PASSWORD_LENGTH} caracteres, incluindo letra maiúscula, minúscula e um número.`;
        mensagemElement.style.color = 'red';
        return;
    }
    
    const novoUsuario = {
        cpf: cpf,
        matricula: matricula,
        senha: senha
    };

    localStorage.setItem('usuarioRegistrado', JSON.stringify(novoUsuario));
    
    mensagemElement.textContent = '✅ Conta criada com sucesso! Redirecionando para o Login...';
    mensagemElement.style.color = 'green';
    
    console.log('Novo usuário registrado:', novoUsuario);
    
    setTimeout(() => {
        window.location.href = 'index.html'; 
    }, 1500); 
    
});