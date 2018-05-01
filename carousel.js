var carousel = {

    nbSlide: 0,
    nbCurrent: 1,
    elemCurrent: null,
    elemDom: null,
    timer: null,

    init : function(elemDom) {
        this.nbSlide = elemDom.find(".slide").length;

        elemDom.append('<div class="navigation"></div>');
        elemDom.append('<div><img id="left" src="img/left.svg" alt="left arrow"></div>');
        let halfHeightL =  elemDom.find('#left').height()/2;
        elemDom.find('#left').css({'top': ((elemDom.height()/2) - halfHeightL)});
        elemDom.append('<div><img id="right" src="img/right.svg" alt="right arrow"></div>');
        let halfHeightR =  elemDom.find('#right').height()/2;
        elemDom.find('#right').css({'top': ((elemDom.height()/2) - halfHeightR)});
        for (let i=1; i<=this.nbSlide; i++) {
            elemDom.find('.navigation').append('<span>'+i+'</span>');
        }
        elemDom.find('.navigation span').click(function(){
            carousel.goToSlide($(this).text());
        })

        this.elemDom = elemDom;
        elemDom.find('.slide').hide();
        elemDom.find('.slide:first').show();
        this.elemCurrent = elemDom.find('.slide:first');
        this.elemDom.find('.navigation span:first').addClass('active');
        this.elemDom.find('.title').text(this.elemDom.find('#slide1 img').attr('alt'));

        carousel.play();

        elemDom.mouseover(carousel.stop);
        elemDom.mouseout(carousel.play);
        elemDom.find('#left').click(function() {
          carousel.previous();
          console.log(this.nbCurrent);
        });
        elemDom.find('#right').click(function() {
          carousel.next();
          console.log(this.nbCurrent);
        });
    },

    goToSlide : function(num) {
      num = parseInt(num);
      if(num === this.nbCurrent) {return false;}
      /* Animation en fadeIn / fadeout
        this.elemCurrent.fadeOut();
        this.elemDom.find('#slide'+num).fadeIn();
        */
        /* Animation en slide */

        let direction = 1;
        if(num<this.nbCurrent) {direction = -1};
        let cssBegin = {'left': direction*this.elemDom.width()};
        let cssEnd = {'left':  -direction*this.elemDom.width()};
        this.elemDom.find('#slide'+num).show().css(cssBegin);

        this.elemDom.find('#slide'+num).animate({'top':0,'left':0},500);
        this.elemCurrent.animate(cssEnd,500);

        this.nbCurrent = num;
        this.elemDom.find('.navigation span').removeClass('active');
        this.elemDom.find('.navigation span:eq('+(num-1)+')').addClass('active');
        this.elemCurrent = this.elemDom.find('#slide'+num);
        this.elemDom.find('.title').text(this.elemDom.find('#slide'+num+' img').attr('alt'));
    },

    next: function() {
        let num = this.nbCurrent +1;
        if (num > this.nbSlide) {
          num = 1;
        }
        carousel.goToSlide(num);
    },

    previous: function() {
        let num = this.nbCurrent -1;
        if (num < 1) {
          num = this.nbSlide;
        }
        carousel.goToSlide(num);
    },

    stop: function() {
      window.clearInterval(carousel.timer);
    },

    play: function() {
      window.clearInterval(carousel.timer);
      carousel.timer = window.setInterval('carousel.next()',3000);
    }
}

$(function() {
    carousel.init($('#carousel'));
});
