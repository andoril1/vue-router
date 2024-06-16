<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-auto" v-for="pool in filterCoin" :key="pool.id">
          <div class="info-box bg-yellow-gradient">
                  <span class="info-box-text">
                      <h2>Your Dashboard - {{ pool.coin.name }} [{{ pool.coin.symbol }}]</h2>
                      <hr>
                      <h3>Please input WalletAddress to load stats</h3>
                      <input v-model="walletAddress" type="input" style="width: 300px" id="walletAddress"><input type="submit" @click="checkWallet(pool.id)" autocomplete="on">
                      <div v-if="blocks">
                        <table style="margin: auto;">
                        <tr>
                            <th id="time" style="padding-right: 10px;">[Pending Shares]</th>
                            <th id="time" style="padding-right: 10px;">[Pending Balance]</th>
                            <th id="time" style="padding-right: 10px;">[Payout Today]</th>
                            <th id="time" style="padding-right: 10px;">[Lifetime Balance]</th>
                            <th id="time" style="padding-right: 10px;">[Last Payment]</th>
                        </tr>
                        <tr>
                            <td style="padding-right: 10px;">{{ formatHashrate(blocks.pendingShares,2,"") }}</td>
                            <td style="padding-right: 10px;">{{ formatHashrate(blocks.pendingBalance,2,"") }}</td>
                            <td style="padding-right: 10px;">{{ formatHashrate(blocks.todayPaid,2,"") }}</td>
                            <td style="padding-right: 10px;">{{ formatHashrate(blocks.totalPaid,2,"") }}</td>
                            <td style="padding-right: 10px;"><a :href="blocks.lastPaymentLink" style="text-decoration: none;" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H600v-80h160v-480H200v480h160v80H200Zm240 0v-246l-64 64-56-58 160-160 160 160-56 58-64-64v246h-80Z"/></svg></a><span v-html="renderTimeAgoBox(blocks.lastPayment)"></span></td>
                        </tr>
                    </table>
                        
                      </div>
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
        const pending = ref(0);
        const buttonPressed =ref(false)
        const walletAddress =ref(""); 
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
        function getBlocks(coin, section,wallet) {
            axios
            .get('https://pool.flazzard.com/api/pools' + '/' + coin + '/' + section + '/' + wallet)
            .then((response) => {
                //console.log(response.data.pools)
                blocks.value =response.data
            })
            .catch((error) => {
                console.log(error)
            })       
            
            
        }
        function checkWallet(pool) {
          alert('Wallet Loaded!')
          getBlocks(pool, 'miners', walletAddress.value)
        }
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
        return{
          getPools,
          pools,
          blocks,
          pending,
          filterCoin,
          filterCreated,
          filterPending,
          id,
          formatHashrate,
          getBlocks,
          getTimeAgoAdmin,
          renderTimeAgoBox,
          walletAddress,
          buttonPressed,
          checkWallet
        }
        

    },
    mounted() {
        this.getPools();
        //this.getBlocks();
    },
  
  }
</script>

<style>
  
</style>