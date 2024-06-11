<template>
  <navMenu/>
  <div id ="container" style="min-height: 864px; height: auto; min-width: 800px;">
      <router-view></router-view>
  </div>

</template>

<script>
import navMenu from '@/components/NavMenu.vue';
export default{
  components: {navMenu}
}

</script>

<style>
</style>