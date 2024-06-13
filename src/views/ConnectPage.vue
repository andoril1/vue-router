<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-auto" v-for="pool in filterCoin" :key="pool.id">
            <div class="info-box bg-yellow-gradient">
                    <span class="info-box-text">
                        <h4>Connect your miner for {{ pool.coin.name }}</h4>
                        <hr>
                        <table style="margin: auto;">
                        <tr>
                            <th id="time">[Coin]</th>
                            <th id="one">[Algo]</th>
                            <th id="two" v-if="pool.coin.website">[Website]</th>
                            <th id="three" v-if="pool.coin.github">[Github]</th>
                            <th id="four">[Payout Scheme]</th>
                            <th id="five">[Pool Fee]</th>
                        </tr>
                        <tr>
                            <td style="padding-right: 10px;">{{ pool.coin.name }}</td>
                            <td style="padding-right: 10px;">{{ pool.coin.algorithm }}</td>
                            <td style="padding-right: 10px;" v-if="pool.coin.website">{{ pool.coin.website }}</td>
                            <td style="padding-right: 10px;" v-if="pool.coin.github">{{ pool.coin.github }}</td>
                            <td style="padding-right: 10px;">{{ pool.paymentProcessing.payoutScheme }}</td>
                            <td style="padding-right: 10px;">{{pool.poolFeePercent}}%</td>
                            
                        </tr>
                    </table>
                        <hr>
                        <table style="margin: auto;">
                            
                        <tr>
                            <th id="time">[EU]</th>
                            <th id="time">[Description]</th>
                            <th id="time">[NA]</th>
                        </tr>
                        <tr v-for="(value, id) in pool.ports" :key="id">
                           
                            <td style="padding-right: 10px;">
                                <h6><button @click="copyMe('stratum+tcp://eu.flazzard.com:', id)" style="background-color: transparent; padding: 0px">
                                <img src="@/assets/img/copy.png" style="height: 25px; width: 25px;"></button>
                                stratum+tcp://eu.flazzard.com:{{ id }}</h6><hr>
                            </td>
                            <td style="padding-right: 10px;">[{{ value.name }}]<br>[Var Diff]<br>{{ value.varDiff.minDiff }} &harr; &infin;<hr></td>
                            <td style="padding-right: 10px;">
                                <h6>stratum+tcp://na.flazzard.com:{{ id }}
                                <button @click="copyMe('stratum+tcp://na.flazzard.com:', id)" style="background-color: transparent; padding: 0px;">
                                <img src="@/assets/img/copy.png" style="height: 25px; width: 25px;"></button></h6><hr>
                            </td>
                            
                        </tr>
                    </table>
                    </span>
                </div>
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
        function copyMe(address,port){
          navigator.clipboard.writeText(address + port);
        }
        function getBlocks(coin, section, wallet) {
            axios
            .get('https://pool.flazzard.com/api/pools' + '/' + coin + '/' + section + '/' + wallet)
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
          id,
          copyMe
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