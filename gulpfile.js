const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const notifier = require('node-notifier');



sass.compiler = require('sass');

function showError(err) {

    console.log(err.messageFormatted);

    notifier.notify({
        title: 'Error Sass',
        message: err.messageFormatted
    });

}


function server(cb){
        browserSync.init({
            server: {
                baseDir: "./"
            }
        });
        cb();
}

function css(){
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "expanded" //nested, expanded , compatct , compressed
        }).on('error', showError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream())
}
function watch(){
    gulp.watch("./scss/**/*.scss", gulp.series(css));
    gulp.watch("./*.html").on('change', browserSync.reload);

}
module.exports.css = css;
module.exports.watch = watch;
module.exports.default = gulp.series(server, css, watch)

