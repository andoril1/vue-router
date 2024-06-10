<template>
  <navMenu/>
  <div id ="container">
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