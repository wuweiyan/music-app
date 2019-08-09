import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../components/recommend/recommend'
import Singer from '../components/singer/singer'
import Rank from '../components/rank/rank.vue'
import Search from '../components/search/search.vue'
import SingerDeatail from '../components/singer-detail/singer-detail.vue'
import TopList from '../components/top-list/top-list.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDeatail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDeatail
        }
      ]
    }
  ]
})
