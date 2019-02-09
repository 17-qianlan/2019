<template>
    <div class="recommend">
        <h2>{{region.length > 3? '排行榜·地区' : '热歌'}}</h2>
        <ul class="nav">
            <li v-for="(item, index) of country" :key="index"><span>{{item.name}}</span></li>
        </ul>
        <section class="content">
            <div class="list">
                <ul class="item clear_fix" ref="list">
                    <li>
                        <div v-for="(item, index) of '0000000000000000'">
                            <a href="" class="db">
                                <p class="song-img"><img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000002O6qLK2aXFfm.jpg" alt=""></p>
                                <p class="song">
                                    <span class="db name over-text">7 rings (Explicit)</span>
                                    <span class="db singer over-text">Westlife</span>
                                </p>
                            </a>
                        </div>
                    </li>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </div>
            <div class="dir clear_fix">
                <p class="prev fl" ref="prev" @click="dirPrev"><</p>
                <p class="next fr" ref="next" @click="dirNext">></p>
            </div>
            <div class="btn">
                <div class="wrap">
                    <span class="active"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import animate from '../assets/common/js/move';
    export default {
        name: 'musicCountry',
        props: ["region"],
        data() {
            return {
                country: this.region,
                list: {},
                num: 0
            }
        },
        methods: {
            dirNext() {
                this.list = this.$refs.list;
                animate.move(this.list, 'left', -1060.44*(++this.num), 1000, () => {
                    console.log(1);
                });
            },
            dirPrev() {

            }
        }
    }
</script>

<style scoped lang="scss">
    .recommend {
        width: 100%;
        margin: auto;
        h2 {
            text-align: center;
        }
        .nav {
            width: 37.5%;
            height: 40px;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-around;
            margin: auto;
            font-size: 20px;
            line-height: 40px;
            li{
                padding: 0 10px;
                cursor: pointer;
            }
        }
        .content {
            position: relative;
            width: 100%;
            height: 450px;
            background: #F9F9F9;
            .list {
                position: relative;
                width: 70%;
                height: 400px;
                margin: auto;
                overflow: hidden;
                .item {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 400%;
                    height: 400px;
                    li {
                        float: left;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        width: 25%;
                        div {
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
                        }
                    }
                }
            }
            .dir {
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                height: 150px;
                margin-top: -75px;
                font-size: 100px;
                font-weight: lighter;
                p {
                    width: 100px;
                    height: 150px;
                    background: #EFEEEF;
                    text-align: center;
                    line-height: 150px;
                    cursor: pointer;
                }
                .prev{
                    border-top-right-radius: 35px;
                    border-bottom-right-radius: 35px;
                }
                .next{
                    border-top-left-radius: 35px;
                    border-bottom-left-radius: 35px;
                }
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
                    }
                    .active{
                        background: #ccc;
                    }
                }

            }
        }
    }
</style>
