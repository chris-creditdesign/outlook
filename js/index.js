(function() {
		var init = function($)	
		{

/*	Global variable to hold data parsed from the csv file */
var dataset;

/*	==================================================================================== */
/*	Load jQuery UI and D3 */
/*	Only load D3 once jQuery UI has loaded. Once D3 is loaded then load the CSV data */

$.getScript("js/jquery-ui-1.10.3.custom.min.js", checkUI());

function checkUI () {

	setTimeout(function()
	{
	if (typeof jQuery.ui !== 'undefined')
	{
		$.getScript("js/d3.v3.min.js", checkD3() );
	} else
	{
		setTimeout(arguments.callee, 60);
	}
	}, 60);
};

function checkD3 () {

	setTimeout(function()
	{
	if (typeof d3 !== 'undefined')
	{
		loadData();
	} else
	{
		setTimeout(arguments.callee, 60);
	}
	}, 60);
};

/*	==================================================================================== */
/*	Load CSV data */

function loadData () {

	d3.csv('data/gpcp_anomalies_1979-2012-edit-2.csv', function(d) {

		var thisLong = +d.long;

		/* Refactor the map so that Alaska is at the far left rather that Grenwhich */
		if (thisLong > 195 ) {
			thisLong -= 195;
		} else {
			thisLong += 165;
		}

		return {
			/* Convert each value from a string to a number */
			long: thisLong,
			lat: +d.lat,
			value1979: +d.value1979,
			value1980: +d.value1980,
			value1981: +d.value1981,
			value1982: +d.value1982,
			value1983: +d.value1983,
			value1984: +d.value1984,
			value1985: +d.value1985,
			value1986: +d.value1986,
			value1987: +d.value1987,
			value1988: +d.value1988,
			value1989: +d.value1989,
			value1990: +d.value1990,
			value1991: +d.value1991,
			value1992: +d.value1992,
			value1993: +d.value1993,
			value1994: +d.value1994,
			value1995: +d.value1995,
			value1996: +d.value1996,
			value1997: +d.value1997,
			value1998: +d.value1998,
			value1999: +d.value1999,
			value2000: +d.value2000,
			value2001: +d.value2001,
			value2002: +d.value2002,
			value2003: +d.value2003,
			value2004: +d.value2004,
			value2005: +d.value2005,
			value2006: +d.value2006,
			value2007: +d.value2007,
			value2008: +d.value2008,
			value2009: +d.value2009,
			value2010: +d.value2010,
			value2011: +d.value2011,
			value2012: +d.value2012


		}
	}, function(error, d) {

		if (error) {
			/* TO DO */
			console.log(error)
		} else {
			/* Once loaded, copy to dataset */
			dataset = d;
			draw();		
		}

	});
}

/*	==================================================================================== */
/*	draw() function to be called once CSV data loaded */

function draw() {

	var iconPath = "M28,0H7C3.15,0,0,3.15,0,7v21c0,3.85,3.15,7,7,7h21c3.85,0,7-3.15,7-7V7C35,3.15,31.85,0,28,0z M1.75,23.714  h3.005l-1.102,2.512L1.75,27.244V23.714z M5.266,32.932c-1.864-0.658-3.232-2.328-3.457-4.355l1.93-0.92l3.073,4.007L5.266,32.932z   M4.619,26.642l1.47-2.928h7.398l1.046,1.056l-3.35,4.143L7.971,30.85L4.619,26.642z M7.215,33.25l4.505-3.066l5.388,3.066H7.215z   M25.442,33.25h-5.413l-7.335-3.99l3.177-3.96l7.143,2.376l3.763,5.321L25.442,33.25z M29.111,33.126l-0.708-0.166l-3.536-5.122  l5.381-0.721l2.992,0.964C33.202,30.557,31.447,32.62,29.111,33.126z M33.25,26.868l-1.957-0.564l1.957-0.53V26.868z M33.25,24.862  l-3.883,1.229l-5.558,0.793l-7.145-2.375l-1.682-0.794h0.964c-0.231-2.125-0.538-3.733-0.689-5.841h-0.01  c-0.002-0.064-0.077-1.476-0.093-2.077c-0.113-0.635-0.414-0.883-1.403-1.569c-0.547-0.353-0.954-0.477-1.179-0.471  c-0.366,0-0.687,0.393-0.765,1.583c1.591,0.27,1.699,2.03,1.699,2.03c0.14,1.248-0.474,3.076-1.89,3.551  C9,21.79,9.272,16.751,10.747,15.544c0.039-1.454,0.437-2.782,1.825-2.839c0.547,0.003,1.104,0.23,1.75,0.639  c0.308,0.187,0.555,0.376,0.774,0.568c-0.024-0.477-0.054-0.967-0.054-1.471c-0.003-1.055,0.166-2.207,1.101-3.026  c0.485-0.44,1.034-0.669,1.566-0.664c1.391,0.067,2.265,1.273,2.767,2.502c0.59-0.255,1.325-0.382,2.165-0.089  c2.147,0.743,3.317,4.494,2.41,5.798c-2.121,3.05-7.458-2.617-6.043-4.599c0,0,0.205-0.268,0.571-0.565  c-0.415-1.09-1.248-2.065-1.87-2c-0.237,0.004-0.516,0.09-0.87,0.401c-0.593,0.522-0.744,1.27-0.747,2.242  c0,0.686,0.084,1.45,0.084,2.214c0,0.401,0.026,0.751,0.036,1.142c0.097,0.682,0.104,1.208,0.087,1.927  c0.149,2.098,0.999,3.82,1.232,5.992l15.719,0.001C33.25,23.716,33.25,24.862,33.25,24.862z M10.866,16.291l0.723-0.296  l-0.723,4.043C10.503,18.756,10.866,16.291,10.866,16.291z M24.012,16.62l-4.044-4.404l0.755-0.46  C20.723,11.756,23.287,13.497,24.012,16.62z"

	/*	Add SVG elements to the pointers */
	var pointerSvg = d3.selectAll(".outer-wrapper .count-map span.pointer")
					.append("svg")
					.attr("width", 35 )
					.attr("height", 35 )
				  .append("path")
					.attr("d", iconPath)
					.style("stoke", "none");


	/*	Add SVG elements to the key */
	var pointerSvg = d3.selectAll(".outer-wrapper .key-holder .key span.symbol")
					.append("svg")
					.attr("width", 35 )
					.attr("height", 35 )
				  .append("path")
					.attr("d", iconPath)
					.style("pointer-events","none")
					.style("stoke", "none");



	/*	==================================================================================== */
	/*	Variables and scales */

	/*	Width and height */
	var width = 958;
	var height = 500;
	/*	Global variable to control the length of D3 transitons */
	var duration = 100;

	var allValues = [];

	var totalYears = $(".outer-wrapper .year-wrapper select#selectYear option").length;
	var displayYear = $(".outer-wrapper .year-wrapper select#selectYear option:selected").val();
	var counter = $(".outer-wrapper .year-wrapper select#selectYear option:selected").index();
	var interval = 500;

	/* set up canvas */
	var canvas = d3.select(".outer-wrapper .count-map .canvas-map").append("canvas")
	    .attr("width", width)
	    .attr("height", height);

	var context = canvas.node().getContext("2d");

	/*	Create SVG element */
	var holder = d3.select(".outer-wrapper .count-map .svg-map")
			.append("svg")
			.attr("width", width)
			.attr("height", height)

	/* 	Add a group to hold the map and circles */
	var svg = holder.append("g")
			.attr("transform", "translate(0,0)")
			.attr("transform", "scale(1)");

	
	var maxLong = d3.max(dataset, function (d) {
		return d.long;
	})

	var minLong = d3.min(dataset, function (d) {
		return d.long;
	})

	var maxLat = d3.max(dataset, function (d) {
		return d.lat;
	})

	var minLat = d3.min(dataset, function (d) {
		return d.lat
	})

	/* Define X scale */
	var xScale = d3.scale.linear()
		.domain([ minLong, maxLong ])
		.range([0,width]);

	/* Define Y scale */
	var yScale = d3.scale.linear()
		.domain([minLat,maxLat])
		.range([height, 0]);

	/* Define the rect height and width */
	var rectWidth = Math.round(width / (maxLong - minLong)) + 1;
	var rectHeight = Math.round(height / -(minLat - maxLat)) + 1;

	/*	Define colour scale */
	var colourScale = d3.scale.linear().domain([-3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3]).range(["#442B0C", "#5A3E17", "#8F6823", "#C3AE4A", "#96B247", "#8fc696", "#b1cfa5", "#3EC6DC", "#348FCA", "#2E52A5", "#31328C", "#1F1B5A", "#1A2051"]);


	/*	==================================================================================== */
	/*	Functions and event listeners */

	/* Event listner for when the user changes the adjust scale checkbox */
	d3.selectAll(".outer-wrapper .year-wrapper select#selectYear").on("change", function() {
		displayYear = this.value;
		/* Redraw the map - taking into account the choice */
		updateYear();
	});

	function setSelectedIndex(x) {
		document.getElementById("selectYear").options[x].selected = true;

		slider.slider( "value", (x + 1) );

		displayYear = document.getElementById("selectYear").value;
		/* Redraw the map - taking into account the choice */
		updateYear();

		return;
	};


	$(".outer-wrapper .count-map span.pointer").on("click", function (e) {
		
		/*	Prevent default if not clicking on a ref link */
		if( !$(e.target).is("a") ) {

			if ( $(this).children("span").is(':visible') ) {
				$(this).children("span").fadeOut(duration);
			} else {
				if ( parseInt($(this).css("left")) > (width/2) ) {
					$(".outer-wrapper .count-map span.pointer").children("span").fadeOut(duration);
					$(this).children("span").css("left","-320px").fadeIn(duration);
				} else {
					$(".outer-wrapper .count-map span.pointer").children("span").fadeOut(duration);
					$(this).children("span").css("left","50px").fadeIn(duration);
				}			
			}

			e.preventDefault();
			return false;
		} 
	})

	/*	Build jQueryUI slider */
	var select = $( "#selectYear" );
	var slider = $( "<div id='slider'></div>" ).insertBefore( select ).slider({
		min: 1,
		max: 34,
		range: "min",
		value: select[ 0 ].selectedIndex + 1,
		slide: function( event, ui ) {
			select[ 0 ].selectedIndex = ui.value - 1;
			displayYear = $("select#selectYear").val();
			counter = $("select#selectYear option:selected").index();

			updateYear();
		}
	});

	$( ".outer-wrapper .year-wrapper #selectYear" ).change(function() {
		counter = $("select#selectYear option:selected").index();

		slider.slider( "value", this.selectedIndex + 1 );
	});


	function updateYear () {
			/* Update the key text */
			d3.select(".outer-wrapper .year-holder h3 span.this-year").html([displayYear.substr(5)]);

			context.clearRect(0,0,width,height);

			for (var i = 0; i < dataset.length; i++) {

				var posX = xScale(dataset[i].long);
				var posY = yScale(dataset[i].lat);

				context.fillStyle = colourScale(dataset[i]["" + displayYear + ""]);
				context.fillRect( posX, posY, rectWidth, rectHeight);

			};
			$(".outer-wrapper .count-map span.pointer").children("span").fadeOut(duration);
			$(".outer-wrapper .count-map span.pointer").css("display","none");
			$(".outer-wrapper .count-map span.pointer." + displayYear + "").css("display","block");

		}

	function createCanvas () {

		for (var i = 0; i < dataset.length; i++) {
			var posX = xScale(dataset[i].long);
			var posY = yScale(dataset[i].lat);

			context.fillStyle = colourScale(dataset[i]["" + displayYear + ""]);
			context.fillRect( posX, posY, rectWidth, rectHeight);
			
			if (i === (dataset.length - 1)) {
		
			}
		};

		$(".outer-wrapper .count-map span.pointer." + displayYear + "").css("display","block");
	}

	function showElements () {
		/* 	Hide the preloader */
		$(".outer-wrapper .count-map img").css("display","none");
		$(".outer-wrapper .count-map .key-holder").css("display","block");
		$(".outer-wrapper .count-map .year-holder").css("display","block");
		$(".outer-wrapper .outline-map").css("display","block");
		$(".outer-wrapper .year-wrapper").css("display","block");

	}


	function createSvg () {
		
		var rects = svg.selectAll("rect")
				.data(dataset)
				.enter()
				.append("rect")
				.style("opacity", 0)
				.attr("x", function(d) {
							return xScale(d.long);
						})
				.attr("y", function(d) {
							return yScale(d.lat);
						})
				.attr("width", rectWidth)
				.attr("height", rectHeight)
				.each(function(d,i) { 
					if (i === (dataset.length - 1 ) ) {
						showElements();
					}
				});


		/* Add tooltip behaviour to each rect */
		rects.on("mouseover", function (d,i) {

				var x = d3.select(this).attr("x");
				var y = d3.select(this).attr("y");

				/* Get this rects's x/y values, then augment for the tooltip */
				var xPosition = parseInt(x) - (parseInt($(".tooltip").css("width"))/2) -10;
				var yPosition = parseInt(y) - (parseInt($(".tooltip").css("height")) * 2) -8 ;

				/* Update the tooltip position and value */
				d3.select(".tooltip")
					.style("left", xPosition + "px")
					.style("top", yPosition + "px");

				/* Update the tooltip text */
				d3.select(".tooltip")
					.select(".value")
					.html(d["" + displayYear + ""] + " mm");


				/* Show the tooltip */
				d3.select(".tooltip")
					.classed("tooltip-hidden", false)
					.transition()
					.duration(duration/2)
					.style("opacity", 1);

			}).on("mouseout", function(){
				d3.select(".tooltip")
					.transition()
					.duration(duration/2)
					.style("opacity", 0)
					.each("end", function() {
						d3.select(".tooltip").classed("tooltip-hidden", true);
					});
			})
	}




	/*	==================================================================================== */
	/*	Call to action */

	createCanvas();


	/* Only load the svg if we think we're not on a touch screen */
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		showElements();
	} else {
		/* 	Load the svg after a delay to ensure the canvas map fills the stage
			first and the user is not left looking at a blank screen */
		window.setTimeout(function() {
				createSvg();
		}, 500);

	}

}

/*	==================================================================================== */
/*	End of active code */

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





