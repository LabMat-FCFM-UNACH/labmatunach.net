// Función para generar números aleatorios y guardarlos en localStorage
        let randomNum = 3;
        function generateRandomNumbers() {
            let randomNumbers = [];
            for (let i = 0; i < 1; i++) {
                //let randomNum = Math.random() * 99;
                randomNumbers.push(randomNum.toFixed(2)); // Limitar a dos decimales
                randomNum += Math.random() * 2 - 1;
            }
            return randomNumbers;
        }

        // Configurar el gráfico de líneas con Chart.js
        const ctx = document.getElementById('chartCanvas').getContext('2d');
        const maxDataPoints = 30; // Límite máximo de puntos en el gráfico
        const lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Valores Aleatorios',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Función para actualizar el gráfico con límite de puntos
        function updateChart() {
            const storedNumbers = generateRandomNumbers().map(Number);
            const currentData = lineChart.data.datasets[0].data;

            // Añadir nuevos datos al inicio del array
            lineChart.data.datasets[0].data = [...storedNumbers, ...currentData.slice(0, maxDataPoints - storedNumbers.length)];

            // Actualizar etiquetas si es necesario (opcional)
            const labelsCount = lineChart.data.labels.length;
            const newLabels = Array.from({ length: storedNumbers.length }, (_, i) => `Punto ${labelsCount + i + 1}`);
            lineChart.data.labels = [...newLabels, ...lineChart.data.labels.slice(0, maxDataPoints - storedNumbers.length)];

            lineChart.update();
        }

        // Actualizar el gráfico cada 5 segundos (5000 milisegundos)
        setInterval(updateChart, 1500);

        // Inicializar el gráfico en la carga de la página
        updateChart();
