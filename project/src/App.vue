<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body, html {
  height: 100%;
}
#app {
  height: 100%;
  background-image: url(./assets/01.jpg);
  background-repeat: no-repeat;
  background-position: right top;
}
</style>
