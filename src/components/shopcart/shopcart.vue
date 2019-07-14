<template>
  <div class = "shopcart" @click = "cartListShow">
    <div class = "content">
      <div class = "content-left">
        <div class = "logo-wrapper">
          <div class = "logo" :class="{'heighlight':totalCount>0}">
            <i class = "icon-shopping_cart" :class="{'heighlight':totalCount>0}"></i>
          </div>
          <div class = "num" v-show ="totalCount>0">{{totalCount}}</div>
        </div>
        <div class = "price" :class="{'heighlight':totalPrice>0}">${{totalPrice}}</div>
        <div class = "desc" >另需配送费${{deliveryPrice}}元</div>
      </div>
      <div class = "content-right">
        <div class = "pay" :class = "payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class = "ball-container">
      <transition name = 'drop' v-for="(ball,index) in balls" :key="index" v-bind:css="false" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div  v-show="ball.show" class ='ball'>
          <div class = "inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <transition name = "fold">
      <div class = "cart-list" v-show="listShow" >
        <div class = "list-header">
          <h1 class = "title">购物</h1>
          <span class = "empty" @click.stop.prevent="emptyFoods">清空</span>
        </div>
        <div class = "cart-content" ref="contentwrapper">
          <ul>
            <li class = "food food-list-hook" v-for="(food,index) in selectedFood" :key="index">
              <span class = "name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class = "cart-control-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="cartfade">
      <div class = "shadow" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import BetterScroll from 'better-scroll'
export default {
  components: {
    cartcontrol
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true
    }
  },
  props: {
    selectedFood: {
      type: Array,
      default () {
        return [
          {
            price: 10,
            count: 1
          }
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectedFood.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectedFood.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return '还差20元起送'
      } else if (this.totalPrice < 20) {
        return '还差' + (20 - this.totalPrice) + '元起送'
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice < 20) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow () {
      if (!this.totalCount) {
        return false
      }
      let show = !this.fold
      if (show) {
        if (!this.scroll) {
          this.$nextTick(() => {
            this._initScroll()
          })
        } else {
          this.scroll.refresh()
        }
      }
      return show
    }
  },
  watch: {
    selectedFood (newFood, oldFood) {
      if (newFood.length === 0) {
        this.fold = true
      }
    }
  },
  methods: {
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          // 获得元素相对于窗口的偏移量
          let rect = ball.el.getBoundingClientRect()
          let x = rect.x - 32
          let y = -(window.innerHeight - rect.y - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    enter (el, done) {
      /* eslint-disable no-unused-vars */
      let refresh = el.offsetWidth
      console.log('333444')
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        console.log('3355554')
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        console.log('3388888554')
      })
      done()
    },
    afterEnter (el) {
      setTimeout(() => {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          console.log('el.style.display')
          console.log(el.style.display)
          console.log('end')
          el.style.display = 'none'
        }
      }, 500)
    },
    cartListShow () {
      if (!this.totalCount) {
        this.fold = true
      } else {
        this.fold = !this.fold
      }
    },
    emptyFoods () {
      this.selectedFood.forEach((food) => {
        food.count = 0
      })
    },
    _initScroll () {
      this.scroll = new BetterScroll(this.$refs.contentwrapper, {
        probeType: 3,
        click: true
      })
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixin"
  .shopcart
    position :fixed
    left :0px
    bottom:0px
    z-index:50
    width :100%
    height :48px
    .content
      line-height :24px
      display :flex
      font-size :0px
      background-color :#141d27
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex :1
        .logo-wrapper
          display :inline-block
          position :relative
          top :-10px
          box-sizing :border-box
          width :56px
          height :56px
          border-radius :50%
          background: #141d27
          padding:6px
          margin :0px 12px
          .logo
            width :100%
            height :100%
            border-radius :50%
            text-align :center
            background-color :rgba(255,255,255,0.15)
            &.heighlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
                line-height: 44px
                font-size: 24px
                color: #80858a
                &.heighlight
                  color: white
          .num
            position:absolute
            top:0
            right :0
            width :24px
            height :16px
            font-size :9px
            font-weight :500
            line-height :16px
            text-align :center
            color white
            background-color :red
            border-radius :16px
        .price
          display:inline-block
          vertical-align :top
          padding : 12px 12px 12px 0px
          border-right :1px solid rgba(255,255,255,0.1)
          font-size :16px
          color:rgba(255,255,255,0.4)
          font-weight :700
          &.heighlight
            color: white
        .desc
          display:inline-block
          vertical-align :top
          padding : 12px 12px 12px 12px
          font-size :12px
          color:rgba(255,255,255,0.4)
          font-weight :200
      .content-right
        flex :0 0 105px
        background-color :rgba(255,255,255,0.4)
        .pay
          font-size :14px
          text-align :center
          font-weight :500
          height :48px
          line-height 48px
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position : fixed
        left :32px
        bottom :32px
        z-index :200
        transition :all 0.5s cubic-bezier(0.49,-0.29,0.75,0.41)
        .inner
          width :16px
          height :16px
          border-radius :50%
          background :rgb(0,160,220)
          transition :all 0.5s linear

    .cart-list
      position :absolute
      top:0
      left:0
      width :100%
      z-index:-1
      transform :translate3d(0,-100%,0)
      &.fold-enter-active, &.fold-leave-active {
        transition: all .5s
      }
      &.fold-enter, &.fold-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform :translate3d(0,0,0)
      }
      .list-header
        padding :0 18px
        background-color :#f3f5f7
        height :40px
        line-height :40px
        .title
          float: left
          font-size :14px
          color :rgb(7,17,27)
        .empty
          float:right
          font-size :12px
          color :rgb(0,160,220)
      .cart-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cart-control-wrapper
            font-size :14px
            position :absolute
            right: 0px
            bottom :0px
            padding : 12px 0px
    .shadow
      z-index : -2
      background-color :rgba(7,17,27,0.6)
      position:fixed
      width :100%
      height :100%
      top:0px
      left :0px
    .cartfade-enter-to, .cartfade-leave-active {
      transition: opacity .5s
      opacity: 1
    }
    .cartfade-enter, .cartfade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0
    }
</style>
