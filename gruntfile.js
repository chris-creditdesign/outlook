module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		uglify: {
			build: {
				files: {
					'dist/js/index.js': ['assets/js/index.js']
				}
			}
		},

		cssmin: {
			build: {
				src: ['assets/css/index.css'],
				dest: 'dist/css/index.css'
			}
		},

		concat: {
			buildIndex: {
				src: ['assets/headers/outlook-header.html', 'map.html', 'assets/headers/outlook-footer.html'],
				dest: 'assets/index.html'
			},
			distIndex: {
				src: ['assets/headers/dist-header.html', 'map.html', 'assets/headers/dist-footer.html'],
				dest: 'dist/index.html'
			}
		},

		watch: {
			html: {
				files: ['map.html'],
				tasks: ['concat']
			},
			js: {
				files: ['assets/js/index.js'],
				tasks: ['uglify']
			},
			css: {
				files: ['assets/css/index.css'],
				tasks: ['cssmin']
			}
		}

	});

	grunt.registerTask('default', ['watch']);

};