<template>
    <div class="player">
        <section :class="{'song-msg': true}">
            <div class="wrap">
                <div class="song-list">
                    <p class="player-list">播放列表</p>
                    <p class="total-song">共: <span> ({{playerAdd.length}}) </span> <span ref="clear">清空全部</span></p>
                    <ul class="song-item">
                        <li style="border-top: 1px solid #000">
                            <div class="song" style="flex: 3">
                                <span class="num">序号</span>
                                <span class="song-name over-text">歌名</span>
                                <span class="singer over-text" style="text-align: center; width: 75px;">歌手</span>
                            </div>
                            <div class="handle">
                                <span class="db" style="font-size: 18px;font-weight: normal;line-height: 30px;">播放类型</span>
                            </div>
                            <div class="time">
                                <span>时长</span>
                            </div>
                        </li>
                        <li v-for="(item, index) of playerAdd" :key="index">
                            <div class="song">
                                <span class="num">{{addZero(index)}}</span>
                                <span class="song-name over-text">{{item.songname}}</span>
                                <span class="singer over-text">{{_singer(item)}}</span>
                            </div>
                            <div class="handle">
                                <span class="play iconfont icon-bofang"></span>
                                <span class="del iconfont icon-close2" @click="del(index)"></span>
                            </div>
                            <div class="time">
                                <span>04:53</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <!--<div class="lyrics">
                    <div class="img">
                        <p style="width: 200px;height: 200px;border-radius:50%;border: 1px solid darkred"></p>
                    </div>
                    <div class="lyrics-list"></div>
                </div>-->
            </div>
        </section>
        <section class="song-btn">
            <ul>
                <li class="btn">
                    <span class="iconfont icon-next" @click="prev"></span>
                    <span :class="['iconfont', isAlready]" @click="pauseSong"></span>
                    <span class="iconfont icon-next1" @click="next"></span>
                </li>
                <li class="progress clear_fix">
                    <div class="img fl" @click="handleIsShowSongDetails">
                        <img :src="song_details.album_big" alt="" width="100%" height="100%">
                    </div>
                    <div class="player-song fl">
                        <div class="msg">
                            <p class="song_name over-text" ref="songName">{{song_details.songname}}</p>
                            <p class="time">
                                <span ref="timing">{{timing}} / </span>
                                <span ref="totalTime">{{totalTime}}</span>
                            </p>
                        </div>
                        <div class="play" ref="play" @click="changeWidth">
                            <p :style="{width: barWidth+'px'}" @click.stop="changeWidth"></p>
                            <span ref="slider" :style="{left: barWidth + 'px'}" @click.stop="changeWidth">·</span>
                        </div>
                    </div>
                </li>
                <li class="option">
                    <ol>
                        <li class="volume" ref="volume" @click="volume">
                            <span class="iconfont icon-shengyinyinliangmianxing"></span>
                            <p @click="changeVolume"><i @click.stop="volumeHeight" :style="{height: changeHeight + 'px'}"></i></p>
                        </li>
                        <li class="lyric" ref="lyric"  @click="handleIsShowSongDetails">
                            <span class="iconfont icon-ci"></span>
                        </li>
                        <li class="download" ref="download">
                            <a :href="musicUrl" target="_blank"><span class="iconfont icon-xiazai1"></span></a>
                        </li>
                        <li class="cycle" ref="cycle">
                            <span class="iconfont icon-xunhuan"></span>
                        </li>
                        <li class="list" ref="list"  @click="handleIsShowSongDetails">
                            <span class="iconfont icon-menu"></span>
                        </li>
                        <li class="share" ref="share">
                            <span class="iconfont icon-fenxiang1"></span>
                        </li>
                    </ol>
                </li>
            </ul>
            <audio ref="audio" v-on:canplay.passive="musicCanplay" v-on:timeupdate.passive="musicTimeUpdated" v-on:ended.passive="isEnded" v-on:loop.passive="loopMusic"></audio>
        </section>
    </div>
</template>

