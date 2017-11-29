import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/home'
import Historytoday from '../page/historytoday'
import Compute from '../page/compute'
import My from '../page/my'
import More from '../page/more'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
    	path:'/historytoday',
    	name:'historytoday',
    	component:Historytoday
    },
    {
    	path:'/compute',
    	name:'compute',
    	component:Compute
    },
    {
      path:'/more',
      name:'more',
      component:More
    },
    {
      path:'/my',
      name:'my',
      component:My
    }
  ]
})
