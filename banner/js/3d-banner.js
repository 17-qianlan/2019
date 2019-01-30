(function(){
    const aThreeBanner = document.querySelector('#three-banner');
    const oImg = aThreeBanner.querySelector('.banner ul');
    const oBtn = aThreeBanner.querySelectorAll('.banner .btn span');
    let index = 0;
    let timer = null;
    let date = new Date();
    const len = oBtn.length;
    let deg = 0;
    for (let i=0; i<len; i++) {
        oBtn[i].onclick = function(){
            if (new Date() - date > 1200){
                banner(function () {
                    index = deg = i;
                })
                date = new Date();
            }
        }
    }
    function banner(fn){
        oBtn[index].classList.toggle('active');
        fn();
        oBtn[index].classList.toggle('active');
        oImg.style.transform = 'rotateX('+ deg*-90+'deg)';
    }
    timer = setInterval(function(){
        banner(function () {
            deg++;
            console.log(deg);
            index = index >= len -1? 0: ++index;
        })
    }, 2000);
    aThreeBanner.onmouseenter = function(){
        clearInterval(timer);
    };
    aThreeBanner.onmouseleave = function(){
        timer = setInterval(function(){
            banner(function () {
                deg++;
                index = index >= len -1? 0: ++index;
            })
        }, 2000);
    }
})();