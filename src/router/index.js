import Vue from 'vue'
import VueRouter from 'vue-router'
import Movie from "../views/Movie";
import Login from "../views/Login";
import Registration from "../views/Registration";
import Modify from "../views/Modify";
import Index from "../views/Index";
import UpdateMovie from "../views/UpdateMovie";
import Recommend from "../views/Recommend";
import SmallView from "../views/SmallView";
import Search from "../views/Search";
import Details from "../views/Details";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: '用户模块',
    component: Index,
    redirect:"Login",
    children:[
      {
        path: "/Login",
        name: "登陆",
        component: Login,
        show: true
      },
      {
        path: "/Registration",
        name: "注册",
        component: Registration,
        show: true
      },
      {
        path: "/Modify",
        name: "修改信息",
        component: Modify,
        show: false
      }
    ]
  },
    {
      path: '/',
      name: '业务模块',
      component: Index,
      children: [
        {
          path: "/Movie",
          name: "查看信息",
          component: Movie,
          show: true
        },
        {
          path: "/recommend",
          name: "推荐",
          component: Recommend,
          show: true
        },
        {
          path: "/SmallView",
          name: "电影列表",
          component: SmallView,
          show: true
        },
        {
          path: "/Search",
          name: "搜索",
          component: Search,
          show: true
        },
        {
          path: "/Details",
          name: "详情",
          component: Details,
          show: false
        },
        {
          path: '/UpdateMovie',
          component: UpdateMovie,
          show: false
        }
      ]
    }



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
