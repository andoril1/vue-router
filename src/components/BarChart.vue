<template>
    <Line
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
    {{ chartData }}

  </template>
  
  <script>
  import { Line } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale)
  import axios from "axios"
  import {ref} from 'vue'

  export default {
    name: 'BarChart',
    components: { Line },
    setup() {
      const stats = ref([])
      const chartData = ref([])
      const  chartOptions = ref({responsive: true})
        console.log(chartData)
      
        function applyStatsToChart(stats) {
    var tempChartData = {
        labels: [],
        datasets: [
            {
                label: 'Pool Hashrate',
                backgroundColor: '#8A6158',
                data: []
            },
            {
                label: 'Miners',
                backgroundColor: '#66E03C',
                data: []
            },
            {
                label: 'Network Hashrate',
                backgroundColor: '#f87979',
                data: []
            },
            {
                label: 'Network Difficulty',
                backgroundColor: '#3C5AE0',
                data: []
            },
            {
                label: 'Valid Shares',
                backgroundColor: '#3C5AE0',
                data: []
            },
        ]
    }

    stats.forEach((singleStatObj, index)=>{
        tempChartData.labels[index] = singleStatObj.created  // Format the date here
        tempChartData.datasets[0].data[index] = singleStatObj.poolHashrate
        tempChartData.datasets[1].data[index] = singleStatObj.connectedMiners
        tempChartData.datasets[2].data[index] = singleStatObj.networkHashrate
        tempChartData.datasets[3].data[index] = singleStatObj.networkDifficulty
        tempChartData.datasets[4].data[index] = singleStatObj.validSharesPerSecond
     })

    chartData.value = tempChartData
}
      
      function getStats() {
            axios
            .get('https://pool.flazzard.com/api/pools/pug1/performance')
            .then((response) => {
            applyStatsToChart(response.data.stats)
            console.log(response.data.stats)
            })
            .catch((error) => {
                console.log(error)
            })
            
        }
      return {
        getStats,
        stats,
        chartData,
        applyStatsToChart
      }
    },
    mounted() {
        this.getStats();
    },
    data() {
      return {
        chartData: {
          labels: [],
          datasets: []
        },
        chartOptions: {
          responsive: true
        }
      }
    }
  }
  </script>