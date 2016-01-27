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
                    dest: 'css/app.css'
                }]
            },
            build: {
                options: {
                    sourceMap: false,
                    outputStyle: 'compressed',
                },
                files: [{
                    src: ['scss/app.scss'],
                    dest: 'css/app.css'
                }]
            },
        },

        // Grunt-contrib-watch
        watch: {
            sass: {
                files: ['scss/**/*.scss'],
                tasks: ['sass:dev']
            },
            ts: {
                files: ['js/**/*.ts'],
                tasks: ['typescript:dev']
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
                    keepalive: true
                }
            }
        },
        typescript: {
            dev: {
                src: ['js/**/*.ts'],
                dest: 'dist/app.min.js',
                options: {
                    target: 'es5', //or es3 
                    sourceMap: true,
                    declaration: true,
                    references: [
                        'node_modules/definitely-typed-angular/angular.d.ts'
                    ]
                }
            },
            build: {
                src: ['js/**/*.ts'],
                dest: 'dist/app.min.js',
                options: {
                    target: 'es5', //or es3 
                    sourceMap: false,
                    declaration: true,
                    references: [
                        'node_modules/definitely-typed-angular/angular.d.ts'
                    ]
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
        'typescript:build'
    ]);
    grunt.registerTask('deploy', [
        'build',
        'connect:build'
    ]);
    grunt.registerTask('dev', [
        'connect:dev',
        'typescript:dev',
        'sass:dev',
        'watch'
    ]);
};
