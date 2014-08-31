'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    projectJsDir: 'source/assets/js/project',
    thirdPartyJsDir: 'source/assets/js/thirdparty',
    outputJsDir: 'source/assets/js/output',
    closureDir: 'source/assets/js/thirdparty/closure-library',

    bower: {
      install: {
        options: {
          targetDir: '<%= thirdPartyJsDir %>',
          install: true,
          verbose: false,
          cleanTargetDir: false,
          cleanBowerDir: false,
          bowerOptions: {}
        },
      }
    },

    open : {
      dev : {
        path: 'http://dev.fengshui.com',
        app: 'Google Chrome'
      },
      release : {
        path : 'http://release.fengshui.com',
        app: 'Google Chrome'
      },
    },

    watch: {
      html: {
        files: ['source/*.{html,php}'],
        options: {
          livereload: true,
          interrupt: true,
          spawn: false,
        },
      },
      soy: {
        files: ['source/assets/soy/*.soy'],
        tasks: ['closureSoys'],
      },
      js: {
        files: ['<%= projectJsDir %>/**/*.js'],
        tasks: ['closureDepsWriter'],
        options: {
          livereload: true,
          interrupt: true,
          spawn: false,
        },
      },
      scss: {
        files: ['source/assets/styles/scss/**/*.scss'],
        tasks: ['compass']
      },
      css: {
        files: ['source/assets/styles/css/*.css'],
        options: {
          livereload: true,
          interrupt: true,
          spawn: false,
        },
      },
      svg: {
        files: ['source/assets/styles/fonts/fontcustom/icons/*.svg'],
        tasks: ['webfont']
      }
    },

    compass: {
      development: {
        options: {
          sassDir: 'source/assets/styles/scss',
          cssDir: 'source/assets/styles/css',
          fontsDir: 'source/assets/styles/fonts',
          imagesDir: 'source/assets/images',
          generatedImagesDir: 'source/assets/images/generated',
          relativeAssets: true,
          noLineComments: true,
          assetCacheBuster: true,
          watch: false,
          outputStyle: 'compressed', //nested, expanded, compact, compressed
          environment: 'development'
        }
      },
    },

    webfont: {
      icons: {
        src: 'source/assets/styles/fonts/fontcustom/icons/*.svg',
        dest: 'source/assets/styles/fonts/fontcustom',
        destCss: 'source/assets/styles/scss',
        options: {
          stylesheet: 'scss',
          htmlDemo: true,
          hashes: true,
          engine: 'node',
          templateOptions: {
            baseClass: 'icon',
            classPrefix: 'icon-',
            mixinPrefix: 'icon-'
          }
        }
      }
    },

    closureSoys: {
      all: {
        src: 'source/assets/soy/*.soy',
        soyToJsJarPath: 'utils/SoyToJsSrcCompiler.jar',
        outputPathFormat: '<%= projectJsDir %>/templates/{INPUT_FILE_NAME}.js',
        options: {
          shouldGenerateJsdoc: true,
          shouldProvideRequireSoyNamespaces: true
        }
      }
    },

    closureDepsWriter: {
      options: {
        depswriter: '<%= closureDir %>/closure/bin/build/depswriter.py',
        root_with_prefix: '"<%= projectJsDir %> ../../../../project"',
      },

      main: {
        dest: '<%= outputJsDir %>/feng-deps.js'
      }
    },

    closureBuilder:  {
      options: {
        builder: '<%= closureDir %>/closure/bin/build/closurebuilder.py',
        inputs: '<%= projectJsDir %>/feng.js',
      },

      main: {
        src: ['<%= closureDir %>', '<%= projectJsDir %>'],
        dest: '<%= outputJsDir %>/feng-build.js'
      }
    },

    closureCompiler: {
      options: {
        compilerFile: 'utils/compiler.jar',
        checkModified: true,
        compilerOpts: {
           compilation_level: 'ADVANCED_OPTIMIZATIONS',//WHITESPACE_ONLY, SIMPLE_OPTIMIZATIONS, ADVANCED_OPTIMIZATIONS
           externs: [
           '<%= projectJsDir %>/externs.js',
           '<%= thirdPartyJsDir %>/greensock/TweenMax.min.js'
            ],
           define: ["'goog.DEBUG=false'"],
           warning_level: 'verbose',
           jscomp_off: ['checkTypes', 'fileoverviewTags'],
           summary_detail_level: 3
        },
        execOpts: {
           maxBuffer: 999999 * 1024
        },
      },

      main: {
        src: '<%= outputJsDir %>/feng-build.js',
        dest: '<%= outputJsDir %>/feng-compiled.js'
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-closure-soy');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-webfont');

  // Default task.
  grunt.registerTask('default', ['bower', 'compass', 'webfont', 'closureSoys', 'closureDepsWriter', 'open:dev', 'watch']);
  grunt.registerTask('dev', ['compass', 'webfont', 'closureSoys', 'closureDepsWriter', 'open:dev', 'watch']);
  grunt.registerTask('build', ['compass', 'webfont', 'closureSoys', 'closureBuilder', 'closureCompiler', 'open:release']);
};
