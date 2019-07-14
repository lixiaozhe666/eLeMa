<template>
  <div class = 'seller' ref="sellerwrapper">
    <div class = 'seller-content'>
      <div class = "overview">
        <div class = "overview-basic">
          <h1 class = "title">{{seller.name}}</h1>
          <div class = "star-wrapper">
            <star :size="36" :score="seller.score"></star>
          </div>
          <span class="rating-count">({{seller.ratingCount}})</span>
          <span class = "seller-count">月售{{seller.sellCount}}</span>
          <div class = "favorite" @click="troggleFavorite">
            <span class = 'icon-favorite' :class ="{'active':favoriteIcon}"></span>
            <span class = "text">{{favoriteText}}</span>
          </div>
        </div>
        <div class = "overview-info">
          <ul class = "item-list">
            <li class="item">
              <span class = 'item-title'>起送价</span>
              <span class = 'item-text'>{{seller.minPrice}}</span>元
            </li>
            <li class="item">
              <span class = 'item-title'>商家配送</span>
              <span class = 'item-text'>{{seller.deliveryPrice}}</span>元
            </li>
            <li class="item">
              <span class = 'item-title'>平均配送时间</span>
              <span class = 'item-text'>{{seller.deliveryTime}}</span>分钟
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class ="bulletin">
        <h2 class = "bulletin-title">公告与活动</h2>
        <div class = "bulletin-content-wrapper">
          <p class = "bulletin-content">{{seller.bulletin}}</p>
        </div>
      </div>
      <div class = supports-wrapper>
        <ul class="supports" v-if="seller.supports">
          <li class = "supports-item" v-for ="(item,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class = "text">{{item.description}}{{item.type}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h2 class = "title">商家实景</h2>
        <div class = "pic-wrapper" ref="picwrapper">
          <div class="pic-list" ref="piclist">
            <img v-for="(url,index) in seller.pics" :src="url" :key="index" class="pic-item">
          </div>
        </div>
      </div>
      <split></split>
      <div class="seller-info">
        <h2 class = 'title'>商家信息</h2>
        <ul>
          <li v-for="(text,index) in seller.infos" :key="index" class="info-item">{{text}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../../components/star/star'
import split from '../../components/split/split'
import BetterScroll from 'better-scroll'
import {saveToLocal, readToLocal} from '../../common/js/store'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      favoriteIcon: (() => {
        return readToLocal(this.seller.id, 'favourite', false)
      })()
    }
  },
  computed: {
    favoriteText () {
      return this.favoriteIcon ? '已收藏' : '收藏'
    }
  },
  components: {
    star,
    split
  },
  methods: {
    troggleFavorite () {
      this.favoriteIcon = !this.favoriteIcon
      saveToLocal(this.seller.id, 'favourite', this.favoriteIcon)
    },
    _initScroll () {
      if (!this.scroll) {
        this.$nextTick(() => {
          this.scroll = new BetterScroll(this.$refs.sellerwrapper, {
            click: true
          })
        })
      } else {
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    _initPics () {
      if (this.seller.pics) {
        let itemWidth = 120
        let marginWidth = 6
        let width = (itemWidth + marginWidth) * this.seller.pics.length - marginWidth
        this.$refs.piclist.style.width = width + 'px'
      }
      if (!this.picscroll) {
        this.$nextTick(() => {
          console.log('first')
          this.picscroll = new BetterScroll(this.$refs.picwrapper, {
            scrollX: true
          })
        })
      } else {
        this.$nextTick(() => {
          console.log('fssirst')
          this.picscroll.refresh()
        })
      }
    }
  },
  created () {
    this.classMap = ['dicrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  watch: {
    'seller' () {
      this._initPics()
      this._initScroll()
    }
  },
  mounted () {
    this._initPics()
    this._initScroll()
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "../../common/stylus/mixin"
  .seller
    position :fixed
    top:216px
    width :100%
    bottom:46px
    overflow : hidden
    .seller-content
      .overview
        margin :18px
        position :relative
        .overview-basic
          padding-bottom :18px
          border-bottom:1px solid rgba(7,17,27,0.1)
          font-size :0
          .title
            padding-top:2px
            margin-bottom :8px
            font-size :14px
            line-height :14px
          .star-wrapper
            display :inline-block
            margin-right :2px
          .rating-count , .seller-count
            vertical-align :top
            display :inline-block
            margin-right :8px
            font-size :10px
            line-height :18px
          .favorite
            position :absolute
            top:0px
            right :0px
            text-align :center
            width :50px
            .icon-favorite
              display :block
              font-size :24px
              line-height :24px
              color :#d3d6d9
              margin-bottom :4px
            .active
              color:red
            .text
              font-size :10px
              line-height :10px
        .overview-info
          margin-top :18px
          .item-list
            display :flex
            text-align center
          .item
            display :inline-block
            flex:1
            border-right : 1px solid rgba(7,17,27,0.1)
            font-size :10px
            &:last-child
              border-right :none
            .item-title
              display :block
              font-size :10px
              color:rgb(147,153,159)
              line-height :10px
              margin-bottom :4px
            .item-text
              font-size :24px
              line-height :24px
      .bulletin
        margin :18px
        .bulletin-title
          margin-bottom :8px
          font-size :14px
          line-height :14px
        .bulletin-content-wrapper
          padding :0 12px
          .bulletin-content
            color :red
            font-size 12px
            line-height :24px
      .supports-wrapper
        margin: 0 18px
        .supports
          .supports-item
            padding:16px 12px
            border-top:1px solid rgba(7,17,27,0.1)
            .icon
              display :inline-block
              vertical-align :top
              width :16px
              height :16px
              background-repeat :no-repeat
              background-size :16px 16px
              bg-image('decrease_4')
              &.decrease
                bg-image('decrease_4')
              &.discount
                bg-image('discount_4')
              &.guarantee
                bg-image('guarantee_4')
              &.invoice
                bg-image('invoice_4')
              &.special
                bg-image('special_4')
            .text
              display :inline-block
              vertical-align :top
              font-size :12px
              inline-height:12px
              margin-left :4px

      .pics
        margin :18px 0 18px 18px
        width :100%
        .title
          font-size :14px
          margin-bottom :12px
        .pic-wrapper
          white-space: nowrap
          overflow :hidden
          width: 100%
          .pic-list
            .pic-item
              margin-right :6px
              display :inline-block
              height :90px
              width :120px

      .seller-info
        margin :18px
        .title
          font-size :14px
          line-height :14px
          margin-bottom :12px
        .info-item
          padding:18px 12px
          font-size :12px
          border-top:1px solid rgba(7,17,27,0.1)
          line-height :16px
</style>
