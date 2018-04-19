<template>
  <div class="m-3 ml-3">
    <button class="btn btn-sm btn-outline-danger mr-1">순례 상품 수정</button>
    <button type="button" class="btn btn-sm btn-danger ml-1" data-toggle="modal" data-target="#destroyModal">순례 상품 삭제</button>

    <!--Modal-->
    <div class="modal fade" id="destroyModal" tabindex="-1" role="dialog" aria-labelledby="destroyModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="destroyModalLabel">순례 상품 삭제</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            순례 상품을 정말 삭제하시겠습니까? 한번 삭제된 내용은 되돌릴 수 없습니다.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
            <button type="submit" class="btn btn-danger" @click="onSubmit"><strong>삭제하기</strong></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "ProductUpdateDestroy",
    data() {
      return {
        params: this.$route.params.pk
      }
    },
    methods: {
      onSubmit() {
        this.$store.dispatch('DestroyProduct', this.params)
      }
    }
  }
</script>
<style scoped>
</style>
