var com = com || {};
com.nature = com.nature || {};

com.nature.Sidebar = {

	clickTrack: function () {
		var pm = com.nature.PageManager;
		var _trackData = {
			"special-feature-box": {
				"action": "clickthrough_rhc",
				"source": "editor_feature",
				"destination": "feature_link"
			},
			"related-content": {
				"action": "clickthrough_rhc",
				"source": "related",
				"destination": "related_link"
			},
			"top-content": {
				"action": "clickthrough_rhc",
				"source": "most_read",
				"destination": "most_read_link"
			},
			"related-top-content-tab": {
				"action": "tab_switch"
			},
			"news-views-box": {
				"source": "bidirectional_box",
				"action": "clickthrough_rhc",
				"destination": "bidirectional_link"
			},
			"edsumm": {
				"action": "expand",
				"destination": " ",
				"source": "editor_summary"
			},
			"sidebar-video": {
				"action": "expand",
				"destination": " ",
				"source": "video_summary"
			},
			"jobs-events-box": {
				"action": "clickthrough_rhc"
			},
			"open-innovation-box": {
				"action": "clickthrough_rhc",
				"source": "innocentive"
			}
		};
		$('#nature-jobs-box li a, #nature-events-box li a, #nature-jobs-events-box li a').click(function () {
			var _data = _trackData["jobs-events-box"] || null;
			var outerId = $(this).parents('div.tab-group').attr('id');
			var innerId = $(this).parents('div.tab-content').attr('id');
			var parent = $(this).parents('ul');
			if ($(parent).hasClass('events-list')) {
				_data.destination = "events_link";
			}
			else if ($(parent).hasClass('jobs-list')) {
				_data.destination = "jobs_link";
			}
			else if ($(parent).hasClass('action-links')) {
				if (innerId === 'nature-science-jobs-list') {
					_data.destination = "more_jobs";
				}
				else if (innerId === 'nature-science-events-list') {
					_data.destination = 'more_events';
				}
			}
			if (outerId === 'nature-jobs-box') {
				_data.source = "nature_jobs";
			}
			else if (outerId === 'nature-events-box') {
				_data.source = "nature_events";
			}
			else if (outerId === 'nature-jobs-events-box') {
				if ($('#' + outerId).find('#nature-science-events').length !== 1) {
					_data.source = "nature_jobs";
				}
				else if ($('#' + outerId).find('#nature-science-jobs').length !== 1) {
					_data.source = "nature_events";
				}
				else {
					_data.source = "nature_jobs_and_events";
				}
			}
			if (_data) {
				pm.trackClick(_data);
			}
		});
		$("#related-content-articles ol a").click(function () {
			var _data = _trackData["related-content"] || null;
			if (_data) {
				pm.trackClick(_data);
			}
		});
		$("#top-content-most-read ol a").click(function () {
			var _data = _trackData["top-content"] || null;
			if (_data) {
				pm.trackClick(_data);
			}
		});
		$(".track-news-views-box, .track_bidi").click(function () {
			var _data = _trackData['news-views-box'] || null;
			if (_data) {
				pm.trackClick(_data);
			}
		});
		$('#edsumm').on('click', 'a.toggle-bar', function () {
			// Only track clicks when the box is expanded (the class "collapse" is added when you click the box to expand it!)
			if ($(this).hasClass('collapse')) {
				var _data = _trackData['edsumm'] || null;
				if (_data) {
					pm.trackClick(_data);
				}
			}
		});
		$('#sidebar-video').on('click', 'a.toggle-bar', function () {
			// Only track clicks when the box is expanded (the class "collapse" is added when you click the box to expand it!)
			if ($(this).hasClass('collapse')) {
				var _data = _trackData['sidebar-video'] || null;
				if (_data) {
					pm.trackClick(_data);
				}
			}
		});
		$('#special-feature-box a').click(function () {
			var _data = _trackData['special-feature-box'] || null;
			if (_data) {
				pm.trackClick(_data);
			}
		});
		$('#open-innovation-box a').click(function () {
			var _data = _trackData['open-innovation-box'] || null;
			var dest = "";
			if ($(this).parent()[0].nodeName.toLowerCase() === 'h3') {
				dest = "innocentive_link";
			}
			else if ($(this).parent().hasClass('last')) {
				dest = "more_innocentive";
			}
			if (dest !== "") {
				_data.destination = dest;
			}
			if (_data) {
				pm.trackClick(_data);
			}
		});
	}

};

$(document).ready(function () {
	if (typeof Object.create !== 'function') {
		Object.create = function (o) {
			function F() {}
			F.prototype = o;
			return new F();
		};
	}
	var sidebar;
	sidebar = Object.create(com.nature.Sidebar);
	sidebar.clickTrack();
});