<script>
    import until from '../assets/common/js/until';
    export default {
        name: 'player',
        props: ['playerAdd'],
        data() {
            return {
                isShowSongDetails: false,// 显示列表
                musicUrl: '',// 歌曲url
                song_details: {},// 歌曲信息
                isAlready: 'icon-bofang',// 是否已经开始播放
                audio: '',// audio标签
                totalTime: '00:00',// 总时间(字符串)
                timing: '00:00',// 当前播放时间(字符串)
                timingNum: 0,// 总时间(number)
                totalTimeNum: 0,// 当前播放时间(number)
                barTotalWidth: 0,// 进度条总长度
                barWidth: 0,// 当前进度条长度
                volumeH: 100,// 音量总长度
                volumeEle: {},// volume的ele标签
                changeHeight: 100,// 当前音量长度(默认100)
                isVolume: true,// 用来关闭和打开音量按钮
                songName: '',// 歌曲名称
                num: 0// 当前播放下标
            };
        },
        watch: {
            playerAdd(val) {
                const data = val[val.length-1];
                this.musicUrl =  data.url[0] || data.url[1];
                if (/vkey/ig.test(this.musicUrl) ) {
                    this.isAlready = 'icon-zanting1';
                }
                this.song_details = data;
                this.num = val.length-1;
            },
            musicUrl() {// 监听音乐地址, 以控制音乐的播放状态
                this.audio.src = this.musicUrl;
                this.audio.play();
                this.changeHeight = 100;

            }
        },
        methods: {
            handleIsShowSongDetails() {
                // 打开列表
                let $songMsg = this.$('.song-msg');
                if (!this.isShowSongDetails) {
                    $songMsg.slideDown();
                } else {
                    $songMsg.slideUp();
                }
                this.isShowSongDetails = !this.isShowSongDetails;
            },
            addZero(i) {
                // 补零, until有一个, 但是不可以直接用到页面
                i += 1;
                i = i > 9 ? i : '0' + i;
                return i;
            },
            del(i) {
                // 删除列表中的一个
                this.playerAdd.splice(i, 1);
                this.audio.src = '';
            },
            _singer(item) {
                // 歌手
                const singer = item.singer[0].name;
                return singer;
            },
            pauseSong() {
                // 图标按钮的改变
                const audio = this.audio;
                if (audio.paused) {
                    audio.play();
                    this.isAlready = 'icon-zanting1';
                } else {
                    this.audio.pause();
                    this.isAlready = 'icon-bofang';
                }
            },
            musicCanplay() {
                // 监听是否已经开始播放
                this.totalTimeNum = this.audio.duration;
                this.totalTime = until.codeTime(this.totalTimeNum);
            },
            musicTimeUpdated(){
                // 监听歌曲是否正在播放, 用以获取当前的currentTime
                this.timingNum =Math.round(this.audio.currentTime)
                this.timing = until.codeTime(this.timingNum);
                let pop = this.timingNum / this.totalTimeNum;
                this.barWidth  = this.barTotalWidth * pop;
            },
            volume(){
                // 音量的打开和关闭
                if (this.isVolume) {
                    this.volumeEle.style.background = '#e32948';
                    this.$(this.volumeEle.children[1]).slideDown();
                } else {
                    this.$(this.volumeEle.children[1]).slideUp(() => {
                        this.volumeEle.style.background = '';
                    });
                }
                this.isVolume = !this.isVolume;
            },
            changeVolume(e) {
                // 改变音量高度和声音大小
                this.changeHeight = (this.volumeH - e.layerY);
                this.audio.volume = this.changeHeight/100;
            },
            volumeHeight(e) {
                // 改变音量高度和声音大小
                this.changeHeight = e.layerY;
                this.audio.volume = this.changeHeight/100;
            },
            changeWidth(e) {
                // 改变进度条和歌曲进度
                this.barWidth = e.layerX;
                let pop = this.barWidth / this.barTotalWidth;
                this.audio.currentTime = this.totalTimeNum * pop;
                console.log(this.barWidth * pop);
            },
            isEnded(){
                // 监听是否已经播放完成, 完成后切歌
                this.isAlready = 'icon-bofang';
                this.next.call(this);
            },
            next() {
                // 下一曲
                const data = this.playerAdd;
                this.num++;
                this.num = this.num > data.length -1? 0: this.num;
                this.song_details = data[this.num];
                this.audio.src = data[this.num].url[0] || data[this.num].url[1];
                this.isAlready = 'icon-zanting1';
                this.audio.play();
            },
            prev() {
                // 上一曲
                const data = this.playerAdd;
                this.num--;
                this.num = this.num < 0? data.length -1: this.num;
                this.song_details = data[this.num];
                this.audio.src = data[this.num].url[0] || data[this.num].url[1];
                this.isAlready = 'icon-zanting1';
                this.audio.play();
            },
            loopMusic(){
                // 是否循环播放, 未开发
            }
        },
        created(){
            this.$nextTick(() => {
                this.audio = this.$refs.audio;
                this.barTotalWidth = this.$refs.play.offsetWidth;
                this.volumeEle = this.$refs.volume;
            })
        }
    };
