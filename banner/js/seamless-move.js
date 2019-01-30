(function(){
    const oBanner = document.querySelector('#banner');
    const oBanner_list = oBanner.querySelector('.banner-list .banner-img');
    const aImg = oBanner_list.querySelectorAll('li');
    const oDir = oBanner.querySelector(' .banner-list .dir')
    const aP = oDir.querySelectorAll('p');
    const aBtn = oBanner.querySelectorAll('.banner-list .banner-btn .wrap-btn span');
    let index = 0;
    const len = aImg.length - 1;
    let date = new Date();
    let timer = null;
    function banner(fn, isAdd){
        aBtn[index].classList.remove('active');
        fn();
        if (isAdd) {
            animate(oBanner_list, 'left', -index*800, 1000, function(){
                if (len === index){
                    index = 0;
                    oBanner_list.style.left = 0 + 'px';
                }
            });
        } else {
            animate(oBanner_list, 'left', -index*800, 1000);
        }
        aBtn[index === len? 0: index].classList.add('active');
    }
    for (let i=0; i<aP.length; i++) {
        aP[i].onclick = function() {
            if (new Date() - date > 1200){
                if (i === 0) {
                    banner(function(){
                        index = index <= 0? len-1: --index;
                        if (index === len-1) {
                            oBanner_list.style.left = -len*800 + 'px';
                        }
                    })
                } else {
                    banner(function(){
                        index = index >= len? 0: ++index;
                    }, true);
                }
                date = new Date();
            }
        }
    }
    for(let i=0; i<aBtn.length; i++) {
        aBtn[i].onclick = function(){
            if (new Date() - date > 1200){
                banner(function(){
                    index = i;
                })
                date = new Date();
            }
        }

    }
    timer = setInterval(function(){
        banner(function(){
            index = index >= len? 0: ++index;
        }, true);
    }, 2000);
    oBanner.onmouseenter = function(){
        clearInterval(timer);
        animate(oDir, 'opacity', 1, 1000);
    };
    oBanner.onmouseleave = function(){
        animate(oDir, 'opacity', 0, 1000);
        timer = setInterval(function(){
            banner(function(){
                index = index >= len? 0: ++index;
            }, true);
        }, 2000);
    };
})();