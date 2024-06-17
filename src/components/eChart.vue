<template>
    <v-chart class="chart" v-if="chart_loaded" :option="option" autoresize />
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
  let chart_loaded = ref(true)
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
        data: [820, 932, 901, 934, 1290, 1330, 2000],
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
        var tempOption = {
          legend: {
            data: ['Pool Hashrate', 'Miners', 'Net Hashrate', 'Net Difficulty']
          },
          xAxis: {
            data: []
          },
          series: [
          {
            name: 'Pool Hashrate',
            type: 'line',
            data: [],
            smooth: true,
          },
          {
            name: 'Miners',
            type: 'line',
            data: [],
            smooth: true,
          },
          {
            name: 'Net Hashrate',
            type: 'line',
            data: [],
            smooth: true,
          },
          {
            name: 'Net Difficulty',
            type: 'line',
            data: [],
            smooth: true,
          },
        ],
        
    }

    stats.forEach((singleStatObj, index)=>{
        tempOption.xAxis.data[index] = singleStatObj.created  // Format the date here
        tempOption.series[0].data[index] = singleStatObj.poolHashrate
        tempOption.series[1].data[index] = singleStatObj.connectedMiners
        tempOption.series[2].data[index] = singleStatObj.networkHashrate
        tempOption.series[3].data[index] = singleStatObj.networkDifficulty
        tempOption.series[4].data[index] = singleStatObj.validSharesPerSecond
     })

    option.value = tempOption
    chart_loaded = true
    console.log(chart_loaded)
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
  