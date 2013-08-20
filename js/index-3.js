
console.log("Wassup");
/*	Width and height */
var width = 618;
var height = 398;
/*	Global variable to control the length of D3 transitons */
var duration = 150;
/*	Global variable to hold the cc or ac choice */
var count = "cc"
/*	Global variable to hold the cc or ac choice */
var field = "all"
/*	Global variable to control which year to disylay */
var displayYear = 2012;
/* An array to store every ac and cc value to be accesed by the scale function */
var countArray = [];
/*	The size of the largest circle */
var maxRadius = 70;
/*	The size of the smallest circle */
var minRadius = 1;
/*	A global variable to control the zoom level of the map */
var zoom = 1;
var horizontal = 0;
var vertical = 0;
var maxOffset = 400;
var moveIncrement = 10;
var maxZoom = 10;
var zoomIncrement = 1;
var newHorizontal;
var newVertical;

/*	Define map projection */
var	projection = d3.geo.mercator()
		.translate([width/2, height/1.5])
		.scale([105]);

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

/*	Call the drag behavior on the group that contains all of the elements */
svg.call(d3.behavior.drag().on("drag", move));

/*	Function called by dragging that adds the difference in the mouses x and y cords
	to the horizontal and vertical variables (divided by the zoom level to prevent
	weird behavior when zoomed in) and then translates the group to these new cords */
function move(){
	svg.selectAll("text").remove();

	horizontal = horizontal + (d3.event.dx / zoom);
	vertical = vertical + (d3.event.dy / zoom);

	svg.attr("transform", "scale(" + zoom + "), translate(" + horizontal + "," + vertical + ")");

};

/* Define a clipping path to trim the oceans path to the extent of the svg */
svg.append("clipPath")
	.attr("id", "map-area")
	.append("rect")
	.attr("width", width)
	.attr("height", height);


/*	1 - First create the map */
			   
/* Load in GeoJSON data */
d3.json("data/oceans.json", makeMap);

function makeMap (json) {
	/* Bind data and create one path per GeoJSON feature */
	var mapPaths = svg.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("clip-path", "url(#map-area)")
		.style("fill", "#D5E8F4");
		/* Load in ranking data and call draw() */
		d3.json('data/ranking-country-global-2.json', draw);
}

/*	2 - Then add the slider and circles */

