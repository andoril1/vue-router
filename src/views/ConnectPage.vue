<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-auto" v-for="pool in pools" :key="pool.id">
            <div class="info-box bg-yellow-gradient">
                    <span class="info-box-text">
                        <h5>Connect your miner for {{ pool.coin.name }}</h5>
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
                            <td style="padding-right: 10px;" v-if="pool.coin.website"><a :href="pool.coin.website"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600v-80h160v-480H200v480h160v80H200Zm240 0v-246l-64 64-56-58 160-160 160 160-56 58-64-64v246h-80Z"/></svg></a>{{ pool.coin.website.replace('https://', "") }}</td>
                            <td style="padding-right: 10px;" v-if="pool.coin.github"><a :href="pool.coin.github"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600v-80h160v-480H200v480h160v80H200Zm240 0v-246l-64 64-56-58 160-160 160 160-56 58-64-64v246h-80Z"/></svg></a>{{ pool.coin.github.replace('https://' , "") }}</td>
                            <td style="padding-right: 10px;">{{ pool.paymentProcessing.payoutScheme }}</td>
                            <td style="padding-right: 10px;">{{pool.poolFeePercent}}%</td>
                            
                        </tr>
                    </table>
                    <br>
                        <table style="margin: auto;">
                            
                        <tr>
                            <th id="time">[EU]</th>
                            <th id="time">[Description]</th>
                            <th id="time">[NA]</th>
                        </tr>
                        <tr v-for="(value, id) in pool.ports" :key="id">
                           
                            <td style="padding-right: 10px;">
                                <h6><button @click="copyMe('stratum+tcp://eu.flazzard.com:', id)" style="background-color: transparent; padding: 0px;">
                                <img src="@/assets/img/copy.png" style="height: 25px; width: 25px;"></button>
                                stratum+tcp://eu.flazzard.com:{{ id }}</h6>
                            </td>
                            <td style="padding-right: 10px;">[{{ value.name }}]<br>[Var Diff]<br>{{ value.varDiff.minDiff }} &harr; &infin;</td>
                            <td style="padding-right: 10px;">
                                <h6>stratum+tcp://na.flazzard.com:{{ id }}
                                <button @click="copyMe('stratum+tcp://na.flazzard.com:', id)" style="background-color: transparent; padding: 0px;">
                                <img src="@/assets/img/copy.png" style="height: 25px; width: 25px;"></button></h6>
                            </td>
                            
                        </tr>
                    </table>
                    </span>
                </div>
                <div class="info-box bg-yellow-gradient">
                    <span class="info-box-text">
                        <h3>Miner Configuration</h3>
                        <h2>Getting started</h2>
                        <hr />
                            To get started mining and use this pool you need the following
                            <ul>
                                <li>{{ pool.coin.name }} Wallet address</li>
                                <li>crypto mining software that supports the {{ pool.coin.name }} coin and algorithm {{ pool.coin.algorithm }}</li>
                                <li>hardware to run it on. This can be you home PC, mining rig, ASIC miner or cloud mining</li>
                            </ul>
                            <br>
                            <h4>{{ pool.coin.name }} Wallet address</h4>
                            A wallet address is needed to payout you shares mined at this pool server.<br>
                            When the total mined value is past the payout threshold, we will send your coin to this wallet address.<br>
                            <br>
                            <br>
                            <h4>crypto mining software</h4>
                            To mine at this pool you can use any miner supporting the {{ pool.coin.algorithm }} algorithm or {{ pool.coin.name }} coin.<br>
                            Use an search engine and search for "{{ pool.coin.name }} miner software".
                            download the miner software and configure your crypto miner.<br>
                            <p>Where:</p>
              <ul>
			    <li>POOL STRATUM ADDRESS AND PORT - one off the stratum addresses above in the Pool Configuration section depending on the difficuty you want</li>
                <li>YOUR_WALLET_ADDRESS - your valid {{ pool.coin.name }} wallet address</li>
				<li>WORKERNAME - an optional workername can be used to identify the miner or RIG</li>
				<li>PASSWORD - use x or leave it blank</li>
				<br>
				Optional:
				<li>STATIC DIFFICULTY - to mine with a static (fixed) difficulty 
				    simply use&nbsp;<code>d=xxx</code>&nbsp;as password in your
					miner configuration where&nbsp;<code>xxx</code>&nbsp;denotes your
					preferred difficulty.
				</li>
			  </ul>
                    </span>
                </div>
            </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios'
import {ref} from 'vue'
import {useRoute} from 'vue-router'
  export default {
    setup(){
        const pools = ref([]);
        const blocks = ref([]);
        const route = useRoute();
        const id = ref(route.params.id);
        function getPools() {
            axios
            .get('https://pool.flazzard.com/api/pools/' + id.value)
            .then((response) => {
                //console.log(response.data.pools)
                pools.value =response.data
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
        let stratumConnectionInfo = [];

        function ping(stratumObj, pong) {
        var started = new Date().getTime();
        var http = new XMLHttpRequest();
        http.open("GET", "https://" + stratumObj.url, /*async*/true);
        http.onreadystatechange = function() {
            if (http.readyState == 4) {
            var ended = new Date().getTime();

            var milliseconds = ended - started;

            if (pong != null) {
                pong(stratumObj, milliseconds);
            }
            }
        };
        try {
            http.send(null);
        } catch(err) {
            console.error(err);
        }
        }

        function getStratumStatus() {
            console.log("Getting status for each stratum",stratumConnectionInfo)
            $.each(stratumConnectionInfo, function(index, value) {
                ping(value, updateStratumDisplay)
            });
        }

        function updateStratumDisplay(stratumObj, ping) {
            console.log("Stratum tested:", stratumObj);
            console.log("Ping time:", ping);
            $("#ping-" + stratumObj.id).text(ping + " ms")
        }
        return{
          getPools,
          getBlocks,
          pools,
          blocks,
          id,
          copyMe,
          getStratumStatus
        }
        

    },
    mounted() {
        this.getPools();
        //this.getBlocks();
    },
  
  }
  </script>
  
  <style>
  table, th, td {
    border-bottom: 1px solid #ddd;
    }
  </style>