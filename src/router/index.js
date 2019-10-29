import Vue from 'vue'
import VueRouter from 'vue-router'
import Bonds from '../views/Bonds.vue'
import Investors from '../views/Investors.vue'
import Investments from '../views/Investments.vue'
import Invest from '../views/Invest.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'bonds',
    component: Bonds
  },
  {
    path: '/Investors',
    name: 'investors',
    component: Investors
  },
  {
  path: '/Investments',
  name: 'investments',
  component: Investments
  },
  {
    path: '/Invest',
    name: 'invest',
    component: Invest
    }

]

const router = new VueRouter({
  routes
})

export default router
