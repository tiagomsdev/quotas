class NegociacaoService{
    //Implementa uma funcao de callback para ser executada no retorno do metodo
    obterNegociacoesSemana(cb){
        const xhr = new XMLHttpRequest();

        xhr.open('GET','negociacoes/semanaX');

        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    console.log('Obtendo as negociacoes do servidor');

                    //Pega a resposta e transforma em objeto / gera o callback com o array de negociacoes como resposta
                    cb(null, JSON.parse(xhr.responseText)
                    //transforma a resposta de objeto em um array de Negociacao
                    .map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade, objeto.valor)));
                }else{
                    console.log('Nao foi possivel obter as negociacoes do servidor');
                    console.log(JSON.parse(xhr.responseText));
                    cb('Erro ao importar negociacoes', null);
                }
            }
        };

        xhr.send();
    }
}