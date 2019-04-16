<template>
    <div class="player">
        <ul class="row justify-content-between">
            <li class="col-8 row align-items-center">
                <router-link class="d-block" :to="{path: `player/${player.albummid}`}">
                    <div class="avatar d-inline-block align-middle">
                        <img :src="player.album_big" width="100%" height="100%"/>
                    </div>
                    <div class="song-msg d-inline-block align-middle">
                        <p class="text-truncate" v-text="player.songname"></p>
                        <p class="text-truncate" v-text="singer"></p>
                    </div>
                </router-link>
            </li>
            <li class="col-4 button">
                <span :class="['iconfont', playButtonType, 'd-inline-block']" @click="playPaused"></span>
                <span class="iconfont icon-icqueuemusicpx d-inline-block" @click="songPlayerPages"></span>
            </li>
        </ul>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex';
    import Audio from '../../assets/js/Audio';
    import tooFn from '../../assets/js/tooFn';
    export default {
        name: 'player-bar',
        data() {
            return {
                audio: {}
            };
        },
        methods: {
            ...mapMutations([
                'changePlayer',
                'changePlayButtonType',
                'changeShowSongList'
            ]),
            playPaused() {
                let paused = this.audio.playPaused();
                this.changePlayButtonType(paused.isPaused);
            },
            songPlayerPages() {
                this.changeShowSongList(true);
            }
        },
        computed: {
            ...mapState({
                player: state => state.player,
                playButtonType: state => state.playButtonType
            }),
            singer() {
                return tooFn.codeSinger(this.player);
            }
        },
        mounted() {
            this.audio = new Audio().getAudio();
        }
    };
</script>

<style scoped lang="scss">
    .player{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 115px;
        padding: 10px;
        background: #fff;
        ul {
            li {
                .avatar{
                    width: 100px;
                    height: 100px;
                    padding: 10px;
                    img{
                        border-radius: 50%;
                    }
                }
                .song-msg{
                    width: 360px;
                    margin-left: 10px;
                    line-height: 30px;
                    font-size: 30px;
                    p{
                        width: 100%;
                        height: 30px;
                    }
                    p:nth-child(2){
                        font-size: 20px;
                        color: #31C27C;
                    }
                }
            }
            li.button{
                span:nth-child(1) {
                    margin-left: 20px;
                }
                span{
                    padding: 0 10px;
                    color: #31C27C;
                    font-size: 80px;
                    text-align: center;
                    line-height: 1.4;
                }
            }
        }
    }
</style>
