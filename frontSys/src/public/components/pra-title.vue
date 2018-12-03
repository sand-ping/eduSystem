<template>
  <div class="wrapper">
    <!--pra代表practical实用的,practical组件-->
    <div class="pra-header">
      <div class="pra-header-ch">{{title_ch}}</div>/
      <div class="pra-header-en">{{title_en}}</div>
    </div>
  </div>
</template>
<script>
export default{
  props:['titleCh','titleEn'],
  data:function () {
    return {
      title_ch:this.titleCh,
      title_en:this.titleEn
    }
  }
}
</script>
<style scoped>
  @import "../sass/pra-title.scss";
</style>