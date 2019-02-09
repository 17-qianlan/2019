// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import router from './router';

// css import
import './assets/common/css/base.css';
import '../static/icon/iconfont.css';

// components import
import Header from './components/music-header';
import Country from './components/music-Country';
import Area from './components/music-area';


Vue.config.productionTip = false;

Vue.component('Header', Header);
Vue.component('Country', Country);
Vue.component('Area', Area);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    // router,
    components: {App},
    template: '<App/>'
});
