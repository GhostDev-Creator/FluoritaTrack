window.onload = function() {
    const canvas = document.getElementById('frequenciaChart');
    const ctx = canvas.getContext('2d');
    const classSelect = document.getElementById('turma-filter-dashboard');
    const tableBody = document.getElementById('dashboard-table-body');
    const tableRows = tableBody.querySelectorAll('tr');

    canvas.width = 280;
    canvas.height = 200;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 75;
    const lineWidth = 20;

    const allClassData = {
        'todas': {
            totalClasses: 28,
            justifiedAbsences: 3,
            unjustifiedAbsences: 10,
            late: 8
        },
        'turma-a': {
            totalClasses: 14,
            justifiedAbsences: 2,
            unjustifiedAbsences: 5,
            late: 3
        },
        'turma-b': {
            totalClasses: 14,
            justifiedAbsences: 1,
            unjustifiedAbsences: 5,
            late: 5
        }
    };

    function updateDashboard(data) {
        document.getElementById('justifiedAbsencesCount').textContent = data.justifiedAbsences;
        document.getElementById('unjustifiedAbsencesCount').textContent = data.unjustifiedAbsences;
        document.getElementById('lateCount').textContent = data.late;
        document.getElementById('totalFaults').textContent = data.justifiedAbsences + data.unjustifiedAbsences;
        
        const totalAbsences = data.unjustifiedAbsences + data.late + data.justifiedAbsences;
        const presenceCount = data.totalClasses - totalAbsences;

        const presencePercentage = (presenceCount / data.totalClasses) * 100;
        const unjustifiedAbsencesPercentage = (data.unjustifiedAbsences / data.totalClasses) * 100;
        const latePercentage = (data.late / data.totalClasses) * 100;

        document.getElementById('presencePercentageText').textContent = `${Math.round(presencePercentage)}%`;
        
        drawChart(
            unjustifiedAbsencesPercentage, 
            latePercentage, 
            presencePercentage
        );
    }
    
    function drawChart(unjustifiedAbsences, late, presence) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.stroke();

        let currentAngle = 1.5 * Math.PI;

        const redSegment = (2 * Math.PI) * (unjustifiedAbsences / 100);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + redSegment);
        ctx.strokeStyle = '#e74c3c';
        ctx.stroke();
        currentAngle += redSegment;

        const yellowSegment = (2 * Math.PI) * (late / 100);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + yellowSegment);
        ctx.strokeStyle = '#f1c40f';
        ctx.stroke();
        currentAngle += yellowSegment;

        const greenSegment = (2 * Math.PI) * (presence / 100);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + greenSegment);
        ctx.strokeStyle = '#2ecc71';
        ctx.stroke();
    }
    
    function filterAndDraw() {
        const selectedClass = classSelect.value;
        const filteredData = allClassData[selectedClass];
        
        updateDashboard(filteredData);
        
        tableRows.forEach(row => {
            const rowTurma = row.getAttribute('data-turma');
            if (selectedClass === 'todas' || selectedClass === rowTurma) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    classSelect.addEventListener('change', filterAndDraw);

    filterAndDraw();
};
