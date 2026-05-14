import nodePath from "node:path";
import { readdir } from "node:fs/promises";
import { extname } from "node:path";

async function readDir(directoryPath) {
  const result = {};

  try {
    const files = await readdir(directoryPath);
    const jsFiles = files.filter((file) => nodePath.extname(file) === ".js");
    jsFiles.forEach((file) => {
      const [name] = file.split(".");
      result[name] = `./${file}`;
    });
    return result;
  } catch (err) {
    console.error("Ошибка чтения директории:", err);
  }
}

export default async function webpakConfig(isBuild, paths) {
  const context = nodePath.resolve(paths.basepath);
  //   const entries = await readDir(context);

  return {
    context,
    entry: await readDir(context),
    mode: isBuild ? "production" : "development",
    output: {
      path: nodePath.resolve(paths.dest),
      filename: "[name].js",
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "defaults",
                  },
                ],
              ],
            },
          },
        },
      ],
    },
  };
}
