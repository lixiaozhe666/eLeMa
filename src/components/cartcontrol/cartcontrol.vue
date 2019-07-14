<template>
  <div class = "cartcontrol">
    <transition name="move">
      <div class = "descrease" v-show="food.count>0" @click.stop.prevent="descNum">
        <div class ="inner">
          <i class="icon-remove_circle_outline"></i>
        </div>
      </div>
    </transition>
    <div class = "num" v-show="food.count>0">{{food.count}}</div>
    <div class = "add">
      <div class = "icon-add_circle" @click.stop.prevent="addNum"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addNum () {
      console.log('click')
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count += 1
      }
      this.$emit('cart-add', event.target)
    },
    descNum () {
      this.food.count -= 1
    }
  }
}

</script>

<style lang='stylus' rel='stylesheet/stylus'>
.cartcontrol
  .descrease
    display :inline-block
    opacity :1
    transform :translate3d(0,0,0)
    .inner
      display :inline-block
      transition: all 0.7s // 定义旋转的过渡效果
      transform: rotate(0)
      .icon-remove_circle_outline
        font-size :24px
        color :rgb(0, 160, 220)
        line-height :24px
    &.move-enter-active, &.move-leave-active
      transition: all 0.7s // 定义平移的过渡效果
    &.move-enter, &.move-leave-to
      transform: translate3d(24px, 0, 0)
      opacity: 0
      .inner
        transform: rotate(180deg)
  .num
    display :inline-block
    padding:0px 6px
    vertical-align :top
    font-size :10px
    color :rgb(147,153,159)
    line-height :24px
  .add
    display :inline-block
    .icon-add_circle
      font-size :24px
      color :rgb(0, 160, 220)
      line-height :24px

</style>
