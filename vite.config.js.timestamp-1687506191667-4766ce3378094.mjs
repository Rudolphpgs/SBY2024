// vite.config.js
import { defineConfig } from "file:///D:/wamp/www/gdf/source/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import handlebars from "file:///D:/wamp/www/gdf/source/node_modules/vite-plugin-handlebars/dist/index.js";
import imagemin from "file:///D:/wamp/www/gdf/source/node_modules/imagemin/index.js";
import imageminWebp from "file:///D:/wamp/www/gdf/source/node_modules/imagemin-webp/index.js";
import chokidar from "file:///D:/wamp/www/gdf/source/node_modules/chokidar/index.js";
import FullReload from "file:///D:/wamp/www/gdf/source/node_modules/vite-plugin-full-reload/dist/index.js";
var __vite_injected_original_dirname = "D:\\wamp\\www\\gdf\\source";
var WatchMode = () => ({
  name: "output-plugin-stats",
  configResolved() {
    const imageConvert = chokidar.watch(
      "./src/assets/images/*.{jpg,png,JPG,jpeg}",
      {
        ignoreInitial: true
      }
    );
    imageConvert.on("add", (event, path) => {
      imagemin:
        imagemin(["./src/assets/images/*.{jpg,png,JPG,jpeg}"], {
          destination: "./src/assets/images/",
          plugins: [imageminWebp({})]
        }).then(() => {
          console.log("Images Converted Successfully!!!");
        });
    });
  }
});
var vite_config_default = defineConfig(({ command, mode, ssrBuild }) => {
  return {
    server: {
      port: 3e3,
      hmr: true
    },
    preview: {
      port: 8080,
      open: true
    },
    root: "./src/",
    base: "./",
    //publicDir: '../public/',
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src"),
        "@fonts": resolve(__vite_injected_original_dirname, "./src/assets/fonts"),
        "@scss": resolve(__vite_injected_original_dirname, "./src/assets/scss")
      }
    },
    optimizeDeps: {
      exclude: ["js-big-decimal"]
    },
    build: {
      outDir: "../dist/",
      //  assetsDir: './assets/',
      emptyOutDir: true,
      copyPublicDir: false,
      cssCodeSplit: true,
      cssMinify: true,
      rollupOptions: {
        input: {
          main: resolve(__vite_injected_original_dirname, "src/index.html"),
          main_ar: resolve(__vite_injected_original_dirname, "src/index_ar.html"),
          gallery: resolve(__vite_injected_original_dirname, "src/gallery.html"),
          gallery_ar: resolve(__vite_injected_original_dirname, "src/gallery_ar.html"),
          aboutUs: resolve(__vite_injected_original_dirname, "src/aboutUs.html"),
          aboutUs_ar: resolve(__vite_injected_original_dirname, "src/aboutUs_ar.html"),
          contact: resolve(__vite_injected_original_dirname, "src/contact.html"),
          contact_ar: resolve(__vite_injected_original_dirname, "src/contact_ar.html"),
          initiatives: resolve(__vite_injected_original_dirname, "src/initiatives.html"),
          initiatives_ar: resolve(__vite_injected_original_dirname, "src/initiatives_ar.html"),
          initiativeDetails: resolve(__vite_injected_original_dirname, "src/initiativeDetails.html"),
          initiativeDetails_ar: resolve(
            __vite_injected_original_dirname,
            "src/initiativeDetails_ar.html"
          )
        },
        output: {
          chunkFileNames: "assets/js/[name].js",
          entryFileNames: "assets/js/[name].js",
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? "")) {
              return "assets/images/[name][extname]";
            }
            if (/\.css$/.test(name ?? "")) {
              return "assets/css/[name][extname]";
            }
            if (/\.(woff|woff2|eot|ttf)$/.test(name ?? "")) {
              return "assets/fonts/[name][extname]";
            }
            if (/\.(mp4|ogg)$/.test(name ?? "")) {
              return "assets/videos/[name][extname]";
            }
            return "assets/[name][extname]";
          }
        }
      }
    },
    esbuild: {
      logOverride: { "this-is-undefined-in-esm": "silent" }
    },
    plugins: [
      WatchMode(),
      FullReload([
        // './src/*',
        "./src/partials/*"
      ]),
      handlebars({
        //reloadOnPartialChange: true,
        partialDirectory: resolve(__vite_injected_original_dirname, "./src/partials/"),
        context: {
          title: "GDF",
          description: "Lorem Ipsum is simply dummy ",
          phone: "123456789",
          email: "test@test.com",
          bodyClass: (pathName) => {
            if (typeof pathName != "undefined") {
              var name_ = pathName.slice(1, -5);
              if (name_ == "index" || name_ == "index_ar") {
                return "homePage";
              } else {
                return "innerPage " + (name_.lastIndexOf("_ar") > 0 ? name_.slice(0, -3) : name_) + "Page";
              }
            }
          },
          langSwitch: (pathName) => {
            if (typeof pathName != "undefined") {
              var name_ = pathName.slice(1, -5);
              if (name_.lastIndexOf("_ar") > 0) {
                return name_.slice(0, -3) + ".html";
              } else {
                return name_ + "_ar.html";
              }
            }
          },
          rooUrl: (pathName) => {
            if (typeof pathName != "undefined") {
              var name_ = pathName.slice(1, -5);
              if (name_.lastIndexOf("_ar") > 0) {
                return "index_ar.html";
              } else {
                return "index.html";
              }
            }
          },
          dir: (pathName) => {
            if (typeof pathName != "undefined") {
              var name_ = pathName.slice(1, -5);
              if (name_.lastIndexOf("_ar") > 0) {
                return "rtl";
              } else {
                return "ltr";
              }
            }
          },
          lang: (pathName) => {
            if (typeof pathName != "undefined") {
              var name_ = pathName.slice(1, -5);
              if (name_.lastIndexOf("_ar") > 0) {
                return "ar";
              } else {
                return "en";
              }
            }
          },
          currentUrl: (pathName) => {
            if (typeof pathName != "undefined") {
              return pathName.slice(1, -5);
            }
          }
        },
        helpers: {
          capitalize: (value) => value.toUpperCase(),
          isEqual: (value1, value2, options) => {
            return value1 === value2;
          },
          menuLink: (lang, pathName) => {
            if (typeof pathName != "undefined") {
              if (lang == "en") {
                return pathName + ".html";
              } else {
                return pathName + "_ar.html";
              }
            } else {
              return "#";
            }
          },
          menuActiveClass: (currentUrl, pathName) => {
            if (currentUrl == pathName || pathName == currentUrl.slice(0, -3)) {
              return "active";
            }
          }
        }
      })
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3YW1wXFxcXHd3d1xcXFxnZGZcXFxcc291cmNlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx3YW1wXFxcXHd3d1xcXFxnZGZcXFxcc291cmNlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi93YW1wL3d3dy9nZGYvc291cmNlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCBoYW5kbGViYXJzIGZyb20gJ3ZpdGUtcGx1Z2luLWhhbmRsZWJhcnMnXHJcbmltcG9ydCBpbWFnZW1pbiBmcm9tICdpbWFnZW1pbidcclxuaW1wb3J0IGltYWdlbWluV2VicCBmcm9tICdpbWFnZW1pbi13ZWJwJ1xyXG5pbXBvcnQgY2hva2lkYXIgZnJvbSAnY2hva2lkYXInXHJcblxyXG5pbXBvcnQgRnVsbFJlbG9hZCBmcm9tICd2aXRlLXBsdWdpbi1mdWxsLXJlbG9hZCdcclxuXHJcbmNvbnN0IFdhdGNoTW9kZSA9ICgpID0+ICh7XHJcbiAgbmFtZTogJ291dHB1dC1wbHVnaW4tc3RhdHMnLFxyXG4gIGNvbmZpZ1Jlc29sdmVkKCkge1xyXG4gICAgY29uc3QgaW1hZ2VDb252ZXJ0ID0gY2hva2lkYXIud2F0Y2goXHJcbiAgICAgICcuL3NyYy9hc3NldHMvaW1hZ2VzLyoue2pwZyxwbmcsSlBHLGpwZWd9JyxcclxuICAgICAge1xyXG4gICAgICAgIGlnbm9yZUluaXRpYWw6IHRydWUsXHJcbiAgICAgIH1cclxuICAgIClcclxuXHJcbiAgICBpbWFnZUNvbnZlcnQub24oJ2FkZCcsIChldmVudCwgcGF0aCkgPT4ge1xyXG4gICAgICBpbWFnZW1pbjogaW1hZ2VtaW4oWycuL3NyYy9hc3NldHMvaW1hZ2VzLyoue2pwZyxwbmcsSlBHLGpwZWd9J10sIHtcclxuICAgICAgICBkZXN0aW5hdGlvbjogJy4vc3JjL2Fzc2V0cy9pbWFnZXMvJyxcclxuICAgICAgICBwbHVnaW5zOiBbaW1hZ2VtaW5XZWJwKHt9KV0sXHJcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdJbWFnZXMgQ29udmVydGVkIFN1Y2Nlc3NmdWxseSEhIScpXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0sXHJcbn0pXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlLCBzc3JCdWlsZCB9KSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0OiAzMDAwLFxyXG4gICAgICBobXI6IHRydWUsXHJcbiAgICB9LFxyXG4gICAgcHJldmlldzoge1xyXG4gICAgICBwb3J0OiA4MDgwLFxyXG4gICAgICBvcGVuOiB0cnVlLFxyXG4gICAgfSxcclxuICAgIHJvb3Q6ICcuL3NyYy8nLFxyXG4gICAgYmFzZTogJy4vJyxcclxuICAgIC8vcHVibGljRGlyOiAnLi4vcHVibGljLycsXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgICAgICdAZm9udHMnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2Fzc2V0cy9mb250cycpLFxyXG4gICAgICAgICdAc2Nzcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvYXNzZXRzL3Njc3MnKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgZXhjbHVkZTogWydqcy1iaWctZGVjaW1hbCddLFxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIG91dERpcjogJy4uL2Rpc3QvJyxcclxuICAgICAgLy8gIGFzc2V0c0RpcjogJy4vYXNzZXRzLycsXHJcbiAgICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxyXG4gICAgICBjb3B5UHVibGljRGlyOiBmYWxzZSxcclxuICAgICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxyXG4gICAgICBjc3NNaW5pZnk6IHRydWUsXHJcblxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgaW5wdXQ6IHtcclxuICAgICAgICAgIG1haW46IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4Lmh0bWwnKSxcclxuICAgICAgICAgIG1haW5fYXI6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4X2FyLmh0bWwnKSxcclxuICAgICAgICAgIGdhbGxlcnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2dhbGxlcnkuaHRtbCcpLFxyXG4gICAgICAgICAgZ2FsbGVyeV9hcjogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvZ2FsbGVyeV9hci5odG1sJyksXHJcbiAgICAgICAgICBhYm91dFVzOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hYm91dFVzLmh0bWwnKSxcclxuICAgICAgICAgIGFib3V0VXNfYXI6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2Fib3V0VXNfYXIuaHRtbCcpLFxyXG4gICAgICAgICAgY29udGFjdDogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29udGFjdC5odG1sJyksXHJcbiAgICAgICAgICBjb250YWN0X2FyOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb250YWN0X2FyLmh0bWwnKSxcclxuICAgICAgICAgIGluaXRpYXRpdmVzOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbml0aWF0aXZlcy5odG1sJyksXHJcbiAgICAgICAgICBpbml0aWF0aXZlc19hcjogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5pdGlhdGl2ZXNfYXIuaHRtbCcpLFxyXG4gICAgICAgICAgaW5pdGlhdGl2ZURldGFpbHM6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luaXRpYXRpdmVEZXRhaWxzLmh0bWwnKSxcclxuICAgICAgICAgIGluaXRpYXRpdmVEZXRhaWxzX2FyOiByZXNvbHZlKFxyXG4gICAgICAgICAgICBfX2Rpcm5hbWUsXHJcbiAgICAgICAgICAgICdzcmMvaW5pdGlhdGl2ZURldGFpbHNfYXIuaHRtbCdcclxuICAgICAgICAgICksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL2pzL1tuYW1lXS5qcycsXHJcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0uanMnLFxyXG5cclxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoeyBuYW1lIH0pID0+IHtcclxuICAgICAgICAgICAgaWYgKC9cXC4oZ2lmfGpwZT9nfHBuZ3xzdmd8d2VicCkkLy50ZXN0KG5hbWUgPz8gJycpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdhc3NldHMvaW1hZ2VzL1tuYW1lXVtleHRuYW1lXSdcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKC9cXC5jc3MkLy50ZXN0KG5hbWUgPz8gJycpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdhc3NldHMvY3NzL1tuYW1lXVtleHRuYW1lXSdcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKC9cXC4od29mZnx3b2ZmMnxlb3R8dHRmKSQvLnRlc3QobmFtZSA/PyAnJykpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJ2Fzc2V0cy9mb250cy9bbmFtZV1bZXh0bmFtZV0nXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgvXFwuKG1wNHxvZ2cpJC8udGVzdChuYW1lID8/ICcnKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAnYXNzZXRzL3ZpZGVvcy9bbmFtZV1bZXh0bmFtZV0nXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAnYXNzZXRzL1tuYW1lXVtleHRuYW1lXSdcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBlc2J1aWxkOiB7XHJcbiAgICAgIGxvZ092ZXJyaWRlOiB7ICd0aGlzLWlzLXVuZGVmaW5lZC1pbi1lc20nOiAnc2lsZW50JyB9LFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgV2F0Y2hNb2RlKCksXHJcbiAgICAgIEZ1bGxSZWxvYWQoW1xyXG4gICAgICAgIC8vICcuL3NyYy8qJyxcclxuICAgICAgICAnLi9zcmMvcGFydGlhbHMvKicsXHJcbiAgICAgIF0pLFxyXG4gICAgICBoYW5kbGViYXJzKHtcclxuICAgICAgICAvL3JlbG9hZE9uUGFydGlhbENoYW5nZTogdHJ1ZSxcclxuICAgICAgICBwYXJ0aWFsRGlyZWN0b3J5OiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3BhcnRpYWxzLycpLFxyXG4gICAgICAgIGNvbnRleHQ6IHtcclxuICAgICAgICAgIHRpdGxlOiAnR0RGJyxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTG9yZW0gSXBzdW0gaXMgc2ltcGx5IGR1bW15ICcsXHJcbiAgICAgICAgICBwaG9uZTogJzEyMzQ1Njc4OScsXHJcbiAgICAgICAgICBlbWFpbDogJ3Rlc3RAdGVzdC5jb20nLFxyXG4gICAgICAgICAgYm9keUNsYXNzOiAocGF0aE5hbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXRoTmFtZSAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgIHZhciBuYW1lXyA9IHBhdGhOYW1lLnNsaWNlKDEsIC01KVxyXG4gICAgICAgICAgICAgIGlmIChuYW1lXyA9PSAnaW5kZXgnIHx8IG5hbWVfID09ICdpbmRleF9hcicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaG9tZVBhZ2UnXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICdpbm5lclBhZ2UgJyArXHJcbiAgICAgICAgICAgICAgICAgIChuYW1lXy5sYXN0SW5kZXhPZignX2FyJykgPiAwID8gbmFtZV8uc2xpY2UoMCwgLTMpIDogbmFtZV8pICtcclxuICAgICAgICAgICAgICAgICAgJ1BhZ2UnXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbGFuZ1N3aXRjaDogKHBhdGhOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGF0aE5hbWUgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICB2YXIgbmFtZV8gPSBwYXRoTmFtZS5zbGljZSgxLCAtNSlcclxuXHJcbiAgICAgICAgICAgICAgaWYgKG5hbWVfLmxhc3RJbmRleE9mKCdfYXInKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lXy5zbGljZSgwLCAtMykgKyAnLmh0bWwnXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuYW1lXyArICdfYXIuaHRtbCdcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByb29Vcmw6IChwYXRoTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhdGhOYW1lICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgdmFyIG5hbWVfID0gcGF0aE5hbWUuc2xpY2UoMSwgLTUpXHJcblxyXG4gICAgICAgICAgICAgIGlmIChuYW1lXy5sYXN0SW5kZXhPZignX2FyJykgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2luZGV4X2FyLmh0bWwnXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnaW5kZXguaHRtbCdcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBkaXI6IChwYXRoTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhdGhOYW1lICE9ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgdmFyIG5hbWVfID0gcGF0aE5hbWUuc2xpY2UoMSwgLTUpXHJcblxyXG4gICAgICAgICAgICAgIGlmIChuYW1lXy5sYXN0SW5kZXhPZignX2FyJykgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3J0bCdcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdsdHInXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgbGFuZzogKHBhdGhOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGF0aE5hbWUgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICB2YXIgbmFtZV8gPSBwYXRoTmFtZS5zbGljZSgxLCAtNSlcclxuXHJcbiAgICAgICAgICAgICAgaWYgKG5hbWVfLmxhc3RJbmRleE9mKCdfYXInKSA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnYXInXHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnZW4nXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgY3VycmVudFVybDogKHBhdGhOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGF0aE5hbWUgIT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcGF0aE5hbWUuc2xpY2UoMSwgLTUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaGVscGVyczoge1xyXG4gICAgICAgICAgY2FwaXRhbGl6ZTogKHZhbHVlKSA9PiB2YWx1ZS50b1VwcGVyQ2FzZSgpLFxyXG4gICAgICAgICAgaXNFcXVhbDogKHZhbHVlMSwgdmFsdWUyLCBvcHRpb25zKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTEgPT09IHZhbHVlMlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG1lbnVMaW5rOiAobGFuZywgcGF0aE5hbWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXRoTmFtZSAhPSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgIGlmIChsYW5nID09ICdlbicpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXRoTmFtZSArICcuaHRtbCdcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhdGhOYW1lICsgJ19hci5odG1sJ1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJyMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBtZW51QWN0aXZlQ2xhc3M6IChjdXJyZW50VXJsLCBwYXRoTmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY3VycmVudFVybCA9PSBwYXRoTmFtZSB8fCBwYXRoTmFtZSA9PSBjdXJyZW50VXJsLnNsaWNlKDAsIC0zKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAnYWN0aXZlJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0p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
