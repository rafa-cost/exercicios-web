const {parallel} = require('gulp')
const gulp = require('gulp')
const sass = require('gulp-sass') (require('sass'))
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')

function transformacaoCSS() {
    return gulp.src('src/sass/index.scss')      //aqui ele esta copiando todos os arquivos dentro da pasta sass, ou seja o index.scss tem todos esses arquivos importados dentro dele
    .pipe(sass().on('error', sass.logError))    //aqui é a msg de erro se algo der errado
    .pipe(uglifycss({"uglyComments": true}))    //acho que aqui esta tirando todos os comentarios do codigo
    .pipe(concat('estilo.min.css'))          //aqui esta compactando o código e colocando ele dentro do arquivo 'estilo.min.css'
    .pipe(gulp.dest('build/css'))               //aqui esta criando a pasta dentro de outra, e colocando este arquivo compactado dentro de build/css
}
function copiarHTML() {
    return gulp.src('src/index.html')            //copiando o html de src
    .pipe(gulp.dest('build'))                    //e colando ele na pasta de destino que criamos chamada build
}       
exports.default = parallel(transformacaoCSS, copiarHTML)      //fazendo a exportação(tem que fazer no gulp)