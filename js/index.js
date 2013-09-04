/*	==================================================================================== */
/*	Global variables */

/*	Width and height */
var width = 940;
var height = 500;
/*	Global variable to control the length of D3 transitons */
var duration = 150;
/*	Global variable to hold data parsed from the csv file */
var dataset;
var allValues = [];

var play = null;
var totalYears = $("select#selectYear option").length;
var displayYear = $("select#selectYear option:selected").val();
var counter = $("select#selectYear option:selected").index();
var interval = 500;

/* set up canvas */
var canvas = d3.select(".canvas-map").append("canvas")
    .attr("width", width)
    .attr("height", height);

var context = canvas.node().getContext("2d");

/*	Create SVG element */
var holder = d3.select(".svg-map")
		.append("svg")
		.attr("width", width)
		.attr("height", height)

/* 	Add a group to hold the map and circles */
var svg = holder.append("g")
		.attr("transform", "translate(0,0)")
		.attr("transform", "scale(1)");


/*	==================================================================================== */
/*	Load CSV data */

d3.csv('data/gpcp_anomalies_1979-2012-edit-2.csv', function(d) {

	var thisLong = +d.long;

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
		console.log(error)
	} else {
		/* Once loaded, copy to dataset */
		dataset = d;
		draw();
	}

});


/*	==================================================================================== */
/*	draw() function to be called once CSV data loaded */

function draw() {

	/*	We know that javascript is enabled and that we are not in IE 6-8
		so hide the error message and show outer-wrapper */
	$(".outer-wrapper").css({"display":"block"});
	$(".status-message").css({"display":"none"});
	
	/*	==================================================================================== */
	/*	Variables and scales */
	
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
	var colourScale = d3.scale.linear().domain([-3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3]).range(["#442B0C", "#5A3E17", "#8F6823", "#C3AE4A", "#96B247", "#53B264", "#2CB1A0", "#3EC6DC", "#348FCA", "#2E52A5", "#31328C", "#1F1B5A", "#1A2051"]);


	/*	==================================================================================== */
	/*	Functions and event listeners */

	/* Event listner for when the user changes the adjust scale checkbox */
	d3.selectAll("select#selectYear").on("change", function() {
		displayYear = this.value;
		/* Redraw the map - taking into account the choice */
		updateYear();
	});

	function setSelectedIndex(x) {
		document.getElementById("selectYear").options[x].selected = true;
		// document.getElementById("selectYear").value = "value1979";

		// $("#selectYear").val("value1979");

		slider.slider( "value", (x + 1) );

		displayYear = document.getElementById("selectYear").value;
		/* Redraw the map - taking into account the choice */
		updateYear();

		return;
	};

	$("button.play").click(function(e){
		$("button.play").css({"display":"none"});
		$("button.pause").css({"display":"block"});

		if ( counter >= (totalYears-2) ) {
			counter = 0;
		};

		play = window.setInterval(function () {
			setSelectedIndex(counter);
			counter += 1;
			if (counter >= totalYears ) {
				$("button.play").css({"display":"block"});
				$("button.pause").css({"display":"none"});
				window.clearInterval(play);
			}
		}, interval);

		e.preventDefault();
		return false;

	});

	$("button.pause").click(function () {
		$("button.play").css({"display":"block"});
		$("button.pause").css({"display":"none"});
		window.clearInterval(play);
	})


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
			$("button.play").css({"display":"block"});
			$("button.pause").css({"display":"none"});
			window.clearInterval(play);
			updateYear();
		}
	});

	$( "#selectYear" ).change(function() {
		counter = $("select#selectYear option:selected").index();
		$("button.play").css({"display":"block"});
		$("button.pause").css({"display":"none"});
		window.clearInterval(play);
		slider.slider( "value", this.selectedIndex + 1 );
	});


	function updateYear () {
			/* Update the key text */
			d3.select(".outer-wrapper #keyHolder .key p span.this-year").html([displayYear.substr(5)]);

			context.clearRect(0,0,width,height);

			for (var i = 0; i < dataset.length; i++) {

				var posX = xScale(dataset[i].long);
				var posY = yScale(dataset[i].lat);

				context.fillStyle = colourScale(dataset[i]["" + displayYear + ""]);
				context.fillRect( posX, posY, rectWidth, rectHeight);

			};

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
						d3.select(".outer-wrapper .count-map img").style("display","none");
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
					.html(d["" + displayYear + ""]);


				/* Show the tooltip */
				d3.select(".tooltip")
					.classed("hidden", false)
					.transition()
					.duration(duration/2)
					.style("opacity", 1);

			}).on("mouseout", function(){
				d3.select(".tooltip")
					.transition()
					.duration(duration/2)
					.style("opacity", 0)
					.each("end", function() {
						d3.select(".tooltip").classed("hidden", true);
					});
			})
	}




	/*	==================================================================================== */
	/*	Call to action */

	createCanvas();


	/* Only load the svg if we think we're not on a touch screen */
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		/* 	Hide the preloader */
		$(".outer-wrapper .count-map img").css({"display":"none"});
	} else {
		/* 	Load the svg after a delay to ensure the canvas map fills the stage
			first and the user is not left looking at a blank screen */
		window.setTimeout(function() {
				createSvg();
		}, 500);

	}

}