</script>

<style scoped lang="scss">
    .player{
        width: 100%;
        .song-msg{
            display: none;
            position: fixed;
            bottom: 50px;
            left: 0;
            width: 100%;
            height: 600px;
            .wrap{
                display: flex;
                width: 70%;
                height: 100%;
                border: 1px solid red;
                background: #ccc;
                margin: auto;
                .song-list{
                    flex: 5;
                    border-right: 1px solid green;
                    p{
                        width: 20%;
                        height: 30px;
                        margin: auto;
                        font-size: 20px;
                        line-height: 30px;
                        text-align: center;
                        span{
                            color: green;
                        }
                    }
                    ul{
                        width: 100%;
                        li{
                            display: flex;
                            height: 30px;
                            padding: 0 10px;
                            justify-content: space-between;
                            border-bottom: 1px solid #000;
                            line-height: 30px;
                            .song{
                                display: inherit;
                                width: 550px;
                                .song-name{
                                    width: 350px;
                                    padding: 0 15px;
                                    text-align: center;
                                }
                                .num{
                                    width: 36px;
                                    text-align: center;
                                }
                                .song-singer{
                                    width: 165px;
                                    color: #1b79ff;
                                }
                            }
                            .handle{
                                flex: 1;
                                text-align: center;
                                font-size: 25px;
                                span{
                                    margin-left: 10px;
                                    color: #b93737;
                                    cursor: pointer;
                                }
                            }
                            .time{
                                flex: 1;
                                text-align: right;
                            }
                        }
                    }
                }
            }
            .lyrics{
                flex: 2;
            }
        }
        .active{
            display: block;
        }
        .song-btn{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50px;
            line-height: 50px;
            background: rgb(92, 211, 115);
            ul{
                display: flex;
                justify-content: space-between;
                width: 70%;
                height: 100%;
                margin: auto;
                li{
                    font-size: 25px;
                }
                span{
                    cursor: pointer;
                }
                .btn{
                    flex: 1;
                    text-align: center;
                    span{
                        font-size: 35px;
                    }
                }
                .progress{
                    flex: 4;
                    span{
                        font-size: 20px;
                    }
                    p{
                        font-size: 20px;
                        text-align: left;
                    }
                    .img{
                        width: 40px;
                        height: 40px;
                        margin-top: 5px;
                        cursor: pointer;
                    }
                    .player-song{
                        width: 90%;
                        margin-left: 10px;
                        .msg{
                            display: flex;
                            justify-content: space-between;
                            line-height: 30px;
                            .song_name {
                                width: 60%;
                            }
                        }
                        .play{
                            position: relative;
                            width: 100%;
                            height: 5px;
                            background: green;
                            margin-top: 5px;
                            cursor: pointer;
                            p{
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background: #ccc;
                                cursor: pointer;
                            }
                            span{
                                position: absolute;
                                top: -3px;
                                left: 0;
                                width: 10px;
                                height: 10px;
                                border-radius: 50%;
                                background: white;
                                color: red;
                                line-height: 9px;
                                text-align: center;
                                cursor: pointer;
                            }
                        }
                    }
                }
                .option{
                    flex: 2;
                    ol{
                        display: flex;
                        list-style: none;
                        justify-content: space-around;
                        li{
                            padding: 0 10px;
                            span{
                                font-size: 25px;
                            }
                        }
                        .volume{
                            position: relative;
                            p{
                                display: none;
                                position: absolute;
                                bottom: 37px;
                                left: 0px;
                                width: 100%;
                                height: 100px;
                                background: #ddd;
                                cursor: pointer;
                                border-top-left-radius: 10px;
                                border-top-right-radius: 10px;
                                i{
                                    position: absolute;
                                    bottom: 0;
                                    left: 20px;
                                    width: 5px;
                                    height: 50px;
                                    background: #000;
                                    border-top-left-radius: 5px;
                                    border-top-right-radius: 5px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
