const gulp = require('gulp')
const webserver = require('gulp-webserver')
const watch = require('gulp-watch')        //watch ele ficara monitorando os arquivos e sempre que houver uma mudança ele vai chamar uma das tasks

function servidor(cb) {                  //servidor web na porta 8080, essa porta que vamos ver nosso site rodar
    return gulp.src('build')
    .pipe(webserver({
        port: 8080,                       //vamos utilizar a porta 8080
        open: true,                      //se quer que ele abra o browser
        livereload: true                
    }))                                  //quando rodamos o gulp ele não termina a execução, pe ele esta rodando o site na porta 8080
}

function monitorarArquivos(cb) {                //ele vai monitorar quando houver alguma alteração em alguma das tasks, ele altomaticamente fara essa mudança na aplicação. Ou seja não precisa salvar e depois atualizar a pagina. Isso se da por conta da função watch
    watch('src/**/*.html', () => gulp.series('appHTML')())
    watch('src/**/*.scss', () => gulp.series('appCSS')())
    watch('src/**/*.js', () => gulp.series('appJS')())
    watch('src/assets/imgs/**/*.*', () => gulp.series('appIMG')())
    return cb()
}
module.exports = {
    monitorarArquivos,
    servidor
}