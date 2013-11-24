module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			build: {
				files: {
					'dist/js/outlook-map.js': ['assets/js/outlook-map.js']
				}
			}
		},

		cssmin: {
			build: {
				src: ['assets/css/outlook-map.css'],
				dest: 'dist/css/outlook-map.css'
			}
		},

		concat: {
			buildIndex: {
				src: ['assets/headers/outlook-header.html', 'map.html', 'assets/headers/outlook-footer.html'],
				dest: 'assets/index.html'
			},
			distIndex: {
				src: ['assets/headers/dist-header.html', 'map.html', 'assets/headers/dist-footer.html'],
				dest: 'dist/outlook-map.html'
			}
		},

		watch: {
			html: {
				files: ['map.html'],
				tasks: ['concat']
			},
			js: {
				files: ['assets/js/outlook-map.js'],
				tasks: ['uglify']
			},
			css: {
				files: ['assets/css/outlook-map.css'],
				tasks: ['cssmin']
			}
		}

	});

	grunt.registerTask('default', ['watch']);

};