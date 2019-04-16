import axios from 'axios';
export default {
    requestSong(router) {
        return new Promise((resolve, reject) => {
            axios(router).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    },
    codeSinger(a){
        if (!a) return '';
        const {singer} = a;
        let _singer = '';
        const len = singer.length -1;
        singer.forEach(item => {
            let until = '';
            if (len !== 0) until = '/';
            _singer += item.name + until;
        });
        return _singer;
    },
    codeTime(num) {
        if (!num && !(num*1)) return '00:00';
        let minutes = Math.floor(num / 60);
        let seconds = num - minutes*60;
        return `${this.addZero(minutes)}:${this.addZero(seconds)}`;
    },
    addZero(num) {
        return num > 9? num: '0'+num;
    },
    seekBeforePlay(widthProp, num) {
        return Math.floor(widthProp/num);
    },
    next(boolean, isLoop) {
        this.changePlayButtonType(false);
        this.audio.pause();
        let num = this.index;
        if (!isLoop) {
            if (boolean) {
                num = num >= this.songListArr.length-1? 0: ++num;
            } else {
                num = num < 1? this.songListArr.length-1: --num;
            }
            this.changeIndex(num);
            this.assignmentPlayer(this.songListArr[num]);
        } else {
            this.audio.play();
            this.changePlayButtonType(true);
        }
    },
    codeVolume(w, w1) {
        return w1/w;
    },
    rounding(n) {
        let boo = n < (Math.floor(n) + 0.5);
        return boo? Math.floor(n) : Math.ceil(n);
    },
    codeFilter(arr) {
        let Arr = [];
        let i = 0;
        Arr[i] = [];
        for(const item of arr) {
            if (!(/周杰伦/ig.test(this.codeSinger(item))) && (item.albummid || item.albumname)) {
                Arr[i].push(item);
            }
            if (Arr[i].length === 21) {
                ++i;
                Arr[i] = [];
            }
        }
        return Arr;
    },
    getOffset(ele) {
        let obj = {
            left: 0,
            top: 0
        };
        while(ele != null) {
            obj.left += ele.offsetLeft;
            obj.top += ele.offsetTop;
            ele = ele.offsetParent;
        }
        return obj;
    }
};
