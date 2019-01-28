(function(){
    // let oImg = document.querySelectorAll('.banner-list img');
    let oLi = document.querySelectorAll('.banner-list li');
    let oBtn = document.querySelectorAll('.banner-btn span');
    let index = 0;
    for(let i=0; i<oBtn.length; i++){
        oBtn[i].onclick = function(){
            animate(oLi[index], 'opacity', 0, 1000);
            oBtn[index].classList.remove('active');
            index = i;
            animate(oLi[index], 'opacity', 1, 1000);
            oLi[index].classList.add('on');
            oBtn[index].classList.add('active');
        }
    }
})();