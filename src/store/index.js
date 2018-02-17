import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const store = new Vuex.Store({
    state: {
        coinData: [],
        coinImageUrl: [],
    },
    actions: {
        GET_COINS_FROM_API() {
            axios.get('https://api.coinmarketcap.com/v1/ticker/?limit=10')
                .then((response) => {
                    if (response.status === 200) {
                        store.commit('SET_COIN_DATA', response.data);
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        },
        GET_COIN_IMAGES_FROM_API() {
            axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
                .then((response) => {
                   store.commit('SET_COIN_IMAGE_URL', response.data.Data)
                });
        }
    },
    mutations: {
        SET_COIN_DATA: function (state, data) {
            state.coinData = data;
        },
        SET_COIN_IMAGE_URL: function (state, data) {
            state.coinImageUrl = data;
        }
    },
    getters: {
        getCoinData: state => {
            return state.coinData;
        },
        getCoinImageUrl: state => {
            return state.coinImageUrl;
        }
    }
});

export default store;
