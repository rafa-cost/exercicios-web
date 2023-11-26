const express = require('express')                   //importando o express
const app = express()                                //vou associar o express a esta variavel app
const bodyParser = require('body-parser')            //importando o body-parser
 app.use(bodyParser.urlencoded({extended: true}))    //o bodyParser ele le o corpo da requisição e transforma esses dados para serem interpretados atraves request body (console.log(req.body))
 
 app.post('/usuarios', (req, resp) => {              //fazer um requisição do tipo post em cima da url"http://localhost:3003/usuarios". (req, resp)requisição e resposta
        console.log(req.body)                        //aqui é para saber o que de fato chegou no body da requisição. A impressão sera feita no console do terminal
        console.log(req.query)                      
        resp.send('<h1>Parabéns.Usuario Incluido</h1>')               //ele mostrara essa msg na pagina assim que o usuario fizer o post
    })

    app.post('/usuarios/:id', (req, resp) => {              
        console.log(req.params.id)
        console.log(req.body)                        
        resp.send('<h1>Parabéns. Usuário Alterado!</h1>')               
    })

    app.listen(3003)



