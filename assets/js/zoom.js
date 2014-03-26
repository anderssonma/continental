$(document).ready(function() {

	var prefix = Modernizr.prefixed('transform');
	prefix = prefix.replace(/([A-Z])/g, function(prefix,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
	console.log(prefix);
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
						
			        $(this).css(prefix, 'scale(' + integer + ') translateX(' + nextMod + 'px) translateY(' +  (now * 0.9) + 'px)');
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
			        $(this).css(prefix, 'scale(' + integer + ') translateX(' + nextMod + 'px) translateY(' +  (now * 0.9) + 'px)');
			    },
			    duration: 350
			});
			
		}
	});




});

