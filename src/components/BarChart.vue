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
  import axios from "axios"
  import {ref} from 'vue'

  export default {
    name: 'BarChart',
    components: { Line },
    setup() {
      const stats = ref([])
      const chartData = ref([{
          labels: [ 'Funday', 'Tuesday', 'Today', 'Tomorrow' ],
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
      
      function getStats() {
            axios
            .get('https://pool.flazzard.com/api/pools/pug1/performance')
            .then((response) => {
                stats.value =response.data.stats
                console.log(response.data.stats)
            })
            .catch((error) => {
                console.log(error)
            })
            
        }
      return {
        getStats,
        stats,
        chartData
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