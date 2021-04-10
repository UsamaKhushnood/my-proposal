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
        path: '/variable',
        name: 'Variable',
        component: () =>
            import ('../views/Variable.vue')
    },
    {
        path: '/variable-dynamic',
        name: 'VariableDynamic',
        component: () =>
            import ('../views/VariableDynamic.vue')
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
    routes
})

export default router