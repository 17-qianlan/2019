(function(){
    $(function(){
        let $banner = $('.banner-list');
        let $aLi = $banner.find('.banner-img li');
        let $aBtn = $banner.find('.banner-btn .wrap-btn span');
        let $oDir = $banner.find('.dir');
        let $aP = $oDir.find('p');
        let index = 0;
        let timer = null;
        const $len = $aBtn.length - 1;
        function banner(_eq, fn){
            $aBtn.eq(index).removeClass('active');
            $aLi.eq(index).fadeTo(1000,0);
            fn();
            $aLi.eq(index).fadeTo(1000, 1);
            $aBtn.eq(index).addClass('active');
        };
        $aBtn.click(function(){
            let $current = $(this);
            let _eq = $current.index();
            banner(_eq, function(){
                index = _eq;
            });
        });
        $aP.click(function(){
            let $current = $(this);
            let _eq = $current.index();
            banner(_eq, function(){
                if (_eq === 0){
                    index = index <= 0? $len : --index;
                } else {
                    index = index >= $len? 0 : ++index;
                }
            });
        });
        timer = setInterval(function(){
            banner(0, function(){
                index = index >= $len? 0 : ++index;
            });
        }, 2000);
        $banner.hover(function(){
            clearInterval(timer);
            $oDir.fadeTo(1000, 1);
        }, function(){
            $oDir.fadeTo(1000, 0);
            timer = setInterval(function(){
                banner(0, function(){
                    index = index >= $len? 0 : ++index;
                });
            }, 2000);
        });
    })
})();