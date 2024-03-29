<template>
<!-- 轮播图 -->
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index}" v-for="(item, index) in dots"></span>
    </div>
  </div>
</template>

<script>
import {addClass} from "../../common/js/dom"
import BScroll from "better-scroll"

export default {
  name: 'slider',
  data() {
    return {
      // 储存导航点
      dots: [],
      // 轮播页面index
      currentPageIndex: 0
    }
  },
  // better-scroll配置
  props: {
    // 循环轮播
    loop: {
      type: Boolean,
      default: true
    },
    // 自动轮播
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 轮播延迟
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      // 初始化轮播图组件
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      // 自动播放后导航点跟随
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    // 页面尺寸变化
    window.addEventListener('resize',() => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  // 清除定时器
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    _setSliderWidth(isResize) {
      // 获取轮播图对象
      this.children = this.$refs.sliderGroup.children

      let width = 0
      // 轮播图宽度
      let sliderWidth = this.$refs.slider.clientWidth
      // 遍历轮播图，添加类名
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')

        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      // 循环遍历添加两个轮播图
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      // 所有轮播图宽度
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // 轮播图真实数量
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    // 初始化轮播图
    _initSlider(){
      this.slider = new BScroll(this.$refs.slider,{
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      })
      // active导航点随轮播图变化
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        // 自动轮播
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    // 自动轮播导航点变化
    _play() {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval);
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .slider
    min-height: 1px
    position: relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
