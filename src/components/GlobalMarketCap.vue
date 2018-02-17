<template>
    <div>
        <p class="text-center">
            Global Market Cap: <i>{{ this.marketCap.total_market_cap_usd | currency('$', 0) }}</i>
        </p>
        <p class="text-center">
            Last Updated: {{ this.convertLastUpdated() }}
        </p>
    </div>
</template>

<script>
    import axios from 'axios'
    let UPDATE_INTERVAL = 60 * 1000;
    let COINMARKETCAP_API_URI = "https://api.coinmarketcap.com";

    export default {
        name: "global-market-cap",
        data() {
            return {
                marketCap: '',
                lastUpdated: '',
            }
        },
        created() {
            this.getGlobalMarketCap();
            setInterval(() => {
                this.getGlobalMarketCap();
                this.convertLastUpdated();
            }, UPDATE_INTERVAL);
        },
        methods: {
            getGlobalMarketCap: function () {
                axios.get(COINMARKETCAP_API_URI + "/v1/global/")
                    .then((response) => {
                        this.marketCap = response.data;
                        this.convertLastUpdated();
                    })
            },
            convertLastUpdated: function () {
                let d = new Date(this.marketCap.last_updated * 1000);
                let formattedDate = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
                let hours = (d.getHours() < 10) ? "0" + d.getHours() : d.getHours();
                let minutes = (d.getMinutes() < 10) ? "0" + d.getMinutes() : d.getMinutes();
                let formattedTime = hours + ":" + minutes;

                return this.lastUpdated = formattedDate + " " + formattedTime;
            }
        }
    }
</script>
