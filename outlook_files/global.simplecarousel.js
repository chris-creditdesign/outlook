
var com = com || {};
com.nature = com.nature || {};

com.nature.SimpleCarousel = (function ($) {


	var SimpleCarousel = function ($itemsContainer, options) {
		var opts = options || {
				thumbSpacing: 6,
				initialActive: 0,
				showLoader: false,
				title: false,
				listType:  "ul",
				inView: 4,
				paginate: false,
				thumblinks: true,
				togglePrevNext: false, // show/hide prev and next when active
				navLocation: false,   //  element to which the pagination is appended
				callback: false
			},
			id = $itemsContainer.attr('id') || 'simple-carousel',
			$thumbs = null,
			$thumbLinks = null,
			$mask = null,
			self = this,
			listtype = opts.listType || "ol",
			full = {
				width: $itemsContainer.width(),
				height: opts.height || 120
			},
			mask = {
				width: full.width - 60,
				height: full.height,
				left: 0,
				right: 0
			},
			current = null,
			callback = opts.callback, //call back function to initialise on carousel load
			scrollTarget = 0,
			thumbsPosX = 0,
			thumbsWidth = 0,
			thumbSpacing =  opts.thumbSpacing || 0,
			initialActive = opts.initialActive || 0,
			navLocation = opts.navLocation || false,
			pagination = opts.paginate || false,
			thumblinks = opts.thumblins || true,
			inView = opts.inView,
			togglePrevNext = opts.togglePrevNext || false,
			moveBy = 0,
			end = false,
			paginate = function () {
				var controls = "",
					active = "",
					i = 0;
				for (i = 0; i < $thumbs.find('li').length; i++) {

					if (i === opts.initialActive) {
						active = 'active';
					}
					controls += '<li class="pagination-link ' + active + '" id="p-' + i + '" ><a href="javascript:;" ><span>' + (i + 1) + '</span></a></li>';
					active = '';
				}
				return controls;
			},

			resizeMask = function () {
				full.width = $itemsContainer.width();
				mask.width = full.width - mask.left - mask.right;
				$mask.css({
					width: mask.width + 'px',
					height: mask.height + 'px',
					left: mask.left + 'px'
				});
			},

			updateNavButtons = function () {
				var $carouselPagination = $('.carousel-pagination');
				if (thumbsPosX === 0) {
					$carouselPagination.find('li.prev a.nav:not(.inactive)').addClass('inactive').attr('tabindex', '-1');
				} else {
					$carouselPagination.find('li.prev a.nav.inactive').removeClass('inactive').removeAttr('tabindex');
				}
				if (thumbsPosX % moveBy > 0 || end) {
					$carouselPagination.find('li.next a.nav:not(.inactive)').addClass('inactive').attr('tabindex', '-1');
				} else {
					$carouselPagination.find('li.next a.nav.inactive').removeClass('inactive').removeAttr('tabindex');
				}
			},
			doImageScroll = function (offset) {
				scrollTarget = -offset;
				$thumbs.animate({
					left: scrollTarget + 'px'
				}, 'fast');
				if (self.notify) {
					self.notify('scrolled', offset);
				}
				updateNavButtons();
			},
			thumbLinkBehaviour = function () {
				$thumbs.find('img').wrap('<a href="javascript:;"></a>');
				$thumbLinks = $('a', $thumbs);
				$thumbLinks.eq(initialActive).addClass('active');
				$thumbLinks.click(function () {
					if (self.notify) {
						self.notify('thumbClicked', $(this).find('img').data('video'));
					}
					$thumbLinks.removeClass('active');
					$(this).addClass('active');
					$(this).parent('.popup');
					return false;
				});
			},
			nextPrevToggle = function (currentPos) {
				var $pageList = $pageList,
					$paginationPrev = $("div.carousel-pagination li.prev"),
					$paginationNext = $("div.carousel-pagination li.next");
				if (currentPos === 1) {
					$paginationPrev.hide();
				} else {
					$paginationPrev.show();
				}
				if (currentPos === $pageList.find("li").size() - 2) {
					$paginationNext.addClass("disabled").css({"visibility" : "hidden"});
				} else {
					$paginationNext.removeClass("disabled").css({"visibility" : "visible"});
				}
			};

		this.init = function () {
			$thumbs = $itemsContainer.find('ol:first');
			$mask = $thumbs.wrap('<div class="thumbs masking"></div>').parent();
			$thumbs.css('visibility', 'visible').attr('id', 'control-slider-' + id);

			if (opts.showLoader) {
				$itemsContainer.append('<div class="simple-carousel-loading"><img src="/view/images/figure_browser_loading.gif" alt="Loading" class="simple-carousel-loading-icon"/></div>').find('div.simple-carousel-loading').css({
					width: full.width + 'px',
					height: full.height + 'px'
				});
			}
			//if set create links for each thumbnail item - needs to be made more portable
			if (thumblinks) {
				thumbLinkBehaviour();
			}

			if (opts.title) {
				$mask.before('<h3>' + opts.title + '</h3>');
			}


			if ($thumbLinks.length > inView) {
				//set up carousel nav
				var navMarkup = '<div class="carousel-pagination" aria-controls="control-slider-' + id + '" role="presentation"><ul>';
				navMarkup += '<li class="prev"><a href="javascript:;" class="nav inactive" tabindex="-1" role="button">prev</a></li>';
				if (pagination) {
					navMarkup += paginate();
				}
				navMarkup += '<li class="next"><a href="javascript:;" class="nav" role="button">next</a></li></ul></div>';


				if (navLocation) {
					$(navLocation).after(navMarkup);
				} else {
					$mask.before(navMarkup);
				}

				//sets up behaviour for  next/prev/pagination buttons

				$('.carousel-pagination').find("li a").click(function (e) {
					var $this = $(this),
						$pageHolder = $this.parents(".carousel-pagination"),
						$pageList = $pageHolder.find('ul'),
						currentPos = $pageList.find("li.active").index(),
						$paginationLinks = $pageHolder.find("li.pagination-link"),
						$linkParent = $this.parent(),
						$active = $pageHolder.find('li.active'),
						isPaginationLink = $linkParent.hasClass('pagination-link'),
						$thumbsLi = $thumbs.find("li");

					if ($linkParent.hasClass('prev')) {

						$active.removeClass('active');
						if (currentPos <= 1) {
							$paginationLinks.eq(0).addClass('active');
							//active indicator for prev/next

						} else {
							$active.prev().addClass('active');

						}
						if (thumbsPosX - moveBy < 0) {
							thumbsPosX = 0;
						} else {
							thumbsPosX -= moveBy;
							end = false;
						}

					} else if ($linkParent.hasClass('next') && !$linkParent.hasClass('disabled')) {
						$active.removeClass('active');
						if (currentPos < $paginationLinks.length) {
							$active.next().addClass('active');

						} else {
							$paginationLinks.last().addClass('active');
							end = true;

						}

						if (thumbsPosX + (moveBy * 2) > thumbsWidth) {
							thumbsPosX = thumbsWidth - moveBy;
						} else {
							thumbsPosX += moveBy;
						}
						if (thumbsPosX === thumbsWidth - moveBy) {
							end = true;
						}

					} else if (pagination && isPaginationLink) {
						$this.parents(".carousel-pagination").find("li").removeClass("active");
						thumbsPosX = $linkParent.attr('id').split("-")[1] * $thumbsLi.outerWidth(true);
						$this.parent().addClass("active");
					}
					updateNavButtons();
					doImageScroll(thumbsPosX);

					if (togglePrevNext) {
						nextPrevToggle(currentPos);

					}
				});
			}
			//calculates the total width of the thumbnails with margin
			$thumbs.find('li.carousel-item').css('margin-right', thumbSpacing).each(function () {
				thumbsWidth += $(this).outerWidth(true);
			}).last().css('margin-right', 0);

			moveBy = inView * ($('li:first-child', $thumbs).outerWidth(true));

			updateNavButtons();

			setTimeout(function () {
				if (opts.showLoader) {
					$itemsContainer.find('img.simple-carousel-loading-icon').animate({
						top: '-32px',
						opacity: 0.5
					}, 'medium', function () {
						$itemsContainer.find('div.simple-carousel-loading').fadeOut('fast');
					});
				}
				resizeMask();
			}, 30);
			if (callback) {
				callback();
			}

		};

	};
	return SimpleCarousel;

}(jQuery));
