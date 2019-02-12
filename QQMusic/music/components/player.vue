<template>
    <div class="player">
        <section :class="{'song-msg': true}">
            <div class="wrap">
                <div class="song-list">
                    <p class="player-list">播放列表</p>
                    <p class="total-song">共: <span> ({{playerAdd.length}}) </span> <span ref="clear">清空全部</span></p>
                    <ul class="song-item">
                        <li v-for="(item, index) of playerAdd" :key="index">
                            <div class="song">
                                <span class="num">{{addZero(index)}}</span>
                                <span class="song-name">{{item.songname}}</span>
                                <span class="singer"> - {{_singer(item)}}</span>
                            </div>
                            <div class="handle">
                                <span class="play iconfont icon-bofang"></span>
                                <span class="del iconfont icon-close2" @click="del(index)"></span></div>
                            <div class="time">
                                <span>04:53</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="lyrics">
                    <div class="img">
                        <p style="width: 200px;height: 200px;border-radius:50%;border: 1px solid darkred"></p>
                    </div>
                    <div class="lyrics-list"></div>
                </div>
            </div>
        </section>
        <section class="song-btn">
            <ul>
                <li class="btn">
                    <span class="iconfont icon-next"></span>
                    <span class="iconfont icon-bofang"></span>
                    <span class="iconfont icon-next1"></span>
                </li>
                <li class="progress clear_fix">
                    <div class="img fl">
                        <p style="width: 40px;height: 40px; border: 1px solid green;cursor: pointer" @click="handleIsShowSongDetails"></p>
                    </div>
                    <div class="player-song fl">
                        <div class="msg">
                            <p class="song_name" ref="sonName">sing me to sleep
                            <p class="time">
                                <span ref="timing">00:00 / </span>
                                <span ref="totalTime">00:00</span>
                            </p>
                        </div>
                        <div class="play"></div>
                    </div>
                </li>
                <li class="option">
                    <ol>
                        <li class="volume" ref="volume"><span class="iconfont icon-shengyinyinliangmianxing"></span></li>
                        <li class="lyric" ref="lyric"  @click="handleIsShowSongDetails"><span class="iconfont icon-ci"></span></li>
                        <li class="download" ref="download"><span class="iconfont icon-xiazai1"></span></li>
                        <li class="cycle" ref="cycle"><span class="iconfont icon-xunhuan"></span></li>
                        <li class="list" ref="list"  @click="handleIsShowSongDetails"><span class="iconfont icon-menu"></span></li>
                        <li class="share" ref="share"><span class="iconfont icon-fenxiang1"></span></li>
                    </ol>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'player',
        props: ['playerAdd'],
        data() {
            return {
                isShowSongDetails: false
            };
        },
        methods: {
            handleIsShowSongDetails() {
                let $songMsg = this.$('.song-msg');
                if (!this.isShowSongDetails) {
                    $songMsg.slideDown();
                } else {
                    $songMsg.slideUp();
                }
                this.isShowSongDetails = !this.isShowSongDetails;
            },
            addZero(i) {
                i += 1;
                i = i > 9 ? i : '0' + i;
                return i;
            },
            del(i) {
                this.playerAdd.splice(i, 1);
            },
            _singer(item) {
                console.log(item);
                return '6666';
            }
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
                            border-top: 1px solid #000;
                            border-bottom: 1px solid #000;
                            line-height: 30px;
                            .song{
                                flex: 2;
                            }
                            .handle{
                                flex: 1;
                                text-align: center;
                                font-size: 25px;
                                span{
                                    margin-left: 10px;
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
            background: rgba(0, 0, 0, .4);
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
                        margin-top: 5px;
                    }
                    .player-song{
                        width: 90%;
                        margin-left: 10px;
                        .msg{
                            display: flex;
                            justify-content: space-between;
                            line-height: 30px;
                        }
                        .play{
                            position: relative;
                            width: 100%;
                            height: 5px;
                            background: green;
                            margin-top: 5px;
                        }
                        .play:after{
                            position: absolute;
                            content: "·";
                            top: -3px;
                            left: 0;
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            background: white;
                            color: red;
                            line-height: 10px;
                            text-align: center;
                            cursor: pointer;
                        }
                    }
                }
                .option{
                    flex: 3;
                    ol{
                        display: flex;
                        list-style: none;
                        justify-content: space-around;
                        li{
                            span{
                                font-size: 25px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
