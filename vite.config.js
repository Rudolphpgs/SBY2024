import { defineConfig } from 'vite'
import { resolve } from 'path'
import glob from 'glob'
import handlebars from 'vite-plugin-handlebars'
import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'
import chokidar from 'chokidar'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import FullReload from 'vite-plugin-full-reload'

const WatchMode = () => ({
  name: 'output-plugin-stats',
  configResolved() {
    const imageConvert = chokidar.watch(
      './src/assets/images/*.{jpg,png,JPG,jpeg}',
      {
        ignoreInitial: true,
      }
    )

    imageConvert.on('add', (event, path) => {
      imagemin: imagemin(['./src/assets/images/*.{jpg,png,JPG,jpeg}'], {
        destination: './src/assets/images/',
        plugins: [imageminWebp({})],
      }).then(() => {
        console.log('Images Converted Successfully!!!')
      })
    })
  },
})
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    server: {
      port: 3000,
      hmr: true,
      host: 'localhost',
    },
    preview: {
      port: 8080,
      open: true,
    },
    root: './src/',
    base: './',
    //publicDir: '../public/',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@fonts': resolve(__dirname, './src/assets/fonts'),
        '@scss': resolve(__dirname, './src/assets/scss'),
      },
    },
    optimizeDeps: {
      exclude: ['js-big-decimal'],
    },
    build: {
      outDir: '../dist/',
      //  assetsDir: './assets/',
      emptyOutDir: true,
      copyPublicDir: false,
      cssCodeSplit: true,
      cssMinify: true,

      rollupOptions: {
        input: glob.sync(resolve(__dirname, 'src', '*.html')),
        output: {
          chunkFileNames: 'assets/js/[name].js',
          entryFileNames: 'assets/js/[name].js',

          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
              return 'assets/images/[name][extname]'
            }

            if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name][extname]'
            }

            if (/\.(woff|woff2|eot|ttf)$/.test(name ?? '')) {
              return 'assets/fonts/[name][extname]'
            }

            if (/\.(mp4|ogg)$/.test(name ?? '')) {
              return 'assets/videos/[name][extname]'
            }

            return 'assets/[name][extname]'
          },
        },
      },
    },
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: glob.sync(resolve(__dirname, 'src/assets/js/lib', '*.js')),
            dest: './assets/js/lib/',
          },
        ],
      }),
      WatchMode(),
      FullReload([
        // './src/*',
        './src/partials/*',
      ]),
      handlebars({
        //reloadOnPartialChange: true,
        partialDirectory: resolve(__dirname, './src/partials/'),
        context: {
          title: 'SBY',
          description: 'Lorem Ipsum is simply dummy ',
          phone: '123456789',
          email: 'test@test.com',
          bodyClass: (pathName) => {
            if (typeof pathName != 'undefined') {
              var name_ = pathName.slice(1, -5)
              if (name_ == 'index' || name_ == 'index_ar') {
                return 'homePage'
              } else {
                return (
                  'innerPage ' +
                  (name_.lastIndexOf('_ar') > 0 ? name_.slice(0, -3) : name_) +
                  'Page'
                )
              }
            }
          },
          langSwitch: (pathName) => {
            if (typeof pathName != 'undefined') {
              var name_ = pathName.slice(1, -5)

              if (name_.lastIndexOf('_ar') > 0) {
                return name_.slice(0, -3) + '.html'
              } else {
                return name_ + '_ar.html'
              }
            }
          },
          rooUrl: (pathName) => {
            if (typeof pathName != 'undefined') {
              var name_ = pathName.slice(1, -5)

              if (name_.lastIndexOf('_ar') > 0) {
                return 'index_ar.html'
              } else {
                return 'index.html'
              }
            }
          },
          dir: (pathName) => {
            if (typeof pathName != 'undefined') {
              var name_ = pathName.slice(1, -5)

              if (name_.lastIndexOf('_ar') > 0) {
                return 'rtl'
              } else {
                return 'ltr'
              }
            }
          },
          lang: (pathName) => {
            if (typeof pathName != 'undefined') {
              var name_ = pathName.slice(1, -5)

              if (name_.lastIndexOf('_ar') > 0) {
                return 'ar'
              } else {
                return 'en'
              }
            }
          },
          currentUrl: (pathName) => {
            if (typeof pathName != 'undefined') {
              return pathName.slice(1, -5)
            }
          },
        },

        helpers: {
          capitalize: (value) => value.toUpperCase(),
          isEqual: (value1, value2, options) => {
            return value1 === value2
          },
          menuLink: (lang, pathName) => {
            if (typeof pathName != 'undefined') {
              if (lang == 'en') {
                return pathName + '.html'
              } else {
                return pathName + '_ar.html'
              }
            } else {
              return '#'
            }
          },
          textLang: (lang, enLang, arLang) => {
            if (typeof enLang != 'undefined' || typeof arLang != 'undefined') {
              if (lang == 'en') {
                return enLang
              } else {
                return arLang
              }
            } else {
              return ''
            }
          },
          menuActiveClass: (currentUrl, pathName) => {
            let arabicCheck = currentUrl.slice(
              currentUrl.length - 3,
              currentUrl.length
            )

            if (
              (arabicCheck == '_ar' && currentUrl == pathName + '_ar') ||
              currentUrl == pathName
            ) {
              return 'active'
            }
          },
        },
      }),
    ],
  }
})
