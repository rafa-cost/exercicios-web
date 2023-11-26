function novoElemento(tagName, className) {                      //uma função para criar um novo elemento
const elem = document.createElement(tagName)
elem.className = className
return elem
}
function Barreira(reversa = false) {                              //criamos uma função construtora que de acordo com o parametro ela pode criar o corpo primeiro ou a borda da barreira
    this.elemento = novoElemento('div', 'barreira')

    const borda = novoElemento('div', 'borda')
    const corpo = novoElemento('div', 'corpo')
    this.elemento.appendChild(reversa ? corpo : borda)
    this.elemento.appendChild(reversa ? borda : corpo)

    this.setAltura = altura => corpo.style.height = `${altura}px`   //aqui é para definir a altura da barreira
}
function ParDeBarreiras(altura, abertura, x) {                      //aqui a função par de barreira pq vai ter a barreira infeiror e superior
    this.elemento = novoElemento('div', 'par-de-barreiras')
    
    this.superior = new Barreira(true)                                //aqui eu instanciei a barreira superior e inferior
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)                    //adicionei as duas barreiras dentro desse elemento que eu criei
    this.elemento.appendChild(this.inferior.elemento)

    this.sortearAbertura = () => {                                        //criei uma função para sortear a localização dessas barreiras, mas sempre com abertura do mesmo tamanho
        const alturaSuperior = Math.random() * (altura - abertura)
        const alturaInferior = altura - abertura - alturaSuperior
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }
    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])    //aqui essas 3 funções é para simplificar manipulação e leitura desses elementos
    this.setX = x => this.elemento.style.left = `${x}px`
    this.getLargura = () => this.elemento.clientWidth

    this.sortearAbertura()                                               //para ja começar com a barreira sorteada no inicio do jogo
    this.setX(x)                                                         //o x para definir a posição que essa barreira vai aparecer
}
/*const b = new ParDeBarreiras(700, 350, 400)
document.querySelector('[wm-flappy]').appendChild(b.elemento)*/

