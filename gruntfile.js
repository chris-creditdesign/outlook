module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			build: {
				files: {
					'dist/js/drought-map.js': ['assets/js/drought-map.js']
				}
			}
		},

		cssmin: {
			build: {
				src: ['assets/css/drought-map.css'],
				dest: 'dist/css/drought-map.css'
			}
		},

		concat: {
			buildIndex: {
				src: ['assets/headers/outlook-header.html', 'map.html', 'assets/headers/outlook-footer.html'],
				dest: 'assets/index.html'
			},
			distIndex: {
				src: ['assets/headers/dist-header.html', 'map.html', 'assets/headers/dist-footer.html'],
				dest: 'dist/drought-map.html'
			}
		},

		watch: {
			html: {
				files: ['map.html'],
				tasks: ['concat']
			},
			js: {
				files: ['assets/js/drought-map.js'],
				tasks: ['uglify']
			},
			css: {
				files: ['assets/css/drought-map.css'],
				tasks: ['cssmin']
			}
		}

	});

	grunt.registerTask('default', ['watch']);

};