<template>
    <v-chart class="chart" :option="option" autoresize />
  </template>
  
  <script setup>
  import { use } from 'echarts/core';
  import {useRoute} from 'vue-router'
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
  import { ref, provide, onMounted} from 'vue';
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
  const route = useRoute();
  const id = ref(route.params.id);
  const colors = ['#3C5AE0', '#F95B11', '#31F911', '#F911F2'];
  let hashLabel = "H/s"
  let netHashLabel = ref("")
  let netDiffLabel = ref("")
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
      type: 'value',

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
            formatter: '{name}',
            data: ['Hashrate', 'Miners', 'NetHash', 'NetDiff']
          },
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: [
          {
            type: 'value',
            //min: 'dataMin',
            name: 'Hashrate',
            position: 'left',
            alignTicks: false,
            nameTextStyle:{
              color: colors[0],
              align:'right'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              color: colors[0],
              formatter: '{value} ' + hashLabel
              
            }
          },
          {
            type: 'value',
            name: 'Miners',
            //min: 'dataMin',
            position: 'left',
            alignTicks: false,
            offset: 75,
            nameTextStyle:{
              color: colors[1],
              align: 'right'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1]
              }
            },
            axisLabel: {
              color: colors[1],
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: 'NetDiff',
            //min: 'dataMin',
            position: 'right',
            alignTicks: false,
            nameTextStyle:{
              color: colors[2],
              align: 'left'
            },
            offset: 75,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              color: colors[2],
              formatter: '{value} T'
            }
          },
          {
            type: 'value',
            name: 'NetHash',
            //min: 'dataMin',
            position: 'right',
            alignTicks: false,
            nameTextStyle:{
              color: colors[3],
              align: 'left'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[3]
              }
            },
            axisLabel: {
              color: colors[3],
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
            label: true,
            color: colors[0]
          },
          {
            name: 'Miners',
            type: 'line',
            yAxisIndex: 1,
            data: [],
            smooth: true,
            color:colors[1]
          },
          {
            name: 'NetHash',
            type: 'line',
            yAxisIndex: 2,
            data: [],
            smooth: true,
            color: colors[2]
          },
          {
            name: 'NetDiff',
            type: 'line',
            yAxisIndex: 3,
            data: [],
            smooth: true,
            color: colors[3]
          },
        ],
        
        
    }
    let yAxisLabels = []
    stats.forEach((singleStatObj, index)=>{
        var d = new Date(singleStatObj.created)
        tempOption.xAxis.data[index] = d.getHours() + ':00' // Format the date here
        var poolHash = getReadableHashrate(singleStatObj.poolHashrate.toFixed(2),0)
        var netHash = getReadableHashrate(singleStatObj.networkHashrate.toFixed(2),2)
        var netDiff = getReadableHashrate(singleStatObj.networkDifficulty.toFixed(2),3)
        tempOption.series[0].data[index] = poolHash
        tempOption.series[1].data[index] = singleStatObj.connectedMiners
        tempOption.series[2].data[index] = netHash
        tempOption.series[3].data[index] = netDiff
     })
     tempOption.yAxis[0].axisLabel.formatter = '{value} ' + yAxisLabels[0]
     tempOption.yAxis[2].axisLabel.formatter = '{value} ' + yAxisLabels[2]
     tempOption.yAxis[3].axisLabel.formatter = '{value} ' + yAxisLabels[3]
     
     function getReadableHashrate(hash, index) {
          //display in Hash
          if(hash < 1000) {
            yAxisLabels[index] = ((index == 2) ? 'H' : 'H/s')
            return hash
          //display in KiloHash
          } else if(hash < 1000000) {
              yAxisLabels[index] = ((index == 2) ? 'K' : 'KH/s')
              return hash/1000
          //display in MegaHash
          } else if(hash < 1000000000) {
              yAxisLabels[index] = ((index == 2) ? 'M' : 'MH/s')
              return hash/1000000
          //display in GigaHash
          } else if(hash < 1000000000000) {
              yAxisLabels[index] = ((index == 2) ? 'G' : 'GH/s')
              return hash/1000000000
          //display in TeraHash
          } else if(hash < 1000000000000000) {
            yAxisLabels[index] = ((index == 2) ? 'T' : 'TH/s')
            return hash/1000000000000
          //display in PetaHash
          } else if(hash < 1000000000000000000) {
            yAxisLabels[index] = ((index == 2) ? 'P' : 'PH/s')
            return hash/1000000000000000
          }
        }
    option.value = tempOption
    }
      function getStats() {
            axios
            .get('https://pool.flazzard.com/api/pools/' + id.value +'/performance')
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
  