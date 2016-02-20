define(function(require, exports, module){
    var $ = require('zepto');
    var Hammer = require("hammer");

    var page = {
        init: function(){
            this.loading();
        },
        loading: function(){
            var loadingPage = $('.loading-page'),
                loadingGif = loadingPage.find('img'),
                loadingStatusCtn = loadingPage.find('.loading-status'),
                percent = 0;

            function showEntry(){
                percent = 100;
                loadingStatusCtn.text(percent + '%');
                loadingStatusCtn.addClass('fadeOut');

                setTimeout(function(){
                    loadingStatusCtn.text('故事即将开始');
                    loadingStatusCtn.removeClass('fadeOut').addClass('fadeIn page-entry');
                }, 1000);
                
                setTimeout(function(){
                    loadingPage.addClass('fadeOut');
                }, 2000);
            }

            var count = function(){
                if (percent < 100) {
                    percent ++;
                    loadingStatusCtn.text(percent + '%');
                    setTimeout(count, 100);
                }
            };

            count();

            if (window.isPageLoaded){
                showEntry();
            }

            $(window).on("load", showEntry);

            // var hammertime = new Hammer.Manager(loadingPage.get(0));

            // hammertime.add(new Hammer.Swipe());
            // hammertime.on("swipeup", function(){
            //     alert("swipeup")
            // });
        }
    };

    module.exports = page;
});