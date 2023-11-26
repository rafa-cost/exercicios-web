//deps(dependencias), cb(callback)
const gulp = require('gulp')                                           //definindo as variavieis que serão usadas abaixo
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')

function depsCSS() {
    return gulp.src('node_modules/font-awesome/css/font-awesome.css')   //pegando o arquivo neste endereço e copiando
    .pipe(uglifycss({"uglyComments": false}))                          //aqui ele esta mantendo os comentarios
    .pipe(concat('deps.min.css'))                                      //compactando o arquivo e nomeando como 'deps.min.css'
    .pipe(gulp.dest('build/assets/css'))                               //fazendo este endereço de pastas e colando o arquivo
}
function depsFonts(cb) {                                                
    return gulp.src('node_modules/font-awesome/fonts/*.*')             //pegando o arquivo neste endereço e copiando, (*.*)isso aqui é para pegar tudo que esta dentro da pasta
    .pipe(gulp.dest('build/assets/fonts'))                            //fazendo este endereço de pastas e colando o arquivo
}
module.exports = {                                                    //essas 2 funções vão ser exportadas a partir deste arquivo
    depsCSS,
    depsFonts
}