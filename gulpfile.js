const { src, dest, watch, parallel } = require('gulp');

//CSS
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));

//Image
const webp = require('gulp-webp');

function css( done ){
    src('src/scss/**/*.scss') //Identificar el archivo css
        .pipe( plumber() )
        .pipe( sass() )//Compilarlo
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

function dev( done ){
    watch('src/scss/**/*.scss', css)

    done();
};

exports.css = css; 
exports.convertWebp = convertWebp;
exports.dev = parallel(convertWebp, dev); 