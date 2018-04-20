<template>
  <div class="row justify-content-between">
    <admin-sidebar v-on:manageContent="manageContent"/>
    <router-view v-on:manageContent="manageContent"/>
    <div class="col-lg-9 col-md-8 bg-light" v-if="content">
      <div class="m-3 text-center align-middle">
        <div class="d-block text-left">
          <h2><strong>무엇을 하실 건가요?</strong></h2>
        </div>
        <hr>
        <div class="m-2 justify-content-center">
          <router-link :to="{name: 'ProductManagement'}" tag="div" class="alert alert-info m-4 hovering">
            <h5>일정을 확인하고 예약자를 보려면</h5>
            <h4><strong>순례 상품 관리</strong></h4>
          </router-link>
          <router-link :to="{name: 'ProductCreate'}" tag="div" class="alert alert-success m-4 hovering">
            <h5>새로운 순례 상품을 만들려면</h5>
            <h4><strong>순례 상품 만들기</strong></h4>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import AdminSidebar from '../contents/admin/AdminSidebar'
  import ProductManagement from '../contents/admin/product/ProductManagement'
  export default {
    name: "Dashboard",
    components: {
      AdminSidebar,
      ProductManagement
    },
    data() {
      return {
        content: true
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      manageContent(payload) {
        return this.content = payload
      },
      fetchData() {
        this.manageContent(true)
      }
    }
  }
</script>
<style scoped>
  .hovering:hover {
    cursor: pointer;
  }
</style>
