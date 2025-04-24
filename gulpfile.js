const { src, dest, watch, series } = require('gulp');
const sass = require('sass');
const gulpSass = require('gulp-sass')(sass);
const postcss = require('gulp-postcss');  // подключаем postcss
const autoprefixer = require('autoprefixer');  // подключаем autoprefixer
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat')
const uglify =require ('gulp-uglify')

function styles() {
    return src('app/scss/style.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(postcss([autoprefixer()]))  // используем autoprefixer через postcss
        .pipe(cleanCSS())  // минифицируем CSS
        .pipe(concat('style.min.css'))
        .pipe(dest('app/css'));
}

function scripts(){
    return src (['app/js/main.js', 
    'node_modules/jquery/dist/jquery.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
}


function watchFiles() {
    watch('app/scss/**/*.scss', styles); // следим за изменениями в SCSS
}

exports.default = series(styles,scripts, watchFiles );





