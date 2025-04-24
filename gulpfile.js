const {
    src,
    dest,
    watch,
    series
} = require('gulp');
const sass = require('sass');
const gulpSass = require('gulp-sass')(sass);
const postcss = require('gulp-postcss'); // подключаем postcss
const autoprefixer = require('autoprefixer'); // подключаем autoprefixer
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
// const browserSync = require('browser-sync').create();


function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(concat('style.min.css'))
        .pipe(dest('app/css'))
        // .pipe(browserSync.stream())
        .on('end', () => console.log('CSS обновлён'));
}


function scripts() {
    return src(['app/js/main.js',
            'node_modules/jquery/dist/jquery.js'
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
}


function watchFiles() {
    watch(['app/scss/**/*.scss'], styles); // следим за изменениями в SCSS
    watch(['app/js/**/*.js'], scripts)
    // watch(['app//**/*.html']).on('change', browserSync.reload)

}

exports.default = series(styles, scripts, watchFiles);