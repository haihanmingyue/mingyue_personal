<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {

  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  components: {},
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
    }
  }
}
</script>
<style>
.head-filter .filter-item {
  margin-right: 10px;
  max-width: 180px;
}
</style>
