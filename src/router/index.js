import Vue from 'vue'
import VueRouter from 'vue-router'
import Bonds from '../views/Bonds.vue'
import Investors from '../views/Investors.vue'
import Investor from '../views/Investor.vue'
import Calculate from '../views/Calculate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'bonds',
    component: Bonds
    //add return formula
  },
  {
    path: '/Investors',
    name: 'investors',
    component: Investors
  },
  {
  path: '/Investor/:investor_id',
  name: 'investor',
  component: Investor
  },
  {
    path: '/Calculate',
    name: 'calculate',
    component: Calculate
    }
   

]

const router = new VueRouter({
  routes
})

export default router
