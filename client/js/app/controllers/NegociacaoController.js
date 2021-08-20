class NegociacaoController{
    constructor(){
        let $ = document.querySelector.bind(document); //pega a instancia(this) do objeto

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        const self = this;

        //this._listaNegociacao = new ListaNegociacao(model => this._negociacaoView.update(model));
        this._listaNegociacao = new Proxy(new ListaNegociacao(), {
            get: function(target, prop,receiver){
                if(['adiciona','apaga'].includes(prop) && typeof(target[prop]) == typeof(Function) ){
                    return function(){
                        console.log(`a propriedade ${prop} foi interceptada`);
                        Reflect.apply(target[prop],target, arguments);
                        self._negociacaoView.update(target);
                    }
                }
                
                return Reflect.get(target,prop,receiver);
            }
        });

        this._negociacaoView = new NegociacaoView($('#negociacoesView'));
        this._negociacaoView.update(this._listaNegociacao);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
    }

    adiciona(event){
        event.preventDefault();

        this._listaNegociacao.adiciona(this._criaNegociacao());

        this._mensagem.texto = 'Negociacao adicionada com sucesso';
        this._mensagemView.update(this._mensagem);
        
        this._limpaFormulario();
        
        console.log(this._listaNegociacao.negociacoes);
    }

    apaga(){
        
        this._listaNegociacao.apaga();        

        this._mensagem.texto = 'Lista apagada com sucesso!';
        this._mensagemView.update(this._mensagem);
    }

    _limpaFormulario(){
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    _criaNegociacao(){

        return new Negociacao(
                    DateHelper.textoParaData(this._inputData.value),
                    this._inputQuantidade.value,
                    this._inputValor.value
                    );
    }
}