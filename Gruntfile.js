/**
 * Gruntfile used by grunt tool
 */

/** 
 * Main grunt function to automate build tasks
 * @param grunt {Object} - inject your grunt here
 */
module.exports = function(grunt) {
    // initial grunt config    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), // this will help to get access to package.json properties
        
        // configure task provided by grunt-typescript plugin
        typescript: {
            base: {
                src: ['src/ts/main.ts'], // which files to select
                dest: 'build/dev-dist/js/main.js', // where they'll go
                options: {
                    module: 'amd', // module resolving mechanism
                    target: 'es5', // target version of EcmaScript
                    sourceMap: true // generate source maps
                }
            },

            tests: {
                src: ['src/ts/test.ts'], // which files to select
                dest: 'build/dev-dist/js/tests.js', // where they will go,
                options: {
                    module: 'amd', // module resolving mechanism
                    target: 'es5', // target version of EcmaScript
                    sourceMap: true // generate sourcemaps
                }
            }
        },
        
        // configure task provided by grunt-contrib-watch plugin
        watch: {
            dev: {
                files: 'src/**/*', // which files will be watched for changes
                tasks: ['typescript', 'copy:dev'] // which tasks will be performed on changed files
            }
        },
        
        // configure task provided by grunt-browser-sync plugin
        browserSync: {
            dev: {
                bsFiles: {
                    // which files to host
                    src: [
                        'build/dev-dist/**/*',
                        'src/**/*' // for debugging with sourcemaps 
                    ]
                },
                options: {
                    watchTask: true, // watch files for changes and reload browser when they change
                    server: 'build/dev-dist', // server root directory
                    open: false // do not open browser automatically
                }
            }
        },
        
        // configure task provided by grunt-contrib-copy plugin
        copy: {
            dev: {
                files: [
                    // copy src/html/dev-dist/index.html to build/dev-dist/index.html
                    {expand: true, cwd: 'src/html/dev-dist', src: ['**/*.html'], dest: 'build/dev-dist/'},

                    // copy all files from vendor/js to build/dev/dist/js 
                    {expand: true, cwd: 'vendor/js', src: ['**/*'], dest: 'build/dev-dist/js/'},

                    // copy all files from assets/optimized to build/dev-dist
                    {expand: true, cwd: 'assets/optimized', src: ['**/*'], dest: 'build/dev-dist/'},

                    // copy all mp3 and ogg files (optimization not implemented) to build/dev-dist
                    {expand: true, cwd: 'assets/unoptimized', src: ['**/*.ogg', '**/*.mp3'], dest: 'build/dev-dist/'}
                ]
            },
            dist: {
                files: [
                    // copy src/html/dist/index.html to build/dist/index.html
                    {expand: true, cwd: 'src/html/dist', src: ['**/*.html'], dest: 'build/dist/'},

                    // copy all files from assets/optimized to build/dist
                    {expand: true, cwd: 'assets/optimized', src: ['**/*'], dest: 'build/dist/'},

                    // copy all mp3 and ogg files (optimization not implemented) to build/dist
                    {expand: true, cwd: 'assets/unoptimized', src: ['**/*.ogg', '**/*.mp3'], dest: 'build/dist/'}
                ]
            }
        },
        
        // configure task provided by grunt-contrib-uglify plugin
        uglify: {
            dist: {
                files: {
                    // 'destination.js': ['input1.js', 'input2.js']
                    // create bundle.js for production
                    'build/dist/js/bundle.min.js': ['build/dev-dist/js/main.js', 'build/dev-dist/js/phaser.js']
                }
            }
        },

        // configure task provided by grunt-contrib-imagemin plugin
        imagemin: {
            // png subtask
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    // optimize all unoptimized pngs and put output to assets/optimized
                    {expand: true, cwd: 'assets/unoptimized', src: ['**/*.png'], dest: 'assets/optimized', ext: '.png'}
                ]
            },

            // jpg subtask
            jpg: {
                options: {
                    progressive: true
                },
                files: [
                    // optimize all unoptimized jpgs and put output to assets/optimized
                    {expand: true, cwd: 'assets/unoptimized', src: ['**/*.jpg'], dest: 'assets/optimized', ext: '.jpg'}
                ]
            }
        },

        // configure task provided by grunt-contrib-compress plugin
        compress: {
            dist: {
                options: {
                    // lets build production dist.zip to share and host on servers
                    archive: 'build/dist.zip'
                },
                files: [
                    // process all files from build/dist
                    {expand: true, cwd: 'build/dist', src: ['**'], dest: 'release'}
                ]
            }
        }
    });
    
    // plugin loading section
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    
    // task register section
    grunt.registerTask('build-dev', ['imagemin', 'copy:dev', 'typescript']);
    grunt.registerTask('build-dev-server', ['imagemin', 'copy:dev', 'typescript', 'browserSync', 'watch:dev']);
    grunt.registerTask('dist', ['build-dev', 'copy:dist', 'uglify:dist']);
    grunt.registerTask('zip', ['dist', 'compress']);

    // default task can start dev server, watch files 
    // for changes and auto-reload page when needed
    // useful for development and debugging
    grunt.registerTask('default', ['build-dev']);
}
