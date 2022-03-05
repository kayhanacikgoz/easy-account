import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Login',
    },
    beforeEnter: (to, from, next) => {
      if(store.state.authenticated == "true" ) {
        next("/home");
      } else {
        next();
        from();
        to();
      }
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(store.state.sagdiclar_authenticated == "null" ) {
        next("/login");
      } else {
        next();
        from();
        to();
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(store.state.sagdiclar_authenticated == "true" ) {
        next("/home");
      } else {
        next();
        from();
        to();
      }
    }
  },
  {
    path: '/fatura',
    name: 'Fatura',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Fatura.vue'),
    beforeEnter: (to, from, next) => {
      if(store.state.sagdiclar_authenticated == null ) {
        next("/login");
      } else {
        next();
        from();
        to();
      }
    }
  },
  {
    path: '/list',
    name: 'List',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/List.vue'),
    beforeEnter: (to, from, next) => {
      if(store.state.sagdiclar_authenticated == null ) {
        next("/login");
      } else {
        next();
        from();
        to();
      }
    }
  },
  {
    path: '/report',
    name: 'Report',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Report.vue'),
    beforeEnter: (to, from, next) => {
      if(store.state.sagdiclar_authenticated == null ) {
        next("/login");
      } else {
        next();
        from();
        to();
      }
    }
  },
  {
    path: '/faturadetay/:id',
    name: 'FaturaDetay',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/FaturaDetay.vue'),
    beforeEnter: (to, from, next) => {
      if(store.state.sagdiclar_authenticated == null ) {
        next("/login");
      } else {
        next();
        from();
        to();
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
