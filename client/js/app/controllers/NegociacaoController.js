class NegociacaoController{
    constructor(){
        let $ = document.querySelector.bind(document); //pega a instancia(this) do objeto

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        this._listaNegociacao = new ListaNegociacao();

        this._negociacaoView = new NegociacaoView($('#negociacoesView'));
        this._negociacaoView.update(this._listaNegociacao);

        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
    }

    adiciona(event){
        event.preventDefault();

        this._listaNegociacao.adiciona(this._criaNegociacao());
        this._negociacaoView.update(this._listaNegociacao);

        this._mensagem.texto = 'Novo paciente adicionado com sucesso';
        this._mensagemView.update(this._mensagem);
        
        this._limpaFormulario();
        
        console.log(this._listaNegociacao.negociacoes);
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