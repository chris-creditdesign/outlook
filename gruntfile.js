module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			buildIndex: {
				src: ['assets/headers/outlook-header.html', 'map.html', 'assets/headers/outlook-footer.html'],
				dest: 'assets/index.html'
			},
			distIndex: {
				src: ['assets/headers/dist-header.html', 'map.html', 'assets/headers/dist-footer.html'],
				dest: 'dist/index.html'
			},
			buildData: {
				src: ['assets/data/precipitation_anomalies_annual_1979-2012.csv'],
				dest: 'dist/data/precipitation_anomalies_annual_1979-2012.csv'
			},
			buildCSS: {
				src: ['assets/css/index.css'],
				dest: 'dist/css/index.css'
			},
			buildJS: {
				src: ['assets/js/index.js'],
				dest: 'dist/js/index.js'
			}
		}
	});

	grunt.registerTask('default', []);

};