
(function ($) {
	
	$.fn.linkify = function () {
		return this.each(function () {
			var el = $(this);
			el.html('<a href="javascript:;" >' + el.html() + '</a>');
		});
	};
	
})(jQuery);
