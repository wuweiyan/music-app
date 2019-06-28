<template>
  <div class="m-header">
    <h1 class="text">music app</h1>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import '../../common/stylus/variable.styl'
  @improt '../../common/stylus/mixin.styl'

  .m-header
    position: relative
    height: 44px
    text-align:center
    color:$color-theme
    font-size:0
    .text
      display:inline-block
      vertical-align:top
      line-height:44px
      font-size:$font-size-large
</style>
