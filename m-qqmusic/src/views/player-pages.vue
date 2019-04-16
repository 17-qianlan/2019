<template>
    <section class="player-pages">
        <header>
            <back-header :title="player.songname"></back-header>
            <div class="singer text-center m-auto text-truncate">--{{singer(player)}}--</div>
        </header>
        <div class="bg" v-if="!showLyric" ref="bg"><img :src="player.album_big" width="100%" height="100%" class="rounded-circle" @click="handleShowLyric"/></div>
        <div class="lyrics position-relative" v-else @click="handleShowLyric">
            <ul class="position-absolute">
                <li v-for="(item, index) of lyricArr" :class="['text-center', {'active': lyricIndex === index}]" :key="index">{{item.text || '-----------------------'}}</li>
            </ul>
        </div>
        <ul class="bar row  align-items-center justify-content-around">
            <li class="col-2" v-text="timing"></li>
            <li class="col-7 progress padding-0"  @click="handleSchedule" ref="songTotalProgress">
                <div class="progress-bar bg-success rounded-pill" role="progressbar" :style="styleBar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" @click.stop="handleSchedule"></div>
            </li>
            <li class="col-2" v-text="currentTime"></li>
        </ul>
        <ul class="operate row justify-content-around text-center align-items-center">
            <li class="col-2" @click="loop">
                <span :class="['iconfont', playerLoopIcon]"></span>
            </li>
            <li class="col-2" @click="preSong">
                <span class="iconfont icon-previous"></span>
            </li>
            <li class="col-3" @click="musicPlay">
                <span :class="['iconfont', playButtonType]"></span>
            </li>
            <li class="col-2" @click="nextSong">
                <span class="iconfont icon-next1"></span>
            </li>
            <li class="col-2" @click="handleSongListShow">
                <span class="iconfont icon-icqueuemusicpx"></span>
            </li>
        </ul>
        <ul class="row justify-content-around option">
            <li class="col-1">
                <span class="iconfont icon-like"></span>
            </li>
            <li class="col-1">
                <span class="iconfont icon-xiazai"></span>
            </li>
            <li class="col-1">
                <span class="iconfont icon-fenxiang1"></span>
            </li>
            <li class="col-1">
                <span class="iconfont icon-liuyan"></span>
            </li>
        </ul>
        <div class="lyric row align-items-center">
            <div class="col-3 sound iconfont icon-shengyinyinliangmianxing"></div>
            <div class="col-8 progress volume padding-0" @click.stop="handleVolume">
                <div class="progress-bar bg-success rounded-pill" role="progressbar" :style="styleVolume" aria-valuemin="0" aria-valuemax="100" @click.stop="handleVolume"></div>
            </div>
        </div>
    </section>
