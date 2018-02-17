<template>
    <tbody>
    <tr v-for="coin in coins">
        <td>{{ coin.rank }}</td>
        <td>{{ coin.name }}</td>
        <td><img v-bind:src="getCoinImage(coin.symbol)"> {{coin.symbol}}</td>
        <td>{{ coin.price_usd | currency }}</td>
        <td v-bind:style="getColor(coin.percent_change_1h)"><span v-if="coin.percent_change_1h > 0">+</span> {{
            coin.percent_change_1h }} %
        </td>
        <td v-bind:style="getColor(coin.percent_change_24h)"><span v-if="coin.percent_change_24h > 0">+</span> {{
            coin.percent_change_24h }} %
        </td>
        <td v-bind:style="getColor(coin.percent_change_7d)"><span v-if="coin.percent_change_7d > 0">+</span> {{
            coin.percent_change_7d }} %
        </td>
        <td>{{ coin.market_cap_usd | currency('$', '0') }}</td>
        <td>{{convertLastUpdated(coin.last_updated)}}</td>
    </tr>
    </tbody>
</template>

<script>
    import axios from 'axios'
    let UPDATE_INTERVAL = 60 * 1000;
    let CRYPTOCOMPARE_API_URI = "https://min-api.cryptocompare.com";
    let COINMARKETCAP_API_URI = "https://api.coinmarketcap.com";

    export default {
        name: "coins",
        data() {
            return {
                coins: [],
                coinData: [],
                lastUpdated: ''
            }
        },
        created() {
            // coinmarketcap
            this.getCoinData();
            setInterval(() => {
                this.getCoinData();
            }, UPDATE_INTERVAL);
        },
        methods: {
            getColor: function (num) {
                return num > 0 ? 'color: green;' : 'color: red;'
            },
            getCoinData: function () {
                axios.get(CRYPTOCOMPARE_API_URI + '/data/all/coinlist')
                    .then((response) => {
                        this.coinData = response.data.Data;
                        this.getCoins();
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },
            getCoins: function () {
                axios.get(COINMARKETCAP_API_URI + "/v1/ticker/?limit=10")
                    .then((response) => {
                        this.coins = response.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    })

            },
            getCoinImage: function (symbol) {
                if (symbol === 'MIOTA') {
                    symbol = 'IOT';
                }
                return 'https://www.cryptocompare.com' + this.coinData[symbol].ImageUrl;
            },
            convertLastUpdated: function (lastUpdated) {
                let d = new Date(lastUpdated * 1000);
                let hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
                let minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
                let formattedTime = hours + ":" + minutes;
                this.lastUpdated = formattedTime;

                return formattedTime;
            }
        }
    }
</script>
