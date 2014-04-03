$(document).ready(function() {

	var activityIndicatorOn = function() {
		$('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
	};
	
	var activityIndicatorOff = function() {
		$('#imagelightbox-loading').remove();
	};

	var overlayOn = function() {
		$('<div id="imagelightbox-overlay"></div>').appendTo('body');
	};

	var overlayOff = function() {
		$( '#imagelightbox-overlay' ).remove();
	};

	var closeButtonOn = function(instance) {
		$('<a href="#" id="imagelightbox-close">Close</a>').appendTo('body').on( 'click', function() {$(this).remove(); instance.quitImageLightbox(); return false;});
	};
	
	var closeButtonOff = function() {
		$('#imagelightbox-close').remove();
	};

	var captionOn = function() {
		var description = $('a[href="' + $('#imagelightbox').attr('src') + '"] img').attr('alt');
		if (description.length > 0) {
			$('<div id="imagelightbox-caption">' + description + '</div>').appendTo('body');
		}
	};
	
	var captionOff = function() {
		$('#imagelightbox-caption').remove();
	};

	var navigationOn = function(instance, selector) {
		var images = $(selector);
		if (images.length) {
			var nav = $('<div id="imagelightbox-nav"></div>');
			for(var i = 0; i < images.length; i++)
				nav.append( '<a href="#"></a>');

			nav.appendTo('body');
			nav.on( 'click touchend', function(){ return false; });

			var navItems = nav.find('a');
			navItems.on('click touchend', function() {
				var $this = $( this );
				if (images.eq($this.index()).attr('href') != $('#imagelightbox').attr('src')) {
					instance.switchImageLightbox($this.index());
				}
				navItems.removeClass('active');
				navItems.eq($this.index()).addClass('active');

				return false;
			}).on('touchend', function() { return false; });
		}
	};
			
	var navigationUpdate = function(selector) {
		var items = $('#imagelightbox-nav a');
		items.removeClass('active');
		items.eq($(selector).filter('[href="' + $('#imagelightbox').attr('src') + '"]').index(selector)).addClass('active');
	};
	
	var navigationOff = function() {
		$('#imagelightbox-nav').remove();
	};

	if (window.addEventListener) {
		// DONT RUN ON IE8
		var selectorF = '.images a';
		var instanceF = $(selectorF).imageLightbox({
			onStart:			function() {overlayOn(); closeButtonOn( instanceF ); navigationOn( instanceF, selectorF );},
			onEnd:				function() {overlayOff(); captionOff(); closeButtonOff(); navigationOff(); activityIndicatorOff();},
			onLoadStart:	function() {captionOff(); activityIndicatorOn();},
			onLoadEnd:		function() {captionOn(); navigationUpdate( selectorF ); activityIndicatorOff();}
		});
	}
});


/* MEDIUM STYLE GALLERY - NEEDS WORK!
=====================================

$(document).ready(function() {
	var prefix = Modernizr.prefixed('transform');
	prefix = prefix.replace(/([A-Z])/g, function(prefix,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
	var isWrapped = false;
	$('.gallery img').on('click', function() {
		var direction = $(this).data('align');
		if (isWrapped) {
			//$(this).unwrap('<div class="zoom-img-wrap"></div>');
			isWrapped = false;

			$('.gallery').removeClass('dim');
			$(this).animate({ textIndent: 0 }, {
					step: function(now,fx) {
						var integer = (now / 100).toString();
						integer = integer.substring(integer.indexOf(".") + 1);
						integer = parseFloat('1.' + integer, 10);
						
						if (integer === 1.1) {
							integer = 2;
						}

						var nextMod = (now * 1.25);
						if (direction === 'right') {
							nextMod = -nextMod;
						}
							//$(this).css('-webkit-transform',"translate3d(0px, " + now + "px, 0px)");
						
							$(this).css(prefix, 'scale(' + integer + ') translateX(' + nextMod + 'px) translateY(' +	(now * 0.9) + 'px)');
					},
					duration: 350,
					complete: function() {
						$(this).parent().removeClass('front');
					}
			});
		} else {
			//$(this).wrap('<div class="zoom-img-wrap"></div>');
			isWrapped = true;
			$(this).parent().addClass('front');
			$('.gallery').addClass('dim');
			$(this).animate({ textIndent: 100 }, {
					step: function(now,fx) {
						var integer = (now / 100).toString();
						integer = integer.substring(integer.indexOf(".") + 1);
						integer = parseFloat('1.' + integer, 10);
						console.log(now);
						if (integer === 1.1) {
							integer = 2;
						}

						var nextMod = (now * 1.25);
						if (direction === 'right') {
							nextMod = -nextMod;
						}
							//$(this).css('-webkit-transform',"translate3d(0px, " + now + "px, 0px)");
							$(this).css(prefix, 'scale(' + integer + ') translateX(' + nextMod + 'px) translateY(' +	(now * 0.9) + 'px)');
					},
					duration: 350
			});
			
		}
	});
});
*/