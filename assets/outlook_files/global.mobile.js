/**
 *  Small screen optimization
 *  Glynn Phillips - 09 July 2010
 *
 *  All js needed for small screens and mobiles
 */

var com = com || {};
com.nature = com.nature || {};
var _tag = _tag;
(function ($) {

	var mobileWt = function () {
		/* Figuring out what css is being used and then adding new web trends meta */
		var mobileCss = $("#mobile-css-test").css("display");
		if (mobileCss === "block") {
			$("head").append('<meta name="WT.z_css" content="mobile" />');
		} else {
			$("head").append('<meta name="WT.z_css" content="desktop" />');
		}

		/* Using web trends multi track to monitor the toggle between desktop and mobile */
		var switchView = com.nature.Cookie.get('switchView'),
		argsProp = [],
		argsProp = ["WT.action", "WT.source", "WT.destination", "WT.dl", "1", "WT.ndl", "1", "css_desktop", "css_mobile"];

		if (switchView === 'desktop') {
			$("#toggle").click(function () {
				com.nature.Cookie.set('switchView', '', -1, '/');
				var args = [];
				for (var prop in argsProp) {
					if (argsProp.hasOwnProperty(prop)) {
						args.push(prop);
					}
				}
				args.push("toggle_css_mobile");
				_tag.dcsMultiTrack.apply(_tag, args);
				location.reload();
			});
		} else {
			$("#toggle").click(function () {
				com.nature.Cookie.set('switchView', 'desktop', 1, '/');
				var args = [];
				for (var prop in argsProp) {
					if (argsProp.hasOwnProperty(prop)) {
						args.push(prop);
					}
				}
				args.push("toggle_css_desktop");
				_tag.dcsMultiTrack.apply(_tag, args);
				location.reload();
			});
		}
	};
	var $jsMenu;
	var smallscreenMenu = function () {
		var $m = $('#main-navigation');
		$m.parent().prepend('<div id="js-menu"><a href="javascript:" class="menu-up"><span>Menu<span></a></div>');
		$jsMenu = $('#js-menu');
		$('a', $jsMenu).click(function () {
			var $t = $(this);
			if ($t.hasClass('menu-up')) {
				$m.addClass("menu-active");
				$t.removeClass('menu-up');
			} else {
				$t.addClass('menu-up');
				$m.removeClass("menu-active");
			}
			return false;
		});
	};

	var $breadcrumbs;
	var breadcrumbPos = function () {
		var $breadcrumbs =  $('#breadcrumbs');
		if (($jsMenu && $jsMenu.css("display") === "block") && $('li.sub-1', $breadcrumbs).length > 0) {
			$("h1.primary-heading:first").after($breadcrumbs);
		}
	};

	var createSelect = function () {
		/* This converts tabs into a select element which provides a better UI on mobiles, an example is nclimate archive */
		$(".small-screen ul.tab-bar").each(function () {
			var list = $(this),
				select = $(document.createElement("select")).insertBefore($(this).hide()),
				label = $(document.createElement("label")).insertBefore(select);
			label.text("Archive Type:");
			label.addClass("mobile-filter");
			select.addClass("mobile-filter ");
			$(">li", this).each(function () {
				var option = $(document.createElement("option"))
					.appendTo(select)
					.val($(this).find("a").attr("href"))
					.html($(this).text()),

				selected = $(this).hasClass("active");

				if (selected === true) {
					$(option).attr("selected", "selected");
				}
			});

			select.change(function () {
				window.location = $(this).val();
			});
		});
	};

	// v1 & v2 institution and personal access message - self-hide if too tall
	var accessMsg = function () {
		$('#foreword p.access:not(.compact), #header div.logon p.access:not(.compact)').each(
			function () {
				var height, maxHeight, actualHeight, content, $s, $p = $(this);
				maxHeight = $p.height(); // assumes CSS max-height
				$p.css({'height' : 'auto', 'max-height' : 'none', 'overflow' : 'visible'});
				actualHeight = $p.height();
				if (actualHeight > parseInt(maxHeight, 10)) {
					content = $p.html();
					$p.html('<a href="javascript:" class="no-touch">' + content + '</a>');
					$s = $('span', $p);
					$s.eq(0).html($s.eq(0).text() + '<i>&hellip;</i>');
					$('a', $p).one('touchstart', function (e) {
						$(this).closest('a').removeClass('no-touch'); // prevent :hover CSS rules being applied
					}).on('click', function (e) {
						e.stopPropagation();
						e.preventDefault();
						$(this).closest('a').toggleClass('show');
						return false;
					});
					$p.addClass('compact'); // only act once
				}
				$p.removeAttr('style');
			}
		);
	};
	
	var resizeHandle;
	var resizeHandler = function () {
		breadcrumbPos();
		accessMsg();
	};
	
	var init = $(function () {
		mobileWt();
		smallscreenMenu(); // must precede breadcrumbPos
		createSelect();
		// trigger only on the last resize event
		$(window).resize(resizeHandle, function () {
			window.clearTimeout(this.data);
			this.data = window.setTimeout(resizeHandler, 300);
		}).resize();
	});

	/*! A fix for the iOS orientationchange zoom bug.
	Script by @scottjehl, rebound by @wilto.
	MIT License.
	*/

	(function (w) {
		// This fix addresses an iOS bug, so return early if the UA claims it's something else.
		var ua = navigator.userAgent;
		if (!(/iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(ua) && ua.indexOf("AppleWebKit") > -1)) {
			return;
		}
		var doc = w.document;
		if (!doc.querySelector) { return; }
		var meta = doc.querySelector("meta[name=viewport]"),
			initialContent = meta && meta.getAttribute("content"),
			disabledZoom = initialContent + ",maximum-scale=1",
			enabledZoom = initialContent + ",maximum-scale=10",
			enabled = true,
			x, y, z, aig;
		if (!meta) { return; }
		function restoreZoom() {
			meta.setAttribute("content", enabledZoom);
			enabled = true;
		}
		function disableZoom() {
			meta.setAttribute("content", disabledZoom);
			enabled = false;
		}
		function checkTilt(e) {
			aig = e.accelerationIncludingGravity;
			x = Math.abs(aig.x);
			y = Math.abs(aig.y);
			z = Math.abs(aig.z);
			// If portrait orientation and in one of the danger zones
			if ((!w.orientation || w.orientation === 180) && (x > 7 || ((z > 6 && y < 8 || z < 8 && y > 6) && x > 5))) {
				if (enabled) {
					disableZoom();
				}
			}
			else if (!enabled) {
				restoreZoom();
			}
		}
		w.addEventListener("orientationchange", restoreZoom, false);
		w.addEventListener("devicemotion", checkTilt, false);
	}(this));
}(jQuery));
