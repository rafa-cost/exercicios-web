const colors = {                              //cor de dentro dos boxs das tags
    p: '#388e3c',
    div: '#1565c0',
    span: '#e53935',
    section: '#f67809',
    ul: '#5e35b1',
    ol: '#fbc02d',
    header: '#d81b60',
    nav: '#64dd17',
    main: '#00acc1',
    footer: '#304ff2',
    form: '#9f6581',
    body: '#25b6da',
    padrao: '#616161',
    get(tag) {
        return this[tag]
    }

}

document.querySelectorAll('.tag').forEach(elemento => {     //"querySelectorAll('.tag')"aqui pegando a classe tag. Deixando as letras minusculas
    const tagName = elemento.tagName.toLowerCase()

elemento.style.borderColor = colors.get(tagName)            //deixando a borda com mesma cor do box
                                                            //esse código esta fazendo os boxs com os nomes das tags dentro e inserindo dentro das linhas 
if (!elemento.classList.contains('nolabel')) {             //esta contindo o nolabel na lista de classe, se estiver contido não entre. O "nolabel" é uma função que impede que vc configure a tag
    const label = document.createElement('label')           //se não estiver , ele ira criar
    label.style.backgroundColor = colors.get(tagName)       //aplicando a cor dentro do box da tag
    label.innerHTML = tagName                               //colocando nome da tag dentro do box
    elemento.insertBefore(label, elemento.childNodes[0])    //aqui ele vai inserir os boxs dentro das linhas, pela ordem do primeiro em diante
}
})