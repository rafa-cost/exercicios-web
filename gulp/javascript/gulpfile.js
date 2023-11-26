const {series} = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
function transformacaoJS(cb) {          //cb(collback)
  return gulp.src('src/**/*.js')       //aqui qualquer arquivo da src que tiver a estenção .js sera copiado.  
    .pipe(babel ({                     //pipe(transformação)
        comments: false,               //tirando os comentarios do código
        presets: ["env"]               //aqui esta pegando versão mais recente do javascript
    }))
    .pipe(uglify())                     //aqui esta compactando o codigo
    .on('error', err => console.log(err))  //caso aconteça algum erro
    .pipe(concat('codigo.min.js'))       //esta colocando os códigos dos arquivos compactados dentro deste arquivo 'codigo.min.js'
    .pipe(gulp.dest('build/js'))      //aqui esta criando uma pasta de destino, uma dentro da outra(build/js) e colocando o arquivo codigo.min.js(que é o codigo de calculadora.js e testeClaculador.js compactados), dentro da pasta.
}
function fim(cb) {                     //função para indicar o encerramento da execução do programa, acho que isso aparece no terminal, quando executamos o gulp
    console.log('Fim!!')
    return cb()
}
exports.default = series(transformacaoJS, fim)  //encerrando a função transformacaoJs e a função fim