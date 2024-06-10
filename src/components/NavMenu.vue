<template>
    <div id ="nav">
        <router-link to="/"><button class="btn btn-info btn-fill btn-sm">Home</button></router-link> |
        <router-link :to="{ name: 'Stats', params: { id: id } }">
          <button class="btn btn-info btn-fill btn-sm">Stats</button>
        </router-link> |
        <router-link :to="{ name: 'Dashboard', params: { id: id } }">
          <button class="btn btn-info btn-fill btn-sm">Dashboard</button>
        </router-link> |
        <router-link :to="{ name: 'Miners', params: { id: id } }">
          <button class="btn btn-info btn-fill btn-sm">Miners</button>
        </router-link> |
        <router-link :to="{ name: 'Blocks', params: { id: id } }">
          <button class="btn btn-info btn-fill btn-sm">Blocks</button> 
        </router-link> |
        <router-link :to="{ name: 'Payments', params: { id: id } }">
          <button class="btn btn-info btn-fill btn-sm">Payments</button>
        </router-link> |
        <router-link :to="{ name: 'Connect', params: { id: id } }">
          <button class="btn btn-info btn-fill btn-sm">Connect</button>
        </router-link> |
        <router-link :to="{ name: 'About', params: { id: id } }">
          <button class="btn btn-info btn-fill btn-sm">About</button>
        </router-link> |
        <router-link :to="{ name: 'Support', params: { id: id } }">
          <button class="btn btn-info btn-fill btn-sm">Support</button>
        </router-link>
        
    </div>  
</template>
<script setup>
defineProps({
  id: String
})
</script>