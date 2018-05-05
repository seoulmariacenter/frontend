<template>
  <div id="scroll-top" class="">
    <button @click="scrollTop" class="btn btn-sm btn-light">
      <img src="../../../assets/svg/si-glyph-arrow-thick-thin-up.svg"
      width="20"
      alt="scroll top">
    </button>
  </div>
</template>
<script>
  export default {
    name: "ScrollTopButton",
    methods: {
      scrollTop() {
        window.scrollTo(0, 0);
      }
    }
  }
</script>
<style scoped>
  #scroll-top {
    z-index: 500;
    position: fixed;
    bottom: -100%;
    right: 2em;
    -webkit-transition: bottom .4s;
    transition: bottom .4s;
  }
</style>
