<template>
      <div class="row">
        <div class="col-lg-12 col-md-6 col-sm-6 col-xs-12" v-for="pool in filterCoin" :key="pool.id">
            <div class="info-box bg-yellow-gradient">
                    <span class="info-box-text">
                        <h2>Connect your miner for {{ pool.coin.name }}</h2>
                        <hr>
                        <h5>Coin Name: {{ pool.coin.name }}</h5>
                        <hr>
                        <h5>Algorithm: {{ pool.coin.algorithm }}</h5>
                        <hr>
                        <h5 v-if="pool.coin.website">Website: {{ pool.coin.website }}</h5>
                        <hr>
                        <h5 v-if="pool.coin.github">Github: {{ pool.coin.github }}<hr></h5>
                        <h5>Payout Scheme: {{ pool.paymentProcessing.payoutScheme }}</h5>
                        <hr>
                        <h5>Minimum Threshold: {{ pool.paymentProcessing.minimumPayment }}</h5>
                        <hr>
                        <h5>Pool Fee: {{pool.poolFeePercent}}%</h5>
                        <hr>
                        <div v-for="(value, id) in pool.ports" :key="id">
                        <h5>NA: stratum+tcp://na.flazzard.com:{{ id }} startDiff: {{ value.difficulty }} / VarDiff: {{ value.varDiff.minDiff }} &harr; &infin; [{{ value.name }}]</h5>
                        <br>
                        <h5>EU: stratum+tcp://pool.flazzard.com:{{ id }} startDiff: {{ value.difficulty }} / VarDiff: {{ value.varDiff.minDiff }} &harr; &infin; [{{ value.name }}]</h5>
                        <hr>
                        {{ getBlocks(pool.id) }}
                        </div>
                    </span>
                </div>
            </div>
      </div>
  </template>
  
  <script>
import axios from 'axios'
import {ref,computed} from 'vue'
import {useRoute} from 'vue-router'
  export default {
    setup(){
        
        const pools = ref([]);
        const blocks = ref([]);
        const route = useRoute();
        const id = ref(route.params.id);
        function getPools() {
            axios
            .get('https://pool.flazzard.com/api/pools')
            .then((response) => {
                //console.log(response.data.pools)
                pools.value =response.data.pools
                //console.log(response.data.pools)
            })
            .catch((error) => {
                console.log(error)
            })
            
        }
        function getBlocks(coin) {
            axios
            .get('https://pool.flazzard.com/api/pools' + '/' + coin + '/blocks')
            .then((response) => {
                //console.log(response.data.pools)
                blocks.value =response.data
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
            
        }
        const filterCoin = computed(function() {
                //show if PPLNS - Button is pressed
                return pools.value.filter((pool) => pool.id==id.value)
        });
        return{
          getPools,
          getBlocks,
          pools,
          blocks,
          filterCoin,
          id
        }
        

    },
    mounted() {
        this.getPools();
        this.getBlocks();
    },
  
  }
  </script>
  
  <style>
  
  </style>