const modoDev = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    mode: modoDev ? 'development' : 'production',            //modo desenvolvedor e produção
    entry: './src/principal.js',     //criando a pasta src e o arquivo principal.js(é o arquivo de entrada) dentro da pasta
    output: {                        //crianda a pasta de saida 
        filename: 'principal.js',    //criando o arquivo 
        path: __dirname + '/public'  //criando a pasta , o arquivo ficara dentro desta pasta
    },
    devServer: {
        static: "./public",
        pot: 9000
    },
    optimization: {                           //aqui estamos deixando os códigos compactos
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [                        //estamos definindo os plugins
        new MiniCssExtractPlugin ({   //aqui é uma função construtora
            filename: "estilo.css"    //arquivo criado dentro de pasta assets/css
        })
    ],
    module: {
        rules: [{                      //tradução de rules é regras
            test: /\.s?[ac]ss$/,            //essa é uma expressão que aceita esses 3 tipos de arquivos sass, css e scss
            use: [
                MiniCssExtractPlugin.loader,
                //'style-loader',      //adiciona css e dom injetando a tag <style>
                'css-loader',         //interpreta @import, url()...
                'sass-loader',
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,     //aqui é um teste que ele vai selecionar .png ou .svg, ou .jpg ou .gif. Ele selecionara uma dessas opções
            use: ['file-loader']              //aqui ele vai usar ofile loader
        }]
    }
}