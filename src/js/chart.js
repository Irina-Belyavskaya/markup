const ctx = document.getElementById('canvas-chart');

new Chart(ctx, {
type: 'bar',
data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
    label: 'Colors',
    data: [20, 5, 3, 15, 2, 3],
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: 'white',
    }]
},
options: {
    responsive: true,
    scales: {
        y: {
            ticks: 
                { 
                    color: 'black', 
                    beginAtZero: true, 
                    font: {
                        size: 16,                    
                    }
                }
        },
        x: {
            ticks: 
            { 
                color: 'black', 
                beginAtZero: true,
                font: {
                    size: 16,                    
                } 
    
            }
        }
    },
    plugins: {
        legend: {
            labels: {
                color: '#000',
                font: {
                    size: 20,                    
                }
            }
        }
    },
    layout: {
        padding: 20
    }
}
});