export default {
  html: {
    src: ["./src/html/**/*.html", "!./src/html/_*/**/*.html"],
    dest: "./build",
    watch: "./src/html/**/*.html",
    basepath: "./src/html",
    version: "./gulp/version.json",
  },
  css: {
    src: "./src/css/**/*.{sass,scss,css}",
    dest: "./build/assets/css",
    watch: "./src/css/**/*.{sass,scss,css}",
  },
  images: {
    src: "./src/img/**/*.{jpg,jpeg,png,gif,svg,webp}",
    dest: "./build/assets/img",
    watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg,webp}",
  },
  fonts: {
    src: "./src/fonts/**/*.{woff,woff2}",
    dest: "./build/assets/fonts",
    watch: "./src/fonts/**/*.{woff,woff2}",
    source: {
      src: "./src/fonts/**/*.ttf",
      dest: "./src/fonts",
    },
  },
  sprites: {
    src: "./src/sprites/**/*.svg",
    dest: "./build/assets/img",
    watch: "./src/sprites/**/*.svg",
  },
  scripts: {
    src: "./src/js/*.js",
    dest: "./build/assets/js",
    watch: "./src/js/**/*.js",
    basepath: "./src/js/",
  },
  favicon: {
    src: "./src/favicons/*.{ico,png}",
    dest: "./build/assets/img",
    watch: "./src/favicons/*.{ico,png}",
  },
  uploads: {
    images: {
      src: "./src/uploads/images/**/*.{jpg,jpeg,png,gif,svg,webp}",
      dest: "./build/uploads/images",
      watch: "./src/uploads/images/**/*.{jpg,jpeg,png,gif,svg,webp}",
    },
  },
  build: "./build",
};
