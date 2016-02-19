define(function(require, exports, module){
    var $ = require('zepto');

    var page = {
        init: function(){
            this.photoShow();
        },
        photoShow: function(){
            var photoPage = $('.photo-page'),
                photos = photoPage.find('img'),
                mask = photoPage.find('.photo-mask');

            photos.on("click", function(){
                var $this = $(this);

                if($this.hasClass('active')){
                    $this.removeClass('active');
                    mask.removeClass('active');
                } else {
                    $this.addClass('active');
                    mask.addClass('active');
                }
            });

            mask.on("click", function(){
                $(this).removeClass('active');
                photos.removeClass('active');
            });
        }
    };

    module.exports = page;
});