function draw(data) {

	/* Create the first slider for the year values */
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

	/*	Set the display year and call updateYear()
		When the slider or the select box are changed */
	function updateYearSlider () {
		displayYear = this.value;
		updateYear();
	};

	d3.selectAll("#selectYear").on("change", function(){
		displayYear = this.value;
		updateYear();
	});

	/* Create a second slider for the field values */
	fdSlider.createSlider({
		/*	Associate the select list */
		inp:document.getElementById("selectField"),
		/* 	Use the tween animation 'jump'
			Jump causes the change callback to only be fired once per change
		*/
		animation:"jump",
		/* Keep the form element hidden */
		hideInput:true,		
		callbacks:{"change":[updateFieldSlider]}
	});

	function updateFieldSlider () {
		field = this.value;
		updateCircles();
	};

	d3.selectAll("#selectField").on("change", function(){
		field = this.value;
		updateCircles();
	});

	/*	function called to select a new year from the json file 
		and transition the circle's radii to these values */
	function updateYear() {

		switch (displayYear) { 
			case "2008":
				circles.data(data.year2008, function(d, i) {
					return d.country;
				});
				updateCircles();
				break;
			case "2009":
				circles.data(data.year2009, function(d, i) {
					return d.country;
				});
				updateCircles();
				break;
			case "2010":
				circles.data(data.year2010, function(d, i) {
					return d.country;
				});
				updateCircles();
				break;
			case "2011":
				circles.data(data.year2011, function(d, i) {
					return d.country;
				});
				updateCircles();
				break;
			case "2012":
				circles.data(data.year2012, function(d, i) {
					return d.country;
				});
				updateCircles();
				break; 											 
			default:
				circles.data(data.year2012, function(d, i) {
					return d.country;
				});			
				updateCircles();
				break;		
		}

	}

	/* When the CC or AC buttons are clicked call changeCount() */
	d3.selectAll(".count-select input").on("change", changeCount);

	/* Function to transition the size of the circles to the ac or the cc value */
	function changeCount() {
		count = this.value;
		updateCircles();
	}

	/*	Let's build some scales */
	/*	First loop through each year and push each ac and cc value into the countArray array */
	/*	It may be necessary to loop through each field as well */
	for (var i = 0; i < data.year2008.length; i++) {
		var thisAC = data.year2008[i].ac;
		countArray.push(thisAC);
		var thisCC = data.year2008[i].cc;
		countArray.push(thisCC);
	};
	for (var i = 0; i < data.year2009.length; i++) {
		var thisAC = data.year2009[i].ac;
		countArray.push(thisAC);
		var thisCC = data.year2009[i].cc;
		countArray.push(thisCC);		
	};
	for (var i = 0; i < data.year2010.length; i++) {
		var thisAC = data.year2010[i].ac;
		countArray.push(thisAC);
		var thisCC = data.year2010[i].cc;
		countArray.push(thisCC);		
	};
	for (var i = 0; i < data.year2011.length; i++) {
		var thisAC = data.year2011[i].ac;
		countArray.push(thisAC);
		var thisCC = data.year2011[i].cc;
		countArray.push(thisCC);		
	};
	for (var i = 0; i < data.year2012.length; i++) {
		var thisAC = data.year2012[i].ac;
		countArray.push(thisAC);
		var thisCC = data.year2012[i].cc;
		countArray.push(thisCC);		
	};

	/* Then use D3's extent to grab the min and max values */
	var countExtent = d3.extent(countArray);

	/*	Then the extent values to define a scale for the circle's radii
		going from 0 to maxRadius */
	var countScale = d3.scale.linear()
		.domain(countExtent)
		.range([minRadius, maxRadius]);

	/*	Set up circles - one for each country in the chosen year 
		but don't define the radius yet */
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
				.style("opacity", 0.75)
				/*	Add mouse over tooltips to display some of the circle's data */ 
				.on("mouseover", function (d) {
					var fontSize = 14 / zoom;

					var xPosition = d3.select(this).attr("cx");
					var yPosition = d3.select(this).attr("cy");

					var chosenCount = "CC: " + d.cc;
					var chosenField = "All fields"


					svg.selectAll("text").remove();

					switch (count) { 
						case "cc":
							chosenCount = "CC: " + d.cc;
							break;
						case "ac":
							chosenCount = "AC: " + d.ac;
							break;
						default:
							chosenCount = "CC: " + d.cc;
						break;		
					}

					switch (field) {
						case "all":
							chosenField = "All fields"
							break;
						case "phys":
							chosenField = "Physics"
							break;
						case "life":
							chosenField = "Life sciences"
							break;
						case "earth":
							chosenField = "Earth sciences"
							break;
						case "chem":
							chosenField = "Chemistry"
							break;
						default:
							chosenField = "All fields"
							break;																	
					}

					svg.append('text')
						.text(d.country)
						.attr('x', d3.select(this).attr("cx"))
						.attr('y', d3.select(this).attr("cy") - (30 / zoom))
						.attr("text-anchor", "left")
						.attr("font-family", "sans-serif")
						.attr("font-size", fontSize)
						.attr("fill", "black")

					svg.append('text')
						.text(chosenField + " " + displayYear)
						.attr('x', d3.select(this).attr("cx"))
						.attr('y', d3.select(this).attr("cy") - (15 / zoom))
						.attr("text-anchor", "left")
						.attr("font-family", "sans-serif")
						.attr("font-size", fontSize)
						.attr("fill", "black")
						
					svg.append('text')
						.text(chosenCount)
						.attr('x', d3.select(this).attr("cx"))
						.attr('y', d3.select(this).attr("cy"))
						.attr("text-anchor", "left")
						.attr("font-family", "sans-serif")
						.attr("font-size", fontSize)
						.attr("fill", "black")
								
				})
				.on("mouseout", function() {
					/* Hide the tooltip */
					svg.selectAll("text").remove();			
				});



	/* Transition the size of the circles to the ac or the cc value */
	function updateCircles() {
		svg.selectAll("text").remove();

		/* Update the header */
		d3.select(".outer-wrapper #year").html([displayYear]);

		switch (count) { 
			case "cc":
				d3.select(".outer-wrapper #count").html(["Corrected count"]);
				break;
			case "ac":
				d3.select(".outer-wrapper #count").html(["Article count"]);
				break;
			default:
				d3.select(".outer-wrapper #count").html(["Corrected count"]);
			break;		
		}

		switch (field) {
			case "all":
				d3.select(".outer-wrapper #field").html(["All fields"]);
				break;
			case "phys":
				d3.select(".outer-wrapper #field").html(["Physics"]);
				break;
			case "life":
				d3.select(".outer-wrapper #field").html(["Life sciences"]);
				break;
			case "earth":
				d3.select(".outer-wrapper #field").html(["Earth sciences"]);
				break;
			case "chem":
				d3.select(".outer-wrapper #field").html(["Chemistry"]);
				break;
			default:
				chosenField = "All fields"
				d3.select(".outer-wrapper #field").html(["All fields"]);
				break;																	
		}

		/* store this number to use to create a staggered transition */
		var numberOfCircles = data.year2008.length;

		switch (count) { 
			case "cc":
				switch (field) {
					case "all":
						circles.transition()
							.duration(duration)
							.delay(function(d, i) { 
								return i / numberOfCircles * duration; 
							})
							.attr("r", function(d, i) {
								return countScale(d.cc);
							})
							.style("fill", "#DD322D");
						break;
					case "phys":
						circles.transition()
							.duration(duration)
							.delay(function(d, i) { 
								return i / numberOfCircles * duration; 
							})
							.attr("r", function(d, i) {
								return countScale(d.ccPhys);
							})
							.style("fill", "#2E3191");				
						break;
					case "life":
						circles.transition()
							.duration(duration)
							.delay(function(d, i) { 
								return i / numberOfCircles * duration; 
							})
							.attr("r", function(d, i) {
								return countScale(d.ccLife);
							})
							.style("fill", "#90278E");							
						break;
					case "earth":
						circles.transition()
							.duration(duration)
							.delay(function(d, i) { 
								return i / numberOfCircles * duration; 
							})
							.attr("r", function(d, i) {
								return countScale(d.ccEarth);
							})
							.style("fill", "#B24802");							
						break;
					case "chem":
						circles.transition()
							.duration(duration)
							.delay(function(d, i) { 
								return i / numberOfCircles * duration; 
							})
							.attr("r", function(d, i) {
								return countScale(d.ccChem);
							})
							.style("fill", "#D43783");
						break;
					default:
						circles.transition()
							.duration(duration)
							.delay(function(d, i) { 
								return i / numberOfCircles * duration; 
							})
							.attr("r", function(d, i) {
								return countScale(d.cc);
							})
							.style("fill", "#DD322D");
						break;																	
				}
				break;

			case "ac":
				switch (field) {
					case "all":
						circles.transition()
							.duration(duration)
							.delay(function(d, i) { 
								return i / numberOfCircles * duration; 
							})
							.attr("r", function(d, i) {
								return countScale(d.ac);
							})
							.style("fill", "#DD322D");
						break;
					case "phys":
						circles.transition()
							.duration(duration)
							.delay(function(d, i) { 
								return i / numberOfCircles * duration; 
							})
							.attr("r", function(d, i) {
								return countScale(d.acPhys);
							})
							.style("fill", "#2E3191");				
						break;
					case "life":
						circles.transition()
							.duration(duration)
							.delay(function(d, i) { 
								return i / numberOfCircles * duration; 
							})
							.attr("r", function(d, i) {
								return countScale(d.acLife);
							})
							.style("fill", "#90278E");	
						break;
					case "earth":
						circles.transition()
							.duration(duration)
							.delay(function(d, i) { 
								return i / numberOfCircles * duration; 
							})
							.attr("r", function(d, i) {
								return countScale(d.acEarth);
							})
							.style("fill", "#B24802");
						break;
					case "chem":
						circles.transition()
							.duration(duration)
							.delay(function(d, i) { 
								return i / numberOfCircles * duration; 
							})
							.attr("r", function(d, i) {
								return countScale(d.acChem);
							})
							.style("fill", "#D43783");
						break;
					default:
						circles.transition()
							.duration(duration)
							.delay(function(d, i) { 
								return i / numberOfCircles * duration; 
							})
							.attr("r", function(d, i) {
								return countScale(d.ac);
							})
							.style("fill", "#DD322D");
						break;																	
				}
				break;
			default:
				circles.transition()
						.duration(duration)
						.delay(function(d, i) { 
							return i / numberOfCircles * duration; 
						})
						.attr("r", function(d, i) {
							return countScale(d.cc);
						})
						.style("fill", "#DD322D");
			break;		
		}
	}

	/* An inital call of updateCircles() to show the circles on page load */
	updateCircles();





	var zoomInIcon = holder.append("path")
		.attr("d", "M22.646,19.307c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127l3.535-3.537L22.646,19.307zM13.688,20.369c-3.582-0.008-6.478-2.904-6.484-6.484c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486C20.165,17.465,17.267,20.361,13.688,20.369zM15.687,9.051h-4v2.833H8.854v4.001h2.833v2.833h4v-2.834h2.832v-3.999h-2.833V9.051z")
		.style("fill", "#666666")
		.style("pointer-events","none")
		.attr("transform", "translate(" + (width - 50) + "," + 15 +  "), scale(1.25)");

	var zoomInButton = holder.append("rect")
		.attr("width", 44)
		.attr("height", 44)
		.style("fill", "hotpink")
		.style("opacity", 0.0)
		.attr("transform", "translate(" + (width - 50) + "," + 10 +  ")")
		.style("cursor", "pointer")
		.on("click", function(e){
			if (zoom < maxZoom) {
				zoom += zoomIncrement;
				zoomMapIn();
			};
			d3.event.preventDefault();
			return false;
		})
		.on("mouseover", function() {
			zoomInIcon.transition()
				.duration(duration)
				.style("fill", "#333333")		
		})
		.on("mouseout", function() {
			zoomInIcon.transition()
				.duration(duration)
				.style("fill", "#666666")	
		});
	

	var zoomOutIcon = holder.append("path")
		.attr("d", "M22.646,19.307c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127l3.535-3.537L22.646,19.307zM13.688,20.369c-3.582-0.008-6.478-2.904-6.484-6.484c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486C20.165,17.465,17.267,20.361,13.688,20.369zM8.854,11.884v4.001l9.665-0.001v-3.999L8.854,11.884z")
		.style("fill", "#666666")
		.style("pointer-events","none")
		.attr("transform", "translate(" + (width - 50) + "," + 65 +  "), scale(1.25)");

	var zoomOutButton = holder.append("rect")
		.attr("width", 44)
		.attr("height", 44)
		.style("fill", "hotpink")
		.style("opacity", 0.0)
		.attr("transform", "translate(" + (width - 50) + "," + 60 +  ")")
		.style("cursor", "pointer")
		.on("click", function(e){
			if (zoom > 1) {
				zoom -= zoomIncrement;
				zoomMapOut();
			};
			d3.event.preventDefault();
			return false;
		})
		.on("mouseover", function() {
			zoomOutIcon.transition()
				.duration(duration)
				.style("fill", "#333333")		
		})
		.on("mouseout", function() {
			zoomOutIcon.transition()
				.duration(duration)
				.style("fill", "#666666")	
		});			

	var homeIcon = holder.append("path")
		.attr("d", "M27.812,16l-3.062-3.062V5.625h-2.625v4.688L16,4.188L4.188,16L7,15.933v11.942h17.875V16H27.812zM16,26.167h-5.833v-7H16V26.167zM21.667,23.167h-3.833v-4.042h3.833V23.167z")
		.style("fill", "#666666")
		.style("pointer-events","none")
		.attr("transform", "translate(" + (width - 50) + "," + 110 +  "), scale(1.25)");

	var homeButton = holder.append("rect")
		.attr("width", 44)
		.attr("height", 44)
		.style("fill", "hotpink")
		.style("opacity", 0.0)
		.attr("transform", "translate(" + (width - 50) + "," + 110 +  ")")
		.style("cursor", "pointer")
		.on("click", function(e){
			zoom = 1;
			horizontal = 0;
			vertical = 0;

			adjustMap();
			d3.event.preventDefault();
			return false;
		})
		.on("mouseover", function() {
			homeIcon.transition()
				.duration(duration)
				.style("fill", "#333333")		
		})
		.on("mouseout", function() {
			homeIcon.transition()
				.duration(duration)
				.style("fill", "#666666")	
		});

	var upIcon = holder.append("path")
		.attr("d", "M23.963,20.834L17.5,9.64c-0.825-1.429-2.175-1.429-3,0L8.037,20.834c-0.825,1.429-0.15,2.598,1.5,2.598h12.926C24.113,23.432,24.788,22.263,23.963,20.834z")
		.style("fill", "#666666")
		.style("pointer-events","none")
		.attr("transform", "translate(" + 20 + "," + 5 +  ")");

	var upButton = holder.append("rect")
		.attr("width", 20)
		.attr("height", 20)
		.style("fill", "hotpink")
		.style("opacity", 0.0)
		.attr("transform", "translate(" + 25 + "," + 10 +  ")")
		.style("cursor", "pointer")
		.on("click", function(e){
			if (vertical < maxOffset) {
				vertical += moveIncrement;
			};

			adjustMap();
			d3.event.preventDefault();
			return false;
		})
		.on("mouseover", function() {
			upIcon.transition()
				.duration(duration)
				.style("fill", "#333333")		
		})
		.on("mouseout", function() {
			upIcon.transition()
				.duration(duration)
				.style("fill", "#666666")	
		});		

	var leftIcon = holder.append("path")
		.attr("d", "M20.834,8.037L9.641,14.5c-1.43,0.824-1.43,2.175,0,3l11.193,6.463c1.429,0.826,2.598,0.15,2.598-1.5V9.537C23.432,7.887,22.263,7.211,20.834,8.037z")
		.style("fill", "#666666")
		.style("pointer-events","none")
		.attr("transform", "translate(" + 0 + "," + 25 +  ")");

	var leftButton = holder.append("rect")
		.attr("width", 20)
		.attr("height", 20)
		.style("fill", "hotpink")
		.style("opacity", 0.0)
		.attr("transform", "translate(" + 5 + "," + 30 +  ")")
		.style("cursor", "pointer")
		.on("click", function(e){
			if (horizontal < maxOffset) {
				horizontal += moveIncrement;
			};

			adjustMap();
			d3.event.preventDefault();
			return false;
		})
		.on("mouseover", function() {
			leftIcon.transition()
				.duration(duration)
				.style("fill", "#333333")		
		})
		.on("mouseout", function() {
			leftIcon.transition()
				.duration(duration)
				.style("fill", "#666666")	
		});		

	var rightIcon = holder.append("path")
		.attr("d", "M11.166,23.963L22.359,17.5c1.43-0.824,1.43-2.175,0-3L11.166,8.037c-1.429-0.826-2.598-0.15-2.598,1.5v12.926C8.568,24.113,9.737,24.789,11.166,23.963z")
		.style("fill", "#666666")
		.style("pointer-events","none")
		.attr("transform", "translate(" + 40 + "," + 25 +  ")");

	var rightButton = holder.append("rect")
		.attr("width", 20)
		.attr("height", 20)
		.style("fill", "hotpink")
		.style("opacity", 0.0)
		.attr("transform", "translate(" + 45 + "," + 30 +  ")")
		.style("cursor", "pointer")
		.on("click", function(e){
			if (horizontal > -maxOffset) {
				horizontal -= moveIncrement;
			};
			
			adjustMap();
			d3.event.preventDefault();
			return false;
		})
		.on("mouseover", function() {
			rightIcon.transition()
				.duration(duration)
				.style("fill", "#333333")		
		})
		.on("mouseout", function() {
			rightIcon.transition()
				.duration(duration)
				.style("fill", "#666666")	
		});			

	var downIcon = holder.append("path")
		.attr("d", "M8.037,11.166L14.5,22.359c0.825,1.43,2.175,1.43,3,0l6.463-11.194c0.826-1.429,0.15-2.598-1.5-2.598H9.537C7.886,8.568,7.211,9.737,8.037,11.166z")
		.style("fill", "#666666")
		.style("pointer-events","none")
		.attr("transform", "translate(" + 20 + "," + 45 +  ")");				

	var downButton = holder.append("rect")
		.attr("width", 20)
		.attr("height", 20)
		.style("fill", "hotpink")
		.style("opacity", 0.0)
		.attr("transform", "translate(" + 25 + "," + 50 +  ")")
		.style("cursor", "pointer")
		.on("click", function(e){
			if (vertical > -maxOffset) {
				vertical -= moveIncrement;
			};
			
			adjustMap();
			d3.event.preventDefault();
			return false;
		})
		.on("mouseover", function() {
			downIcon.transition()
				.duration(duration)
				.style("fill", "#333333")		
		})
		.on("mouseout", function() {
			downIcon.transition()
				.duration(duration)
				.style("fill", "#666666")	
		});	


	function adjustMap() {
		svg.selectAll("text").remove();

		svg.transition()
			.duration(duration)
			.attr("transform", "scale(" + zoom + "), translate(" + horizontal + "," + vertical + ")")
	}

	function zoomMapIn() {
		svg.selectAll("text").remove();	

		var adjustZoom = zoom - 1;

		horizontal = horizontal - ((width/adjustZoom)/4);
		vertical = vertical - ((height/adjustZoom)/4);		

		svg.transition()
			.duration(duration)
			.attr("transform", "scale(" + zoom + "), translate(" + horizontal + "," + vertical + ")")
	}

	function zoomMapOut() {
		svg.selectAll("text").remove();

		horizontal = horizontal + ((width/zoom)/4);
		vertical = vertical + ((height/zoom)/4);

		svg.transition()
			.duration(duration)
			.attr("transform", "scale(" + zoom + "), translate(" + horizontal + "," + vertical + ")")
	}	

}





