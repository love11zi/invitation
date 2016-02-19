define(function(require, exports, module){
    var $ = require('zepto');

    var page = {
        init: function(){
            this.slidePage1();
            this.slidePage2();
            this.slidePage3();
        },
        slidePage1: function(){
            var currentPage = $('.slide-page-1'),
                title = currentPage.find('h1'),
                poem = currentPage.find('.poem'),
                us = currentPage.find('.us'),
                city = currentPage.find('.city');

            currentPage.addClass('page-active;')

            setTimeout(function(){
                title.removeClass('bounceOutDown').addClass("active bounceInDown");
            }, 1000);

            setTimeout(function(){
                city.removeClass('fadeOut').addClass("active fadeIn");
            }, 1000);

            setTimeout(function(){
                us.addClass("active");
            }, 2000);

            setTimeout(function(){
                poem.removeClass('zoomOut').addClass("active zoomIn");
            }, 2500);
        },
        slidePage2: function(){
            var currentPage = $('.slide-page-2'),
                title = currentPage.find('h1'),
                poem = currentPage.find('.poem'),
                us = currentPage.find('.us'),
                city1 = currentPage.find('.city1'),
                city2 = currentPage.find('.city2');

            currentPage.addClass('page-active;')

            setTimeout(function(){
                title.removeClass('zoomOut').addClass("active zoomIn");
            }, 1000);

            setTimeout(function(){
                city1.removeClass('slideOutUp').addClass("active slideInUp");
                city2.removeClass('slideOutDown').addClass("active slideInDown");
            }, 2000);

            setTimeout(function(){
                us.addClass("active");
            }, 3000);

            setTimeout(function(){
                poem.removeClass('fadeOutRight').addClass("active fadeInRight");
            }, 5000);
        },
        slidePage3: function(){
            var currentPage = $('.slide-page-3'),
                title = currentPage.find('h1'),
                poem1 = currentPage.find('.poem1'),
                poem2 = currentPage.find('.poem2'),
                us = currentPage.find('.us'),
                city = currentPage.find('.city');
                

            currentPage.addClass('page-active;')

            setTimeout(function(){
                title.removeClass('flipOutY').addClass("active flipInY");
            }, 1000);

            setTimeout(function(){
                city.removeClass('slideOutUp').addClass("active slideInUp");
            }, 1500);

            setTimeout(function(){
                poem1.removeClass('rotateOutDownRight').addClass("active rotateInDownRight");
                poem2.removeClass('rotateOutDownLeft').addClass("active rotateInDownLeft");
            }, 2000);

            setTimeout(function(){
                us.removeClass('zoomOutDown').addClass("active zoomInDown");;
            }, 3000);
        }
    };

    module.exports = page;
});