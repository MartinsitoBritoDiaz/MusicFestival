const { src, dest, watch, parallel } = require('gulp');

//CSS
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Images
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css( done ){
    src('src/scss/**/*.scss') //Identificar el archivo css
        .pipe( sourcemaps.init() )
        .pipe( plumber() )
        .pipe( sass() )//Compilarlo
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe(sourcemaps.write('.'))
        .pipe( dest('build/css'))//Almacenarla en el disco duro
    done();
};

function convertWebp( done ){
    const option = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg,jpeg}')
        .pipe( webp(option) ) // Ajustar la Calidad
        .pipe( dest('build/img')) //Nueva Ubicacion

    done();
}

function images(done){
    const option ={
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg,jpeg}')
        .pipe( cache( imagemin(option) ) )
        .pipe( dest('build/img'))

    done();
}

function convertAvif( done ){
    const option ={
        quality: 50
    }
    src('src/img/**/*.{png,jpg,jpeg}')
        .pipe( avif(option) ) // Ajustar la Calidad
        .pipe( dest('build/img')) //Nueva Ubicacion

    done();
}

function javascript( done ){
    src('src/js/**/*.js')
        .pipe( dest('build/js'));

    done();
}

function dev( done ){
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)

    done();
};

exports.css = css; 
exports.js = javascript; 
exports.images = images; 
exports.convertWebp = convertWebp;
exports.convertAvif = convertAvif;
exports.dev = parallel(images, convertWebp, convertAvif, javascript, dev); 