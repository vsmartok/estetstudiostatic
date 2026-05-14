import { src, dest } from "gulp";
import svgSprite from "gulp-svg-sprite";
import cheerio from "gulp-cheerio";
import plugins from "../plugins.js";

export default function sprites(isBuild, serverInstance, paths) {
  return src(paths.src, { encoding: false })
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: "SVG Sprites",
          message: "Error: <%= error.message %>",
        }),
      ),
    )
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            dest: "",
            sprite: "icons.svg",
            inline: true,
            example: !isBuild,
          },
        },
        shape: {
          id: {
            separator: "",
            generator: "",
          },
        },
        svg: {
          rootAttributes: {
            style: "display: none",
            "aria-hidden": "true",
          },
        },
      }),
    )
    .pipe(
      cheerio({
        run: function ($, file) {
          $("[fill]").removeAttr("fill");
          $("[stroke]").removeAttr("stroke");
          $("[style]").removeAttr("style");
        },
        parserOptions: {
          xmlMode: true,
        },
      }),
    )
    .pipe(dest(paths.dest))
    .pipe(serverInstance.stream());
}
