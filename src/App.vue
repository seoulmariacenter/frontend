<template>
  <div id="app">
    <app-header @scroll="hideHeader"/>
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
  },
  data() {
    return {
      lastScrollTop: 0
    }
  },
  created () {
    window.addEventListener('scroll', this.hideHeader, false);
  },
  destroyed () {
    window.removeEventListener('scroll', this.hideHeader, false);
  },
  methods: {
    hideHeader(event) {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > this.lastScrollTop){
        event.target.getElementById('mainHeader').style.top = "-100%";
      } else {
        event.target.getElementById('mainHeader').style.top = "0";
      }
      this.lastScrollTop = st;
    }
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
  padding-top: 123px;
}
</style>
