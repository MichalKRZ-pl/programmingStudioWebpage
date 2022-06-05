const { src, dest, series, parallel, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cssnano = require("gulp-cssnano");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
//const phpMinify = require("@cedx/gulp-php-minify");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const clean = require("gulp-clean");
const kit = require("gulp-kit");

const paths = {
  php: "./src/php/**/*.php",
  sass: "./src/sass/**/*.scss",
  jScript: "./src/js/**/*.js",
  images: "./src/img/*",
  dist: "./dist",
  html: "./html/**/*.kit",
  sassDest: "./dist/css",
  jScriptDest: "./dist/js",
  imgDest: "./dist/img",
  phpDest: "./dist/php",
};
// sass.compiler = require('node-sass')

function sassCompiler(done) {
  src(paths.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest(paths.sassDest));
  done();
}

function babelScript(done) {
  src(paths.jScript)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(sourcemaps.write())
    .pipe(dest(paths.jScriptDest));
  done();
}

function copy(done) {
  src(paths.php).pipe(dest(paths.phpDest));
  done();
}

function imageShrink(done) {
  src(paths.images)
    .pipe(imagemin())
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(dest(paths.imgDest));
  done();
}

function handleKits(done) {
  src(paths.html).pipe(kit()).pipe(dest("./"));
  done();
}

function startBrowserSync(done) {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  done();
}

function watchForChanges(done) {
  watch("./*.html").on("change", browserSync.reload);
  watch(
    [paths.html, paths.sass, paths.jScript, paths.php],
    parallel(handleKits, babelScript, sassCompiler, copy)
  ).on("change", browserSync.reload);
  watch(paths.images, imageShrink).on("change", browserSync.reload);
  done();
}

function cleanStuff(done) {
  src(paths.dist, { read: false }).pipe(clean());
  done();
}

const mainFunctions = parallel(handleKits, babelScript, sassCompiler, imageShrink, copy);
exports.default = series(mainFunctions, startBrowserSync, watchForChanges);

exports.cleanStuff = cleanStuff;
