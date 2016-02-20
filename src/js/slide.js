define(function(require, exports, module) {
    var $ = require('zepto');

    function canvasShow() {
        var canvas = document.getElementById("slide-canvas");
        var context = canvas.getContext("2d");
        var width = canvas.width = window.innerWidth;
        var height = canvas.height = window.innerHeight;
        
        var particle = [];

        var particleCount = 0,
            gravity = 0.3,
            colors = [
                '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
                '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
                '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
                '#FF5722', '#795548'
            ];

        for (var i = 0; i < 300; i++) {
            particle.push({
                x: width / 2,
                y: height / 2,
                boxW: randomRange(5, 20),
                boxH: randomRange(5, 20),
                size: randomRange(2, 8),
                spikeran: randomRange(3, 5),
                velX: randomRange(-8, 8),
                velY: randomRange(-50, -10),
                angle: convertToRadians(randomRange(0, 360)),
                color: colors[Math.floor(Math.random() * colors.length)],
                anglespin: randomRange(-0.2, 0.2),
                draw: function() {
                    context.save();
                    context.translate(this.x, this.y);
                    context.rotate(this.angle);
                    context.fillStyle = this.color;
                    context.beginPath();
                    // drawStar(0, 0, 5, this.boxW, this.boxH);
                    context.fillRect(this.boxW / 2 * -1, this.boxH / 2 * -1, this.boxW, this.boxH);
                    context.fill();
                    context.closePath();
                    context.restore();
                    this.angle += this.anglespin;
                    this.velY *= 0.999;
                    this.velY += 0.3;
                    this.x += this.velX;
                    this.y += this.velY;
                    if (this.y < 0) {
                        this.velY *= -0.2;
                        this.velX *= 0.9;
                    };
                    if (this.y > height) {
                        this.anglespin = 0;
                        this.y = height;
                        this.velY *= -0.2;
                        this.velX *= 0.9;
                    };
                    if (this.x > width || this.x < 0) {
                        this.velX *= -0.5;
                    };
                },
            });
        }
        r1 = {
            x: width / 2 - 150,
            y: height / 2 - 150,
            width: 300,
            height: 300,
            velX: 0,
            velY: -10,
            alphatop: 0
        };

        function drawScreen() {
            size = 50;
            pFontName = "Lucida Sans Unicode";
            context.font = size + "pt " + pFontName;
            if (r1.alphatop < 1) {
                r1.alphatop += 0.01;
            } else {
                r1.alphatop = 1;
            }
            context.globalAlpha = r1.alphatop;
            context.textAlign = 'center';
            if (r1.alphatop === 1) {
                r1.velY *= 0.999;
                r1.velY += 0.3;
                r1.x += r1.velX;
                r1.y += r1.velY;
            }
            if (r1.y + r1.height > height) {
                r1.anglespin = 0;
                r1.y = height - r1.height;
                r1.velY *= -0.8;
                r1.velX *= 0.9;
            };
            context.globalAlpha = 1;
            for (var i = 0; i < particle.length; i++) {
                particle[i].draw();
            }
        }

        function update() {
            context.clearRect(0, 0, width, height);
            drawScreen();
            requestAnimationFrame(update);
        }
        update();

        function randomRange(min, max) {
            return min + Math.random() * (max - min);
        }

        function randomInt(min, max) {
            return Math.floor(min + Math.random() * (max - min + 1));
        }

        function convertToRadians(degree) {
            return degree * (Math.PI / 180);
        }

        function drawStar(cx, cy, spikes, outerRadius, innerRadius, color) {
            var rot = Math.PI / 2 * 3;
            var x = cx;
            var y = cy;
            var step = Math.PI / spikes;
            context.strokeSyle = "#000";
            context.beginPath();
            context.moveTo(cx, cy - outerRadius)
            for (i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                context.lineTo(x, y)
                rot += step
                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                context.lineTo(x, y)
                rot += step
            }
            context.lineTo(cx, cy - outerRadius)
            context.closePath();
            context.fillStyle = color;
            context.fill();
        }
    }

    var page = {
        init: function() {
            this.slidePage1();
            this.slidePage2();
            this.slidePage3();
        },
        slidePage1: function() {
            var currentPage = $('.slide-page-1'),
                title = currentPage.find('h1'),
                poem = currentPage.find('.poem'),
                us = currentPage.find('.us'),
                city = currentPage.find('.city');

            currentPage.addClass('page-active;')

            setTimeout(function() {
                title.removeClass('bounceOutDown').addClass("active bounceInDown");
            }, 1000);

            setTimeout(function() {
                city.removeClass('fadeOut').addClass("active fadeIn");
            }, 1000);

            setTimeout(function() {
                us.addClass("active");
            }, 2000);

            setTimeout(function() {
                poem.removeClass('zoomOut').addClass("active zoomIn");
            }, 2500);
        },
        slidePage2: function() {
            var currentPage = $('.slide-page-2'),
                title = currentPage.find('h1'),
                poem = currentPage.find('.poem'),
                us = currentPage.find('.us'),
                city1 = currentPage.find('.city1'),
                city2 = currentPage.find('.city2');

            currentPage.addClass('page-active;')

            setTimeout(function() {
                title.removeClass('zoomOut').addClass("active zoomIn");
            }, 2000);

            setTimeout(function() {
                city1.removeClass('slideOutUp').addClass("active slideInUp");
                city2.removeClass('slideOutDown').addClass("active slideInDown");
            }, 1000);

            setTimeout(function() {
                us.addClass("active");
            }, 3000);

            setTimeout(function() {
                title.find('.railway img').addClass('moving');

                us.find('.yy img').addClass("animated infinite wobble");
                us.find('.tt img').addClass("animated infinite pulse");

                poem.removeClass('zoomOutLeft').addClass("active zoomInLeft");
            }, 5000);
        },
        slidePage3: function() {
            var currentPage = $('.slide-page-3'),
                title = currentPage.find('h1'),
                poem1 = currentPage.find('.poem1'),
                poem2 = currentPage.find('.poem2'),
                us = currentPage.find('.us'),
                xi = currentPage.find('.xi'),
                city = currentPage.find('.city');

            currentPage.addClass('page-active;')

            setTimeout(function() {
                poem1.removeClass('fadeOutRight').addClass("active fadeInRight");
            }, 500);

            setTimeout(function() {
                poem2.removeClass('fadeOutLeft').addClass("active fadeInLeft");
            }, 1500);

            setTimeout(function() {
                city.removeClass('slideOutUp').addClass("active slideInUp");
            }, 2500);

            setTimeout(function() {
                title.removeClass('flipOutX').addClass("active flipInX");
            }, 2500);

            setTimeout(function() {
                us.removeClass('flipOutY').addClass("active flipInY");
            }, 3500);

            setTimeout(function() {
                xi.removeClass('fadeOut').addClass("active fadeIn");
            }, 5000);

            setTimeout(function() {
                canvasShow();
            }, 5000);
        }
    };

    module.exports = page;
});
