<template>
  <div class = "ratingwrapper" ref="ratingwrapper">
    <div>
      <div class = "rating-header">
        <div class = "rating-header-left">
          <h1 class = "score">{{seller.score}}</h1>
          <div class = "title">综合评分</div>
          <div class = "rank-rate">高于周围商家{{seller.rankRate}}%</div>
        </div>
        <div class = "rating-header-right">
          <div class="service-score">
            <span class = "right-title">服务态度</span><star class="star-wrapper" :size="36" :score="seller.serviceScore"></star>{{seller.serviceScore}}
          </div>
          <div class="food-score">
            <span class = "right-title">食物评分</span><star class="star-wrapper" :size="36" :score="seller.foodScore"></star>{{seller.foodScore}}
          </div>
          <div class="delivery-time">
            <span class = "right-title"><span class="right-title">送达时间</span>{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div class = "rating-list">
        <ratingselect v-on:ratingOnlyContent = 'ratingOnlyContent' v-on:ratingtypeSelect='ratingtypeSelect' :selectType="selectType" :desc="desc" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
        <div class = "rating-list-wrapper">
          <ul v-show = "ratings">
            <li class="rating-item" v-for="(rating,index) in ratings" :key="index" v-show = "showItem(rating.rateType,rating.text)">
              <img :src ="rating.avatar" class = "user-avator">
              <div class = "user-content">
                <div class = "user-name">{{rating.username}}</div>
                <star class="star-wrapper" :size="24" :score="rating.score"></star><span class="delivery-time">{{rating.deliveryTime}}分钟送达</span>
                <p class="rating-text">{{rating.text}}</p>
                <div class="recommend-wrapper">
                  <span :class = "{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
                  <span class = "recommend" v-for="(recommend,index) in rating.recommend" :key="index">
                    {{recommend}}
                  </span>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
              </div>
<!--              <div class = "time">{{rating.rateTime | formatDate}}</div>-->
<!--              <div class = "text">-->
<!--                <span :class = "{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>{{rating.text}}-->
<!--              </div>-->
            </li>
          </ul>
          <div class = "no-rating" v-show="!ratings">暂无评论</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import star from '../../components/star/star'
import split from '../../components/split/split'
import ratingselect from '../../components/ratingselect/ratingselect'
import BetterScroll from 'better-scroll'
import dateFormat from '../../common/js/date'
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    split,
    ratingselect
  },
  data () {
    return {
      onlyContent: false,
      selectType: 2,
      desc: {
        'all': '全部',
        'positive': '满意',
        'negative': '不满意'
      },
      ratings: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.$nextTick(() => {
          console.log('first11')
          this.scroll = new BetterScroll(this.$refs.ratingwrapper, {
            click: true
          })
        })
      } else {
        this.$nextTick(() => {
          console.log('second11')
          this.scroll.refresh()
        })
      }
    })
  },
  methods: {
    ratingOnlyContent (ratingonlycontent) {
      console.log(ratingonlycontent)
      this.onlyContent = ratingonlycontent
    },
    ratingtypeSelect (type) {
      this.selectType = type
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
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.ratings = response.data
      }
    })
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
  .ratingwrapper
    position :absolute
    top:206px
    width :100%
    bottom:46px
    overflow :hidden
    .rating-header
      padding: 18px 0
      display :flex
      .rating-header-left
        flex :0 0 137px
        text-align :center
        border-right :1px solid rgba(7,17,27,0.2)
        @media only screen and (max-width :320px)
          flex:0 0 120px
        .score
          font-size :24px
          color:rgb(255,153,0)
          line-height :28px
          margin-bottom :6px
        .title
          font-size :12px
          color :rgb(7,17,27)
          line-height:10px
          margin-bottom :12px
        .rank-rate
          font-size :10px
          color :rgb(147,153,159)
          line-height:10px
          margin-bottom :6px
      .rating-header-right
        flex:1
        padding-left:24px
        @media only screen and (max-width :320px)
          padding-left:6px
        .service-score, .food-score, .delivery-time
          margin-bottom :8px
          font-size :12px
          line-height :12px
          color:rgb(255,153,0)
          .right-title
            display : inline-block
            vertical-align :center
            margin-right :12px
            color:rgb(7,17,27)
            @media only screen and (max-width :320px)
              margin-right:6px
          .star-wrapper
            display : inline-block
            vertical-align :center
            margin-right :12px
            @media only screen and (max-width :320px)
              margin-right:6px
  .rating-list
    .rating-list-wrapper
      .rating-item
        display :flex
        margin:18px
        padding-bottom :18px
        border-bottom :1px solid rgba(7,17,27,0.2)
        .user-avator
          flex:0 0 28px
          top:18px
          left :18px
          width :28px
          height :28px
          border-radius :50%
          margin-right :12px
        .user-content
          flex :1
          position :relative
          .user-name
            font-size :10px
            color :black
            line-height :12px
            margin-bottom :4px
          .star-wrapper
            display: inline-block
            margin-right :6px
            margin-bottom :6px
          .delivery-time
            display :inline-block
            font-size :10px
            font-weight :200
            color:rgb(147,153,159)
            line-height :12px
          .rating-text
            font-size :12px
            color :black
            line-height :18px
            margin-bottom :8px
            font-weight :500
          .recommend-wrapper
            .icon-thumb_up
              display :inline-block
              font-size :12px
              color:rgb(0,160,220)
              line-height:16px
              margin-right :8px
            .recommend
              display :inline-block
              border :1px solid rgba(7,17,27,0.1)
              margin-right :8px
              margin-bottom :6px
              font-size :9px
              color: rgb(147,153,159)
              line-height :16px
              padding :0 6px
          .time
            position :absolute
            right :0px
            top:0px
            font-size :10px
            font-weight :200
            line-height :12px
            color:rgb(147,153,159)
</style>
