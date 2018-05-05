<template>
  <div id="carouselMainIndicators" class="carousel mt-4 slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselMainIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselMainIndicators" data-slide-to="1"></li>
      <li data-target="#carouselMainIndicators" data-slide-to="2"></li>
      <li data-target="#carouselMainIndicators" data-slide-to="3"></li>
      <li data-target="#carouselMainIndicators" data-slide-to="4"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="d-block w-100" src="../../../assets/image/carousel/carousel_1.png" alt="First slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="../../../assets/image/carousel/carousel_2.png" alt="Second slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="../../../assets/image/carousel/carousel_3.png" alt="Third slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="../../../assets/image/carousel/carousel_4.png" alt="Fourth slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="../../../assets/image/carousel/carousel_5.png" alt="Fifth slide">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselMainIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselMainIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>
<script>
  export default {
    name: "Carousel"
  }
</script>
<style scoped>
</style>
