import { src, dest } from "gulp";
import webp from "gulp-webp";
import imagemin, { svgo } from "gulp-imagemin";
import plugins from "../plugins.js";

export default function images(isBuild, serverInstance, paths) {
  return src(paths.src, { encoding: false })
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: "Images",
          message: "Error: <%= error.message %>",
        }),
      ),
    )
    .pipe(plugins.newer(paths.dest))
    .pipe(webp())
    .pipe(dest(paths.dest))
    .pipe(src(paths.src, { encoding: false }))
    .pipe(plugins.newer(paths.dest))
    .pipe(
      plugins.if(
        isBuild,
        imagemin(
          [
            svgo({
              plugins: [
                { name: "removeViewBox", active: false },
                { name: "cleanupIDs", active: false },
                { name: "removeMetadata", active: true },
              ],
            }),
          ],
          { verbose: true },
        ),
      ),
    )
    .pipe(dest(paths.dest))
    .pipe(serverInstance.stream());
}
