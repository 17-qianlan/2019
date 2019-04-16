<template>
    <div class="container-fluid index position-relative">
        <m-header />
        <banner />
        <menu-list />
        <recommend />
        <loading v-if="loading"/>
        <sidebar v-if="showMenu"></sidebar>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex';
    import tooFn from '../assets/js/tooFn';
    import Audio from '../assets/js/Audio';
    export default {
        name: 'index',
        data() {
            return {
                qqMusic: [],
                qqMusicMsg: [],
                songListId: '26',
                loading: true
            };
        },
        watch: {
            qqMusic(val) {
                let {ListName, cur_song_num, update_time} = val;
                let songList = val['songlist'];
                this.saveQQMusicMsg({listName: ListName, cur_song_num: cur_song_num, update_time: update_time});
                this.saveOriginalSongList(tooFn.codeFilter(songList));
                this.changeSongListData(this.originalSongList[0]);
                this.loading = false;
            },
            loading(val) {
                this.loading = val;
            }
        },
        methods: {
            ...mapMutations([
                'saveOriginalSongList',
                'saveQQMusicMsg',
                'changeSongListData'
            ]),
            requestData() {
                if (!(this.audio.paused())) {
                    // this.qqMusicSongList = this.originalSongList;
                    return false;
                }
                tooFn.requestSong(`/top?topidurl=${this.songListId}`).then(data => {
                    this.qqMusic = data.data;
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        computed: {
            ...mapState({
                isShowSongPlayerPage: state => state.isShowSongPlayerPage,
                showSearch: state => state.showSearch,
                originalSongList: state => state.originalSongList,
                showMenu: state => state.showMenu
            })
        },
        mounted() {
            // showSearch  为true取反为false, 显示search-pages页面, 为false取反为true, 显示player-pages页面
            this.audio = new Audio().getAudio();
            if (this.originalSongList.length > 1) {
                this.loading = false;
            } else {
                this.requestData();
            }
        }
    };
</script>

<style scoped lang="scss">
    .index {
        padding: 0;
    }
</style>
