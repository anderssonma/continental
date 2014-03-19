var Continental = {};

var isHidden = false;
var textTimer;



$(document).ready(function (){

	embedpano({swf:"assets/js/vendor/pano_sphere.swf", xml:"assets/js/vendor/pano_sphere.xml", target:"pano", html5:"prefer", passQueryParameters:true, wmode:"opaque", mwheel: false});

	var krpano = document.getElementById("krpanoSWFObject");
	console.log(krpano);

	window.setTimeout(function() {
		window.scrollTo(0,1);
	}, 0);
	/*
	$('#more').on('click', function() {
		// $('#more').toggleClass('open');
		// $('h1').fadeOut();
		// $('body').toggleClass('monday');
		$('body').toggleClass('monday');
		$('.modal').toggleClass('active');
	});
	*/

	// ADD PLACEHOLDER & POLYFILL
	$('#p_1063').attr('placeholder', 'Skriv in din e-post');
	window.setTimeout(function() {
		/**
		* NEEDS TO RUN AFTER PLACEHOLDER HAS BEEN ADDED TO THE DOM
		* ========================================================
		* Html5 Placeholder Polyfill - v2.0.9 - 2014-01-21 
		* web: http://blog.ginader.de/dev/jquery/HTML5-placeholder-polyfill/ 
		* issues: https://github.com/ginader/HTML5-placeholder-polyfill/issues 
		* Copyright (c) 2014 Dirk Ginader; Licensed MIT, GPL */
		(function(e){function o(e,o){""===e.val()?e.data("placeholder").removeClass(o.hideClass):e.data("placeholder").addClass(o.hideClass)}function t(e,o){e.data("placeholder").addClass(o.hideClass)}function i(e,o){var t=o.is("textarea"),i=parseFloat(o.css("padding-top")),a=parseFloat(o.css("padding-left")),n=o.offset();i&&(n.top+=i),a&&(n.left+=a),e.css({width:o.innerWidth()-(t?20:4),height:o.innerHeight()-6,lineHeight:o.css("line-height"),whiteSpace:t?"normal":"nowrap",overflow:"hidden"}).offset(n)}function a(e,o){var i=e.val();(function a(){r=requestAnimationFrame(a),e.val()!==i&&(t(e,o),s(),n(e,o))})()}function n(e,t){(function i(){r=requestAnimationFrame(i),o(e,t)})()}function s(){window.cancelAnimationFrame&&cancelAnimationFrame(r)}function l(e){d&&window.console&&window.console.log&&window.console.log(e)}var r,d=!1;e.fn.placeHolder=function(n){l("init placeHolder");var r=this,d=e(this).length;return this.options=e.extend({className:"placeholder",visibleToScreenreaders:!0,visibleToScreenreadersHideClass:"placeholder-hide-except-screenreader",visibleToNoneHideClass:"placeholder-hide",hideOnFocus:!1,removeLabelClass:"visuallyhidden",hiddenOverrideClass:"visuallyhidden-with-placeholder",forceHiddenOverride:!0,forceApply:!1,autoInit:!0},n),this.options.hideClass=this.options.visibleToScreenreaders?this.options.visibleToScreenreadersHideClass:this.options.visibleToNoneHideClass,e(this).each(function(n){function c(){!r.options.hideOnFocus&&window.requestAnimationFrame?a(v,r.options):t(v,r.options)}var h,p,u,f,v=e(this),m=v.attr("placeholder"),w=v.attr("id");return(""===m||void 0===m)&&(m=v[0].attributes.placeholder.value),h=v.closest("label"),v.removeAttr("placeholder"),h.length||w?(h=h.length?h:e('label[for="'+w+'"]').first(),h.length?(f=e(h).find(".placeholder"),f.length?(i(f,v),f.text(m),v):(h.hasClass(r.options.removeLabelClass)&&h.removeClass(r.options.removeLabelClass).addClass(r.options.hiddenOverrideClass),p=e("<span>").addClass(r.options.className).text(m).appendTo(h),u=p.width()>v.width(),u&&p.attr("title",m),i(p,v),v.data("placeholder",p),p.data("input",v),p.click(function(){e(this).data("input").focus()}),v.focusin(c),v.focusout(function(){o(e(this),r.options),r.options.hideOnFocus||s()}),o(v,r.options),e(document).bind("fontresize resize",function(){i(p,v)}),e.event.special.resize?e("textarea").bind("resize",function(o){e(this).is(":visible")&&i(p,v),o.stopPropagation(),o.preventDefault()}):e("textarea").css("resize","none"),n>=d-1&&e.attrHooks!==void 0&&(e.attrHooks.placeholder={get:function(o){return"input"===o.nodeName.toLowerCase()||"textarea"===o.nodeName.toLowerCase()?e(o).data("placeholder")?e(e(o).data("placeholder")).text():e(o)[0].placeholder:void 0},set:function(o,t){return e(e(o).data("placeholder")).text(t)}}),v.is(":focus")&&c(),void 0)):(l("the input element with the placeholder needs a label!"),void 0)):(l("the input element with the placeholder needs an id!"),void 0)})},e(function(){var o=window.placeHolderConfig||{};return o.autoInit===!1?(l("placeholder:abort because autoInit is off"),void 0):("placeholder"in e("<input>")[0]||"placeHolder"in e("<input>")[0])&&!o.forceApply?(l("placeholder:abort because browser has native support"),void 0):(e("input[placeholder], textarea[placeholder]").placeHolder(o),void 0)})})(jQuery);
	}, 0);

	// GET SUPPORT STATUS
	Continental.support = {};
	Continental.support.touch = Modernizr.touch;
	Continental.support.webgl = Modernizr.webgl;
	Continental.support.csstra = Modernizr.csstransitions;

	/*
	var outputSupport = function() {
		var support = Continental.support;
		for(prop in support) {
			console.log(prop + ' ' + support[prop]);
			$('#support').append('<li>' + prop.toUpperCase() + ': <strong style="color: ' + ((support[prop] === true) ? "#60B7E1" : "#E76C67") + '">' + support[prop] + '</strong></li>');
		}
		$('#support').on('click', function() {
			$(this).hide();
		});
	};
	outputSupport();
	*/

	$('.modal-overlay').on('click', function() {
		$('body').removeClass('form-active');
	});

	$('#trigger-form').on('click', function() {
		$('body').addClass('form-active');
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
		if (Continental.support.csstra) { // IF BETTER IE9 AND BELOW
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
		isHidden = true;
	};

	var introShow = function() {
		if (Continental.support.csstra) {
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
		isHidden = false;
	};

	$('#expand').on('click', function() {
		if (isHidden) {
			window.clearTimeout(textTimer);
			introShow();
		}
	});

	$('#close-overlay').on('click', function() {
		$('body').removeClass('form-active');
	});

	if (!Continental.support.touch) { // NEED SOMETHING BETTER TO DISTINGUISH
		
		$('#pano').on('keydown', function(e) {
			if (!isHidden) { // ONLY HIDE ON ARROW KEYS DOWN
				if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
					introHide();
				}
			}
		});
		$('#pano').on('mousedown', function(e) {
			if (!isHidden) {
				introHide();
			}
		});

		$('#pano').on('mouseup keyup', function() {
			$('#pano').removeClass('moving');
			if (isHidden) {
				window.clearTimeout(textTimer); // CLEAR PREVIOUS TIMEOUT IF IT'S STILL IN PROGRESS
				textTimer = window.setTimeout(function() {
					introShow();
				}, 4000);
			}
		});

	} else {
		$('#pano').on('touchstart', function(e) {
			if (!isHidden) {
				introHide();
			}
		});
		$('#pano').on('touchend', function() {
			if (isHidden) {
				window.clearTimeout(textTimer); // CLEAR PREVIOUS TIMEOUT IF IT'S STILL IN PROGRESS
				textTimer = window.setTimeout(function() {
					introShow();
				}, 4000);
			}
		});
	}

});