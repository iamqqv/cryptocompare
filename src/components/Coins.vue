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
    export default {
        name: 'coins',
        computed: {
            coins() {
                return this.$store.getters.getCoinData;
            },
        },
        mounted() {
            this.$store.dispatch('GET_COINS_FROM_API');
            this.$store.dispatch('GET_COIN_IMAGES_FROM_API');
        },
        methods: {
            getColor: function (num) {
                return num > 0 ? 'color: green;' : 'color: red;'
            },
            convertLastUpdated: function (lastUpdated) {
                let d = new Date(lastUpdated * 1000);
                let hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
                let minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
                let formattedTime = hours + ":" + minutes;
                this.lastUpdated = formattedTime;

                return formattedTime;
            },
            getCoinImage: function (symbol) {
                let url = 'https://www.cryptocompare.com/';
                if (symbol === 'MIOTA') {
                    return url + this.$store.getters.getCoinImageUrl['IOT'].ImageUrl;
                }
                if (this.$store.getters.getCoinImageUrl[symbol] !== undefined) {
                    return url + this.$store.getters.getCoinImageUrl[symbol].ImageUrl;
                }
            }
        }
    }
</script>
