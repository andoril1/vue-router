<template>
    <div class="row">
    <div class="col-lg-12 col-md-6 col-sm-6 col-xs-12" v-for="pool in filterCoin" :key="pool.id">
        <div class="info-box bg-yellow-gradient">
                <span class="info-box-text">
                    <h3>Our Top Miners for {{ pool.coin.name }}[{{ pool.coin.symbol }}]</h3>
                    <hr>
                    <div v-for="(value,id) in pool.topMiners" :key="id">
                    <ul style="column-count:3">
                      <li>Address:
                      <br>{{ value.miner }}
                      </li>
                      <li>Hashrate
                      <br>{{ value.hashrate }}
                      </li>
                      <li>Shares Per Second
                      <br>{{ value.sharesPerSecond }}
                      </li>
                    </ul>                 
                    <hr>
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
          const route = useRoute();
          const id = ref(route.params.id);
          function getPools() {
              axios
              .get('https://pool.flazzard.com/api/pools')
              .then((response) => {
                  //console.log(response.data.pools)
                  pools.value =response.data.pools
                  console.log(response.data.pools)
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
            pools,
            filterCoin,
            id
          }
          
  
      },
      mounted() {
          this.getPools();
      },
    
    }
    </script>
  
  <style>
  
  </style>