import { src, dest } from "gulp";
import ttf2woff from "gulp-ttf2woff";
import ttf2woff2 from "gulp-ttf2woff2";
import plugins from "../plugins.js";

function convertFonts(paths) {
  return src(paths.source.src, { encoding: false })
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: "Fonts",
          message: "Error: <%= error.message %>",
        }),
      ),
    )
    .pipe(ttf2woff())
    .pipe(dest(paths.source.dest))
    .pipe(src(paths.source.src, { encoding: false }))
    .pipe(ttf2woff2())
    .pipe(dest(paths.source.dest));
}

function copyFonts(serverInstance, paths) {
  return src(paths.src, { encoding: false })
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: "Fonts",
          message: "Error: <%= error.message %>",
        }),
      ),
    )
    .pipe(plugins.newer(paths.dest))
    .pipe(dest(paths.dest))
    .pipe(serverInstance.stream());
}

export default function fonts(isConvert, serverInstance, paths) {
  if (isConvert) {
    return convertFonts(paths);
  }

  return copyFonts(serverInstance, paths);
}
