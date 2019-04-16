<template>
    <section class="song-player-wrap position-fixed">
        <div class="top" :style="style" @click="handleShowSongList"></div>
        <div class="song-player-list" :style="style">
            <ul class="header row">
                <li class="col-2 text-center">
                    <i class="iconfont icon-xunhuan"></i>
                </li>
                <li class="col-6">
                    <span>顺序播放(<span>100</span>首)</span>
                </li>
                <li class="col-2 text-center">
                    <i class="iconfont icon-xiazai"></i>
                </li>
                <li class="col-2 text-center">
                    <i class="iconfont icon-delete"></i>
                </li>
            </ul>
            <ul class="list" :style="{'height': (this.wrapHeight/2)-75+'px'}">
                <li class="row justify-content-around align-items-center" v-for="(item, i) of songListArr" :key="i">
                    <div :class="['serial', 'col-1', 'text-center', {'active': i=== index}]" @click="playerSong(i, item)" v-text="handleAddZero(i)"></div>
                    <div class="col-8 text-left">
                        <span :class="['song_header', 'd-inline-block', {'active': i === index}]" @click="playerSong(i, item)" v-text="item.songname"></span>
                        <span :class="['singer', 'd-inline-block', {'active': i === index}]" @click="playerSong(i, item)" v-text="`--${singer(item)}`"></span>
                    </div>
                    <div class="col-1 text-center">
                        <i class="iconfont icon-delete"></i>
                    </div>
                </li>
            </ul>
            <div class="_btn text-center position-fixed" @click="handleShowSongList">
                关闭
            </div>
        </div>
    </section>
</template>
<script>
    import {mapMutations, mapState} from 'vuex';
    import tooFn from '../assets/js/tooFn';
    import Audio from '../assets/js/Audio';
    export default {
        name: 'song-list',
        data() {
            return {
                wrapHeight: 0,
                audio: {},
                src: [],
                style: {
                    height: 0
                }
            };
        },
        methods: {
            ...mapMutations([
                'changeShowSongList',
                'assignmentPlayer',
                'changeIndex'
            ]),
            handleShowSongList() {
                this.changeShowSongList(false);
            },
            playerSong(i, item) {
                this.changeIndex(i);
                this.assignmentPlayer(item);
            },
            handleAddZero(num) {
                return tooFn.addZero(num);
            },
            singer(item) {
                return tooFn.codeSinger(item);
            }
        },
        computed: {
            ...mapState({
                songListArr: state => state.songListArr,
                player: state => state.player,
                index: state => state.index
            })
        },
        mounted() {
            this.wrapHeight = this.$('.song-player-wrap').height();
            this.audio = new Audio().getAudio();
            this.style.height = this.wrapHeight/2 + 'px';
        }
    };
</script>
<style scoped lang="scss">
    .song-player-wrap {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .6);
        z-index: 100000000;
        color: #D4D5D7;
        .song-player-list {
            width: 100%;
            padding: 10px 0;
            background: rgba(0, 0, 0, .6);
            .header {
                li {
                    span {
                        font-size: 35px;
                    }
                    i {
                        font-size: 40px;
                    }
                }
            }
            .list {
                /*margin-bottom: 80px;*/
                padding: 10px 0;
                overflow-x: hidden;
                overflow-y: scroll;
                li {
                    .serial {
                        /*margin-left: 10px;*/
                        font-size: 30px;
                    }
                    span {
                        font-size: 30px;
                    }
                    .singer {
                        /*margin-left: 10px;*/
                        color: #c2c6dd;
                        font-size: 20px;
                    }
                    div:nth-child(2) {
                        font-size: 35px;
                        color: #eee;
                    }
                }
                .active {
                    color: #31C27C !important;
                }
            }
        }
        ._btn{
            bottom: 0;
            left: 0;
            width: 100%;
            height: 80px;
            color: inherit;
            font-size: 45px;
            background: #000;
        }
    }
</style>
