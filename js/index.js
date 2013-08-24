/*	Width and height */
var width = 940;
var height = 630;
/*	Global variable to control the length of D3 transitons */
var duration = 150;


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

/*	Add a green rectangle, the size of the SVG that will sit at the back
	to give colour to the land and allow the whole area to be draggable
 */
svg.append("rect")
		.attr("width", width)
		.attr("height", height)
		.style("fill", "#C2CD9D");

/*	1 - First create the map */
			   
/* Load in GeoJSON data */
/* Not needed right now but an overlay map might be useful for debugging */
// d3.json("data/oceans.json", makeMap);

function makeMap (json) {
	/* Bind data and create one path per GeoJSON feature */
	var mapPaths = svg.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("d", path)
		.style("fill", "#D5E8F4");
		/* Load in ranking data and call draw() */
		
}

d3.json('data/ranking-country-global-2.json', draw);

/*	2 - Then add the slider and circles */

function draw(data) {

	/*	Set up circles  */
	var circles = svg.selectAll("circle")
				.data(data.year2012, function(d, i) {
					return d.country;
				})
				.enter()
				.append("circle")
				.attr("cx", function(d) {
							return projection([d.lon, d.lat])[0];
						})
				.attr("cy", function(d) {
							return projection([d.lon, d.lat])[1];
						})
				.attr("r", 5 )
						.style("fill", "#DD322D")

}

