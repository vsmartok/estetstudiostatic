import { src, dest } from "gulp";
import webpack from "webpack-stream";
import plugins from "../plugins.js";
import webpakConfig from "../../webpack.config.js";

export default async function scripts(isBuild, serverInstance, paths) {
  return src(paths.src)
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: "JavaScript",
          message: "Error: <%= error.message %>",
        }),
      ),
    )
    .pipe(
      webpack({
        config: await webpakConfig(isBuild, paths),
      }),
    )
    .pipe(dest(paths.dest))
    .pipe(serverInstance.stream());
}
