var Pano = {
	isHidden: false
};

$(document).ready(function (){

	var panoReady = function(pano) {
		var krpano = pano;

		window.setTimeout(function() {
			// SETUP ALL BINDINGS
			// GIVE KRPANO A COUPLE OF MS TO FINISH

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

		}, 250);
	}

	embedpano({swf:"assets/js/vendor/pano_sphere.swf", xml:"assets/js/vendor/pano_sphere.xml", target:"pano", html5:"prefer", passQueryParameters:true, wmode:"opaque", mwheel: false, onready:panoReady});
	
	// GET SUPPORT STATUS
	Pano.support = {};
	Pano.support.touch = Modernizr.touch;
	Pano.support.webgl = Modernizr.webgl;
	Pano.support.csstra = Modernizr.csstransitions;

	// CACHE SELECTORS
	var pano = $('#pano');
	var panoWrap = $('#pano-wrap');

	var introBox = $('#intro')

	var btnIntroShow = $('#btn-show-intro');
	var btnIntroHide = $('#btn-hide-intro');
	var btnScrollDown = $('#btn-scroll-down');

	var introHide = function() {
		if (Pano.support.csstra) { // IF BETTER IE9 AND BELOW
			$(panoWrap).addClass('panning hide');
		} else {
			$(panoWrap).addClass('panning');
			window.setTimeout(function() {
			$(introBox).animate({opacity: 0, marginTop: '-985px'}, 500);
			$(btnScrollDown).animate({bottom: '-100px'}, 250);
				window.setTimeout(function() {
					$(btnIntroShow).animate({top: 0}, 250);
				}, 350);
			}, 0);
		}
		Pano.isHidden = true;
	};

	var introShow = function() {
		if (Pano.support.csstra) {
			$(panoWrap).removeClass('panning hide');
		} else {
			$(panoWrap).removeClass('panning');
			window.setTimeout(function() {
				$(btnIntroShow).animate({top: '-50px'}, 250);
				window.setTimeout(function() {
					$(introBox).animate({opacity: 1, marginTop: '-185px'}, 250);
					$(btnScrollDown).animate({bottom: '20px'}, 250);
				}, 350);
			}, 0);
		}
		Pano.isHidden = false;
	};

	// SHOW & HIDE INTRO
	$(btnIntroShow).on('click', function() {
		if (Pano.isHidden) {
			introShow();
		}
	});
	$(btnIntroHide).on('click', function() {
		if (!Pano.isHidden) {
			introHide();
		}
	});
	// SCROLL TO FIRST SECTION
	$(btnScrollDown).on('click', function() {
		$('#first-screen').trigger('click');
	});

	// ADD DIFFERENT CURSORS DEPENDING ON INTERACTIION
	$(pano).on('mousedown', function() {
		$(pano).addClass('moving');
	}).on('mouseup', function() {
		$(pano).removeClass('moving');
	});

	// if (!Pano.support.touch) {} FOR MOBILE/DESKTOP FUNCTIONALITY

});