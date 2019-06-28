<template>
  <div class="loading">
    <img src="../../common/image/laoding.jpg" width="24" height="24">
    <p class="desc">{{tittle}}</p>
  </div>
</template>

<script>
export default {
  props: {
    tittle: {
      type: String,
      default: '正在载入……'
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .loading
    width: 100%
    text-align : center
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>
