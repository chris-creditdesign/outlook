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

<<<<<<< HEAD
/* From http://detectmobilebrowsers.com/ */
function mobilecheck() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check; 
}
=======
>>>>>>> master

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
	// createSlider();

	if ( !jQuery.browser.mobile ) {
		window.setTimeout(function() {
				createSvg();
		}, 500);
	}

}





