'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        watch: {
            js: {
                files: '<%= jshint.all %>',
                tasks: ['combine','copy:examples']
            },
            docs: {
                files: '<%= jshint.all %>',
                tasks: ['jsdoc']                
            }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: [
                    'src/*.js'
                    ],
                dest: '<%= pkg.name %>.js'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'Gruntfile.js',
                'src/*.js'
            ]
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                sourceMap: '<%= pkg.name %>.js.map',
                sourceMappingURL: '<%= pkg.name %>.js.map',
                sourceMapPrefix: 2
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: '<%= pkg.name %>.min.js'
            }
        },
        copy: {
            examples: {
                files: [
                    {expand: true, flatten: true, src: ['bower_components/angular/angular.min.js'], dest: 'examples/assets/js/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['bower_components/angular/angular.min.js.map'], dest: 'examples/assets/js/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['bower_components/d3/d3.min.js'], dest: 'examples/assets/js/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['bower_components/c3/c3.min.js'], dest: 'examples/assets/js/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['bower_components/c3/c3.min.css'], dest: 'examples/assets/css/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['c3-angular.js'], dest: 'examples/assets/js/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['c3-angular.min.js'], dest: 'examples/assets/js/', filter: 'isFile'},
                    {expand: true, flatten: true, src: ['c3-angular.min.js.map'], dest: 'examples/assets/js/', filter: 'isFile'}
                ]
            },
            bysource: {
                files: [
                    {expand: true, flatten: true, src: ['c3-angular.js'], dest: 'examples/assets/js/', filter: 'isFile'}
                ]  
            }
        },
        devserver: {
            options: {
                base: 'examples',
                port:8000
            },
            server: {}
        },
      jsdoc : {
        dist: {
          src: [
            'src/**/*.js'
          ], 
          options: {
            destination: 'docs',
            configure: 'node_modules/angular-jsdoc/conf.json',
            template: 'node_modules/angular-jsdoc/template'
          }
        }
      }        
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-devserver');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('combine',['concat:dist','uglify:dist','copy:examples']);
};