<template>
  <div class="row justify-content-center">
    <div class="col-auto" v-for="pool in filterCoin" :key="pool.id">
        <div class="info-box bg-yellow-gradient">
                <span class="info-box-text">
                    <h3>Block Stats</h3>
                    <hr>
                    <h6>BlockChain Height: 
                    <br>{{ pool.networkStats.blockHeight }}</h6>
                    <hr>
                    <div v-for="block in filterPending" :key="block.id">
                    <h6>Pending Blocks:
                    <br>{{ filterPending.length }}</h6>
                    <hr>
                    </div>
                    <h6 v-if="!block">
                    Pending Blocks:
                    <br>0
                    <hr>
                    </h6>
                    <h6>Confirmed Blocks: 
                    <br>{{ pool.totalBlocks }}</h6>
                    <hr>
                    <div v-for="block in filterCreated" :key="block.id">
                    <h6>Block Reward: 
                    <br>{{ block.reward }}</h6>
                    <hr>
                    </div>
                    <h6>Block Value: 
                    <br>Needs work</h6>
                    <hr>
                </span>
            </div>
        </div>
        <div class="col-auto" v-for="pool in filterCoin" :key="pool.id">
          <div class="info-box bg-yellow-gradient">
            <span class="info-box-text">
                    
                    <h3>Payment Stats</h3>
                    <hr>
                    <h6>Payment Threshold:
                    <br>{{ pool.paymentProcessing.minimumPayment }} {{ pool.coin.symbol }} [{{ pool.paymentProcessing.payoutScheme }}]</h6>
                    <hr>
                    <h6>Pool Fee: 
                    <br>{{pool.poolFeePercent}}%</h6>
                    <hr>
                    <h6>Pool effort:
                    <br>Needs work</h6>
                    <hr>
                    <h6>Total Paid:
                    <br>{{ formatHashrate(pool.totalPaid,3,"") }} [{{ pool.coin.symbol }}]</h6>
                    <hr>
                    <h6>Connected Peers:
                    <br>{{ pool.networkStats.connectedPeers }}</h6>
                    <hr>
                    <h6>Coin Price:
                    <br>Needs Work</h6>
                    <hr>
                    <h6>Pool TTF:
                    <br>Needs work</h6>
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
          const blocks = ref(["hello"]);
          const route = useRoute();
          const id = ref(route.params.id);
          const pending = ref(0);
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
          function getBlocks() {
            axios
            .get('https://pool.flazzard.com/api/pools' + '/' + id.value + '/blocks')
            .then((response) => {
                //console.log(response.data.pools)
                blocks.value =response.data
                //console.log(response.data)

            })
            .catch((error) => {
                console.log(error)
            })
            
        }
          const pendingBlock = computed(function(block) {
                if(block.status == 'pending') {
                  pending++
                }
                else return pending = 0;
          });
          const filterCoin = computed(function() {
                  //show if PPLNS - Button is pressed
                  return pools.value.filter((pool) => pool.id==id.value)
          });
          const filterCreated = computed(function() {
                  //show if PPLNS - Button is pressed
                  return blocks.value.filter((block) => block.created=='2024-06-11T10:30:30.38267Z')
          });
          const filterPending = computed(function() {
                  //show if PPLNS - Button is pressed
                  return blocks.value.filter((block) => block.status=='pending')
          });
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
          return{
            getPools,
            pools,
            blocks,
            pending,
            pendingBlock,
            filterCoin,
            filterCreated,
            filterPending,
            id,
            formatHashrate,
            getBlocks
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