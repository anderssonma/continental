var Pano = {
	isHidden: false,
	textTimer: null
};

$(document).ready(function (){

	var panoReady = function(pano) {
		var krpano = pano;
		console.log(pano);
		window.setTimeout(function() {
			//krpano.set("autorotate.enabled", true);
			

			// ZOOM IN/OUT BTNS
			$('#pano-zoom-in').on('mousedown', function() {
				krpano.set('fov_moveforce',-1);
			}).on('mouseup', function() {
				krpano.set('fov_moveforce',0);
			});
			$('#pano-zoom-out').on('mousedown', function() {
				krpano.set('fov_moveforce',1);
			}).on('mouseup', function() {
				krpano.set('fov_moveforce',0);
			});

			// LEFT/RIGHT BTNS
			$('#pano-left').on('mousedown', function() {
				krpano.set('hlookat_moveforce',-1);
			}).on('mouseup', function() {
				krpano.set('hlookat_moveforce',0);
			});
			$('#pano-right').on('mousedown', function() {
				krpano.set('hlookat_moveforce',1);
			}).on('mouseup', function() {
				krpano.set('hlookat_moveforce',0);
			});

			// UP/DOWN BTNS
			$('#pano-up').on('mousedown', function() {
				krpano.set('vlookat_moveforce',-1);
			}).on('mouseup', function() {
				krpano.set('vlookat_moveforce',0);
			});
			$('#pano-down').on('mousedown', function() {
				krpano.set('vlookat_moveforce',1);
			}).on('mouseup', function() {
				krpano.set('vlookat_moveforce',0);
			});

		}, 100);
	}
	embedpano({swf:"assets/js/vendor/pano_sphere.swf", xml:"assets/js/vendor/pano_sphere.xml", target:"pano", html5:"prefer", passQueryParameters:true, wmode:"opaque", mwheel: false, onready:panoReady});
	

	

	//console.log(krpano.get('view.fov'));
	/*
	window.setTimeout(function() {
		window.scrollTo(0,1);
	}, 0);
	*/


	// GET SUPPORT STATUS
	Pano.support = {};
	Pano.support.touch = Modernizr.touch;
	Pano.support.webgl = Modernizr.webgl;
	Pano.support.csstra = Modernizr.csstransitions;


	$('.modal-overlay').on('click', function() {
		$('#pano-wrap').removeClass('form-active');
	});

	/*
	var activeCache;
	$('.filter').on('click', function() {
		$('body').removeClass();
		$('body').addClass($(this).data('effect'));
		if(typeof activeCache !== 'undefined'){
			activeCache.removeClass('active');
		}
		activeCache = $(this);
		$(this).addClass('active');
	});

	$('#reset-filter').on('click', function() {
		$('body').removeClass();
		if(typeof activeCache !== 'undefined'){
			activeCache.removeClass('active');
		}
	});
*/


	var introHide = function() {
		if (Pano.support.csstra) { // IF BETTER IE9 AND BELOW
			$('#pano-wrap').addClass('panning hide');
		} else {
			$('#pano-wrap').addClass('panning');
			window.setTimeout(function() {
			$('#intro').animate({opacity: 0, marginTop: '-985px'}, 500);
			$('#scroll-down').animate({bottom: '-100px'}, 250);
				window.setTimeout(function() {
					$('#expand').animate({top: 0}, 250);
				}, 350);
			}, 0);
		}
		Pano.isHidden = true;
	};

	var introShow = function() {
		if (Pano.support.csstra) {
			$('#pano-wrap').removeClass('panning hide');
		} else {
			$('#pano-wrap').removeClass('panning');
			window.setTimeout(function() {
				$('#expand').animate({top: '-50px'}, 250);
				window.setTimeout(function() {
					$('#intro').animate({opacity: 1, marginTop: '-185px'}, 250);
					$('#scroll-down').animate({bottom: '20px'}, 250);
				}, 350);
			}, 0);
		}
		Pano.isHidden = false;
	};

	$('#expand').on('click', function() {
		if (Pano.isHidden) {
			window.clearTimeout(Pano.textTimer);
			introShow();
		}
	});

	$('#close-overlay').on('click', function() {
		$('body').removeClass('form-active');
	});

	$('#scroll-down').on('click', function() {
		$('#first-screen').trigger('click');
	});

	$('#trigger-form').on('click', function() {
		if (!Pano.isHidden) {
			introHide();
		}
	});

	/*
	if (!Pano.support.touch) { // NEED SOMETHING BETTER TO DISTINGUISH
		$('#pano').on('keydown', function(e) {
			if (!Pano.isHidden) { // ONLY HIDE ON ARROW KEYS DOWN
				if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
					introHide();
				}
			}
		});
		$('#pano').on('mousedown', function(e) {
			if (!Pano.isHidden) {
				introHide();
			}
		});

	*/
		$('#pano').on('mousedown', function() {
			$('#pano').addClass('moving');
			if (Pano.isHidden) {}
		});

		$('#pano').on('mouseup', function() {
			$('#pano').removeClass('moving');
			if (Pano.isHidden) {}
		});

	/*

	} else {
		$('#pano').on('touchstart', function(e) {
			if (!Pano.isHidden) {
				introHide();
			}
		});
		$('#pano').on('touchend', function() {
			if (Pano.isHidden) {
				window.clearTimeout(Pano.textTimer); // CLEAR PREVIOUS TIMEOUT IF IT'S STILL IN PROGRESS
				Pano.textTimer = window.setTimeout(function() {
					introShow();
				}, 4000);
			}
		});
	}
	*/

});