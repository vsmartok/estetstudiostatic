import { src, dest } from "gulp";
import plugins from "../plugins.js";

export default function favicon(serverInstance, paths) {
  return src(paths.src, { encoding: false })
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: "Favicon",
          message: "Error: <%= error.message %>",
        }),
      ),
    )
    .pipe(plugins.newer(paths.dest))
    .pipe(dest(paths.dest))
    .pipe(serverInstance.stream());
}
