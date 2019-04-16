<template>
    <section class="container">
        <div class="header">
            <router-link to="/item/ranking" class="row align-items-right">
                <p class="col-8 offset-2 text-center">为你推荐歌单</p>
                <p class="iconfont icon-zuoyoujiantou col-2 text-center"></p>
            </router-link>
        </div>
        <show-song :songArr="songListArr"/>
    </section>
</template>
<script>
    import {mapState, mapMutations} from 'vuex';
    import Event from '../assets/js/Event';
    export default {
        name: 'recommend',
        data() {
            return {
                documentHeight: 0,
                scrollTop: 0,
                windowHeight: 0,
                i: 0
            };
        },
        computed: {
            ...mapState({
                songListArr: state => state.songListArr,
                originalSongList: state => state.originalSongList,
            })
        },
        methods: {
            ...mapMutations([
                'changeSongListData'
            ]),
            lazyLoad() {
                this.documentHeight = document.body.clientHeight;
                this.scrollTop = document.documentElement.scrollTop;
                this.windowHeight = window.innerHeight;
                const num = this.documentHeight - this.scrollTop;
                let boo =  num <= this.windowHeight + 200;
                if (boo) {
                    ++this.i;
                    this.changeSongListData(this.originalSongList[this.i]);
                }
            },
        },
        mounted() {
            const _Event = new Event();
            _Event.add(window, 'scroll', this.lazyLoad);
        }
    };
</script>

<style scoped lang="scss">
    section {
        margin-top: 30px;
        .header{
            a{
                font-size: 35px;
                p{
                    font-size: inherit;
                }
                p:nth-child(1) {
                    letter-spacing: 8px;
                }
            }
        }
    }
</style>
