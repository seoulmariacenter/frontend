<template>
  <div class="modal fade" id="fatima-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">파티마 101주년 성지순례단 모집</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img src="../../../assets/image/modal/modal.jpeg" class="img-fluid" alt="fatima">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default {
    name: "Modal",
    mounted() {
      $('#fatima-modal').modal('toggle');
    }
  }
</script>
<style scoped>

</style>
