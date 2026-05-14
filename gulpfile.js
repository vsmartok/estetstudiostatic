import gulp from "gulp";
import browserSync from "browser-sync";

import paths from "./gulp/paths.js";
import reset from "./gulp/tasks/reset.js";
import server from "./gulp/tasks/server.js";
import html from "./gulp/tasks/html.js";
import css from "./gulp/tasks/css.js";
import images from "./gulp/tasks/images.js";
import fonts from "./gulp/tasks/fonts.js";
import sprites from "./gulp/tasks/sprites.js";
import scripts from "./gulp/tasks/scripts.js";
import favicon from "./gulp/tasks/favicon.js";

const isBuild = process.argv.includes("--build");
const convertFonts = process.argv.includes("--convert");
const serverInstance = browserSync.create();

const resetHandler = reset.bind(null, paths.build);

const htmlHandler = html.bind(null, isBuild, serverInstance, paths.html);
const cssHandler = css.bind(null, isBuild, serverInstance, paths.css);
const imagesHandler = images.bind(null, isBuild, serverInstance, paths.images);
const fontsHandler = fonts.bind(
  null,
  convertFonts,
  serverInstance,
  paths.fonts,
);
const spritesHandler = sprites.bind(
  null,
  isBuild,
  serverInstance,
  paths.sprites,
);
const scriptsHandler = scripts.bind(
  null,
  isBuild,
  serverInstance,
  paths.scripts,
);
const serverHandler = server.bind(null, serverInstance, paths.build);
const uploadsImagesHandler = images.bind(
  null,
  isBuild,
  serverInstance,
  paths.uploads.images,
);
const faviconHandler = favicon.bind(null, serverInstance, paths.favicon);

const watchHandler = function () {
  gulp.watch(paths.html.watch, htmlHandler);
  gulp.watch(paths.css.watch, cssHandler);
  gulp.watch(paths.images.watch, imagesHandler);
  gulp.watch(paths.sprites.watch, spritesHandler);
  gulp.watch(paths.scripts.watch, scriptsHandler);
  gulp.watch(paths.favicon.watch, faviconHandler);
  gulp.watch(paths.uploads.images.watch, uploadsImagesHandler);
};

const build = gulp.series(
  resetHandler,
  gulp.parallel(
    htmlHandler,
    cssHandler,
    imagesHandler,
    uploadsImagesHandler,
    fontsHandler,
    spritesHandler,
    scriptsHandler,
    faviconHandler,
  ),
);

const dev = gulp.series(build, gulp.parallel(serverHandler, watchHandler));

export { build, dev, fontsHandler };
