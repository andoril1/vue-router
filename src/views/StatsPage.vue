<template>
    <div class="row justify-content-center">
        <div class="col-auto">
            <div class="info-box bg-yellow-gradient">
                <table style="margin: auto;" v-if="coinPrice && blocks">
                    <br>
                    <tr>
                        <th id="time" style="padding-right: 10px;">[BlockChain]<br>[Height]</th>
                        <th id="time" style="padding-right: 10px;">[Pending]<br>[Blocks]</th>
                        <th id="time" style="padding-right: 10px;">[Confirmed]<br>[Blocks]</th>
                        <th id="time" style="padding-right: 10px;">[Coin]<br>[Price]</th>
                        <th id="time" style="padding-right: 10px;">[Block]<br>[Value]</th> 
                        <th id="time" style="padding-right: 10px;">[Block]<br>[Reward]</th>
                    </tr>
                    <tr>
                        <td style="padding-right: 10px;">{{ pool.networkStats.blockHeight }}</td>
                        <td style="padding-right: 10px;">{{ filterPending.length }}</td>
                        <td style="padding-right: 10px;">{{ pool.totalBlocks }}</td>
                        <td style="padding-right: 10px;">${{ formatHashrate(coinPrice,7,"") }}</td>
                        <td style="padding-right: 10px;">{{ pool.coin.symbol }}${{formatHashrate(coinPrice * blocks[14].reward,4,"")}}</td>
                        <td style="padding-right: 10px;">{{ formatHashrate(blocks[14].reward,1,pool.coin.symbol) }}</td>
                    </tr>
                    <br>
                    <tr>
                        <th id="time" style="padding-right: 10px;">[Connected]<br>[Peers]</th>
                        <th id="time" style="padding-right: 10px;">[Payment]<br>[Threshold]</th>
                        <th id="time" style="padding-right: 10px;">[Pool]<br>[Fee]</th>
                        <th id="time" style="padding-right: 10px;">[Pool]<br>[Effort]</th>
                        <th id="time" style="padding-right: 10px;">[Pool]<br>[TTF]</th>
                        <th id="time" style="padding-right: 10px;">[Total]<br>[Paid]</th>
                    </tr>
                    <tr>
                        <td style="padding-right: 10px;">{{ pool.networkStats.connectedPeers }}</td>
                        <td style="padding-right: 10px;">{{ pool.paymentProcessing.minimumPayment }} {{ pool.coin.symbol }}</td>
                        <td style="padding-right: 10px;">{{ pool.poolFeePercent }}%</td>
                        <td style="padding-right: 10px;" v-bind="checkEffort(pool.coin.family,pool.poolEffort, pool.coin.name)"></td>
                        <td style="padding-right: 10px;">{{ readableSeconds(pool.networkStats.networkHashrate / pool.poolStats.poolHashrate * pool.blockRefreshInterval) }}</td>
                        <td style="padding-right: 10px;">{{ formatHashrate(pool.totalPaid,3,"") }} [{{ pool.coin.symbol }}]</td>
                    </tr>
                    <br>
                </table>
            </div>
        </div>

        <h5 v-if="pool">{{pool.coin.symbol}}</h5>
        <agChart />    

    </div>
</template>
  
