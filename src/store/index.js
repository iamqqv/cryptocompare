import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const store = new Vuex.Store({
    state: {
        coinData: [],
    },
    actions: {
        GET_COINS_FROM_API() {
            axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=15')
                .then((response) => {
                    if (response.status === 200) {
                        store.commit('SET_COIN_DATA', response.data);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        },
    },
    mutations: {
        SET_COIN_DATA: function (state, data) {
            state.coinData = data;
        },
    },
    getters: {
        getCoinData: state => {
            return state.coinData;
        },
    }
});

export default store;
