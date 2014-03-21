var Pano = {
	isHidden: false,
	textTimer: null
};


$(document).ready(function (){

	embedpano({swf:"assets/js/vendor/pano_sphere.swf", xml:"assets/js/vendor/pano_sphere.xml", target:"pano", html5:"prefer", passQueryParameters:true, wmode:"opaque", mwheel: false});
	var krpano = document.getElementById("krpanoSWFObject");

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
		$('body').removeClass('form-active');
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

$('#pano').on('mousedown', function() {
	$('#pano').addClass('moving');
});

	var introHide = function() {
		if (Pano.support.csstra) { // IF BETTER IE9 AND BELOW
			$('body').addClass('panning hide');
		} else {
			$('body').addClass('panning');
			window.setTimeout(function() {
			$('#intro').animate({opacity: 0}, 250);
			window.setTimeout(function() {
				$('#expand').animate({top: 0}, 250);
			}, 350);
			}, 0);
		}
		Pano.isHidden = true;
	};

	var introShow = function() {
		if (Pano.support.csstra) {
			$('body').removeClass('panning hide');
		} else {
			$('body').removeClass('panning');
			window.setTimeout(function() {
				$('#expand').animate({top: '-50px'}, 250);
				window.setTimeout(function() {
					$('#intro').animate({opacity: 1}, 250);
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

		$('#pano').on('mouseup keyup', function() {
			$('#pano').removeClass('moving');
			if (Pano.isHidden) {
				window.clearTimeout(Pano.textTimer); // CLEAR PREVIOUS TIMEOUT IF IT'S STILL IN PROGRESS
				Pano.textTimer = window.setTimeout(function() {
					introShow();
				}, 4000);
			}
		});

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

});