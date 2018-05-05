<template>
  <div id="app">
    <app-header @scroll="scrollEvent"/>
    <router-view class="main pl-0 pr-0"/>
    <scroll-top-button/>
    <app-footer/>
  </div>
</template>

<script>
import AppHeader from './components/structure/AppHeader'
import AppFooter from './components/structure/AppFooter'
import ScrollTopButton from './components/contents/home/ScrollTopButton'
export default {
  name: 'app',
  components: {
    AppHeader,
    AppFooter,
    ScrollTopButton
  },
  data() {
    return {
      lastScrollTop: 0
    }
  },
  created () {
    window.addEventListener('scroll', this.scrollEvent, false);
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollEvent, false);
  },
  methods: {
    scrollEvent(event) {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > 0) {
        if (st > this.lastScrollTop){
          event.target.getElementById('mainHeader').style.top = "-100%";
          event.target.getElementById('scroll-top').style.bottom = "2em";
        } else {
          event.target.getElementById('mainHeader').style.top = "0";
          event.target.getElementById('scroll-top').style.bottom = "-100%";
        }
        this.lastScrollTop = st;
      } else {
        event.target.getElementById('mainHeader').style.top = "0";
      }
    },
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
