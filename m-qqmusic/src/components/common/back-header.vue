<template>
    <div class="row header justify-content-around">
        <span @click="back" class="back iconfont icon-icon-array_left col-1 text-center"></span>
        <h3 class="title col-9 text-center text-truncate" v-text="title"></h3>
        <span class="iconfont icon-menu col-1"></span>
    </div>
</template>
<script>
    import {mapMutations} from 'vuex';
    export default {
        name: 'back-header',
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        methods: {
            ...mapMutations([
                'changeShowPlayerBar'
            ]),
            back() {
                this.$router.go(-1);
                this.changeShowPlayerBar(true);// 这里返回回来, 不管是有没有在播放, 都要显示出来
            }
        }
    };
</script>

<style scoped lang="scss">
    .header{
        background: #31C27C;
        margin: 0;
        color: #fff;
        font-size: 40px;
        span{
            padding-left: 20px;
            font-size: inherit;
            line-height: 1.8;
        }
        h3{
            font-size: inherit;
            line-height: 1.8;
        }
    }
    .row {
        margin: 0;
    }
</style>
