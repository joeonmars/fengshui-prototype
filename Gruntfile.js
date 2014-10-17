'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    projectJsDir: 'source/assets/js/project',
    thirdPartyJsDir: 'source/assets/js/thirdparty',
    outputJsDir: 'source/assets/js/output',
    closureDir: 'source/assets/js/thirdparty/closure-library',
    releaseDir: 'release',
    
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

    concat: {
      thirdparty: {
        src: [
          '<%= thirdPartyJsDir %>/howler.min.js',
          '<%= thirdPartyJsDir %>/createjs/preloadjs-0.4.1.min.js',
          '<%= thirdPartyJsDir %>/greensock/TweenMax.min.js',
          '<%= thirdPartyJsDir %>/greensock/utils/Draggable.min.js',
          '<%= thirdPartyJsDir %>/threejs/build/three68.min.js',
          '<%= thirdPartyJsDir %>/threejs-utils/CombinedCamera.js',
          '<%= thirdPartyJsDir %>/threejs-utils/EffectComposer.js',
          '<%= thirdPartyJsDir %>/threejs-utils/RenderPass.js',
          '<%= thirdPartyJsDir %>/threejs-utils/ShaderPass.js',
          '<%= thirdPartyJsDir %>/threejs-utils/TexturePass.js',
          '<%= thirdPartyJsDir %>/threejs-utils/MaskPass.js',
          '<%= thirdPartyJsDir %>/threejs-utils/BloomPass.js',
          '<%= thirdPartyJsDir %>/threejs-utils/CopyShader.js',
          '<%= thirdPartyJsDir %>/threejs-utils/FXAAShader.js',
          '<%= thirdPartyJsDir %>/threejs-utils/VignetteShader.js',
          '<%= thirdPartyJsDir %>/threejs-utils/TriangleBlurShader.js',
          '<%= thirdPartyJsDir %>/threejs-utils/BrightnessContrastShader.js',
          '<%= thirdPartyJsDir %>/threejs-utils/HueSaturationShader.js',
          '<%= thirdPartyJsDir %>/threejs-utils/ConvolutionShader.js',
          '<%= thirdPartyJsDir %>/threejs-utils/OrbitControls.js',
          '<%= thirdPartyJsDir %>/pathfinding-browser.min.js'
          ],
        dest: '<%= outputJsDir %>/thirdparty.js'
      }
    },

    assemble: {
      share: {
        options: {
          assets: 'source/assets/',
          layout: 'source/assets/html/share/template/layout.hbs',
          flatten: true,
          pages: grunt.file.readJSON('source/assets/html/share/template/data.json')
        },
        files: {
          'test/actual/pages_array/': ['test/fixtures/pages/blog/index.hbs']
        }
      }
    },

    copy: {
      release: {
        files: [
          // includes files within path
          {expand: true, cwd: 'source/', src: [
            '**',
            '!assets/js/project/**',
            '!assets/js/output/feng-build.js',
            '!assets/js/output/feng-deps.js',
            '!assets/js/thirdparty/**',
            '!assets/styles/scss/**',
            '!assets/soy/**',
            '!assets/images/icons/*',
            '!assets/images/icons-2x/*',
            '!assets/images/ui/*',
            '!assets/images/ui-2x/*'
            ], dest: '<%= releaseDir %>', filter: 'isFile'},
        ]
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
           language_in: 'ECMASCRIPT5_STRICT',
           externs: [
            '<%= projectJsDir %>/externs.js',
            '<%= thirdPartyJsDir %>/threejs/build/three68.min.js',
            '<%= thirdPartyJsDir %>/threejs-utils/CombinedCamera.js',
            '<%= thirdPartyJsDir %>/threejs-utils/EffectComposer.js',
            '<%= thirdPartyJsDir %>/threejs-utils/RenderPass.js',
            '<%= thirdPartyJsDir %>/threejs-utils/ShaderPass.js',
            '<%= thirdPartyJsDir %>/threejs-utils/TexturePass.js',
            '<%= thirdPartyJsDir %>/threejs-utils/MaskPass.js',
            '<%= thirdPartyJsDir %>/threejs-utils/BloomPass.js',
            '<%= thirdPartyJsDir %>/threejs-utils/CopyShader.js',
            '<%= thirdPartyJsDir %>/threejs-utils/FXAAShader.js',
            '<%= thirdPartyJsDir %>/threejs-utils/VignetteShader.js',
            '<%= thirdPartyJsDir %>/threejs-utils/TriangleBlurShader.js',
            '<%= thirdPartyJsDir %>/threejs-utils/BrightnessContrastShader.js',
            '<%= thirdPartyJsDir %>/threejs-utils/HueSaturationShader.js',
            '<%= thirdPartyJsDir %>/threejs-utils/ConvolutionShader.js',
            '<%= thirdPartyJsDir %>/threejs-utils/OrbitControls.js'
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('assemble');

  // Default task.
  grunt.registerTask('default', ['bower', 'compass', 'webfont', 'closureSoys', 'closureDepsWriter', 'open:dev', 'watch']);
  grunt.registerTask('dev', ['compass', 'webfont', 'closureSoys', 'closureDepsWriter', 'open:dev', 'watch']);
  grunt.registerTask('build', ['compass', 'webfont', 'closureSoys', 'closureBuilder', 'closureCompiler', 'concat']);
  grunt.registerTask('release', ['compass', 'webfont', 'closureSoys', 'closureBuilder', 'closureCompiler', 'concat', 'copy', 'open:release']);
};
