<template>
  <div id="app">
    <div >
      <v-header v-bind:seller = "seller"></v-header>
    </div>

    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods?id=123456">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/ratings?id=123456'>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/sellers?id=123456'>商家</router-link>
      </div>
    </div>
    <div>
      <shopcart :selectedFood = "selectFood" ref="shopcart"></shopcart>
    </div>
    <keep-alive>
      <router-view :seller="seller" :goods="goods" @addGoods="addGoods"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header1 from './components/header/header'
import {UrlParse} from './common/js/util'
import shopcart from './components/shopcart/shopcart'
const ERR_OK = 0
export default {
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = UrlParse()
          return queryParam.id
        })()
      },
      goods: []
    }
  },
  created () {
    this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data)
      }
    })
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        console.log(this.goods)
      }
    })
  },
  name: 'App',
  components: {
    'v-header': header1,
    shopcart
  },
  computed: {
    selectFood () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    addGoods (el) {
      this.$nextTick(() => {
        this.$refs['shopcart'].drop(el)
      })
    }
  }
}
</script>

<style lang = 'stylus' rel = 'stylesheet/stylus'>
  @import "common/stylus/mixin.styl"
#app
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    //border-bottom :1px solid rgba(7,17,27,0.1)
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display:block
        font-size :14px
        color:rgb(77,85,93)
        &.router-link-active
          color:rgb(240,20,20)

</style>
