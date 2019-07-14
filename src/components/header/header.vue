<template>
  <div class="header">
    <div class="content-wrapper">
      <div class = "avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class = "banner"></span>
          <span class = "name">{{seller.name}}</span>
        </div>
        <div class = "description">
          {{seller.description}}/{{seller.deliveryTime}}分钟到
        </div>
        <div v-if="seller.supports" class = "support">
          <span class = "icon" :class="classMap[seller.supports[0].type]" ></span>
          <span class = "text">{{seller.supports[0].description}}</span>
        </div>

      </div>
      <div class="support-count" @click="showDetail">
        <span class="count" v-if="seller.supports !== undefined && seller.supports.length>0">{{seller.supports.length}}个</span>
        <i class ="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class = "bulletin-text">{{seller.bulletin}}</span>
      <i class ="icon-keyboard_arrow_right"></i>
    </div >
    <div class = 'background'>
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class = 'detail'>
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class = 'name'>{{seller.name}}</h1>
            <div class = "star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class = 'title'>
              <div class = 'line'></div>
              <div class = 'text'>优惠信息</div>
              <div class = 'line'></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class = "supports-item" v-for ="(item,index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class = "text">{{item.description}}{{item.type}}</span>
              </li>
            </ul>
            <div class = 'title'>
              <div class = 'line'></div>
              <div class = 'text'>商家公告</div>
              <div class = 'line'></div>
            </div>
            <div class = "bulletin">
              <p class = "bulletin-content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="closeDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type = 'text/ecmascript-6'>
import star from '../star/star'
export default {
  name: 'headermy',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    closeDetail () {
      this.detailShow = false
    }

  },
  created () {
    this.classMap = ['dicrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    star
  }
}
</script>

<style lang = 'stylus' rel = 'stylesheet/stylus'>
  @import "../../common/stylus/mixin"
  .header
    color:white
    background:rgba(7,17,27,0.5)
    position :relative
    .fade-enter-to, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    .content-wrapper
      padding:24px 12px 18px 24px
      font-size :0px
      position :relative
      .avatar
        display : inline-block
        border-radius :2px
      .content
        display :inline-block
        font-size :14px
        margin :16px
        .banner
          display :inline-block
          vertical-align :top
          width :30px
          height :18px
          bg-image('brand')
          background-size :30px 18px
          background-repeat :no-repeat
        .name
          display :inline-block
          font-size :16px
          font-weight :bold
          inline-height:18px
          margin-left :6px
        .description
          font-size :12px
          line-height :12px
          margin-top :8px
        .support
          margin-top :10px
          margin-bottom :2px
          .icon
            display :inline-block
            vertical-align :top
            width :12px
            height :12px
            background-repeat :no-repeat
            background-size :12px 12px
            bg-image('decrease_1')
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            display :inline-block
            vertical-align :top
            font-size :10px
            inline-height:12px
            margin-left :4px

      .support-count
        position :absolute
        background-color :rgba(0,0,0,0.2)
        height :12px
        line-height:12px
        right :12px
        bottom:28px
        padding:7px 8px
        border-radius :14px
        .count
          font-size :10px
        .icon-keyboard_arrow_right
          margin-left :2px
          font-size :10px
    .bulletin-wrapper
      height :28px
      position :relative
      line-height:28px
      padding:0px 20px 0px 12px
      white-space :nowrap
      overflow :hidden
      text-overflow :ellipsis
      background-color :rgba(7,17,27,0.2)
      .bulletin-title
        display :inline-block
        margin-top :8px
        bg-image('bulletin')
        width :22px
        height :12px
        background-size :22px 12px
        background-repeat :no-repeat
      .bulletin-text
        vertical-align :top
        font-size :10px
        margin-left :4px
        margin-right :4px
      .icon-keyboard_arrow_right
        position :absolute
        font-size :10px
        right :5px
        top:8px
    .background
      position :absolute
      width :100%
      height :100%
      top:0
      left :0
      z-index :-1
      filter:blur(10px)
    .detail
      position:fixed
      width :100%
      height :100%
      top:0px
      left :0px
      z-index :100
      overflow :auto
      transition :all 0.5s
      background-color :rgba(7,17,27,0.8)
      .detail-wrapper
        min-height :100%
        width :100%
        .detail-main
          height :100%
          margin-top :64px
          padding-bottom :64px
          .name
            width :100%
            text-align :center
            font-size :16px
            font-weight:700
            line-height :16px
          .star-wrapper
            margin :18px
            padding :2px 0px
            text-align :center
          .title
            display :flex
            width :80%
            margin:30px auto 24px auto
            .line
              flex:1
              position :relative
              top: 6px
              border-top : 1px solid rgba(255,255,255,0.2)
            .text
              font-size :14px
              padding :0px 12px
          .supports
            width :80%
            margin:0 auto
            .supports-item
              padding:12px 12px
              font-size :0px
              .icon
                display: inline-block
                vertical-align :top
                width :16px
                height :16px
                background-size :16px 16px
                background-repeat :no-repeat
                bg-image('decrease_2')
                &.decrease
                 bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                font-size :14px
                font-weight :200
                line-height :12px
                margin-left :6px
          .bulletin
            width :80%
            margin:24px auto 48px auto
            padding :0 12px
            .bulletin-content
              font-size :12px
              font-weight :200px
              line-height :24px
      .detail-close
        position :relative
        width :32px
        height :32px
        margin :-64px auto 0px auto
        clear :both
        font-size :32px
</style>
