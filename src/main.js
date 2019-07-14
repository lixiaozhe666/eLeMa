// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Goods from './components/goods/goods'
import Ratings from './components/ratings/ratings'
import Seller from './components/sellers/sellers'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import './common/stylus/index.styl'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)
// const goods = { template: Goods}
// const Bar = { template: '<div>bar</div>' }
const routes = [
  { path: '/goods', component: Goods },
  { path: '/ratings', component: Ratings },
  { path: '/sellers', component: Seller },

]

const router = new VueRouter({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
})

router.go(2)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
