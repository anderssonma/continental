$(document).ready(function() {

	$('.site-nav a').smoothScroll();

	var hasFlashSupport = function() {
		if (window.ActiveXObject) {
			try {
				new ActiveXObject(pluginList[p].activex);
				return true;
			} catch(e) {
				return false;
			}
		} else {
			if (!navigator.hasOwnProperty('plugins') || navigator.plugins.length <= 0) {
				return false;
			}
			var bool;
			$.each(navigator.plugins, function() {
				if (this.name.match(/flash/gim)) {
					bool = true;
					return false;
				} else {
					bool = false;
				}
			});
			return bool;
		}
	};

	if (hasFlashSupport()) {
		$('#today .today').addClass('has-flash');
	} else {
		$('#today .today-text').text('Flash saknas!').addClass('warning');
	}

	var desktopInit = function() {

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
		};

		var updateIntros = function() {
			var windowH = $(window).height();
			$(spacers).each(function(i, el) {
				$(el).height(windowH);
			});
		};

		updateIntros();

		if (window.addEventListener) {
			window.addEventListener('resize:end', function(event) {
				windowHeightSplit = $(window).height() / 2;
				updateIntros();
				updatePins();
			}, false);
		} else {
			window.attachEvent('resize:end', function(event) {
				windowHeightSplit = $(window).height() / 2;
				updateIntros();
				updatePins();
			}, false);
		}

		windowHeightSplit = $(window).height() / 2;
		var ctrl = $.superscrollorama();

		window.setTimeout(function() {

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

		}, 500);
	};

	enquire.register("screen and (min-width: 1100px)", {
		deferSetup: true,
		setup: function() {
			desktopInit();
		}
	});

	enquire.register("screen and (max-width: 768px", {
		deferSetup: true,
		setup: function() {
			var mobileNavBtn = $('.mobile-nav-btn');
			var mobileNavMenu =	$('.mobile-nav');

			mobileNavBtn.on('click', function() {
				mobileNavBtn.toggleClass('active');
				mobileNavMenu.toggleClass('active');
			});
			$('.mobile-nav li a').on('click', function() {
				mobileNavBtn.removeClass('active');
				mobileNavMenu.removeClass('active');
			});
		}
	});

	var liveCam = {
		months: ['Januari','Februari','Mars','April','Maj','Juni','Juli','Augusti','September','Oktober','November','December'],
		init: function() {
			$('.today').hover(
				function() {
					$('.timeline').addClass('faded');
					var today = new Date();
					var hours = (today.getHours().toString().length > 1) ? today.getHours() : '0' + today.getHours();
					var minutes = (today.getMinutes().toString().length > 1) ? today.getMinutes() : '0' + today.getMinutes();
					var seconds = (today.getSeconds().toString().length > 1) ? today.getSeconds() : '0' + today.getSeconds();
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