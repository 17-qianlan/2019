<template>
    <div>
        欢迎来到歌曲详情页;
        {{id}}
    </div>
</template>

<script>
    export default {
        name: 'song-details',
        data() {
            return {
                data: new Date().getTime()
            };
        },
        beforeCreate() {
            this.id = this.$route.query.id;
        }
    };
</script>

<style scoped>

</style>
