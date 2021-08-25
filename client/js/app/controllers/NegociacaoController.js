class NegociacaoController{
    constructor(){
        let $ = document.querySelector.bind(document); //pega a instancia(this) do objeto

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        const self = this;

        //usa a ProxyFactory para criar um novo proxy de ListaNegociacao
        this._listaNegociacao = ProxyFactory.create(
            new ListaNegociacao(), 
            ['adiciona','apaga']
            , model => this._negociacaoView.update(model));

        this._negociacaoView = new NegociacaoView($('#negociacoesView'));
        this._negociacaoView.update(this._listaNegociacao);
        
        //usa a ProxyFactory para criar um novo proxy de Mensagem
        this._mensagem = ProxyFactory.create(
            new Mensagem(),
            ['texto'],
            model => this._mensagemView.update(model));
        this._mensagemView = new MensagemView($('#mensagemView'));
    }

    adiciona(event){
        event.preventDefault();

        this._listaNegociacao.adiciona(this._criaNegociacao());

        this._mensagem.texto = 'Negociacao adicionada com sucesso';
        //this._mensagemView.update(this._mensagem);
        
        this._limpaFormulario();
        
        console.log(this._listaNegociacao.negociacoes);
    }

    apaga(){
        
        this._listaNegociacao.apaga();        

        this._mensagem.texto = 'Lista apagada com sucesso!';
        //this._mensagemView.update(this._mensagem);
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