function Barreiras(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [                                                       //serão quatro barreiras que ficaram passando na tela, fazendo o loop
        new ParDeBarreiras(altura, abertura, largura),
        new ParDeBarreiras(altura, abertura, largura + espaco),
        new ParDeBarreiras(altura, abertura, largura + espaco * 2),      //esses numeros é de acordo com o espaço entre as barreiras, quanto mais barreiras mais espaços
        new ParDeBarreiras(altura, abertura, largura + espaco * 3)
    ]
    const deslocamento = 3                                                //aqui é de acordo com a velocidade dos canos , quanto maior mais rapido menor mais lento
    this.animar = () => {                                                 //essa função esta fazendo o deslocamento dos canos
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)

            //quando o elemento sair da area do jogo
            if(par.getX() < -par.getLargura()) {                         //aqui ira sortear a altura dos canos, lebrando que ja definimos 4 pares de canos (ParDeBarreiras) aqui ele defini os restantes, lembrando que a largura sempre sera a mesma entre o cano de cima e de baixo
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura()
            }
            const meio = largura / 2
            const cruzouOMeio = par.getX() + deslocamento >= meio 
            && par.getX() < meio                                         //essa tres linha de cod é para avisar que ele cruzou o meio 
            if(cruzouOMeio) notificarPonto()                             //se cruzou o meio ele notifica ponto se não cruzou ele não faz nada
        })
    }
}
    function Passaro(alturaJogo) {                                   //o passaro recebe a altura do jogo para saber até onde ele pode ir
    let voando = false
    this.elemento = novoElemento('img', 'passaro')
    this.elemento.src = 'imgs/passaro.png'
    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`

    window.onkeydown = e => voando = true                          //aqui o passaro quando tiver teclando vai voar 
    window.onkeyup = e => voando = false                           //aqui quando soltar a tecla ele cai

    this.animar = () => {
        const novoY = this.getY() + (voando ? 8 : -5)              //quando ele estiver voando vai somar 8 e quando ele estiver caindo vai subtrair -5 ou seja ele vou mais rapido do que cai
        const alturaMaxima = alturaJogo - this.elemento.clientHeigth  //aqui é a altura maxima para que ele não ultrapasse o teto

        if (novoY <= 0) {                                           // aqui no maximo ele pode descer até o chão ,não pode passar disso
            this.setY(0)
        } else if (novoY >= alturaMaxima) {
            this.setY(alturaMaxima)                                //aqui também é a questão da altura maxima
        } else {
            this.setY(novoY)                                       //se ele não violar nem o minimo e nem o maximo, assim sim set um novo y
        }
    }
    this.setY(alturaJogo / 2)                                      //aqui estamos setando a posição inicial do passaro
    }

    function Progresso() {                                         //função de contagem dos pontos
        this.elemento = novoElemento('span', 'progresso')
        this.atualizarPontos = pontos => {
            this.elemento.innerHTML = pontos
        }
        this.atualizarPontos(0)                                     //atualizar pontos começa de zero
    }
   /* const barreiras = new Barreiras(700, 1200, 350, 400)                 //altura, largura, largura vertical entre os canos, espaçamento horizontal entre os canos 
    const passaro = new Passaro (700)                                    //aqui estamos passando a altura do jogo para passaro
    const areaDoJogo = document.querySelector('[wm-flappy]')             //aqui estamos selecionando a area do jogo
    areaDoJogo.appendChild(passaro.elemento)
    barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))  //para cada par de cano , selecionando dentro da area do jogo
    setInterval(() => {                                                   //definindo a velocidade e execução do jogo
        barreiras.animar()
        passaro.animar()
    }, 20)*/
function estaoSobrepostos(elementoA, elementoB) {
    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()

    const horizontal = a.left + a.width >= b.left      //aqui no caso calculando uma colisão horizontal, nos canos
    && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top          //caculando uma colisão vertical
    && b.top + b.height >= a.top
    return horizontal && vertical
}
function colidiu(passaro, barreiras) {
    let colidiu = false
    barreiras.pares.forEach(ParDeBarreiras => {
        if (!colidiu) {
            const superior = ParDeBarreiras.superior.elemento
            const inferior = ParDeBarreiras.inferior.elemento
            colidiu = estaoSobrepostos(passaro.elemento, superior)    //se passaro estiver sobreposto com barreira superior ou subreposto com barreira inferior significa que colidiu 
            || estaoSobrepostos(passaro.elemento, inferior)
        }
    })
    return colidiu
}

    function FlappyBird() {
        let pontos = 0                                                    //pontos recebe 0
        
        const areaDoJogo = document.querySelector('[wm-flappy]')          //aqui estamos selecionando a area do jogo
        const altura = areaDoJogo.clientHeight                            //altura do jogo e abaixo largura
        const largura = areaDoJogo.clientWidth
        const progresso = new Progresso()                                 //nova contagem de pontos
        const barreiras = new Barreiras(altura, largura, 250, 400, () => progresso.atualizarPontos(++pontos))    //novas barreiras, altura, largura, largura vertical entre os canos, largura horizontal entre os canos. Progresso atualizando os pontos de 1 em 1
        const passaro = new Passaro(altura)

        areaDoJogo.appendChild(progresso.elemento)                           //passando progresso para elemento
        areaDoJogo.appendChild(passaro.elemento)                              //passando passaro parra elemento
        barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))  //para cada par de cano , selecionando dentro da area do jogo
        this.start = () => {                                                  //iniciando o jogo
            //loop do jogo
            const temporizador = setInterval(() => {                        //tempo de velocidade do jogo
                barreiras.animar()
                passaro.animar()

                if (colidiu(passaro, barreiras)) {                        //se colidiu com a barreira do jogo , ai tem um temporizador para parar o jogo
                    clearInterval(temporizador)
                }
            }, 20)
        }
    }
    new FlappyBird().start()

    