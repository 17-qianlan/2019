import Vue from 'vue';
import Router from 'vue-router';

import songList from '../components/list/song-details';
import Song from '../components/song';

// import {region, sheet} from './assets/common/js/common';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Song
        },
        {
            path: '/song/details/:id',
            component: songList
        }
    ]
});
