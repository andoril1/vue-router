<template>
    <v-chart class="chart" :option="option" autoresize />
  </template>
  
  <script setup>
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { LineChart } from 'echarts/charts';
  import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
  } from 'echarts/components';
  import VChart, { THEME_KEY } from 'vue-echarts';
  import { ref, provide, onMounted } from 'vue';
  import axios from 'axios';
  
  use([
    CanvasRenderer,
    LineChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
  ]);
  
  provide(THEME_KEY, 'dark');
  
  const option = ref({
    title: {
      text: '',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
    data: ['Hashrate', 'Difficulty']
    },
    xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Hashrate',
        type: 'line',
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        smooth: true,
      },
      {
        name: 'Difficulty',
        type: 'line',
        data: [500, 400, 250, 50, 100, 1500, 2000],
        smooth: true,
      },
    ],
  });
      const chartData = ref([])
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
            //console.log(response.data.stats)
            })
            .catch((error) => {
                console.log(error)
            })
            
        }
      onMounted(() => {
        getStats()
})
  </script>
  
  <style scoped>
  .chart {
    height: 50vh;
    width: 75vh;
  }
  </style>
  