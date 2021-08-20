class ListaNegociacao{
    constructor(updateNegociacao){
        this._listaNegociacoes = [];
        this._updateNegociacao = updateNegociacao;
    }

    adiciona(negociacao){

        this._listaNegociacoes.push(negociacao);
        //this._updateNegociacao(this);
    }

    apaga(){
        this._listaNegociacoes = [];
        //this._updateNegociacao(this);
    }

    get negociacoes(){
        return [].concat(this._listaNegociacoes);
    }
}