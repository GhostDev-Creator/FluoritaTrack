function aplicarFiltroTurma(selectId, tableBodyId) {
    const filterSelect = document.getElementById(selectId);
    if (!filterSelect) return;

    const tableRows = document.querySelectorAll(`#${tableBodyId} tr`);

    filterSelect.addEventListener('change', (event) => {
        const turmaSelecionada = event.target.value;

        tableRows.forEach(row => {
            const rowTurma = row.getAttribute('data-turma');
            if (turmaSelecionada === 'todas' || turmaSelecionada === rowTurma) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    aplicarFiltroTurma('turma-filter-aulas', 'aulas-table-body');
    aplicarFiltroTurma('turma-filter-alunos', 'alunos-table-body');
    aplicarFiltroTurma('turma-filter-dashboard', 'dashboard-table-body');
});