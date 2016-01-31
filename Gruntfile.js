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
            ts: {
                files: ['js/**/*.js'],
                tasks: ['browserify:dev']
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
        browserify: {
            dev: {
                files: {
                    "dist/app.min.js": ["js/**/*.js"]
                },
                options: {
                    transform: [
                        [
                            'babelify', {
                                'sourceMapRelative': "/dist/app.js.map",
                                'presets': [
                                    'es2015'
                                ]
                            }
                        ]
                    ]
                }
            },
            build: {
                files: {
                    "dist/app.min.js": ["js/**/*.js"]
                },
                options: {
                    transform: [
                        [
                            'babelify', {
                                'sourceMap': false,
                                'presets': [
                                    'es2015'
                                ]
                            }
                        ]
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
        'browserify:build'
    ]);
    grunt.registerTask('deploy', [
        'build',
        'connect:build'
    ]);
    grunt.registerTask('dev', [
        'connect:dev',
        'browserify:dev',
        'sass:dev',
        'watch'
    ]);
};
