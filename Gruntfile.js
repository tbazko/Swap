module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        sourcemap: 'none',
        style: 'compressed'
      },
      dist: {
        files: {
          'public/stylesheets/master.css' : 'client/scss/master.scss'
        }
      }
    },
    autoprefixer:{
      options: {
        browsers: ['last 3 versions']
      },
      dist:{
        files:{
          'public/stylesheets/master.css':'public/stylesheets/master.css'
        }
      }
    },
    uglify: {
      options: {
        compress: {
          dead_code: true,
          drop_debugger: true,
          global_defs: {
            "DEBUG": false
          }
        },
        report: 'gzip'
      },
			my_target: {
				files: {
					'public/javascripts/base.js': ['public/javascripts/base.js'],
          'public/javascripts/index.js': ['public/javascripts/index.js'],
          'public/javascripts/itemOverview.js': ['public/javascripts/itemOverview.js'],
          'public/javascripts/signUp.js': ['public/javascripts/signUp.js'],
          'public/javascripts/swapRequestOverview.js': ['public/javascripts/swapRequestOverview.js'],
          'public/javascripts/swapRequestsList.js': ['public/javascripts/swapRequestsList.js'],
          'public/javascripts/userProfileEdit.js': ['public/javascripts/userProfileEdit.js'],
          'public/javascripts/editItemForm.js': ['public/javascripts/editItemForm.js'],
          'public/javascripts/userProfile.js': ['public/javascripts/userProfile.js']
				}
			}
		},
		watch: {
			css: {
        files: 'client/scss/**/*.scss',
        tasks: ['sass', 'autoprefixer'],
        options: {
          livereload: true, // needed to run LiveReload
        }
      },
			browserify: {
				files: ['./client/js/*.js', './client/js/**/*.js'],
				tasks: ['browserify']
			}
		},
		browserify: {
			dist: {
				options: {
					transform: [
						['babelify', {
							presets: ['es2015', 'react']
						}]
					]
				},
				files: {
					'public/javascripts/base.js': ['client/js/modules/base.js'],
          'public/javascripts/index.js': ['client/js/modules/index.js'],
          'public/javascripts/itemOverview.js': ['client/js/modules/base.js', 'client/js/modules/itemOverview.js'],
          'public/javascripts/signUp.js': ['client/js/modules/base.js', 'client/js/modules/signUp.js'],
          'public/javascripts/swapRequestOverview.js': ['client/js/modules/base.js', 'client/js/modules/swapRequestOverview.js'],
          'public/javascripts/swapRequestsList.js': ['client/js/modules/base.js', 'client/js/modules/swapRequestsList.js'],
          'public/javascripts/userProfileEdit.js': ['client/js/modules/base.js', 'client/js/modules/userProfileEdit.js'],
          'public/javascripts/editItemForm.js': ['client/js/modules/base.js', 'client/js/modules/editItemForm.js'],
          'public/javascripts/userProfile.js': ['client/js/modules/base.js', 'client/js/modules/userProfile.js'],
				}
			}
		}
  });

  grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['browserify', 'uglify']);
}
