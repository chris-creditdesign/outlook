
var com = com || {};
com.nature = com.nature || {};

com.nature.TabGroup = (function ($) {

	var TabGroup = function (el) {
		this.id = el.attr('id');
		this.active = el.find('div.tab-box.active').attr('id');
		this._el = el;
		this._numTabs = el.find('h3.tab').length;
		this.isAddressable = false;
	};
	TabGroup.prototype = {
		init: function () {
			var self = this;
			this._el.append('<div class="tab-bar"></div>');
			this._redraw();
			$('#' + this.id + ' h3.tab').linkify();
			$('#' + this.id + ' h3.tab a').hitch('click', this.click, this).ellipsis();
			$('#' + this.id).css({
				'visibility': 'visible',
				'display': 'block'
			}); // show the tabs again once processed
			if (this.tabName && self.isAddressable) {
				window.location.hash = this.tabName;
				
			}
			if (self.isAddressable) {
				self.changeByHash();
			}

		},
		click: function (e) {
			var el = $(e.target);
			var id = el.parents('div.tab-box').attr('id');
			if (id !== this.active) {
				this.switchTo(id);
			}
		},
		switchTo: function (id) {
			var self = this;
			if (this.active !== id) {
				var $next = $('#' + id);
				if (!$next.length) {
					$next = this._el.find('div.tab-box:first');
				}
				$('#' + this.active).removeClass('active');
				$next.addClass('active');
				this.prev = this.active;
				this.active = id;
				this.tabName = $('#' + id).data('info-type');

				if (this.active && self.isAddressable) {
					window.location.hash = this.active.substring(7);
				}
				this.notify('switch', this.prev, id, this.tabName);
			}
		},
		changeByHash: function (prefix) {
			var self = this;
			var theHash = window.location.hash.substring(1);
			// the tab types array must be defined for this functionality to work
			if (self.tabTypes && self.isAddressable) {
				var thePrefix = prefix || "figure-";

				$(window).on('hashchange', function () {
					var currentHash = window.location.hash.substring(1);
					if ($.inArray(currentHash, self.tabTypes) >= 0) {
						var tabHash = thePrefix + currentHash;
						self.switchTo(tabHash);
					}
				});
				if (!theHash || theHash < 0) {
					com.nature.PageManager.restoreTabState(self);
				} else {
					if ($.inArray(theHash, self.tabTypes) >= 0) {
						var tabHash = thePrefix + theHash;
						self.switchTo(tabHash);
					}
				}
			}
		},
		getTitle: function () {
			return $('#' + this.active + ' h3.tab a').attr('title');
		},
		_redraw: function () {
			var self = this;
			var tabs = $('#' + this.id + ' h3.tab');
			var numTabs = tabs.length;
			var math = Math;
			var totalWidth = this._el.find('div.tab-content').outerWidth();
			var width;
			var basicTabWidth = Math.floor(totalWidth / numTabs);
			var activeTabWidth = basicTabWidth + (totalWidth % numTabs);
			var tabFormat = self.tabFormat;
			var x = 0;
			var h = 0;
			if (tabFormat === "figureBrowser") { $(this).css('display', 'none'); } // hides the carousel while rendering to prevent browser reflows
			tabs.each(function () {

				var $this = $(this),
					width,
					outerHeight = $this.outerHeight(),
					$thisTabox = $this.closest('div.tab-box');
				if (tabFormat === "figureBrowser") {
					width =  $this.width();

				} else if (numTabs <= 3) {
					width = math.round(totalWidth / 3);
				} else {
					
					width = ($thisTabox.hasClass('active')) ? activeTabWidth : basicTabWidth;
				}

				if (tabFormat === "figureBrowser") {
					h = 31;
				} else {
					h = math.max(h, outerHeight);
				}

				if (tabFormat === "figureBrowser") {
					$thisTabox.find('div.tab-content').css('paddingTop', (h + 6) + 'px');
					$this.css({left: x + 'px', top: 4 + 'px'});
					x += width + 30;
					if (numTabs === 1) {
						$this.css("width", (totalWidth - 28));
					}
				}
				else if (tabFormat !== "leftAligned") {
					$thisTabox.find('div.tab-content').css('paddingTop', outerHeight + 4 + 'px');
					$this.css({left: x + 'px', top: 0, width: (width === 'auto') ? 'auto' : width + 'px'});
					x += width;
					if (numTabs === 1) {
						$this.css("width", "100%");
						$this.parent().addClass("active");
						$this.addClass("solotab");
					} else if (numTabs === 2) {
						$this.css("width", "50%");
						if (!$thisTabox.hasClass('first')) { $this.css("left", "50%"); }
					}
				}
				else {
					width = ($this.outerWidth() + 20);
					$this.css({left: x + 'px', top: 0, width: width, paddingLeft: 0, paddingRight: 0});
					x += width;
				}
			});
			if (numTabs <= 3) {
				this._el.find('div.tab-bar').css({height: (h + 5) + 'px'});
			}
		}
	};
	return TabGroup;

}(jQuery));

(function ($) {
	$(document).ready(function () {
		var pm = com.nature.PageManager;
	
		$('#extranav div.tab-group').each(function () {
			var t = new com.nature.TabGroup($(this));
			t = $.extend(t, new com.nature.Broadcaster());
			t.init();
			t.subscribe('switch', pm.trackTabs, pm);
			if (!$(this).hasClass('random')) {
				t.subscribe('switch', pm.saveTabState, pm);
				pm.restoreTabState(t);
			}
		});
	});
}(jQuery));
