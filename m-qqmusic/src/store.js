import actions from './store/actions';
import getters from './store/getters';
import mutations  from './store/mutations';
import state from './store/state';
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
