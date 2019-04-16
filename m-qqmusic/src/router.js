import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';

import Index from './views/index';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        /*{
            path: '/',
            name: 'home',
            component: Home
        },*/
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/item/:id',
            component: () => import(/* webpackChunkName: "menu-child" */ './components/common/menu-child')
        },
        {
            path: '/',
            component: Index
        },
        {
            path: '/search',
            component: () => import(/* webpackChunkName: "search" */ './views/search-pages')
        },
        {
            path: '/player/:id',
            component: () => import(/* webpackChunkName: 'player-pages' */ './views/player-pages')
        },
        {
            path: '*',
            component: () => import(/* webpackChunkName: 'player-pages' */ './components/not')
        }
    ]
});
