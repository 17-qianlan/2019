export default {
    assignmentPlayer(state, data) {
        state.player = data;
    },
    changeShowPlayerBar(state, boolean) {
        state.isShowBar = boolean;
    },
    changePlayButtonType(state, boolean) {
        state.playButtonType = boolean? 'icon-zanting1': 'icon-bofang';
    },
    changeSongListData(state, arr) {
        state.songListArr.push(arr);
    },
    saveQQMusicMsg(state, arr) {
        state.qqMusicMsg = arr;
    },
    saveOriginalSongList(state, arr) {
        state.originalSongList = arr;
    },
    changeShowSongList(state, boolean) {
        state.isShowSongList = boolean;
    },
    changeIndex(state, num) {
        state.index = num;
    },
    changeIsEnded(state, boolean) {
        state.isEnded = boolean;
    },
    changeIsLoop(state, boolean) {
        state.isLoop = boolean;
    },
    changePlayerLoopIcon(state, boolean) {
        state.playerLoopIcon = boolean? 'icon-danquxunhuan': 'icon-xunhuan';
    },
    changeShowSearchPages(state, boolean) {
        state.showSearch = boolean;
    },
    changeVolume(state, num) {
        if (num>1) throw new Error('音量值不可以大于1');
        state.volume = num;
    },
    changeShowMenu(state, boolean) {
        state.showMenu = boolean;
    }
};
