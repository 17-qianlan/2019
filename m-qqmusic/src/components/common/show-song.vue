<template>
    <section class="showSong">
        <ul :class="[{'d-none': false}, 'row']" v-for="(itm, num) of songArr" :key="num">
            <li v-for="(item, i) of itm" class="col-12-39 position-relative" @click="enterPlayerPages(item, i)" :key="i">
                <div class="img">
                    <img :src="item.album_big" width="100%" height="100%"/>
                </div>
                <div class="msg">
                    <p class="text-truncate song-name" v-text="item.songname"></p>
                    <p class="text-truncate singer" v-text="singer(item)"></p>
                </div>
                <i class="iconfont icon-bofang position-absolute" @click.stop="startPlayer(item, i)"></i>
            </li>
        </ul>
    </section>
</template>

<script>
    import tooFn from '../../assets/js/tooFn';
    import {mapMutations} from 'vuex';
    export default {
        name: 'show-song',
        props: {
            songArr: {
                type: Array,
                required: true
            }
        },
        methods: {
            ...mapMutations([
                'changeSongListData',
                'changeShowPlayerBar',
                'assignmentPlayer',
                'changeIndex',
                'changeShowSearchPages'
            ]),
            singer(item) {
                return tooFn.codeSinger(item);
            },
            enterPlayerPages(data, i) {
                //跳转到播放页面
                this.$router.push(`/player/${data.albummid}`);
                // vuex传到播放页面
                // this.changePlayer(false);
                // 修改player数据
                this.assignmentPlayer(data);
                this.changeIndex(i);// 修改index, 保证下一曲的顺序不乱
                this.changeShowSearchPages(false);
                // 这里需要暂停, 不然可能会出现进入播放页面时还在播放上一曲, 而当前的歌曲不播放的问题
            },
            startPlayer(data, i) {
                // 开始播放, 参数vuex传到底部播放条, 需要阻止冒泡
                this.assignmentPlayer(data);
                this.changeIndex(i);// 修改index, 保证下一曲的顺序不乱
                this.changeShowPlayerBar(true); // 播放显示底部播放条
            }
        }
    };
</script>

<style scoped lang="scss">
    ul{
        padding-top: 20px;
        background: #d6f0f8;
        margin: 0 0 120px 0;
        li{
            margin-bottom: 10px;
            i{
                top: 8px;
                right: 20px;
                color: green;
                font-size: 50px;
            }
            .msg {
                .song-name {
                    font-size: 30px;
                }
                .singer{
                    font-size: 20px;
                }
            }
        }
    }
</style>
