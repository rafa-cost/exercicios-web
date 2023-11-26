const {series} = require('gulp')
const gulp = require('gulp')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')//é o arquivo que esta sendo importado para fazer a transformação de tspara js

function transformacaoTS() {
    return tsProject.src()      //aqui ele esta pegando os projetos ts que estão dentro da pasta src, usando a variavel tsProject que esta definida acima
    .pipe(tsProject())           //aqui ele esta fazendo a transformação dos arquivos de ts para js usando a variavel tsProject que esta definida acima
    .pipe(gulp.dest('build'))    //passando os projetos para uma pasta de destino chamada build

}
exports.default = series(transformacaoTS)   //aqui estamos fazendo a exportação (pq estamos utilizando o gulp)