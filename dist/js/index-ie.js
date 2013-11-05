(function() {
		var init = function($)	
		{

			/*	jQuery has loaded but we are in IE 6-8
				so show the error message and hide outer-wrapper. Soz */
				$(".outer-wrapper").css("display","none");
				$(".status-message").css("display","block");

		};

	setTimeout(function()
	{
	if (typeof jQuery !== 'undefined')
	{
		init(jQuery);
	} else
	{
		setTimeout(arguments.callee, 60);
	}
	}, 60);

})();

