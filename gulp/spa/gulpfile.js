const { series, parallel } = require('gulp')
const gulp = require('gulp')
const { appHTML, appCSS, appJS, appIMG } = require('./gulpTasks/app')   //('./gulpTasks/app')aqui esta fazendo importações
const { depsCSS, depsFonts } = require('./gulpTasks/deps')              //('./gulpTasks/deps')fazendo importações
const { monitorarArquivos, servidor } = require('./gulpTasks/servidor') //('./gulpTasks/servidor')fazendo importações

module.exports.default = series(                                       //aqui abaixo esta fazendo os fechamentos das funções
    parallel(                                                    //aqui estamos colocando em paralelo para executar essas 2 series primeiro
        series(appHTML, appCSS, appJS, appIMG),
        series(depsCSS, depsFonts)
    ),                                                         //e por ultimo executar o servidor e o monitorarArquivos
    servidor,
    monitorarArquivos
)