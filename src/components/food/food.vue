<template>
  <transition name="move">
    <div class = "foodwrapper" v-show="showFlag" ref="foodwrapper">
      <div>
        <div class = "img-header">
          <img :src ="food.image">
          <i class = "icon-arrow_lift" @click="hide"></i>
        </div>
        <div class = "food-content">
          <div class = "content">
            <h1 class = "title">{{food.name}}</h1>
            <div class = "extra">
              <span >月售{{food.sellCount}}份</span>
              <span >好评率{{food.rating}}%</span>
            </div>
            <div class ="price">
              <span class = "now-price">${{food.price}}</span>
              <span v-show="food.oldPrice" class = "old-price">${{food.oldPrice}}</span>
            </div>
          </div>
          <div class = "cartcontrol-wrapper" v-show = "food.count>0">
            <cartcontrol :food="food" v-on:cart-add="cartAdd"></cartcontrol>
          </div>
          <transition name = "fade">
            <div class = "buyer" v-show="food.count===0 || !food.count" @click="buy">
              <span>加入购物车</span>
            </div>
          </transition>
        </div>
        <splite v-show="food.info"></splite>
        <div class = "info" v-show="food.info">
          <h1 class = "title">商品介绍</h1>
          <p class = "text">{{food.info}}</p>
        </div>
        <splite></splite>
        <div class = "rating">
          <h1 class = "title">商品评价</h1>
          <ratingselect v-on:ratingOnlyContent = 'ratingOnlyContent' v-on:ratingtypeSelect='ratingtypeSelect' :selectType="selectType" :desc="desc" :onlyContent="onlyContent" :ratings="food.ratings"></ratingselect>
          <div class = "rating-wrapper-food">
            <ul v-show = "food.ratings">
              <li class="rating-item" v-for="(rating,index) in food.ratings" :key="index" v-show = "showItem(rating.rateType,rating.text)">
                <div class = "user">
                  <span class = "user-name">{{rating.username}}</span>
                  <img :src ="rating.avatar" class = "user-avator">
                </div>
                <div class = "time">{{rating.rateTime | formatDate}}</div>
                <div class = "text">
                  <span :class = "{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>{{rating.text}}
                </div>
              </li>
            </ul>
            <div class = "no-rating" v-show="!food.ratings">暂无评论</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import cartcontrol from '../../components/cartcontrol/cartcontrol'
import splite from '../../components/split/split'
import ratingselect from '../../components/ratingselect/ratingselect'
import dateFormat from '../../common/js/date'
import Vue from 'vue'
import BetterScroll from 'better-scroll'

const POSITIVE = 0
export default {
  data () {
    return {
      showFlag: false,
      selectType: POSITIVE,
      desc: {
        'all': '全部',
        'positive': '推荐',
        'negative': '吐槽'
      },
      onlyContent: false,
      ratings: []
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    show () {
      this.showFlag = true
      if (!this.scroll) {
        this.$nextTick(() => {
          console.log('first')
          this.scroll = new BetterScroll(this.$refs.foodwrapper, {
            click: true
          })
        })
      } else {
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    hide () {
      this.showFlag = false
    },
    buy () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count += 1
      }
      this.$emit('cart-add', event.target)
    },
    cartAdd () {
      this.$emit('cart-add', event.target)
    },
    ratingtypeSelect (type) {
      this.selectType = type
    },
    ratingOnlyContent (ratingonlycontent) {
      console.log(ratingonlycontent)
      this.onlyContent = ratingonlycontent
    },
    showItem (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === 2) {
        return true
      }
      return type === this.selectType
    }
  },
  components: {
    cartcontrol,
    splite,
    ratingselect
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      console.log(date)
      return dateFormat.formatDate(date, 'yyyy-MM-dd h:m')
    }
  }
}

</script>
<style lang='stylus' rel='stylesheet/stylus'>
.foodwrapper
  position :fixed
  top:0
  left :0
  bottom :48px
  width :100%
  background-color :white
  overflow :hidden
  &.move-enter-active,&.move-leave-active
    transition : all .5s
    transform :translate3d(0,0,0)
  &.move-enter,&.move-leave-to
    transform :translate3d(100%,0,0)
  .img-header
    position :relative
    height :0
    width :100%
    padding-top :100%
    img
      position :absolute
      top:0
      left:0
      width :100%
      height :100%
    .icon-arrow_lift
      padding :10px
      font-size :24px
      color :white
      position: fixed
      top:0
      left :0

  .food-content
    position :relative
    padding:18px
    .title
      font-size :14px
      font-weight :700
      color :rgb(7,17,27)
      line-height :14px
      margin-bottom :8px
    .extra
      font-size :10px
      color :rgb(147,153,159)
      line-height :10px
    .price
      margin-top :18px
      .now-price
        font-size :14px
        font-weight :700
        color:red
        line-height :14px
      .old-price
        text-decoration :line-through
        font-size :12px
        color :rgb(147,153,159)
        line-height :14px
    .cartcontrol-wrapper, .buyer
      position :absolute
      right :18px
      bottom :18px
    .buyer
      background-color :rgb(0,160,220)
      height :24px
      border-radius :12px
      font-size :10px
      color :white
      line-height :24px
      padding:0 12px
      &.fade-enter-to,&.fade-leave-active
        transition :opacity .2s
      &.fade-enter,&.fade-leave-to
        opacity :0
  .info
    padding :18px
    .title
      font-size :14px
      font-weight :700
      color :rgb(7,17,27)
      line-height :14px
      margin-bottom :6px
    .text
      padding :0 8px
      font-size :12px
      font-weight :200
      color:rgb(77,85,93)
      line-height :24px
  .rating
    .title
      margin:0 18px
      padding-top :18px
      font-size :14px
      font-weight :700
      color :rgb(7,17,27)
      line-height :14px
    .rating-wrapper-food
      padding : 0 18px
      .rating-item
        padding:16px 0
        position :relative
        .user
          position :absolute
          right :0px
          bottom :16px
          .user-name
            font-size :10px
            vertical-align :top
            color:rgb(147,153,159)
            line-height :12px
          .user-avator
            vertical-align :top
            height :12px
            width :12px
            border-radius :50%
        .time
          font-size :10px
          color:rgb(147,153,159)
          line-height :12px
        .text
          font-size :12px
          line-height :24px
          color:rgb(7,17,27)
          .icon-thumb_up
            color :rgb(0,160,220)
            margin-right :4px
          .icon-thumb_down
            color :rgb(147,153,159)
            margin-right :4px
      .no-rating
        padding-top:16px
        font-size :12px
        color :rgb(7,17,27)
</style>
