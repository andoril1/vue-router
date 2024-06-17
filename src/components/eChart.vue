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
  import { ref, provide } from 'vue';
  
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
  </script>
  
  <style scoped>
  .chart {
    height: 50vh;
    width: 75vh;
  }
  </style>
  