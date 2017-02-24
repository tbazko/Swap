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
          'public/stylesheets/master.css' : 'scss/master.scss'
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
    watch: {
      css: {
        files: 'scss/**/*.scss',
        tasks: ['sass', 'autoprefixer'],
        options: {
          livereload: true, // needed to run LiveReload
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['watch']);
}
