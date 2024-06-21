<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-auto" v-for="pool in pools" :key="pool.id">
        <div class="info-box bg-yellow-gradient">
          <span class="info-box-text">
            <h1>Welcome to the Support Page</h1>
            <h5>If you have any issues please don't hesitate to ask for help either on discord or on Telegram</h5>
            <a href="https://discord.gg/mD8S3Vd5" target="_blank"> <img style="width:300px;" src="@/assets/img/discord.png" alt="Discord"> </a>
					 <a href="https://t.me/flazzardmining" target="_blank"> <img style="width:300px;" src="@/assets/img/telegram.png" alt="Telegram"> </a>
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
          .get('https://pool.flazzard.com/api/pools/' + id.value)
          .then((response) => {
              pools.value =response.data
              //console.log(response.data)
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
      return{
        getPools,
        getBlocks,
        pools,
        blocks,
        id,
        copyMe
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