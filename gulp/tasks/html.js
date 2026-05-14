import { src, dest } from "gulp";
import plugins from "../plugins.js";
import fileInclude from "gulp-file-include";
import htmlBeautify from "gulp-html-beautify";
import versionNumber from "gulp-version-number";

export default function html(isBuild, serverInstance, paths) {
  return src(paths.src)
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: "HTML",
          message: "Error: <%= error.message %>",
        }),
      ),
    )
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: paths.basepath,
      }),
    )
    .pipe(
      plugins.if(
        !isBuild,
        versionNumber({
          value: "%TS%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js", "image"],
          },
          output: {
            file: paths.version,
          },
        }),
      ),
    )
    .pipe(plugins.replace("@root/", "./"))
    .pipe(plugins.replace("@css/", "./assets/css/"))
    .pipe(plugins.replace("@img/", "./assets/img/"))
    .pipe(plugins.replace("@js/", "./assets/js/"))
    .pipe(plugins.replace("@uploads/", "./uploads/"))
    .pipe(
      plugins.if(
        isBuild,
        htmlBeautify({
          indent_size: 4,
          indent_char: " ",
          max_preserve_newlines: 1,
          end_with_newline: true,
          preserve_newlines: false,
          indent_inner_html: true,
        }),
      ),
    )
    .pipe(dest(paths.dest))
    .pipe(serverInstance.stream());
}
