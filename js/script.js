const formulario = document.getElementById('formulario');
const matriculaInput = document.getElementById('mf');
const senhaInput = document.getElementById('senha');
const mensagemElement = document.getElementById('mensagem');

function carregarUsuarioRegistrado() {
    const usuarioSalvo = localStorage.getItem('usuarioRegistrado');
    
    if (usuarioSalvo) {
        return JSON.parse(usuarioSalvo); 
    }
    
    console.warn('Nenhum usuário encontrado no localStorage. Usando credenciais de fallback.');
    return { 
        matricula: '03212008', 
        senha: 'lalatrack'
    }; 
}

const USUARIO_VALIDO = carregarUsuarioRegistrado();

const MIN_MF_LENGTH = 8;
const MAX_MF_LENGTH = 14;

formulario.addEventListener('submit', function(evento) {

    evento.preventDefault(); 
    
    mensagemElement.textContent = '';
    mensagemElement.style.color = 'black';

    const matricula = matriculaInput.value.trim();
    const senha = senhaInput.value;

    if (!matricula || !senha) {
        mensagemElement.textContent = 'Por favor, preencha a Matrícula e a Senha.';
        mensagemElement.style.color = 'orange';
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

    if (matricula === USUARIO_VALIDO.matricula && senha === USUARIO_VALIDO.senha) {

        mensagemElement.textContent = '✅ Acesso liberado! Redirecionando para o Dashboard...';
        mensagemElement.style.color = 'green';
        
        setTimeout(() => {
            window.location.href = 'dash.html'; 
            console.log('Login bem-sucedido. Redirecionamento simulado.');
        }, 1500); 
        
    } else {
        mensagemElement.textContent = '❌ Credenciais inválidas. Matrícula Funcional ou senha incorreta.';
        mensagemElement.style.color = 'red';
        senhaInput.value = '';
    }
});