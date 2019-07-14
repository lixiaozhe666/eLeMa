<template>
  <div class = "goods">
    <div class="menu-wrapper" ref="menuwrapper">
      <ul>
        <li class = "menu-item-container" v-for = "(item,index) in goods" :key="index" @click="selectItem(index,$event)">
          <span class = "text">
            <span class = "icon" v-show="item.type>0" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="food-wrapper" ref="foodwrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" :key="index" class="food-item" @click="beSelectFood(food)">
              <div class = "icon">
                <img width="56" height="56" :src="food.icon">
              </div>
              <div class = "content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class = "extra">
                  <span >月售{{food.sellCount}}份</span>
                  <span >好评率{{food.rating}}%</span>
                </div>
                <div class ="price">
                  <span class = "now-price">{{food.price}}</span>
                  <span v-show="food.oldPrice" class = "old-price">{{food.oldPrice}}</span>
                </div>
                <div class = "cart-control-wrapper">
                  <cartcontrol :food="food" v-on:cart-add="cartAdd"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
<!--    <shopcart :selectedFood = "selectFood" ref="shopcart"></shopcart>-->
    <fooddetail :food = "beSelectedFood" v-on:cart-add="cartAdd" ref="fooddetail"></fooddetail>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'
import shopcart from '../../components/shopcart/shopcart'
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import fooddetail from '../../components/food/food'
// const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    },
    goods: {
      type: Array
    }
  },
  components: {
    shopcart,
    cartcontrol,
    fooddetail
  },
  created () {
    // this.$http.get('/api/goods').then((response) => {
    //   response = response.body
    //   if (response.errno === ERR_OK) {
    //     this.goods = response.data
    //   }
    // })
    this.classMap = ['dicrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  data () {
    return {
      listHeight: [],
      scrollY: 0,
      clickEvent: false,
      beSelectedFood: {}
    }
  },
  methods: {
    _initScroll () {
      this.left = new BetterScroll(this.$refs.menuwrapper, {
        click: true
      })
      this.right = new BetterScroll(this.$refs.foodwrapper, {
        probeType: 3,
        click: true
      })
      this.right.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _getHeight () {
      let rightItems = this.$refs.foodwrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < rightItems.length; i++) {
        let item = rightItems[i]
        height += item.clientHeight
        console.log(item.clientHeight)
        this.listHeight.push(height)
      }
    },
    selectItem (index, event) {
      this.clickEvent = true
      if (event._constructed) {
        let rightItem = this.$refs.foodwrapper.getElementsByClassName('food-list-hook')
        let el = rightItem[index]
        this.right.scrollToElement(el, 300)
      }
    },
    cartAdd (el) {
      this.$emit('addGoods', el)
      // this.$nextTick(() => {
      //   this.$refs['shopcart'].drop(el)
      // })
    },
    beSelectFood (food) {
      this.beSelectedFood = food
      this.$refs['fooddetail'].show()
    }
  },
  // updated () {
  //   console.log('111')
  //   console.log(this.$refs.menuWrapper)
  //   this.$nextTick(() => {
  //     this._initScroll()
  //     this._getHeight()
  //   })
  // },

  mounted () {
    this.$nextTick(() => {
      // let bscrollDom = this.$refs.menuscroll
      // this.aBScroll = new BetterScroll(bscrollDom, {})
      this._initScroll()
      this._getHeight()
    })
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
          if (this.clickEvent) {
            return i + 1
          } else {
            return i
          }
        }
      }
      return 0
    }
    // selectFood () {
    //   let foods = []
    //   this.goods.forEach((good) => {
    //     good.foods.forEach((food) => {
    //       if (food.count) {
    //         foods.push(food)
    //       }
    //     })
    //   })
    //   return foods
    // }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixin"
  .goods
    display :flex
    position :absolute
    top:206px
    width :100%
    bottom:46px
    overflow :hidden
    .bscroll
       width: 100%;
       height: 5vH;
       overflow: hidden;
    .menu-wrapper
      flex :0 0 80px
      background-color :#f3f5f7

      .menu-item-container
        display :table
        padding:0 12px
        width :56px
        height :54px
        .text
          font-size :12px
          line-height :14px
          font-weight :200
          display :table-cell
          vertical-align :middle
          border-1px(rgba(7,17,27,0.1))
          .icon
            display :inline-block
            vertical-align :top
            width :12px
            height :12px
            background-repeat :no-repeat
            background-size :12px 12px
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
    .food-wrapper
      flex :1
      .title
        font-size :12px
        color:rgb(147,153,159)
        line-height :26px
        height :26px
        padding-left :14px
        border-left :2px solid #d9dde1
        background-color :#f3f5f7
      .food-item
        display :flex
        margin :18px
        padding-bottom :18px
        font-size :0
        border-1px(rgba(7,17,27,0.1))
        .icon
          flex : 0 0 56
          margin-right :10px
        .content
          padding-top :2px
          width :100%
          .name
            font-size :14px
            line-height :14px
            color :rgb(7,17,27)
            margin-bottom :8px
          .description,.extra
            font-size :10px
            line-height :10px
            color :rgb(147,153,159)
            margin-bottom :8px
          .price
            line-height :24px
            font-weight :700
            .old-price
              font-size :10px
              color :rgb(147,153,159)
            .now-price
              font-size :14px
              color :red
              margin-right :8px
          .cart-control-wrapper
            position :absolute
            right:0px
            bottom :0px
            padding-bottom :18px

</style>
