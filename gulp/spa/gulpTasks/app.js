const gulp = require('gulp')        
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass') (require('sass'))
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')

function appHTML(cb) {                            //lembrando que cb significa callback(ligar de volta)
    return gulp.src('src/**/*.html')               //copiando todos os arquivos html que estão na pasta src
    .pipe(htmlmin({ collapsewhitespace: true }))  //tirando os espaços em branco do codigo
    .pipe(gulp.dest('build'))                     //colando o arquivo nesta pasta
}
function appCSS() {
    return gulp.src('src/assets/sass/index.scss')
    .pipe(sass().on('error', sass.logError))     //se der algum erro
    .pipe(uglifycss({"uglyComments": true}))     //tirando os comentarios
    .pipe(concat('app.min.css'))                 //compactando o código e salvando ele com este nome 'app.min.css'
    .pipe(gulp.dest('build/assets/css'))          //colando ele nesse destino
}
function appJS() {
    return gulp.src('src/assets/js/**/*.js')      //copiando todos os arquivos js que estão dentro da pasta src/assets
    .pipe(babel({ presets: ['env']}))
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('build/assets/js'))          //colando os arquivos neste endereço
}
function appIMG(cb) {
    return gulp.src('src/assets/imgs/**/*.*')     //copiando todos os arquivos imgs que estão dentro da pasta src/assets 
    .pipe(gulp.dest('build/assets/imgs'))         //colando os arquivos neste endereço
}
                                                //aqui estamos definindo os nomes das tasks, para utilizarmos na função monitorarArquivos
gulp.task('appHTML', appHTML)
gulp.task('appCSS', appCSS)
gulp.task('appJS', appJS)
gulp.task('appIMG', appIMG)

module.exports = {                //vamos exportar um objeto que vai ter essas funções
    appHTML,                      //essas 4 funções vão ser exportadas a partir deste arquivo
    appCSS,
    appJS,
    appIMG
}