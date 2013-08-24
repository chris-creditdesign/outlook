/*	Width and height */
var width = 940;
var height = 600;
/*	Global variable to control the length of D3 transitons */
var duration = 150;
/*	Global variable to hold data parsed from the csv file */
var dataset;


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

d3.csv('data/gpcp_anomalies_2012.csv', function(d) {

	var thisLong = +d.long;

	if (thisLong > 333 ) {
		thisLong -= 333;
	} else {
		thisLong += 27;
	}

	return {
		/* Convert each value from a string to a number */
		long: thisLong,
		lat: +d.lat,
		value: +d.value
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

	console.log("maxLong is: " + maxLong);
	console.log("minLong is: " + minLong);
	console.log("maxLat is: " + maxLat);
	console.log("minLat is: " + minLat);

	/* Define X scale */
	var xScale = d3.scale.linear()
		.domain([ minLong, maxLong ])
		.range([0,width]);

	/* Define Y scale */
	var yScale = d3.scale.linear()
		.domain([minLat,maxLat])
		.range([height, 0]);


	/*	Set up circles  */
	// var circles = svg.selectAll("circle")
	// 			.data(dataset)
	// 			.enter()
	// 			.append("circle")
	// 			.attr("cx", function(d) {
	// 						return xScale(d.long);
	// 					})
	// 			.attr("cy", function(d) {
	// 						return yScale(d.lat);
	// 					})
	// 			.attr("r", 2 )
	// 			.style("opacity", 0.5)
	// 			.style("fill", "#DD322D")
	// 			.on("mouseover", function(d,i) {
	// 				console.log(d.long)
	// 			});

	var rects = svg.selectAll("rect")
				.data(dataset)
				.enter()
				.append("rect")
				.attr("x", function(d) {
							return xScale(d.long);
						})
				.attr("y", function(d) {
							return yScale(d.lat);
						})
				.attr("width", function(){
					return width / maxLong;
				})
				.attr("height", function(){
					return height / -(minLat - maxLat);
				})
				.style("fill", "#DD322D")
				.on("mouseover", function(d,i) {
					console.log(d.long)
				});				

}

