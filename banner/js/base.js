function getStyle(ele, attr) {
    return window.getComputedStyle? getComputedStyle(ele)[attr] : ele.currentStyle(attr);
}
function animate(ele, attr, target, time){
    target = parseFloat(target);
    let val = parseFloat(getStyle(ele, attr));
    let S = target - val;
    let startTime = new Date();
    const unit = attr === 'opacity'? '': 'px';
    (function running(){
        let prop = (new Date() - startTime)/time;
        if ( prop >= 1) {
            prop = 1;
        } else {
            requestAnimationFrame(running);
        }
        ele.style[attr] = val + S*prop*prop + unit;
    })();
};