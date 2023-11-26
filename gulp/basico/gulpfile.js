const gulp = require('gulp')
const {series, parallel} = require('gulp')

const antes1 = cb => {
    console.log('Tarefa Antes 1')
    return cb()
}

const antes2 = cb => {
    console.log('Tarefa Antes 2')
    return cb()
}

function copiar(cb) {
    //gulp.src(['pastaA/arquivo1.txt', 'pastaA/arquivo2.txt'])
    gulp.src('pastaA/**/*.txt')            //aqui qualquer arquivo da pastaA que tiver a estenção .txt sera copiado.  "gulp.src" esta sendo a opção de entrada , ele gravou os arquivos
    .pipe(gulp.dest('pastaB'))             //o pipe com os comandos gulp.dest esta criando uma pasta de destino (pastaB) e colocando esses arquivos de texto dentro da pasta. "pipe" esta sendo a opção de saida dos arquivos . Este pipe ele aplica transformações nos arquivos
    return cb()
}
const fim = cb => {
    console.log('Tarefa Fim')
    return cb()
}

 module.exports.default = series(               //aqui tem ligação com a primeira linha de código, no terminal esta operação aparece como default, esta operação é a primeira a iniciar e a ultima a encerrar
    parallel(antes1, antes2),
    copiar,
    fim,
 )