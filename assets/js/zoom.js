$(document).ready(function() {

	var isWrapped = false;
	$('.gallery img').on('click', function() {
		if (isWrapped) {
			//$(this).unwrap('<div class="zoom-img-wrap"></div>');
			isWrapped = false;
			
			$(this).animate({ textIndent: 0 }, {
			    step: function(now,fx) {
			    	var integer = (now / 100).toString();
			    	integer = integer.substring(integer.indexOf(".") + 1);
			    	integer = parseFloat('1.' + integer, 10);
			    	
			    	if (integer === 1.1) {
			    		integer = 2;
			    	}
			        //$(this).css('-webkit-transform',"translate3d(0px, " + now + "px, 0px)");
			        $(this).css('-webkit-transform', 'scale(' + integer + ')');
			    },
			    duration: 350
			}, 'ease-out', function() {
			  $(this).parent().removeClass('front');
			});
		} else {
			//$(this).wrap('<div class="zoom-img-wrap"></div>');
			isWrapped = true;
			$(this).parent().addClass('front');
			$(this).animate({ textIndent: 100 }, {
			    step: function(now,fx) {
			    	var integer = (now / 100).toString();
			    	integer = integer.substring(integer.indexOf(".") + 1);
			    	integer = parseFloat('1.' + integer, 10);
			    	
			    	if (integer === 1.1) {
			    		integer = 2;
			    	}
			        //$(this).css('-webkit-transform',"translate3d(0px, " + now + "px, 0px)");
			        $(this).css('-webkit-transform', 'scale(' + integer + ')');
			    },
			    duration: 350
			},'ease-out');
			
		}
	});




});

