<template>
    <div class="app position-relative">
        <router-view />
        <player-bar v-if="isShowBar" />
        <song-list v-if="isShowSongList" />
    </div>
</template>

<script>
    import Audio from './assets/js/Audio';
    import tooFn from './assets/js/tooFn';
    import {mapState, mapMutations} from 'vuex';
    export default {
        name: 'App',
        data() {
            return {
                src: [],
                showPlayerBar: false
            };
        },
        methods: {
            ...mapMutations([
                'changePlayButtonType',
                'changeShowSongList',
                'changeShowPlayerBar',
                'changeIndex',
                'assignmentPlayer'
            ]),
            requestSongSrc(val) {// 获取src
                tooFn.requestSong(`/music?songid=226989116&songmid=${val.songmid}`).then(({data}) => {
                    this.src = data;
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        computed: {
            ...mapState({
                player: state => state.player,
                isShowSongList: state => state.isShowSongList,
                isShowBar: state => state.isShowBar,
                songListArr: state => state.songListArr,
                index: state => state.index,
                isLoop: state => state.isLoop
            })
        },
        watch: {
            player(val) {
                // 要player改变了才会触发, 否则会乱套
                this.requestSongSrc(val);
                this.showPlayerBar = true;
            },
            src(val) {
                this.audio.create(val[0]);// 开始播放
                this.changePlayButtonType(true);
                // 监听播放结束, 有个问题, 就是在歌曲没播放完离开, 这个监听函数会一直存在
                this.audio.autoNextNextSong(() => {
                    this.changePlayButtonType(false);
                    tooFn.next.call(this, true, this.isLoop);
                    // this.requestLyric();
                });
            }
        },
        mounted() {
            this.audio = new Audio().getAudio();
        }
    };
</script>

<style scoped lang="scss">
    .app{
        background: #F3F4F6;
    }
</style>
