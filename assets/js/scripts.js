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

	window.setTimeout(function() {
		
		outL = { // OUTLINE LIVE
			el: $('#outline-live')
		};
		outL.top = outL.el.offset().top - (windowHeightSplit + 500);

		outT = { // OUTLINE LIVE
			el: $('#outline-travel')
		};
		outT.top = outT.el.offset().top - (windowHeightSplit + 300);
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



		ctrl.addTween(outL.top,
			TweenMax.to(outL.el, 1,
				{css: {'transform': 'translateY(-300px)', 'opacity': 1}}
			), 200);

		ctrl.addTween(outT.top,
			TweenMax.to(outT.el, 1,
				{css: {'transform': 'translateY(-300px)', 'opacity': 1}}
			), 200);



		/* INTRO VISION
		======== */
		var introVision = {
			el: $('#intro-vision .bg')
		};
		introVision.top = $('#intro-vision h2').offset().top - (windowHeightSplit + 200);

		ctrl.addTween(introVision.top,
			TweenMax.to(introVision.el, 1,
				{css: {'opacity': 0.1}}
			), 500);

		/* INTRO MEET
		======== */
		var introMeet = {
			el: $('#intro-meet .bg')
		};
		introMeet.top = $('#intro-meet h2').offset().top - (windowHeightSplit + 200);

		ctrl.addTween(introMeet.top,
			TweenMax.to(introMeet.el, 1,
				{css: {'opacity': 0.1}}
			), 500);

		/* INTRO LIVE
		======== */
		var introLive = {
			el: $('#intro-live .bg')
		};
		introLive.top = $('#intro-live h2').offset().top - (windowHeightSplit + 200);

		ctrl.addTween(introLive.top,
			TweenMax.to(introLive.el, 1,
				{css: {'opacity': 0.1}}
			), 600);

		/* INTRO TRAVEL
		======== */
		var introTravel = {
			el: $('#intro-travel .bg')
		};
		introTravel.top = $('#intro-travel h2').offset().top - (windowHeightSplit + 200);

		ctrl.addTween(introTravel.top,
			TweenMax.to(introTravel.el, 1,
				{css: {'opacity': 0.1}}
			), 600);

		/* INTRO PROJECT
		======== */
		var introProject = {
			el: $('#intro-project .bg')
		};
		introProject.top = $('#intro-project h2').offset().top - (windowHeightSplit + 200);

		ctrl.addTween(introProject.top,
			TweenMax.to(introProject.el, 1,
				{css: {'opacity': 0.1}}
			), 600);

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

		$(window).trigger('scroll');

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

});