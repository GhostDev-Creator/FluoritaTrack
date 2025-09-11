window.onload = function() { 
    const canvas = document.getElementById('frequenciaChart');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 250;
    canvas.height = 250;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 90;
    const lineWidth = 20;

    const data = {
        totalClasses: 28,
        justifiedAbsences: 8,
        unjustifiedAbsences: 7,
        late: 6
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
        ctx.strokeStyle = '#ff0000'; 
        ctx.stroke();
        currentAngle += redSegment;

        const yellowSegment = (2 * Math.PI) * (late / 100);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + yellowSegment);
        ctx.strokeStyle = '#ffff00';
        ctx.stroke();
        currentAngle += yellowSegment;

        const greenSegment = (2 * Math.PI) * (presence / 100);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + greenSegment);
        ctx.strokeStyle = '#00ff4c';
        ctx.stroke();
    }

    updateDashboard(data);
};