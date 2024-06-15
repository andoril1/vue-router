<template>
  <div class="container">
    <div class="row">
      <div class ="navBar" v-show="($route.params.id)">
          <router-link to="/"><button class="btn btn-info btn-fill btn-sm">Home</button></router-link> |
          <router-link :to="{ name: 'Stats', params: { id: ($route.params.id) } }">
            <button class="btn btn-info btn-fill btn-sm">Stats</button>
          </router-link> |
          <router-link :to="{ name: 'Dashboard', params: { id: ($route.params.id) } }">
            <button class="btn btn-info btn-fill btn-sm">Dashboard</button>
          </router-link> |
          <router-link :to="{ name: 'Miners', params: { id: ($route.params.id) } }">
            <button class="btn btn-info btn-fill btn-sm">Miners</button>
          </router-link> |
          <router-link :to="{ name: 'Blocks', params: { id: ($route.params.id) } }">
            <button class="btn btn-info btn-fill btn-sm">Blocks</button> 
          </router-link> |
          <router-link :to="{ name: 'Payments', params: { id: ($route.params.id) } }">
            <button class="btn btn-info btn-fill btn-sm">Payments</button>
          </router-link> |
          <router-link :to="{ name: 'Connect', params: { id: ($route.params.id) } }">
            <button class="btn btn-info btn-fill btn-sm">Connect</button>
          </router-link> |
          <router-link :to="{ name: 'FAQ', params: { id: ($route.params.id) } }">
            <button class="btn btn-info btn-fill btn-sm">FAQ</button>
          </router-link> |
          <router-link :to="{ name: 'Support', params: { id: ($route.params.id) } }">
            <button class="btn btn-info btn-fill btn-sm">Support</button>
          </router-link>        
      </div>  
    </div>
  </div>
</template>
<script>

export default{
  watch: {
    '$route.params.id'(to, from) {
      console.log('The id parameter has changed from', from, 'to', to)
    }
  },
  
}
</script>