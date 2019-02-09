<template>
    <div id="app">
        <Header></Header>
        <Country></Country>
        <Area></Area>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                d: ''
            }
        }
    }
</script>

<style scoped lang="scss">
    #app{
        width: 100%;
        height: 100%;
    }
</style>
