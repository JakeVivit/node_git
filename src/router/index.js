import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../page/index'
import Register from '../page/register'
import Signin from '../page/signin'
import News from '../page/news'
import Gettext from '../page/gettext'
import Ascertain from '../page/ascertain'
import SetUp from '../page/setup'

Vue.use(VueRouter)

const routes = [
    { path: '/Index', component: Index },
    { path: '/register', component: Register },
    { path: '/signin', component: Signin },
    { path: '/news', component: News },
    { path: '/gettext', component: Gettext },
    { path: '/ascertain', component: Ascertain },
    { path: '/setup', component: SetUp }
]
const router = new VueRouter({
        mode: 'history',
        routes // （缩写）相当于 routes: routes
    })
const app = new Vue({
    router
}).$mount('#app')

export default new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/signin',
            name: 'Signin',
            component: Signin
        },
        {
          path: '/news',
          name: 'News',
          component: News
        },
        {
          path: '/gettext',
          name: 'Gettext',
          component: Gettext
        },
        {
          path: '/ascertain',
          name: 'Ascertain',
          component: Ascertain
        },
        {
          path: '/setup',
          name: 'SetUp',
          component: SetUp
        }
    ]
})
