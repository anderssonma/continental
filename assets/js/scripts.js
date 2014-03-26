var getOffset = function(el) {
	var _x = 0;
	var _y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
	}
	return { top: _y, left: _x };
};


$(document).ready(function() {

	var windowHeightSplit = $(window).height() / 2;
	console.log(windowHeightSplit);
	var ctrl = $.superscrollorama();

	$('nav a').smoothScroll();

	// var headerEatTop = getOffset( document.getElementById('header-eat')).top - windowHeightSplit;
	// var headerEatTop = $('#header-eat').offset().top - windowHeightSplit;
	// console.log(headerEatTop);

	window.setTimeout(function() {
		var parallaxArr = [];
		$('.parallax').each(function(i, el) {
			var newObj = {
				id: $(el),
				top: $(el).offset().top - windowHeightSplit
			};
			parallaxArr.push(newObj);
			// console.log(newObj);
		});

		parallaxArr.forEach(function(el, i) {
			ctrl.addTween(el.top,
				TweenMax.to(el.id, 1,
					{css: {opacity: 0, 'transform': 'translateY(-100px)'}}
				), 800);
		});

		var firstBox = { 
			el: $('#parallax-test #box-1')
		};
		firstBox.top = firstBox.el.offset().top - (windowHeightSplit + 300);

		var secondBox = { 
			el: $('#parallax-test #box-2')
		};
		secondBox.top = secondBox.el.offset().top - (windowHeightSplit + 300);

		var thirdBox = {
			el: $('#box-move')
		};
		thirdBox.top = thirdBox.el.offset().top - (windowHeightSplit + 300);
		/*
		var firstImg = {
			el: $('#img-scroll-1')
		}
		firstImg.top = firstImg.el.offset().top;

		var secondImg = {
			el: $('#img-scroll-2')
		}
		secondImg.top = secondImg.el.offset().top - (windowHeightSplit); 
		*/

		ctrl.addTween(firstBox.top,
			TweenMax.to(firstBox.el, 1,
				{css: {'transform': 'translateY(-300px)', 'opacity': 0.95, 'backgroundColor': '#1184C2'}}
			), 200);

		ctrl.addTween(secondBox.top,
			TweenMax.to(secondBox.el, 1,
				{css: {'transform': 'translateY(-300px)', 'opacity': 0.95, 'backgroundColor': '#1184C2'}}
			), 200);

		ctrl.addTween(thirdBox.top,
			TweenMax.to(thirdBox.el, 1,
				{css: {'transform': 'translateY(-300px)', 'opacity': 0.95, 'backgroundColor': '#1184C2'}}
			), 200);

		/*
		ctrl.addTween(firstImg.top,
			TweenMax.to(firstImg.el, 1,
				{css: {'transform': 'translateX(-0px) scale(1.1)'}}
			), 600)
		ctrl.addTween(secondImg.top,
			TweenMax.to(secondImg.el, 1,
				{css: {'transform': 'translateX(-20px) scale(1.1)'}}
			), 600)
		*/

	},500);



	var overlayActive = false;
	$('#focusable').on('click', function() {
		if (overlayActive) {
			$('body').css({overflow: 'auto'});
			$('#focusable').removeClass('focus');
			overlayActive = false;
		} else {
			$('body').css({overflow: 'hidden'});
			$('#focusable').addClass('focus');
			overlayActive = true;
		}
	});

	var liveCam = {
		months: [
			'Januari',
			'Februari',
			'Mars',
			'April',
			'Maj',
			'Juni',
			'Juli',
			'Augusti',
			'September',
			'Oktober',
			'November',
			'December'
		],
		init: function() {
			$('.today').hover(
				function() {
					$('.timeline').addClass('faded');
					var today = new Date();
					var hours = (today.getHours().toString().length > 1) ? today.getHours() : '0' + today.getHours();
					var minutes = (today.getMinutes().toString().length > 1) ? today.getMinutes() : '0' + today.getMinutes();
					var seconds = (today.getSeconds().toString().length > 1) ? today.getSeconds() : '0' + today.getSeconds();
					//var todaysDate = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
					$('.today-time').text(hours + ':' + minutes + ':' + seconds);
				}, function() {
					$('.timeline').removeClass('faded');
				}
			);
		}
	};
	liveCam.init();

	/*
	window.setTimeout(function() {
		var svgFromTop = $('#svg-anim').offset().top;
		var svgIsAnimated = false;
		$(window).scroll(function() {
			if (!svgIsAnimated && $(window).scrollTop() + windowHeightSplit > svgFromTop && $(window).scrollTop() < svgFromTop) {
				console.log('trigger');
				window.setTimeout(function() {
					setupSVGAnimation();
				}, 0);
				svgIsAnimated = true;
			}
		});
	}, 250);
	*/
	
	var drawFPS = 60;
	var distancePerPoint = 10;
	function AnimatedSVG(el, speed) {
		this.length = 0;
		this.el = el;
		this.distancePerPoint = speed;
		this.timer = null;
		this.pathLength = el.getTotalLength();
		this.strokeIsInvisible = true;

		this.startDrawingPath = function() {
			console.log(this.el);
			
			var self = this;
			this.timer = window.setInterval(function() {
				self.length += self.distancePerPoint;
				self.el.style.strokeDasharray = [self.length, self.pathLength].join(' ');
				if (self.strokeIsInvisible) {
					self.el.style.stroke = '#2C9BD0';
					self:strokeIsInvisible = false;
				}
				if (self.length >= self.pathLength) {
					clearInterval(self.timer);
				} 
			}, (1000 / drawFPS));
		};

		this.stopDrawingPath = function() {
			clearInterval(this.timer);
			this.el.style.stroke = '';
		};
	};

	// T.O.D.O
	// ===================
	// WRAP IN JQUERY EACH
	// ITERATE OVER EACH .SVG-ANIM
	// GET DATA ATTRIBUTES & ID'S
	// CONVERT LINE'S/PATH'S/CIRCLE'S

	var setupSVGAnimation = function() {
		var circle1 = {};
		circle1.el = document.getElementById('anim-circle');
		circle1.speed = parseInt(circle1.el.dataset.speed, 10);

		var path1 = {};
		path1.el = document.getElementById('path-1');
		path1.speed = parseInt(path1.el.dataset.speed, 10);

		var path2 = {};
		path2.el = document.getElementById('path-2');
		path2.speed = parseInt(path2.el.dataset.speed, 10);

		var animArray = [circle1, path1, path2];
		var arrayLength = animArray.length;
		for (var i = 0; i < arrayLength; i++) {
			var newAnim = new AnimatedSVG(animArray[i].el, animArray[i].speed);
			newAnim.startDrawingPath();
		}
	};

	/*
	var anim1 = new AnimatedSVG(circle1.el, circle1.speed);
	var anim2 = new AnimatedSVG(document.getElementById('path-1'), $('#path-1').data('speed'));
	var anim3 = new AnimatedSVG(document.getElementById('path-2'), $('#path-2').data('speed'));
	anim1.startDrawingPath();
	window.setTimeout(function() {
		anim2.startDrawingPath();
		anim3.startDrawingPath();
	}, 250);
	*/
	

	// $('body').scrollspy({ target: '.site-nav' });
	/*
	var parallaxArr = [];
	var $window = $(window);
	var count = 0.1;
	var opacityC = 1;
	var lastTop = 0;

	var getParallaxItems = function() {
		$('.parallax').each(function(i, e) {
			var temp = $(e).offset();
			var item = {
				el: $(e),
				top: Math.floor(temp.top)
			}
			item.limit = item.top + 300;
			parallaxArr.push(item);
		});
	};
	
	var setupScroll = function() {
		$window.on('scroll', function() {
			var top = Math.round($window.scrollTop());
			parallaxArr.forEach(function(elem) {
				//console.log('T: ' + top + ' E: ' + el);
				//console.log('TOP: ' + top + ' E: ' + elem.top + ' L: ' + elem.limit);
				if (top > lastTop) {

					if ((elem.top >= top) && (top <= elem.limit)) {
						if (count === 0.1) {
							console.log('START');
						}
						var newTop = 50 + count;
						var opaque = (100 - opacityC) / 100;
						console.log(opaque);
						elem.el.css({top: newTop + '%', opacity: opaque});
						count = count + 0.1;
						if (opacityC < 100) {
							opacityC = opacityC + 1;
						}
					}

				}
			});
			lastTop = top;
		});
	};

	getParallaxItems();
	setupScroll();
	*/
});