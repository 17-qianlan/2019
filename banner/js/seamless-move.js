(function(){
    const aBanner = document.querySelector('#banner .banner-list .banner-img');
    const aImg = aBanner.querySelectorAll('li');
    const aP = document.querySelectorAll("#banner .banner-list .dir p");
    const aBtn = document.querySelectorAll('#banner .banner-list .banner-btn .wrap-btn span');
    let index = 0;
    const len = aImg.length - 1;
    let date = new Date();
    for (let i=0; i<aP.length; i++) {
        aP[i].onclick = function() {
            if (new Date() - date > 1200){
                if (i === 0) {
                    aBtn[index].classList.remove('active');
                    index = index <= 0? len-1: --index;
                    animate(aBanner, 'left', -index*800, 1000);
                    aBtn[index].classList.add('active');
                } else {
                    aBtn[index].classList.remove('active');
                    index = index >= len? 0: ++index;
                    animate(aBanner, 'left', -index*800, 1000, function(){
                        if (len === index){
                            index = 0;
                            aBanner.style.left = 0 + 'px';
                        }
                    });
                    aBtn[index === len? 0: index].classList.add('active');
                }
                date = new Date();
            }
        }
    }
    for( let i=0; i<aBtn.length; i++) {
        if (new Date() - date > 1200){
            aBtn[i].onclick = function(){
                aBtn[index].classList.toggle('active');
                index = i;
                animate(aBanner, 'left', -index*800, 1000);
                aBtn[index].classList.toggle('active');
            }
            date = new Date();
        }
    }
})();