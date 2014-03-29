$(document).ready(function() {

	var windowHeightSplit,
			spacers = $('.intro-bg .spacer'),
			scrollArr = [];

	var updatePins = function() {
		if (scrollArr.length > 0) {
			for (i = 0; i < scrollArr.length; i++) {
				ctrl.removeTween(scrollArr[i].top, false);
				// REMOVE TWEEN THEN ADD IT AGAIN
				scrollArr[i].top = $(scrollArr[i].topEl).offset().top - windowHeightSplit;
				ctrl.addTween(scrollArr[i].top,
					TweenMax.to(scrollArr[i].el, 1,
						{css: {'opacity': 0.1}}
					), (windowHeightSplit / 2));
			}
			$(window).trigger('scroll'); // TRIGGER SCROLL ONCE TO NORMALIZE
		}
	}

	var updateIntros = function() {
		var windowH = $(window).height();
		$(spacers).each(function(i, el) {
			$(el).height(windowH);
		});
	};

	updateIntros();

	window.addEventListener('resize:end', function(event) {
		windowHeightSplit = $(window).height() / 2;
  	updateIntros();
  	updatePins();
	}, false);

	windowHeightSplit = $(window).height() / 2;
	var ctrl = $.superscrollorama();
	$('nav a').smoothScroll();

	window.setTimeout(function() {

		/* SAVE FOR V.1
		outL = { // OUTLINE LIVE
			el: $('#outline-live')
		};
		outL.top = outL.el.offset().top - (windowHeightSplit + 500);

		outT = { // OUTLINE LIVE
			el: $('#outline-travel')
		};
		outT.top = outT.el.offset().top - (windowHeightSplit + 300);


		ctrl.addTween(outL.top,
			TweenMax.to(outL.el, 1,
				{css: {'transform': 'translateY(-300px)', 'opacity': 1}}
			), 200);

		ctrl.addTween(outT.top,
			TweenMax.to(outT.el, 1,
				{css: {'transform': 'translateY(-300px)', 'opacity': 1}}
			), 200);
		*/

		$('.intro-bg').each(function(i, el) {
			var newItem = {
				topEl: $('#' + $(el).attr('id') + ' h2'),
				el: $('#' + $(el).attr('id') + ' .bg')
			};
			newItem.top = $('#' + $(el).attr('id') + ' h2').offset().top - (windowHeightSplit);
			ctrl.addTween(newItem.top,
				TweenMax.to(newItem.el, 1,
					{css: {'opacity': 0.1}}
				), (windowHeightSplit / 2));

			scrollArr.push(newItem);
		});

		$(window).trigger('scroll');

		/* INTRO VISION
		======== 
		var introVision = {
			el: $('#intro-vision .bg')
		};
		introVision.top = $('#intro-vision h2').offset().top - (windowHeightSplit + 200);

		ctrl.addTween(introVision.top,
			TweenMax.to(introVision.el, 1,
				{css: {'opacity': 0.1}}
			), 500);

		INTRO MEET
		======== 
		var introMeet = {
			el: $('#intro-meet .bg')
		};
		introMeet.top = $('#intro-meet h2').offset().top - (windowHeightSplit + 200);

		ctrl.addTween(introMeet.top,
			TweenMax.to(introMeet.el, 1,
				{css: {'opacity': 0.1}}
			), 500);

		INTRO LIVE
		========
		var introLive = {
			el: $('#intro-live .bg')
		};
		introLive.top = $('#intro-live h2').offset().top - (windowHeightSplit + 200);

		ctrl.addTween(introLive.top,
			TweenMax.to(introLive.el, 1,
				{css: {'opacity': 0.1}}
			), 600);

		INTRO TRAVEL
		========
		var introTravel = {
			el: $('#intro-travel .bg')
		};
		introTravel.top = $('#intro-travel h2').offset().top - (windowHeightSplit + 200);

		ctrl.addTween(introTravel.top,
			TweenMax.to(introTravel.el, 1,
				{css: {'opacity': 0.1}}
			), 600);

		INTRO PROJECT
		========
		var introProject = {
			el: $('#intro-project .bg')
		};
		introProject.top = $('#intro-project h2').offset().top - (windowHeightSplit + 200);

		ctrl.addTween(introProject.top,
			TweenMax.to(introProject.el, 1,
				{css: {'opacity': 0.1}}
			), 600);
		*/

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

	}, 500);


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
					window.setTimeout(function() {
						$('.timeline').removeClass('faded');
					}, 350);
				}
			);
		}
	};
	liveCam.init();

});