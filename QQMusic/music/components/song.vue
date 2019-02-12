<template>
    <div class="recommend">
        <h2>{{country.length > 3? '排行榜·地区' : '热歌'}}</h2>
        <ul class="nav">
            <li v-for="(item, index) of country" :key="index"><span @click="changeData(item, index)" :class="{highlight: id === item.id}">{{item.name}}</span></li>
        </ul>
        <div class="add"><router-link :to="{path:'/song/details/all', query:{id}}">播放全部</router-link></div>
        <section class="content">
            <div class="list">
                <ul class="item clear_fix" ref="list">
                    <li ref="li" v-for="(item, index) of song" :key="index">
                        <div v-for="(itm, i) of item" :key="i">
                            <a :href="'/song/details/'+itm.songmid" class="db">
                                <p class="song-img"><img :src="itm.album_min" alt=""></p>
                                <p class="song">
                                    <span class="db name over-text">{{itm.songname}}</span>
                                    <span class="db singer over-text">{{itm.singer[0].name}}</span>
                                </p>
                            </a>
                            <p class="icon">
                                <span class="iconfont icon-hao" @click="addToPlay(itm)"></span>
                                <span class="iconfont icon-bofang" @click="addToPlay(itm, true)"></span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="dir prev" ref="prev" @click="dirPrev">&lt;</div>
            <div class="dir next" ref="next" @click="dirNext">&gt;</div>
            <div class="btn">
                <div class="wrap">
                    <span :class="{active: index === i}" v-for="(item, index) of len" :key="index" @click="btn(index)"></span>
                </div>
            </div>
        </section>
        <player :playerAdd="playerAdd"></player>
    </div>
</template>

<script>
    import animate from '../assets/common/js/move';
    import {region} from '../assets/common/js/common';
    export default {
        name: 'musicCountry',
        // props: ['region'],
        data() {
            return {
                list: {},
                num: 0,
                w: 0,
                i: 0,
                tab: false,
                date: new Date(),
                song: [],
                len: 0,
                country: region,
                id: 3,
                playerAdd: []
            };
        },
        methods: {
            dirNext() {
                if (new Date() - this.date >= 1200) {
                    this.num++;
                    if (this.num === 4) {
                        this.i = 0;
                        this.tab = true;
                    } else {
                        this.i = this.num;
                        this.tab = false;
                    }
                    animate.move(this.list, 'left', -this.w * this.num, 1000, () => {
                        if (this.tab) {
                            this.list.style.left = 0;
                            this.num = 0;
                        }
                    });
                    this.date = new Date();
                }
            },
            dirPrev() {
                if (new Date() - this.date > 1200) {
                    this.num--;
                    if (this.num < 0) {
                        this.list.style.left = -this.w * 4 + 'px';
                        this.i = this.num = 3;
                        this.tab = true;
                    } else {
                        this.i = this.num;
                    }
                    animate.move(this.list, 'left', -this.w * this.num, 1000);
                    this.date = new Date();
                }
            },
            btn(index) {
                if (new Date() - this.date > 2100) {
                    this.i = this.num = index;
                    animate.move(this.list, 'left', -this.w * this.num, 2000);
                    this.date = new Date();
                }
            },
            changeData(item, index) {
                this.id = item.id;
            },
            addToPlay(item, isPlay) {
                /* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
                isPlay = isPlay === undefined ? false : true;
                this.playerAdd.push({
                    album_big: item['album_big'],
                    album_min: item['album_min'],
                    albummid: item['albummid'],
                    singer: item['singer'],
                    songmid: item['songmid'],
                    isPlay
                });
            }
        },
        computed: {
            cloneDom() {
                return 2222;
            }
        },
        created() {
            const that = this;
            this.axios('http://45.32.150.237:3000/top?topidurl=3').then(({ data }) => {
                let song = data.songlist.splice(0, 64);
                let firstContainer = song.splice(0, 16);
                that.song = [firstContainer, song.splice(0, 16), song.splice(0, 16), song.splice(0, 16), firstContainer];
                that.$data.len = that.song.length - 1;
            });
        },
        mounted() {
            this.list = this.$refs.list;
            this.w = Math.floor(this.list.offsetWidth / 6);
        }
    };
</script>

<style scoped lang="scss">
    .recommend {
        position: relative;
        width: 100%;
        margin: auto;
        h2 {
            text-align: center;
        }
        .nav {
            width: 37.5%;
            height: 50px;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-around;
            margin: auto;
            font-size: 20px;
            line-height: 50px;
            li{
                padding: 0 10px;
                cursor: pointer;
                .highlight{
                    color: green;
                    font-weight: bold;
                }
            }
        }
        .add{
            position: absolute;
            top: 10px;
            left: 15.5%;
            width: 100px;
            height: 50px;
            background: #55a532;
            border-radius: 10px;
            font-size: 20px;
            text-align: center;
            line-height: 50px;
            cursor: pointer;
        }
        .content {
            position: relative;
            width: 100%;
            height: 450px;
            background: #F9F9F9;
            overflow: hidden;
            .list {
                position: relative;
                width: 70%;
                height: 606px;
                margin: auto;
                overflow: hidden;
                .item {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 600%;
                    height: 405px;
                    li {
                        float: left;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        width: 16.6666%;
                        box-sizing: border-box;
                        div {
                            position: relative;
                            width: 24.5%;
                            height: 100px;
                            border-bottom: 1px solid red;
                            a {
                                display: flex;
                                align-items: center;
                                width: 100%;
                                height: 100%;
                                .song-img {
                                    width: 86px;
                                    height: 86px;
                                    img{
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                                .song {
                                    width: 230px;
                                    height: 60px;
                                    padding-left: 10px;
                                    .name{
                                        color: #000;
                                        font-size: 20px;
                                    }
                                    .song{
                                        color: #ccc;
                                        font-size: 15px;
                                    }
                                }
                            }
                            .icon{
                                position: absolute;
                                right: 0;
                                bottom: 5px;
                                span{
                                    font-size: 25px;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
            }
            .dir {
                position: absolute;
                top: 50%;
                width: 100px;
                height: 150px;
                background: #EFEEEF;
                margin-top: -75px;
                font-size: 100px;
                font-weight: lighter;
                text-align: center;
                line-height: 150px;
                cursor: pointer;
            }
            .prev{
                left: 0;
                border-top-right-radius: 35px;
                border-bottom-right-radius: 35px;
            }
            .next{
                right: 0;
                border-top-left-radius: 35px;
                border-bottom-left-radius: 35px;
            }
            .btn {
                position: absolute;
                bottom: 20px;
                left: 50%;
                width: 70%;
                height: 10px;
                .wrap{
                    width: 100%;
                    height: 100%;
                    margin: auto;
                    span{
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background: #000;
                        margin-left: 10px;
                        cursor: pointer;
                    }
                    .active{
                        background: #ccc;
                    }
                }

            }
        }
    }
</style>
