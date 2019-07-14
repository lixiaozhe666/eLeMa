<template>
  <div class = "ratingselect">
    <div class = "rating-type">
      <span @click="select(type=2)" class = "block positive" :class="{'active': ratingSelectType === 2}">{{desc.all}}<span class = "count">{{ratings.length}}</span></span>
      <span @click="select(type=0)" class = "block positive" :class="{'active': ratingSelectType === 0}">{{desc.positive}}<span class = "count">{{positive.length}}</span></span>
      <span @click="select(type=1)" class = "block negative" :class="{'active': ratingSelectType === 1}">{{desc.negative}}<span class = "count">{{negative.length}}</span></span>
    </div>
    <div class = "switch" @click="toggleContent">
      <span  class = "icon-check_circle" :class="{'on':this.ratingOnlyContent}"></span>
      <span class = "text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const ALL = 2
export default {
  props: {
    desc: {
      type: Object,
      default () {
        return {
          'all': '全部',
          'positive': '好评',
          'negative': '差评'
        }
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: true
    },
    ratings: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      ratingSelectType: this.selectType,
      ratingOnlyContent: this.onlyContent
    }
  },
  methods: {
    select (type) {
      this.ratingSelectType = type
      this.$emit('ratingtypeSelect', type)
    },
    toggleContent () {
      this.ratingOnlyContent = !this.ratingOnlyContent
      this.$emit('ratingOnlyContent', this.ratingOnlyContent)
    }
  },
  computed: {
    positive () {
      return this.ratings.filter((rating) => {
        return rating.rateType === 0
      })
    },
    negative () {
      return this.ratings.filter((rating) => {
        return rating.rateType === 1
      })
    }
  }
}

</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .ratingselect
    padding-top:18px
    .rating-type
      margin:0 18px
      padding-bottom :18px
      border-bottom :1px solid rgba(7,17,27,0.2)
      .block
        padding:8px 12px
        border-radius :2px
        line-height :16px
        font-size :12px
        margin-right :8px
        color:black
        .count
          font-size:8px
          margin-left :2px
        &.positive
          background-color :rgba(0,160,220,0.2)
          &.active
            background-color :rgb(0,160,220)
            color :white
        &.negative
          background-color :rgba(77,85,93,0.2)
          &.active
            background-color :rgb(77,85,93)
            color :white
    .switch
      padding : 12px 18px
      line-height :24px
      color : rgb(147,153,159)
      border-bottom : 1px solid rgba(7,17,27,0.2)
      .icon-check_circle
        display :inline-block
        vertical-align :top
        font-size : 24px
        margin-right :4px
        &.on
          color :green
      .text
        display :inline-block
        vertical-align :top
        font-size :12px
</style>
