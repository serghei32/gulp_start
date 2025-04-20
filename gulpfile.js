const { src, dest } = require('gulp');
const sass = require('sass');
const gulpSass = require('gulp-sass')(sass);
const postcss = require('gulp-postcss');  // подключаем postcss
const autoprefixer = require('autoprefixer');  // подключаем autoprefixer
const cleanCSS = require('gulp-clean-css');

function styles() {
    return src('app/scss/style.scss')
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(postcss([autoprefixer()]))  // используем autoprefixer через postcss
        .pipe(cleanCSS())  // минифицируем CSS
        .pipe(dest('app/css'));
}

exports.default = styles;






  

