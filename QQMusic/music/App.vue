<template>
    <div id="app">
        <Header></Header>
        <!--<song :region="sheet"></song>-->
        <router-view />
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
            };
        }
    };
</script>

<style scoped lang="scss">
    #app{
        width: 100%;
        height: 100%;
    }
</style>
