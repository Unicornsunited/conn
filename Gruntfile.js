"use strict";

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({

        // Grunt-sass 
        sass: {
            dev: {
                options: {
                    sourceMap: true,
                    outputStyle: 'nested',
                },
                files: [{
                    src: ['scss/app.scss'],
                    dest: 'dist/app.min.css'
                }]
            },
            build: {
                options: {
                    sourceMap: false,
                    outputStyle: 'compressed',
                },
                files: [{
                    src: ['scss/app.scss'],
                    dest: 'dist/app.min.css'
                }]
            },
        },

        // Grunt-contrib-watch
        watch: {
            sass: {
                files: ['scss/**/*.scss'],
                tasks: ['sass:dev']
            },
            js: {
                files: ['js/**/*.js'],
                tasks: [
                    'babel:dev',
                    'uglify:dev'
                ]
            },
            options: {
                livereload: true,
                spawn: false
            }
        },
        connect: {
            dev: {
                options: {
                    port: process.env.PORT || 8080
                }
            },
            build: {
                options: {
                    port: process.env.PORT || 8080,
                    keepalive: true,
                    open: true
                }
            }
        },
        babel: {
            options: {
                sourceMap: true
            },
            dev: {
                files: [{
                    expand: true,
                    // cwd: 'lib/',
                    src: ['js/**/*.js'],
                    dest: 'dist/temp/',
                    ext: '.js'
                }],
            },
            build: {
                options: {
                    sourceMap: false
                },
                files: [{
                    expand: true,
                    // cwd: 'lib/',
                    src: ['js/**/*.js'],
                    dest: 'dist/temp/',
                    ext: '.js'
                }]
            }
        },
        uglify: {
            options: {
                mangle: false,
                screwIE8: true,
                sourceMap: true
            },
            dev: {
                files: {
                    'dist/app.min.js': ['dist/temp/**/*.js']
                }
            },
            build: {
                options: {
                    sourceMap: false,
                    drop_console: true
                },
                files: {
                    'dist/app.min.js': ['dist/temp/**/*.js']
                }
            }
        }
    });

    // Project configuration.
    // ... 

    // Loads Grunt Tasks
    require('load-grunt-tasks')(grunt);

    // Default task(s).
    // ...
    grunt.registerTask('build', [
        'sass:build',
        'babel:build',
        'uglify:build'
    ]);
    grunt.registerTask('deploy', [
        'build',
        'connect:build'
    ]);
    grunt.registerTask('dev', [
        'connect:dev',
        'babel:dev',
        'uglify:dev',
        'sass:dev',
        'watch'
    ]);
};
