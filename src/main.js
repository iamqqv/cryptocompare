// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vue2Filters from 'vue2-filters'
import Vuex from 'vuex'
import store from './store'

Vue.use(VueAxios, axios);
Vue.use(Vue2Filters);
Vue.use(Vuex);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App/>',
    axios,
    VueAxios,
    store
});
