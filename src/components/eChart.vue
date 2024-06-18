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
    GridComponent,
    DataZoomComponent
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
    GridComponent,
    DataZoomComponent
  ]);
  
  provide(THEME_KEY, 'dark');
  const colors = ['#5470C6', '#91CC75', '#EE6666'];
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
      console.log(option)
      
    function applyStatsToChart(stats) {
        var tempOption = {
          title: {
            text: '',
            left: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}',
            feature: {
              dataZoom: {
                yAxisIndex: false
              }
            }
          },
          legend: {
            data: ['Hashrate', 'Miners', 'NetHash', 'NetDiff']
          },
          xAxis: {
            type: 'category',
            data: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00', '13:00','14:00','15:00', '16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
          },
          yAxis: [
          {
            type: 'value',
            name: 'Hashrate',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value} GH'
            }
          },
          {
            type: 'value',
            name: 'Miners',
            position: 'left',
            alignTicks: true,
            offset: 55,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: 'NetDiff',
            position: 'right',
            alignTicks: true,
            offset: 55,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              formatter: '{value} T'
            }
          },
          {
            type: 'value',
            name: 'NetHash',
            position: 'right',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: '{value} TH'
            }
          }
        ],
          grid: [
          {
            left: '20%',
            right: '20 %',
            bottom: 60
          },
          {
            left: '20%',
            right: '10%',
            height: 80,
            bottom: 80
          }
        ],
        dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 10,
          end: 100
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: 'slider',
          bottom: 10,
          start: 10,
          end: 100
        }
        ],
          series: [
          {
            name: 'Hashrate',
            type: 'line',
            data: [],
            smooth: true,
            label: true
          },
          {
            name: 'Miners',
            type: 'line',
            yAxisIndex: 1,
            data: [],
            smooth: true,
          },
          {
            name: 'NetHash',
            type: 'line',
            yAxisIndex: 2,
            data: [],
            smooth: true,
          },
          {
            name: 'NetDiff',
            type: 'line',
            yAxisIndex: 3,
            data: [],
            smooth: true,
          },
        ],
        
        
    }

    stats.forEach((singleStatObj, index)=>{
        tempOption.xAxis.data[index] = singleStatObj.created.replace('Z',"") // Format the date here
        tempOption.series[0].data[index] = singleStatObj.poolHashrate.toFixed(2) /1000000000
        tempOption.series[1].data[index] = singleStatObj.connectedMiners
        tempOption.series[2].data[index] = singleStatObj.networkHashrate.toFixed(2) /1000000000000
        tempOption.series[3].data[index] = singleStatObj.networkDifficulty.toFixed(2) /1000000000000
     })

    option.value = tempOption
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
        function formatHashrate(value, decimal, unit) {
        if (value === 0) {
            return "0 " + unit;
        } else {
            var si = [
            { value: 1, symbol: "" },
            { value: 1e3, symbol: "k" },
            { value: 1e6, symbol: "M" },
            { value: 1e9, symbol: "G" },
            { value: 1e12, symbol: "T" },
            { value: 1e15, symbol: "P" },
            { value: 1e18, symbol: "E" },
            { value: 1e21, symbol: "Z" },
            { value: 1e24, symbol: "Y" }
            ];
            for (var i = si.length - 1; i > 0; i--) {
            if (value >= si[i].value) {
                break;
            }
            }
            return ((value / si[i].value).toFixed(decimal).replace(/.0+$|(.[0-9]*[1-9])0+$/, "$1") + " " + si[i].symbol + unit);
            }
        }
      onMounted(() => {
        getStats()
})
  </script>
  
  <style scoped>
  .chart {
    height: 50vh;
    width: 120vh;
  }
  </style>
  