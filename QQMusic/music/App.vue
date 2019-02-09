<template>
    <div id="app">
        <Header></Header>
        <Country :region="region"></Country>
        <Country :region="sheet"></Country>
    </div>
</template>

<script>
    import {region, sheet} from './assets/common/js/common';
    export default {
        name: 'app',
        data() {
            return {
                region,
                sheet
            }
        }
    }
</script>

<style scoped lang="scss">
    #app{
        width: 100%;
        height: 2000px;
    }
</style>
