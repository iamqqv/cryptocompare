<template>
    <div id="app">
        <global-market-cap></global-market-cap>
        <table class="table table-hover">
            <thead>
            <tr>
                <td>Rank</td>
                <td>Name</td>
                <td>Symbol</td>
                <td>Price (USD)</td>
                <td>1H</td>
                <td>1D</td>
                <td>1W</td>
                <td>Market Cap (USD)</td>
                <td>Last Updated</td>
            </tr>
            </thead>
            <coins></coins>
        </table>
    </div>
</template>

<script>
    import Coins from './components/Coins'
    import GlobalMarketCap from './components/GlobalMarketCap'

    export default {
        name: 'App',

        components: {
            'coins': Coins,
            'global-market-cap': GlobalMarketCap
        },
    }
</script>

<style>

</style>
