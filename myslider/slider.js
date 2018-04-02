/*
* MYSILDER: A Lightweight slide plugin based on JQuery
* Version: 1.0
* Author: sujianming
* github: https://github.com/fate-shake
* */
(function ($) {
    var mySlider = {
        init: function (options) {
            var config = {
                direction: (options && options.dir) || null,
                animate: (options && options.animate) || 'fade',
                speed: (options && options.speed) || 6000
            };
            this.config = config;

            var aIndex = 0,timer;

            var container = $(this);
            container.addClass('mySlider');
            var items = container.find('img');
            var ul = document.createElement('div');
            container.append(ul);
            $(ul).addClass('items');
            $(ul).bind('click',function (e) {
                if(e.target.dataset.target){
                    if(aIndex != e.target.dataset.target){
                        myAnimate(aIndex,e.target.dataset.target)
                    }
                }
            });
            for(var i=0;i<items.length;i++){
                $(ul).append('<li class="item-btn" data-target="'+i+'">'+ i +'</li>');
            }
            var totalBtn = $(ul).find('.item-btn');
            totalBtn.eq(0).addClass('s_active');
            myAnimate(aIndex);

            function interval() {
                timer = setTimeout(function () {
                    myAnimate(aIndex,parseInt(aIndex) + 1);
                },config.speed)
            }

            function myAnimate(activeIndex,nextIndex) {
                clearTimeout(timer);
                if(!nextIndex){
                    $(items[activeIndex]).animate({
                        'z-index': 1,
                        'opacity': 1
                    },'fast');
                    totalBtn.eq(activeIndex).addClass('s_active');
                    interval();
                    return;
                }
                if(config.direction){

                }else{
                    if(nextIndex >= items.length){
                        nextIndex = 0;
                    }
                    totalBtn.removeClass('s_active').eq(nextIndex).addClass('s_active');
                    $(items[activeIndex]).animate({
                        'opacity': 0,
                        'z-index': 0
                    },'fast',function () {
                        this.style.cssText = '';
                    });
                    $(items[nextIndex]).animate({
                        'z-index': 1,
                        'opacity': 1
                    },'fast');
                    aIndex = nextIndex;
                    interval();
                }
            }
        }
    };
    $.fn.mySlider = function (options) {
        return mySlider.init.apply(this,options);
    }
})(jQuery);