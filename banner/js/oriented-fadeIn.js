(function(){
    function Banner(banner, oImg, btn, dir, dirBtn){
        this.aBanner = banner;
        this.oImg = oImg;
        this.oBtn = btn;
        this.oDir = dir;
        this.oP = dirBtn;
        this.index = 0;
        this.len = this.oBtn.length - 1;
        this.timer = null;
    };
    Banner.prototype.autoAdd = function(type = 'timer', i){
        animate(this.oImg[this.index], 'opacity', 0, 1000);
        this.oBtn[this.index].classList.remove('active');
        if (type === 'timer') {
            this.index = this.index >= this.len? 0: ++this.index;
        } else if (type === 'click') {
            this.index = i;
        } else if (type === 'less'){
            this.index = this.index <= 0? this.len: --this.index;
        };
        animate(this.oImg[this.index], 'opacity', 1, 1000);
        this.oBtn[this.index].classList.add('active');
    };
    Banner.prototype.dirOnclick = function(){
        let that = this;
        for (let i=0; i<this.oP.length; i++) {
            this.oP[i].onclick = function() {
                if (i === 0) {
                    that.autoAdd('less');
                } else {
                    that.autoAdd();
                };
            }
        };
        return this;
    };
    Banner.prototype.btnOnclick = function() {
        let that = this;
        for (let i=0; i< this.len+1; i++) {
            this.oBtn[i].onclick = function(){
                that.autoAdd('click', i);
            };
        };
        return this;
    };
    Banner.prototype.auto = function(){
        let that = this;
        this.timer = setInterval(function(){
            that.autoAdd.call(that);
        }, 1500);
        return this;
    };
    Banner.prototype.hover = function(){
        let that = this;
        this.aBanner.onmouseenter = function(){
            clearInterval(that.timer);
            animate(that.oDir, 'opacity', 1, 1000);
        };
        this.aBanner.onmouseleave = function(){
            that.auto.call(that);
            animate(that.oDir, 'opacity', 0, 1000);
        }
        return this;
    };
    let aBanner = document.querySelector('.banner-list');
    let oLi = document.querySelectorAll('.banner-list li');
    let oBtn = document.querySelectorAll('.banner-btn span');
    let aDir = document.querySelector('.banner-list .dir');
    let oP = aDir.querySelectorAll('p');
    // 调用
    const banner = new Banner(aBanner, oLi, oBtn, aDir, oP);
    // 自动轮播
    // banner.auto();
    // hover事件;
    // banner.hover();
    // 按钮乱序点击
    // banner.btnOnclick();
    // 上下点击
    // banner.dirOnclick();
    banner.auto().hover().btnOnclick().dirOnclick();
    /*
    * @param
    *   banner  大盒子, 包裹整个轮播图的盒子, object类型, 非数组
    *   oImg 图片, 包裹图片的盒子, object类型, 数组/类数组 长度必须和btn长度相等
    *   btn  乱序点击, object类型, 数组/类数组 长度必须和oImg长度相等
    *   dir  包裹上下点击的盒子, object类型, 非数组
    *   dirBtn  上下点击的按钮, object类型, 数组/非数组, length = 2(必须)
    * @return
    *   当前实例
    * 方法:
    *   auto: 自动轮播
    *   hover: 移入移出事件, 移入停止动画, 移出继续动画
    *   btnOnclick: 按钮乱序点击
    *   dirOnclick: 上下点击
    * 执行顺序:
    *   auto => hover => ( btnOnclick/dirOnclick );
    * 备注:
    *   可以链式调用
    * */
})();