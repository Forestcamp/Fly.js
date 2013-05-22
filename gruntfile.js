/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            version: '<%= pkg.version %>',
            srcPath: 'src/',
            deployPath: 'deploy/',
            banner:
                '// Fly.js \n' +
                '// Distributed under MIT license\n'
        },
        concat: {
            options: {
                stripBanners: true
            },
            dist: {
                src: ['<%= meta.srcPath %>core/*.js', '<%= meta.srcPath %>render/*.js'],
                dest: '<%= meta.deployPath %>cocat.js'
            }
        },
        uglify: {
            options: {

            },
            dist: {
                src: '<%= meta.deployPath %>cocat.js',
                dest: '<%= meta.deployPath %>cocat.min.js'
            }
        },
        yuidoc: {
            name: '<%= pkg.name %>',
            description: '<%= pkg.description %>',
            version: '<%= pkg.version %>',
            url: '<%= pkg.homepage %>',
            options: {
                paths: '<%= meta.srcPath %>core',
                outdir: 'docs/'
            }
        },
        jslint: {
            directives: {
                nomen: true,
                vars: true,
                eqeq: true,
                plusplus: true,
                bitwise: true,
                globals: {
                    flyjs: true,
                    window: true,
                    createjs: true
                }
            },
            files: [
                'Gruntfile.js',
                'example/collide/entities/*.js',
                'example/collide/*.js',
                'example/invaders/*.js',
                'example/hero/*.js',
                'src/core/collision/*.js',
                'src/core/*.js',
                'src/render/*.js',
                'src/utils/*.js',
                'src/collection/*.js',
                'src/texture/*.js'
            ]
        },
        jshint: {
            options: {
                eqeqeq: true,
                eqnull: true,
                globals: {
                    flyjs: true,
                    window: true,
                    createjs: true
                }
            },
            uses_defaults: [
                'Gruntfile.js',
                'example/collide/entities/*.js',
                'example/collide/*.js',
                'example/invaders/*.js',
                'example/hero/*.js',
                'src/core/collision/*.js',
                'src/core/*.js',
                'src/render/*.js',
                'src/utils/*.js',
                'src/collection/*.js',
                'src/texture/*.js'
            ]
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');

    grunt.registerTask('docs', ['yuidoc']);

    grunt.registerTask('release', ['jslint', 'jshint']);
};