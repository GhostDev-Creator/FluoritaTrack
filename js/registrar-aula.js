function configurarBuscaTurma(selectId, tableBodyId, buttonId) {
    const filterSelect = document.getElementById(selectId);
    const searchButton = document.querySelector(`.${buttonId}`);
    
    if (!filterSelect || !searchButton) return;

    const tableRows = document.querySelectorAll(`#${tableBodyId} tr`);

    searchButton.addEventListener('click', (evento) => {
        evento.preventDefault(); 
        
        const turmaSelecionada = filterSelect.value;

        tableRows.forEach(row => {
            const rowTurma = row.getAttribute('data-turma');
            if (turmaSelecionada === 'todas' || turmaSelecionada === rowTurma) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        
        // Opcional: Feedback visual de que a busca foi realizada
        console.log(`Filtro aplicado para: ${turmaSelecionada}`);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    configurarBuscaTurma(
        'turma-filter-alunos',
        'alunos-table-body',
        'btn-secondary'
    );
});