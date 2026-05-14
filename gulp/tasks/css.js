import { src, dest } from "gulp";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import cleanCss from "gulp-clean-css";
import postcss from "gulp-postcss";
import postcssPresetEnv from "postcss-preset-env";
import postcssGroupMedia from "postcss-sort-media-queries";
import sourcemaps from "gulp-sourcemaps";

import plugins from "../plugins.js";

const sassCompiler = gulpSass(dartSass);

export default function css(isBuild, serverInstance, paths) {
  return src(paths.src)
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: "CSS",
          message: "Error: <%= error.message %>",
        }),
      ),
    )
    .pipe(plugins.if(!isBuild, sourcemaps.init({ largeFile: true })))
    .pipe(
      sassCompiler({
        outputStyle: "expanded",
      }),
    )
    .pipe(
      plugins.if(
        isBuild,
        postcss([
          postcssPresetEnv(),
          postcssGroupMedia({ sort: "desktop-first" }),
        ]),
      ),
    )
    .pipe(plugins.if(isBuild, cleanCss()))
    .pipe(plugins.if(!isBuild, sourcemaps.write(".")))
    .pipe(dest(paths.dest))
    .pipe(serverInstance.stream());
}
