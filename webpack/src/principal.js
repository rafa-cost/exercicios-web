//lembrando que principal é nosso arquivo de entrada. Pelo que eu entendi só imprimira o que estiver dentro dele
import Pessoa from './pessoa'           //importando classe Pessoa de arquivo pessoa
import './assets'                       //importando as configurações de css que estão dentro de assets. O professor falou que quando no endereço só esta a pasta assets sozinha, ela procura um arquivo index e no caso dentro de assets tem o index.js. Quando no terminal rodamos o npm start , criou o arquivo estilo.css dentro da pasta css, com as configurações que estão dentro dos arquivos scss e css que estão dentro de index.js
const atendente = new Pessoa
console.log(atendente.cumprimentar())  //executando função cumprimentar que esta dentro de classe pessoa