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

	/*	Add SVG elements to the pointers */
	var pointerSvg = d3.selectAll(".outer-wrapper .count-map span.pointer")
					.append("svg")
					.attr("width", 45 )
					.attr("height", 45 )
				  .append("path")
					.attr("d", "M26.711,14.086L16.914,4.29c-0.778-0.778-2.051-0.778-2.829,0L4.29,14.086c-0.778,0.778-0.778,2.05,0,2.829l9.796,9.796c0.778,0.777,2.051,0.777,2.829,0l9.797-9.797C27.488,16.136,27.488,14.864,26.711,14.086zM14.702,8.981c0.22-0.238,0.501-0.357,0.844-0.357s0.624,0.118,0.844,0.353c0.221,0.235,0.33,0.531,0.33,0.885c0,0.306-0.101,1.333-0.303,3.082c-0.201,1.749-0.379,3.439-0.531,5.072H15.17c-0.135-1.633-0.301-3.323-0.5-5.072c-0.198-1.749-0.298-2.776-0.298-3.082C14.372,9.513,14.482,9.22,14.702,8.981zM16.431,21.799c-0.247,0.241-0.542,0.362-0.885,0.362s-0.638-0.121-0.885-0.362c-0.248-0.241-0.372-0.533-0.372-0.876s0.124-0.638,0.372-0.885c0.247-0.248,0.542-0.372,0.885-0.372s0.638,0.124,0.885,0.372c0.248,0.247,0.372,0.542,0.372,0.885S16.679,21.558,16.431,21.799z")
					.style("pointer-events","none")
					.style("fill", "#999999")
					.style("stoke", "none")
					.attr("transform", "translate(-4,-4), scale(1.7)");



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





