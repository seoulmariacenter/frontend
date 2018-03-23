<template>
  <div id="app">
    <app-header/>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from './components/structure/AppHeader'
import AppFooter from './components/structure/AppFooter'
export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #EBE8E2;
}
.container-fluid {
  padding: 0;
}
</style>