</template>
<script>
    import {mapState, mapMutations} from 'vuex';
    import tooFn from '../assets/js/tooFn';
    import Audio from '../assets/js/Audio';
    // import Audio from '../assets/js/Audio';
    export default {
        name: 'player-pages',
        data() {
            return {
                durationTime: 0,
                playing: 0,
                playBarWidth: 0,
                lyrics: {},
                lyricArr: [],
                lyricsUl: {},
                lyricsUlHeight: 0,
                showLyric: false,
                lyricIndex: 0,
                addTop: 0,
                listenerIsPlaying: false,
                styleBar: {
                    width: 0
                },
                styleVolume: {
                    width: '100%'
                }
            };
        },
        watch: {
            durationTime(val) {
                // 歌曲时长
                this.durationTime = val;
            },
            playing(val) {
                // 实时播放时间
                this.playing = val;
                // 进度条时间状态
                this.styleBar.width = ((val*this.playBarWidth)/this.durationTime) + 'px';
                const current = val*1000;
                let n = this.lyricArr.findIndex(item => {
                    return Math.abs(item.millisecond - current) <= 600;
                });
                //歌词滚动还有问题, 会出现切换页面时的高度问题, ul的高度有问题
                if (n !== -1) {
                    this.lyricIndex = n;
                    this.lyricsUlHeight = this.lyricsUl.clientHeight;
                    const lyricItem = this.lyricsUl.getElementsByClassName('active')[0];
                    const liHeight = lyricItem.clientHeight;
                    const lyricItemTop = tooFn.getOffset(lyricItem).top;
                    if (lyricItemTop > this.lyricsUlHeight/1.8) {
                        this.addTop += liHeight;
                        this.lyricsUlHeight += liHeight;
                        this.lyricsUl.style.height = this.lyricsUlHeight + 'px';
                        this.lyricsUl.style.top = -this.addTop + 'px';
                        // this.scrollIndex++;
                    }
                }
            },
            playBarWidth(val) {
                // 歌曲播放进度条总长度
                this.playBarWidth = val;
            },
            lyricIndex(val) {
                this.lyricIndex = val;
            },
            // 监听是否在播放, 不需要管是true或者false, 只要这个值变化就行, 根据index的变化修改
            listenerIsPlaying(val) {
                this.listenerIsPlaying = val;
                // 获取歌曲时长, 需要playing监听, 否则可能在为加载完成获取, 返回的是NaN, 播放中不会触发playing事件
                this.audio.getDuration((a) => {
                    this.durationTime = Math.floor(a);
                });
                this.durationTime = this.durationTime || Math.floor(this.audio.audio.duration);
                // 动态加载实时播放的时间
                this.audio.onPlaying((a) => {
                    this.playing = a;
                });
            },
            index() {
                this.listenerIsPlaying = !this.listenerIsPlaying;
            },
            showLyric(val) {
                this.showLyric = val;
                if (val) {
                    this.requestLyric();
                    setTimeout(() => {
                        this.lyrics = document.getElementsByClassName('lyrics')[0];
                        this.lyricsUl = this.lyrics.children[0];
                    }, 0);
                }
            }
        },
        methods: {
            ...mapMutations([
                'changePlayButtonType',
                'assignmentPlayer',
                'changeIndex',
                'changeShowSongList',
                'changeIsLoop',
                'changePlayerLoopIcon',
                'changeVolume',
                'changeShowPlayerBar'
            ]),
            scheduleEndVolumeFn(a, b) {// 处理时间和音量的进度大小的函数
                const ele = a.target;
                const isVolume = Array.from(ele.classList).includes(b);
                let boo = isVolume? true: false;
                let getOffsetLeft = 0;
                let getWidth = 0;
                if (boo) {
                    getOffsetLeft = tooFn.getOffset(ele).left;
                    getWidth = ele.clientWidth;
                } else {
                    const parent = ele.parentNode;
                    getOffsetLeft = tooFn.getOffset(parent).left;
                    getWidth = ele.clientWidth;
                }
                if (b === 'progress') {
                    const num = a.pageX - getOffsetLeft;
                    this.styleBar.width = num + 'px';
                    this.audio.audio.currentTime = tooFn.seekBeforePlay(num*this.durationTime, getWidth);
                } else {
                    const val = a.pageX - getOffsetLeft;
                    this.styleVolume.width = val + 'px';
                    const num = tooFn.codeVolume(getWidth, val);
                    this.audio.getAndSetVolume(num);
                }
            },
            handleSchedule(e) {// 改变歌曲进度
                this.scheduleEndVolumeFn(e, 'progress');
            },
            handleVolume(e) {// 改变音量
                this.scheduleEndVolumeFn(e, 'volume');
            },
            musicPlay() {// 播放按钮
                let {isPaused} = this.audio.playPaused();
                this.changePlayButtonType(isPaused);
            },
            loop() {// 循环播放
                const boolean = !this.isLoop;
                this.changeIsLoop(boolean);
                this.changePlayerLoopIcon(boolean);
            },
            nextSong() {// 下一曲
                tooFn.next.call(this, true);
            },
            preSong() {// 上一曲
                tooFn.next.call(this, false);
            },
            requestLyric() {
                console.log(this.player.songmid);
                tooFn.requestSong(`/lyric?lyrics=${this.player.songmid}`).then(({data}) => {
                    console.log(data);
                    this.lyricArr = data.lyric;
                }).catch(error => {
                    console.log(error);
                });
            },
            handleShowLyric() {// 显示歌词
                this.showLyric = !this.showLyric;
            },
            handleSongListShow() {// 显示歌单
                this.changeShowSongList(true);
            },
            singer(item) {// 打包歌手
                if (!this.player.album_big) return false;
                return tooFn.codeSinger(item);
            }
        },
        computed: {
            ...mapState({
                player: state => state.player,
                playButtonType: state => state.playButtonType,
                originalSongList: state => state.originalSongList,
                songListArr: state => state.songListArr,
                index: state => state.index,
                isShowSongPlayerPage: state => state.isShowSongPlayerPage,
                isLoop: state => state.isLoop,
                playerLoopIcon: state => state.playerLoopIcon
            }),
            timing() {
                return tooFn.codeTime(this.playing);
            },
            currentTime() {
                return tooFn.codeTime(this.durationTime);
            }
        },
        mounted() {
            //{width: tooFn.barWidth(playBarWidth, playing/durationTime) +'px'}
            this.audio = new Audio().getAudio();
            this.listenerIsPlaying = true;
            this.changeShowPlayerBar(false);
            this.playBarWidth = this.$refs.songTotalProgress.clientWidth;
            // 获取歌词盒子的高度
            this.lyricHeight = this.$refs.bg.clientHeight;
        }
    };
</script>


<style scoped lang="scss">
    .row{
        margin: 0;
    }
    .padding-0 {
        padding: 0;
    }
    .player-pages{
        font-size: 40px;
        background: rgba(0, 0, 0, .3);
        span{
            font-size: inherit;
        }
        header {
            .singer {
                width: 300px;
            }
        }
        .bg{
            width: 750px;
            height: 750px;
            padding: 10px;
            margin: 100px 0;
        }
        .lyrics{
            width: 750px;
            height: 750px;
            margin: 100px 0;
            overflow: hidden;
            ul {
                width: 100%;
                height: 100%;
                overflow-y: scroll;
                line-height: 1.9;
            }
            .active{
                color: #f86496;
            }
        }
        .bar {
            .progress{
                height: 15px;
            }
        }
        .operate{
            height: 120px;
            margin: 50px 0;
            line-height: 1.5;
            span{
                font-size: 70px;
            }
            li:nth-child(3) {
                height: 130px;
                span{
                    font-size: 90px;
                }
            }
        }
        .option{
            padding-bottom: 20px;
            span{
                font-size: 70px;
            }
        }
        .lyric {
            width: 50%;
            height: 155px;
            margin: auto;
            font-size: 70px;
            div{
                font-size: inherit;
            }
            .progress{
                height: 10px;
            }
        }
    }
</style>
