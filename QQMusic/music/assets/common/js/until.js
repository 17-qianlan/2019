export default {
    codeTime(time) {
        time = Math.round(time);
        let minute = Math.floor(time/60);
        let second = Math.round(time - (minute*60));
        return this.addZero(minute) + ':' + this.addZero(second);
    },
    addZero(num) {
        num = num > 9? num : '0'+num;
        return num;
    }
}
