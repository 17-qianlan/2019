<template>
    <header class="header position-fixed" :style="style">
        <ul class="row">
            <li class="menu col-2" @click="showMenu"><i class="iconfont icon-menu"></i></li>
            <li class="my col-8 row">
                <router-link to="/my" class="col-4 text-center">我的</router-link>
                <router-link to="/music" class="col-4 text-center">音乐馆</router-link>
                <router-link to="/find" class="col-4 text-center">发现</router-link>
            </li>
            <li class="more col-2 text-right">
                <i class="iconfont icon-hao "></i>
            </li>
        </ul>
        <search-input></search-input>
    </header>
</template>
<script>
    import {mapMutations} from 'vuex';
    export default {
        name: 'm-header',
        data() {
            return {
                style: {
                    width: 0
                }
            };
        },
        methods: {
            ...mapMutations([
                'changeShowMenu'
            ]),
            showMenu() {
                this.changeShowMenu(true);
            }
        },
        mounted() {
            this.style.width = document.body.offsetWidth + 'px';
        }
    };
</script>

<style scoped lang="scss">
    .header{
        top: 0;
        left: 0;
        width: 100%;
        background: #31c27c;
        color: #fff;
        z-index: 10;
        ul.row {
            width: 100%;
            height: 62px;
            margin: 0;
            li {
                font-size: 40px;
                line-height: 62px;
                a {
                    color: inherit;
                }
            }
            .menu, .more{
                i {
                    font-size: 30px;
                }
            }
        }
    }
</style>
