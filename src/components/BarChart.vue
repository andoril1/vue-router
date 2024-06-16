<template>
    <Line
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
    <div v-for="stat in stats" :key="stat.id">labels:{{ stat.created }} ||| pool hashrate data:{{ stat.poolHashrate}} ||| miners: {{ stat.connectedMiners }}|||
      network hashrate: {{ stat.networkHashrate }} ||| network diff: {{ stat.networkDifficulty }}
    </div>
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
      const chartData = ref([{
          labels: [],
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
        },]);
        console.log(chartData)
      
    function applyStatsToChart(stats) {
    var tempChartData = []
    var tempLabels = []
    var tempDataSets = []

    var poolHashPoints = {
        label: 'Pool Hashrate',
        backgroundColor: '#8A6158',
        data: []
    }

    var minerPoints = {
        label: 'Miners',
        backgroundColor: '#66E03C',
        data: []
    }

    var netHashPoints = {
        label: 'Network Hashrate',
        backgroundColor: '#f87979',
        data: []
    }

    var netDiffPoints = {
        label: 'Network Difficulty',
        backgroundColor: '#3C5AE0',
        data: []
    }

    var sharesPoints = {
        label: 'Valid Shares',
        backgroundColor: '#3C5AE0',
        data: []
    }

    stats.forEach((singleStatObj, index)=>{
        tempLabels[index] = singleStatObj.created  // Format the date here
        poolHashPoints.data[index] = singleStatObj.poolHashrate
        minerPoints.data[index] = singleStatObj.connectedMiners
        netHashPoints.data[index] = singleStatObj.networkHashrate
        netDiffPoints.data[index] = singleStatObj.networkDifficulty
        sharesPoints.data[index] = singleStatObj.validSharesPerSecond
     })

    tempDataSets = [...tempDataSets, poolHashPoints, minerPoints, netHashPoints, netDiffPoints, sharesPoints]
    tempChartData = [...tempDataSets, tempLabels, tempDataSets]
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