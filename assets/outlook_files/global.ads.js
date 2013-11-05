(function ($) {
	$(window).load(function () {
		var adIdentifier = adIdentifier;
		var adKeyword = adKeyword;
		var clickTag = window.clickTAG;
		var com = com || {};
		com.nature = com.nature || {};
		// collapse the space taken by an ad slot if no ad has been targeted
		setTimeout(function () {
			$('div.ad').each(function () {
				var $el = $(this);
				if ($el.height() < 30) {
					$el.css({display: 'none'});
				}
			});
		}, 500);

		/**
		*  Doubleclick ad ID scraper
		*  Leigh Clancy - 26 May 2011
		*
		*  Tests unique ID from ad that is delivered
		*/

		// only do this if an adIdentifier is set
		if (typeof adIdentifier !== "undefined") {

			// if clickTag exists then the ad is in flash
			if (typeof clickTag !== "undefined") {
				if (clickTag.indexOf(adIdentifier) >= 0) {
					com.nature.Cookie.set(adKeyword, 'shown', 365, '/');
				}

			// otherwise just get it from the usual anchor tag.
			} else {
				var adSrc = $("div.ad a").attr('href');
				if (adSrc.indexOf(adIdentifier) >= 0) {
					com.nature.Cookie.set(adKeyword, 'shown', 365, '/');
				}
			}
			// but what if its being served from Eyewonder?
			var adId = "#" + adIdentifier;
			if ($(adId).length) {
				com.nature.Cookie.set(adKeyword, 'shown', 365, '/');
			}

		}
	});
}(jQuery));
