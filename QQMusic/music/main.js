// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Axios from 'axios';
import $ from 'jquery';

// css import
import './assets/common/css/base.css';
import '../static/icon/iconfont.css';

// components import
import Header from './components/music-header';
import player from './components/player';

Vue.config.productionTip = false;
Vue.prototype.axios = Axios;
Vue.prototype.$ = $;

Vue.component('Header', Header);
Vue.component('player', player);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});