<script>
import axios from 'axios'
import {ref,computed, watch, onBeforeUpdate} from 'vue'
import {useRoute} from 'vue-router'
import agChart from '@/components/eChart.vue'
export default {
    components:{
        agChart
    },

    setup(){          
        const route = useRoute();
        const id = ref(route.params.id);
        const pool = ref({});
        const blocks = ref([]);
        const coinPrice = ref({});
        let PoolEffort = ref("")

        watch(blocks,(newValue,oldValue) => { 
            setTimeout(() => {
                updateData()
            }, 60000);
        });

        function updateData() {            
            getPools()
            getBlocks()
        }

        function getPools() {
            axios.get('https://pool.flazzard.com/api/pools/' + id.value)
                .then((response) => {
                    pool.value = response.data
                    console.log("Returned Pools: ", pools.value)
                    setPrice(pool.coin.symbol)
                })
                .catch((error) => {
                    console.warn("getPools error: ", error)
                }
            )
        }           

        function setPrice(ticker) {
            console.log("Getting price for : " + ticker)
            console.log(ticker)
            axios.get('https://api.xeggex.com/api/v2/market/getbysymbol/' + pool.coin.symbol + '%2FUSDT')
                .then((response) => {
                    coinPrice.value = response.data.lastPrice
                    console.log("Returned coin price: ", coinPrice.value)
                })
                .catch((error) => {
                    console.warn("getPrice error: ", error)
                }
            )                      
        }

        function getBlocks() {
            axios.get('https://pool.flazzard.com/api/pools' + '/' + id.value + '/blocks')
                .then((response) => {
                    blocks.value = response.data
                    console.log("Returned Blocks: ", response.data)
                })
                .catch((error) => {
                    console.warn("getBlocks error: ", error)
                }
            )            
        }

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
        function getTimeAgoAdmin(date) {
            date=new Date(date)
            if (!date || isNaN(date.getTime())) {
                return "NEVER";
            }
            var now = new Date();
            var diff = now.getTime() - date.getTime();
            var seconds = Math.floor(diff / 1000);
            if (seconds < 60) {
                return "NOW";
            }
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.floor(hours / 24);
            var months = Math.floor(days / 30);
            if (months >= 1) {
                return months + " month" + (months > 1 ? "s" : "");
            } else if (days >= 2) {
                return days + " day" + (days > 1 ? "s" : "");
            } else if (hours >= 48) {
                return "2 days";
            } else if (hours >= 2) {
                return hours + " hours";
            } else if (minutes >= 2) {
                return minutes + " min" + (minutes > 1 ? "s" : "");
            } else {
                return "NOW";
            }
        }

        function renderTimeAgoBox(date) {
            var textColor = 'white';
            var borderRadius = '.25em';
            var bgColor = '';
            var timeAgo = this.getTimeAgoAdmin(date);
            
            if (timeAgo === "NEVER" || timeAgo === "NOW") {
                bgColor = (timeAgo === "NEVER") ? '#666666' : '#00c000';
            } else if (timeAgo.includes("month")) {
                bgColor = '#d1941f'; // Orange for months
            } else if (timeAgo.includes("day")) {
                bgColor = '#c0c000'; // Yellow for days
            } else if (timeAgo.includes("hour")) {
                bgColor = '#008000'; // Dark green for hours
            } else if (timeAgo.includes("min")) {
                bgColor = '#00c000'; // Bright green for minutes
            }

            return "<div class='d-flex align-items-center justify-content-center' style='background-color:" + bgColor + "; color: " + textColor + "; border-radius: " + borderRadius + "; width: 100%; padding: 2px; font-size: 75%; font-weight: 700; text-align: center; height: 20px;'>" + timeAgo + "</div>";
        }

        // String Convert -> Seconds
        function readableSeconds(t) {
            var seconds = Math.floor(t % 3600 % 60);
            var minutes = Math.floor(t % 3600 / 60);
            var hours = Math.floor(t % 86400 / 3600);
            var days = Math.floor(t % 604800 / 86400);	
            var weeks = Math.floor(t % 2629799.8272 / 604800);
            var months = Math.floor(t % 31557597.9264 / 2629799.8272);
            var years = Math.floor(t / 31557597.9264);

            var sYears = years > 0 ? years + ((years== 1) ? "y" : "y") : "";
            var sMonths = months > 0 ? ((years > 0) ? " " : "") + months + ((months== 1) ? "mo" : "mo") : "";
            var sWeeks = weeks > 0 ? ((years > 0 || months > 0) ? " " : "") + weeks + ((weeks== 1) ? "w" : "w") : "";
            var sDays = days > 0 ? ((years > 0 || months > 0 || weeks > 0) ? " " : "") + days + ((days== 1) ? "d" : "d") : "";
            var sHours = hours > 0 ? ((years > 0 || months > 0 || weeks > 0 || days > 0) ? " " : "") + hours + (hours== 1 ? "h" : "h") : "";
            var sMinutes = minutes > 0 ? ((years > 0 || months > 0 || weeks > 0 || days > 0 || hours > 0) ? " " : "") + minutes + (minutes == 1 ? "m" : "m") : "";
            var sSeconds = seconds > 0 ? ((years > 0 || months > 0 || weeks > 0 || days > 0 || hours > 0 || minutes > 0) ? " " : "") + seconds + (seconds == 1 ? "s" : "s") : ((years < 1 && months < 1 && weeks < 1 && days < 1 && hours < 1 && minutes < 1 ) ? " Few milliseconds" : "");
            if (seconds > 0) return sYears + sMonths + sWeeks + sDays + sHours + sMinutes + sSeconds;
            
            return 'unknown';
        }

        function checkEffort(family, poolEffort, coinName) {
            if (family == "alephium") {
                PoolEffort = Number(poolEffort) * Math.pow(2, 30) * 100;
                // Bitcoin (family)
            } else if (family == "bitcoin") {
                // Vertcoin (coin)
                if (coinName == "Vertcoin") {
                PoolEffort = (Number(poolEffort) / 256) * 100;
                // VishAI (coin)
                } else if (coinName == "Vishai") {
                PoolEffort = (Number(poolEffort) / 65536) * 100;
                // Reaction (coin)
                } else if (coinName == "Reaction") {
                PoolEffort = (Number(poolEffort) / 65536) * 100;
                } else {
                PoolEffort = Number(poolEffort) * 100;
                }
                // Kaspa (family)
            } else if (family == "kaspa") {
                PoolEffort = Number(poolEffort) * Math.pow(2, 31) * 100;
            } else {
                PoolEffort = Number(poolEffort) * 100;
            }
            console.log(PoolEffort)
            var effortClass = "";
            if (PoolEffort >= 500) {
                effortClass = "effort4";
            } else if (PoolEffort >= 300) {
                effortClass = "effort3";
            } else if (PoolEffort >= 200) {
                effortClass = "effort2";
            } else if (PoolEffort >= 100) {
                effortClass = "effort1";
            }
            else {
                effortClass = "effort0";
            }
        }
        
        return{
            updateData,
            getPools,
            pools,
            blocks,
            coinPrice,
            filterPending,
            id,
            formatHashrate,
            getBlocks,
            getPrice: setPrice,
            renderTimeAgoBox,
            getTimeAgoAdmin,
            readableSeconds,
            checkEffort
        }
          
  
    },

    mounted() {
        this.updateData()
    },

}
</script>
<style>

</style>