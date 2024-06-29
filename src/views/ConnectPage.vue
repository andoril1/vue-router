<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-auto" v-if="pools.pool">
            <div class="info-box bg-yellow-gradient">
                    <span class="info-box-text">
                        <h5>Connect your miner for {{ pools.pool.coin.name }}</h5>
                        <table style="margin: auto;">
                        <tr>
                            <th id="time">[Coin]</th>
                            <th id="one">[Algo]</th>
                            <th id="two" v-if="pools.pool.coin.website">[Website]</th>
                            <th id="three" v-if="pools.pool.coin.github">[Github]</th>
                            <th id="four">[Payout Scheme]</th>
                            <th id="five">[pools.Pool Fee]</th>
                        </tr>
                        <tr>
                            <td style="padding-right: 10px;">{{ pools.pool.coin.name }}</td>
                            <td style="padding-right: 10px;">{{ pools.pool.coin.algorithm }}</td>
                            <td style="padding-right: 10px;" v-if="pools.pool.coin.website"><a :href="pools.pool.coin.website"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600v-80h160v-480H200v480h160v80H200Zm240 0v-246l-64 64-56-58 160-160 160 160-56 58-64-64v246h-80Z"/></svg></a>{{ pools.pool.coin.website.replace('https://', "") }}</td>
                            <td style="padding-right: 10px;" v-if="pools.pool.coin.github"><a :href="pools.pool.coin.github"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600v-80h160v-480H200v480h160v80H200Zm240 0v-246l-64 64-56-58 160-160 160 160-56 58-64-64v246h-80Z"/></svg></a>{{ pools.pool.coin.github.replace('https://' , "") }}</td>
                            <td style="padding-right: 10px;">{{ pools.pool.paymentProcessing.payoutScheme }}</td>
                            <td style="padding-right: 10px;">{{pools.pool.poolFeePercent}}%</td>
                            
                        </tr>
                    </table>
                    <br>
                    <table style="margin:auto">
                        <tr>
                            <th>Select region</th>
                            <th>Select port</th>
                            <th>Select OS</th>
                        </tr>
                        <tr>
                            <td>
                                <select v-model="selectedRegion">
                                    <option>Europe</option>
                                    <option>North America</option>
                                </select>
                            </td>
                            <td>
                                <select v-model="selectedPort">
                                    <option v-for="(value, id) in pools.pool.ports" :key="id" :value="id">{{value.name}} - VarDiff: {{ value.varDiff.minDiff }} &harr; &infin;</option>
                                </select>
                            </td>
                            <td>
                                <select v-model="selectedOS">
                                    <option>HiveOS</option>
                                    <option>Windows</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                    <br>
                    <h3 v-if="selectedPort && selectedRegion == 'Europe'">
                        <pre>stratum+tcp://eu.flazzard.com:{{selectedPort}}</pre>
                        <button @click="copyMe('eu', selectedPort)" style="background-color: transparent; padding: 0px;">
                        <img src="@/assets/img/copy.png" style="height: 25px; width: 25px;"></button>
                    </h3>
                    <h3 v-if="selectedPort && selectedRegion == 'North America'">
                        <pre>stratum+tcp://na.flazzard.com:{{selectedPort}}</pre>
                        <button @click="copyMe('eu', selectedPort)" style="background-color: transparent; padding: 0px;">
                            <img src="@/assets/img/copy.png" style="height: 25px; width: 25px;">
                        </button>
                    </h3>
                    </span>
                </div>
                <div class="info-box bg-yellow-gradient">
                    <span class="info-box-text">
                        <h3>Miner Configuration</h3>
                        <h2>Getting started</h2>
                        <hr />
                        <table style="margin:auto">
                            <h5>Requirements:</h5>
                            <ul>
                                <li>{{ pools.pool.coin.name }} Wallet address. </li>
                                <li>Mining software for {{ pools.pool.coin.algorithm }}</li>
                                <li>Compatible hardware</li>
                            </ul>        
                        </table>
                        <h5>Getting a wallet address:</h5>
                        <div v-if="pools.pool.coin.github && pools.pool.coin.family == 'kaspa'">
                            Build wallet from source, or if available you can download a wallet directly from <a :href="pools.pool.coin.github" target="_blank">Github</a>
                            <br> Follow the instruction on the Github to complete install, if you get stuck don't hesistate to either ask us or in the discord of {{ pools.pool.coin.name }}
                            <br> Please consider installing the wallet on a virtual machine unless you trust the project completely.
                            <br> Warning: mining directly to an exchange is not recommended!
                        </div>
                        <div v-else-if="pools.pool.coin.family == 'kaspa'">
                            Build wallet from source, or if available you can download a wallet directly from {{ pools.pool.coin.name }} website or github.
                            <br> Follow the instruction on the Github to complete install, if you get stuck don't hesistate to either ask us or in the discord of {{ pools.pool.coin.name }}
                            <br> Please consider installing the wallet on a virtual machine unless you trust the project completely.
                            <br> Warning: mining directly to an exchange is not recommended!
                        </div>
                        <div v-else-if="pools.pool.coin.family != 'kaspa'">
                            Build wallet from source, or if available you can download a wallet directly from {{ pools.pool.coin.name }} website or github.
                            <br> Follow the instruction on the Github to complete install, if you get stuck don't hesistate to either ask us or in the discord of {{ pools.pool.coin.name }}
                            <br> Please consider installing the wallet on a virtual machine unless you trust the project completely.
                            <br> Warning: mining directly to an exchange is not recommended!
                        </div>
                        <hr>
                        <div v-if="selectedOS == 'HiveOS'"><h5>HiveOS Config suggestion:</h5>
                            <hr>
                            <h5>Add wallet in HiveOS:</h5>
                            <br>
                            <table>
                                <tr>
                                    <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/wallet_top.png" style="width:450px;"></td>
                                    <th>Adding a new coin to HiveOS (wallets -> add wallet)</th>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/wallet_coin.png" style="width:450px;"></td>
                                    <th>Search for the coin or add it if it doesn't exist.</th>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/wallet_address.png" style="width:450px;"></td>
                                    <th>Add your mining address for {{ pools.pool.coin.name }}.</th>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/wallet_name.png" style="width:450px;"></td>
                                    <th>Add the name of your wallet.</th>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/wallet_bottom.png" style="width:450px;"></td>
                                    <th>Press Create and your done!</th>
                                </tr>
                            </table>
                            <br>
                            <h5>Create FlightSheet</h5>
                            <table>
                                <tr>
                                    <th>Add {{pools.pool.coin.name}}<br>- coin</th>
                                    <th>Add {{pools.pool.coin.name}}<br>- wallet</th>
                                    <th>Configure <br>in miner</th>
                                    <th>Select miner</th>
                                </tr> 
                                <tr style="background-color:#363d45">
                                    <td><img src="./../assets/img/HiveOS/flightsheet_coin.webp" style="width:120px;"></td>
                                    <td><img src="./../assets/img/HiveOS/flightsheet_wallet.webp" style="width:120px;"></td>
                                    <td><img src="./../assets/img/HiveOS/flightsheet_pool.webp" style="width:120px;"></td>
                                    <td><img src="./../assets/img/HiveOS/flightsheet_XMRig.webp" style="width:120px;"></td>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/flightsheet_bottom.webp" style="width:487px;"></td>
                                    <th>Choose a name and press update</th>
                                </tr>
                            </table>
                            <br>
                            <h5>Setup miner config</h5>
                            <br>
                            <table>
                                <tr>
                                    <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/bzminer_top.webp" style="width:450px;"></td>
                                    <th>We recommend Bzminer for this coin.</th>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px;"><img src="./../assets/img/HiveOS/bzminer_algo.webp" style="width:450px;"></td>
                                    <th>Select kaspa.</th>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/bzminer_wallet.webp" style="width:450px;"></td>
                                    <th>Write %WAL% to use your HiveOS wallet.</th>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/bzminer_worker.webp" style="width:450px;"></td>
                                    <th>Write %WORKER_NAME% to display workername</th>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/bzminer_pool.webp" style="width:450px;"></td>
                                    <th>Add pool from above.</th>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/bzminer_extra.webp" style="width:450px;"></td>
                                    <th>Optional. Here we're dualmining zil, <br>theres also some OC Settings.</th>
                                </tr>
                                <tr>
                                    <td style="padding-right: 10px"><img src="./../assets/img/HiveOS/bzminer_bottom.webp" style="width:450px;"></td>
                                    <th>Press update to save changes.</th>
                                </tr>
                            </table>
                        </div>
                        <div v-else-if="selectedOS == 'Windows'">Windows:</div>
                        <div v-else>Please select mining OS above for config suggestions...</div>
                        <!--
                        <div v-if="pools.pool.coin.algorithm == 'Karlsenhash'">
                            
                            <table>
                                <tr>
                                    <td><img src="./../assets/img/Hiveos_Karlsen1.png" style="width:450px;"></td>
                                    <td style="text-align:left">
                                        <ul>
                                            <li>Add wallet and coin to Hiveos</li>
                                            <li>Select {{ pools.pool.coin.name }} under Coin in Hiveos</li>
                                            <li>Select your {{ pools.pool.coin.name }}-wallet</li>
                                            <li>Set Pool as "Configure in miner".</li>
                                            <li>Select your miner, we recommend Rigel miner for this coin.</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td><img src="./../assets/img/Hiveos_Karlsen2.png" style="width:450px;"></td>
                                    <td style="text-align:left">
                                        <ul>
                                            <li>[Hash algorithm] Select Karlsenhash<hr></li>
                                            <li>[Wallet template] Input %WAL%<hr></li>
                                            <li>[Pass] Leave empty or write x, If you wish to use a static difficulty, <br>add d=xxxx (replace xxxx with your desired difficulty).<hr></li>
                                            <li>[WorkerName] put %WORKER_NAME% <br>for the worker name to be displayed in the pool.<hr></li>
                                            <li>[Pool URL] Put the desired url and port from above.<hr></li>
                                            <li>[Extra config arguements] Optional,<br> in the example im dualmining zil.<hr></li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                            <h5>Windows:</h5>
                        </div>
                        <div v-else-if="pools.pool.coin.algorithm == 'Pyrin'">
                            <h5>HiveOS:</h5>
                            <img src="./../assets/img/Hiveos_Pyrin1.png" style ="width: 70%">
                            <br>
                            <img src="./../assets/img/Hiveos_Pyrin2.png" style ="width: 40%">
                            <h5>Windows:</h5>
                        </div>
                        <div v-else-if="pools.pool.coin.algorithm == 'kHeavyHash'">
                            To mine {{ pools.pool.coin.name }} with GPU's we recommend Rigel, see instructions below:
                            <h5>HiveOS:</h5>
                            <img src="./../assets/img/Hiveos_KHeavyHash1.png" style ="width: 70%">
                            <br>
                            <img src="./../assets/img/Hiveos_KHeavyHash2.png" style ="width: 40%">
                            <h5>Windows:</h5>
                        </div>
                        <div v-else-if="pools.pool.coin.algorithm == 'KawPow'">
                            <h5>HiveOS:</h5>
                            <img src="./../assets/img/Hiveos_Kawpow1.png" style ="width: 70%">
                            <br>
                            <img src="./../assets/img/Hiveos_KawPow2.png" style ="width: 40%">
                            <h5>Windows:</h5>
                        </div>
                        <div v-else-if="pools.pool.coin.algorithm == 'Ghostrider'">
                            <h5>HiveOS:</h5>
                            <img src="./../assets/img/Hiveos_GR1.png" style ="width: 70%">
                            <br>
                            <img src="./../assets/img/Hiveos_GR2.png" style ="width: 40%">
                            <h5>Windows:</h5>
                        </div>
                        -->
                    </span>
                </div>
            </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios'
import {ref, watch} from 'vue'
import {useRoute} from 'vue-router'
  export default {
    components:{
    },
    setup(){
        const pools = ref([]);
        const route = useRoute();
        const id = ref(route.params.id);
        const selectedRegion = ref("");
        const selectedPort = ref("");
        const selectedOS = ref("");
        console.log(selectedRegion)
        function getPools() {
            axios
            .get('https://pool.flazzard.com/api/pools/' + id.value)
            .then((response) => {
                pools.value =response.data
                //console.log("Returned Pools: ", response.data)
            })
            .catch((error) => {
                console.warn("getPools error: ", error)
            }) 
        }
        watch(selectedRegion,(newValue,oldValue) => { 
            if(newValue != oldValue) {
                console.log("Returned selectedRegion: ", selectedRegion)
            }});
        function copyMe(region,port){
          navigator.clipboard.writeText('stratum+tcp://' + region + '.flazzard.com:' + port);
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
          pools,
          id,
          selectedRegion,
          selectedPort,
          selectedOS,
          copyMe,
          getStratumStatus
        }
        

    },
    mounted() {
        this.getPools();
    },
  
  }
  </script>
  
  <style>
  table, th, td {
    border-bottom: 0px solid #ddd;
    }
  </style>