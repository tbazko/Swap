module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        sourcemap: 'none'
      },
      dist: {
        files: {
          'css/master.css' : 'css/master.scss'
        }
      }
    },
    autoprefixer:{
      options: {
        browsers: ['last 3 versions']
      },
      dist:{
        files:{
          'css/master.css':'css/master.css'
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'autoprefixer']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['watch']);
}