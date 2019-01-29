(function(){
    let aBanner = document.querySelector('.banner-list');
    let oLi = document.querySelectorAll('.banner-list li');
    let oBtn = document.querySelectorAll('.banner-btn span');
    let aDir = document.querySelector('.banner-list .dir');
    let oP = aDir.querySelectorAll('p');
    let index = 0;
    const len = oBtn.length - 1;
    function banner(fn){
        animate(oLi[index], 'opacity', 0, 1000);
        oBtn[index].classList.remove('active');
        fn();
        animate(oLi[index], 'opacity', 1, 1000);
        oBtn[index].classList.add('active');
    }
    for(let i=0; i<oBtn.length; i++){
        oBtn[i].onclick = function(){
            banner(function(){
                index = i;
            });
        }
    }
    let timer = null;
    timer = setInterval(function(){
        banner(function(){
            index = index >= len? 0: ++index;
        })
    }, 2000);
    aBanner.onmouseenter = function(){
        clearInterval(timer);
        animate(aDir, 'opacity', 1, 1000);
    }
    aBanner.onmouseleave = function(){
        animate(aDir, 'opacity', 0, 1000);
        timer = setInterval(function(){
            banner(function(){
                index = index >= len? 0: ++index;
            })
        }, 2000);
    }
    for(let i=0; i<oP.length; i++) {
        oP[i].onclick = function () {
            banner(function () {
                if (i === 0) {
                    index = index <= 0 ? len : --index;
                } else {
                    index = index >= len ? 0 : ++index;
                }
                ;
            });
        }
    }
})();