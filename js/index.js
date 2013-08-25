/*	Width and height */
var width = 940;
var height = 600;
/*	Global variable to control the length of D3 transitons */
var duration = 150;
/*	Global variable to hold data parsed from the csv file */
var dataset;
var allValues = [];
var displayYear = "value2012";


/*	Define map projection */
var	projection = d3.geo.mercator()
		.translate([width/2, height/1.5])
		.scale([150]);

/*	Define path generator */
var	path = d3.geo.path()
		.projection(projection);					


/*	Create SVG element */
var holder = d3.select(".count-map")
		.append("svg")
		.attr("width", width)
		.attr("height", height)

/* 	Add a group to hold the map and circles */
var svg = holder.append("g")
		.attr("transform", "translate(0,0)")
		.attr("transform", "scale(1)");

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


function draw() {

	/* Event listner for when the user changes the adjust scale checkbox */
	d3.selectAll("select#selectYear").on("change", function() {
		console.log(this.value);

		displayYear = this.value;

		/* Redraw the map - taking into account the choice */
		updateYear();
	});


	/*	Set the display year and call updateYear()
		When the slider or the select box are changed */
	function updateYearSlider () {
		displayYear = this.value;
		updateYear();
	};



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
	var rectWidth = width / (maxLong - minLong);
	var rectHeight = height / -(minLat - maxLat);

	// for (var i = 0; i < dataset.length; i++) {
	// 	for (var key in dataset[i]) {
	// 		if (key !== "long" && key !== "lat" ) {
	// 			allValues.push(dataset[i][key]);
	// 		}		
	// 	}		
	// };

	// var minValue = d3.min(allValues);
	// var maxValue = d3.max(allValues);
 
	// console.log("minValue is: " + minValue );
	// console.log("maxValue is: " + maxValue );

	/*	Define colour scale */
	var colourScale = d3.scale.linear().domain([-2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3]).range(["#5A3E17", "#8F6823", "#C3AE4A", "#96B247", "#53B264", "#2CB1A0", "#3EC6DC", "#348FCA", "#2E52A5", "#31328C", "#1F1B5A", "#1A2051"]);

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
			.style("fill", function(d){
				return colourScale(d["" + displayYear + ""]);
			});
		
	rects.transition()
			.delay(function (d,i) {
				return i
			})
			.style("opacity", 1)
			.call(endall, function() { 
				d3.select(".outer-wrapper .count-map img").style("display","none");
				createSlider();
			}); 

	/* Create the first slider for the year values */
	function createSlider() {
		fdSlider.createSlider({
			/*	Associate the select list */
			inp:document.getElementById("selectYear"),
			/* 	Use the tween animation 'jump'
				Jump causes the change callback to only be fired once per change
			*/
			animation:"jump",
			/* Keep the form element hidden */
			hideInput:true,
			callbacks:{"change":[updateYearSlider]}
		});
	}

	function updateYear () {
			rects.style("fill", function(d){
					return colourScale(d["" + displayYear + ""]);
				})
		}

	function endall(transition, callback) { 
		var n = 0; 
		transition 
			.each(function() { ++n; }) 
			.each("end", function() { if (!--n) callback.apply(this, arguments); }); 
		} 



}




