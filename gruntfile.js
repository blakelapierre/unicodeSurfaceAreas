module.exports = function(grunt) {
	var pkg = grunt.file.readJSON('package.json');

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			public: {
				files: ['public/**/*', '!public/bundle.js'],
				tasks: ['browserify:dist']
			}
		},
		browserify: {
			dist: {
				files: {
					'public/bundle.js': ['public/app.js']
				}
			}
		},
		nodestatic: {
			server: {
				options: {
					port: 8080,
					base: 'public',
					dev: true
				}
			}
		}
	});

	grunt.registerTask('default', ['browserify:dist', 'nodestatic:server', 'watch:public']);
};