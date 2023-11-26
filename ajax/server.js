const bodyParser = require('body-parser')   //ele vai interpretar esses dados, e deixar esses dados prontos para serem manipulados aqui dentro deste arquivo server.js
const express = require('express')
const app = express()                       //instanciamos o express , colocamos ele em uma variavel

app.use(express.static('.'))                //ele vai prover os arquivos estaticos a partir da aplicação desse midlware
app.use(bodyParser.urlencoded({ extended: true }))   //responsavel por ler os dados e transformar isso em objeto
app.use(bodyParser.json())

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './upload')                    //pasta de armazenamento de arquivo
    },
    filename: function (req, file, callback) {         //função nome do arquivo
        callback(null, `${Date.now()}_${file.originalname}`)   //usando a função callback aqui na hora do salvamento ele vai colocar a data antes do nome do arquivo. Isso ajuda para que vc consiga salvar o arquivo com o mesmo nome mais de uma vez
    }
})
const upload = multer({ storage }).single('arquivo')       //essa função é para interpretar o upload que vai vir a partir da requisição feita via ajax no servidor 

app.post('/upload', (req, res) => {                     //vai ser via post para fazer a requisição upload deste arquivo, e a url que vai receber o arquivo
    upload(req, res, err => {                         //no momento que o upload for concluido ele vai chamar essa função "upload(req, res, err ". Tradução requisição, resposta , erro
        if (err) {                                    //se der erro
            return res.end('Ocorreu um erro.')
        }
        res.end('Concluido com sucesso.')            //se não der erro
    })
})

app.post('/formulario', (req, res) => {                   //criando para requisições do tipo post, que vai atender na url '/formularios'
    res.send({
        ...req.body,
        id: 1                                             
    })
})
    app.get('/parOuImpar', (req, res) => {                  //criando função para requisição get , que vai atender na url '/parOuImpar'
        // req.body
        // req.query
        // req.params
        const par = parseInt(req.query.numero) % 2 === 0  //função para ver se o numero é par, se ele dividir por 2 e resto for igual a 0 , é par
        res.send({                                     
            resultado: par ? 'par' : 'impar'              //se função par for verdadeira é par se não é impar
        })
})

app.listen(8080, () => console.log('Executando...'))  //estamos estartando o servidor na porta 8080 , e colocando a msg executando no console para saber que o servidor iniciou