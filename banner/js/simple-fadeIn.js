(function(){
    let aBanner = document.querySelector('.banner-list');
    let oLi = document.querySelectorAll('.banner-list li');
    let oBtn = document.querySelectorAll('.banner-btn span');
    let aDir = document.querySelector('.banner-list .dir');
    let oP = aDir.querySelectorAll('p');
    let index = 0;
    const len = oBtn.length - 1;
    function autoAdd(type = 'timer', i){
        animate(oLi[index], 'opacity', 0, 1000);
        oBtn[index].classList.remove('active');
        if (type === 'timer') {
            index = index >= len? 0: ++index;
        } else if (type === 'click') {
            index = i;
        } else if (type === 'less'){
            index = index <= 0? len: --index;
        }
        animate(oLi[index], 'opacity', 1, 1000);
        oBtn[index].classList.add('active');
    }
    for(let i=0; i<oBtn.length; i++){
        oBtn[i].onclick = function(){
            autoAdd('click', i);
        }
    }
    let timer = null;
    timer = setInterval(autoAdd, 1500);
    aBanner.onmouseenter = function(){
        console.log(1);
        clearInterval(timer);
        animate(aDir, 'opacity', 1, 1000);
    }
    aBanner.onmouseleave = function(){
        animate(aDir, 'opacity', 0, 1000);
        timer = setInterval(autoAdd, 1500);
    }
    for(let i=0; i<oP.length; i++) {
        oP[i].onclick = function(){
            if (i === 0) {
                autoAdd('less');
            } else {
                autoAdd();
            }
        }
    }
})();