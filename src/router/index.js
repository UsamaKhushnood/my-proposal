import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '*',
        name: 'pageNotFound',
        component: () =>
            import ('../views/PageNotFound.vue')
    },
    {
        path: '/templates',
        name: 'SavedTemplates',
        component: () =>
            import ('../views/SavedTemplates.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue')
    },
    {
        path: '/Login',
        name: 'Login',
        component: () =>
            import ('../components/Login.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () =>
            import ('../components/Signup.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router