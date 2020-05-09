var rename = require("gulp-rename");
var gulp = require("gulp");
var postcss = require("gulp-postcss");
var concat = require("gulp-concat");
var nested = require("postcss-nested");
var autoprefixer = require("autoprefixer");
var browserSync = require("browser-sync");
var postcssimport = require("postcss-import");
var del = require("del");
var postcssAssets = require("postcss-assets");
var postcssColorFunction = require("postcss-color-function");
var ts = require("gulp-typescript");
var cssnano = require("cssnano");

const server = browserSync.create();

const cssRootFiles = ["./*.css"];
const tsRootFiles = ["./*.ts"];
const htmlRootFiles = ["./*.html"];

const watchCSS = () => gulp.watch(cssRootFiles, gulp.series(css, reload));
const watchTs = () => gulp.watch(tsRootFiles, gulp.series(tsProcess, reload));
const watchHtml = () => gulp.watch(htmlRootFiles, gulp.series(html, reload));

function clean() {
    return del(["_build/**/*"]);
}

function css() {
    var processors = [
        postcssimport({ glob: true }),
        nested,
        postcssAssets,
        postcssColorFunction(),
        autoprefixer(),
        cssnano()
    ];

    return gulp
        .src(cssRootFiles, { sourcemaps: true })
        .pipe(postcss(processors))
        .pipe(concat("styles.css"))
        .pipe(gulp.dest("./_build/"))
        .pipe(browserSync.stream());
}

function reload(done) {
    server.reload();
    done();
}

function serve(done) {
    server.init({
        open: false,
        notify: true,
        server: {
            baseDir: "./_build"
        }
    });
    done();
}

function html(fin) {
    gulp.src(["./index.html", "site.webmanifest"]).pipe(gulp.dest("_build/"));
    fin();
}

function favicon(fin) {
    gulp.src(["./favicon/**/*"]).pipe(gulp.dest("_build/"));
    fin();
}

function img(fin) {
    gulp.src("./img/*.{jpg,png,svg,gif}")
        .pipe(rename({ dirname: "" }))
        .pipe(gulp.dest("_build/img/"));
    fin();
}

function fonts(fin) {
    gulp.src("./fonts/*.{woff,woff2}")
        .pipe(rename({ dirname: "" }))
        .pipe(gulp.dest("_build/fonts/"));
    fin();
}

function tsProcess(fin) {
    gulp.src("./*.ts")
        .pipe(
            ts({
                noImplicitAny: true,
                outFile: "rwd.js",
                target: "ES5",
                lib: ["es2015", "dom"]
            })
        )
        .pipe(gulp.dest("_build/"));
    fin();
}

const dev = gulp.series(
    clean,
    serve,
    gulp.parallel(html, img, favicon, tsProcess, css, fonts),
    gulp.parallel(watchCSS, watchTs, watchHtml)
);
exports.default = dev;
