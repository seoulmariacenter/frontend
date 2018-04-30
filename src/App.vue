<template>
  <div id="app">
    <app-header/>
    <router-view class="main"/>
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
  background-color: #F8F5EF;
}
.container-fluid {
  padding: 0;
}
.main {
  margin-top: 73px;
  padding-top: 48px;
}
</style>
