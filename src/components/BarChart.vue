<template>
    <Line
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script>
  import { Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Line },
    data() {
      return {
        chartData: {
          labels: [ 'Monday', 'Tuesday', 'Today', 'Tomorrow' ],
          datasets: [
            {
            label: 'Pool Hashrate',
            backgroundColor: '#8A6158',
            data: [10, 20, 35, 100, 35, 120, 65]
            },
            {
            label: 'Miners',
            backgroundColor: '#66E03C',
            data: [35, 45, 5, 60, 60, 30, 60]
            },
            {
            label: 'Network Hashrate',
            backgroundColor: '#f87979',
            data: [50, 60, 20, 30, 51, 90, 35]
            },
            {
            label: 'Network Difficulty',
            backgroundColor: '#3C5AE0',
            data: [40, 39, 10, 40, 39, 80, 40]
            }
        ]
        },
        chartOptions: {
          responsive: true
        }
      }
    }
  }
  </script>