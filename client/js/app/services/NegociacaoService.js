class NegociacaoService{
    constructor(){
        this._http = new HttpService();
    }

    //Implementa uma funcao de callback para ser executada no retorno do metodo
    obterNegociacoesSemana(){
        return new Promise((resolve, reject) =>{

            this._http.get('negociacoes/semana')
                .then(negociacoes =>{
                    //transforma a resposta de objeto em um array de Negociacao
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Nao foi possivel importar as negociacoes da semana');
                });
        });
    };

    obterNegociacoesAnterior(){
        return new Promise((resolve, reject) =>{

            this._http.get('negociacoes/anterior')
                .then(negociacoes =>{
                    //transforma a resposta de objeto em um array de Negociacao
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Nao foi possivel importar as negociacoes da semana anterior');
                });
        });
    };

    obterNegociacoesRetrasada(){
        return new Promise((resolve, reject) =>{

            this._http.get('negociacoes/retrasada')
                .then(negociacoes =>{
                    //transforma a resposta de objeto em um array de Negociacao
                    resolve(negociacoes.map(objeto => new Negociacao(new Date(objeto.data),objeto.quantidade, objeto.valor)));
                })
                .catch(erro => {
                    console.log(erro);
                    reject('Nao foi possivel importar as negociacoes da semana retrasada');
                });
        });
    };
}