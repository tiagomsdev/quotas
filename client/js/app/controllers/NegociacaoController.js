class NegociacaoController{
    constructor(){
        let $ = document.querySelector.bind(document); //pega a instancia(this) do objeto

        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        //usa o Biding para criar uma ProxyFactory que cria um novo proxy de Negociacao
        this._negociacaoView = new NegociacaoView($('#negociacoesView'));
        
        this._listaNegociacao = new Bind(
            new ListaNegociacao(),
            this._negociacaoView,
            ['adiciona','apaga']);
        
        //usa o Biding para criar uma ProxyFactory que cria um novo proxy de Mensagem
        this._mensagemView = new MensagemView($('#mensagemView'));

        this._mensagem = new Bind(
            new Mensagem(),
            this._mensagemView,
            ['texto']);
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

    importaNegociacoes(){
        const service = new NegociacaoService();
        service.obterNegociacoesSemana((erro, negociacoes) =>{
            if(erro){
                this._mensagem.texto = erro;
                return;
            }

            //Percorre o array de negociacoes e adiciona na lista de negociacao
            negociacoes.forEach(negociacao => this._listaNegociacao.adiciona(negociacao));
            this._mensagem.texto = 'Negociacoes importadas com sucesso';
        })
    }
}