module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        sourcemap: 'none'
      },
      dist: {
        files: {
          'public/stylesheets/master.css' : 'sass/master.scss'
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
    pug: {
      amd: {
        files: {
          'public/javascripts/templates/': ['views/FEDtemplates/*.pug']
        },
        options: {
          wrap: 'amd'
        }
      }
    },
    watch: {
      css: {
        files: 'sass/**/*.scss',
        tasks: ['sass', 'autoprefixer'],
        options: {
          livereload: true, // needed to run LiveReload
        }
      },
      pug: {
        files: 'views/FEDtemplates/*.pug',
        tasks: 'pug'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.registerTask('default', ['watch']);
}
