export default {
    getStyle(ele, attr) {
        return window.getComputedStyle? getComputedStyle(ele)[attr] : ele.currentStyle(attr);
    },
    move(ele, attr, target, time, callback){
        // 注: parsefloat和parseIn已被移到了Number上了, 行为保持不变
        target = parseFloat(target);
        let val = parseFloat(this.getStyle(ele, attr));
        let S = target - val;
        let startTime = new Date();
        const unit = attr === 'opacity'? '': 'px';
        (function running(){
            let prop = (new Date() - startTime)/time;
            if ( prop >= 1) {
                prop = 1;
                ele.style[attr] = val + S*prop*prop + unit;
                callback && callback();
            } else {
                requestAnimationFrame(running);
                ele.style[attr] = val + S*prop*prop + unit;
            }
        })();
    }
}
