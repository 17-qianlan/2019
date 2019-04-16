// npm
import Vue from 'vue';
import Jquery from 'jquery';
import 'lib-flexible';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';

import router from './router';
import store from './store';
// vue
import App from './App';

// vue => component
import Header from './components/header';
import Banner from './components/banner';
import MenuList from './components/menu-list';
import Recommend from './components/recommend';

// vue => component => common
import SearchInput from './components/common/search-input';
import BackHeader from './components/common/back-header';
import LabelList from './components/common/label';
import ShowSong from './components/common/show-song';
import Loading from './components/common/loading';
import PlayerBar from './components/common/player-bar';
import SongList from './components/song-list';
import Sidebar from './components/sidebar';


// css
import './assets/fonts/iconfont/iconfont.css';
import './assets/css/clear_default.css';
import './assets/css/bootstrap.mixin.css';

Vue.component('mHeader', Header);
Vue.component('SearchInput', SearchInput);
Vue.component('Banner', Banner);
Vue.component('MenuList', MenuList);
Vue.component('Recommend', Recommend);
Vue.component('BackHeader', BackHeader);
Vue.component('LabelList', LabelList);
Vue.component('ShowSong', ShowSong);
Vue.component('Loading', Loading);
Vue.component('PlayerBar', PlayerBar);
Vue.component('SongList', SongList);
Vue.component('Sidebar', Sidebar);

// vue prototype
Vue.prototype.$ = Jquery;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
