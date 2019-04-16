<template>
    <div class="box position-relative">
        <header>
            <back-header :title="this.searchQuery || '搜索歌手'"></back-header>
            <search-input v-if="listOrSearch" :_searchQuery="searchQuery" @change="changeSearch"></search-input>
            <label-list :routerType="params" @change="changeSongListId" v-else></label-list>
        </header>
        <loading v-if="loaded"/>
        <show-song :songArr="searchArr"/>
    </div>
</template>
<script>
    import tooFn from '../../assets/js/tooFn';
    import {mapMutations, mapState} from 'vuex';
    import Event from '../../assets/js/Event';
    export default {
        name: 'menu-child',
        data() {
            return {
                scrollTop: 0,
                windowHeight: 0,
                documentHeight: 0,
                params: this.$route.params.id || '/',
                searchArr: [],
                p: 1,
                searchQuery: this.$route.query.q,
                isRequest: true,
                songListId: '26',
                listOrSearch: false,
                topIndex: 0,
                loaded: true
            };
        },
        watch: {
            scrollTop(val) {
                this.scrollTop = val;
            },
            documentHeight(val) {
                this.documentHeight = val;
            },
            windowHeight(val) {
                this.windowHeight = val;
            },
            songListId(val) {
                this.songListId = val;
                this.requestTop();
            },
            searchArr(val) {
                this.searchArr = val;
                this.loaded = false;
            },
            searchQuery(val) {
                this.searchQuery = val;
                this.searchArr = [];
                this.requestSearch();
            },
            loaded(val) {
                this.loaded = val;
            }
        },
        methods: {
            ...mapMutations([
                'assignmentPlayer',
                'changeIndex',
                'changeShowSearchPages',
                'changeLoading'
            ]),
            requestSearch(p=1) {
                // this.changeShowSearchPages(true);
                tooFn.requestSong(`/query?s=${this.searchQuery}&page=${p}&num=30`).then(({data}) => {
                    this.searchArr.push(data.data);
                    this.loaded = false;
                    this.isRequest = false;
                    // this.isRequest = !(curnum*curpage >= totalnum);
                }).catch(error => {
                    console.log(error);
                });
            },
            requestTop(i=0) {
                if (this.params === 'search') return false;
                if (this.songListId === '26') {
                    this.searchArr.push(this.originalSongList[i]);
                    this.loaded = false;
                    this.isRequest = false;
                    return false;
                }
                tooFn.requestSong(`/top?topidurl=${this.songListId}`).then(({data}) => {
                    this.searchArr = [data.songlist.slice(0, 60)];
                    this.loaded = false;
                    this.isRequest = false;
                }).catch(error => {
                    console.log(error);
                });
            },
            lazyLoad() {
                this.documentHeight = document.body.clientHeight;
                this.scrollTop = document.documentElement.scrollTop;
                this.windowHeight = window.innerHeight;
                if (this.isRequest) return false;
                const num = this.documentHeight - this.scrollTop;
                let boo =  num <= this.windowHeight + 200;
                if (/item\/search/ig.test(this.$route.fullPath) && boo) {
                    this.isRequest = true;
                    this.requestSearch(++this.p);
                } else {
                    this.songListId === '26' && this.requestTop(++this.topIndex);
                }
            },
            changeSongListId(val) {
                this.songListId = val;
            },
            changeSearch(val) {
                console.log(val);
                this.searchQuery = val;
            }
        },
        computed: {
            ...mapState({
                songListArr: state => state.songListArr,
                originalSongList: state => state.originalSongList
            })
        },
        mounted(){
            const _Event = new Event();
            _Event.add(window, 'scroll', this.lazyLoad);
            if (this.params === 'area') {
                this.songListId = '3';
            }
            if (this.params !== 'search') {
                this.requestTop();
            } else {
                this.listOrSearch = true;
                this.searchQuery && this.requestSearch();
            }
        }
    };
</script>

<style scoped lang="scss">
    .box{
        header{
            background: #31c27c;
        }
    }
</style>
