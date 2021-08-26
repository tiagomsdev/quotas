class ProxyFactory {
    static create(objeto, props, acao){
        return new Proxy(objeto, {
            get: function(target, prop,receiver){
                //verifica se a propriedade a interceptar esta no array e se é do tipo funcao
                if(props.includes(prop) && typeof(target[prop]) == typeof(Function) ){
                    return function(){
                        console.log(`a propriedade ${prop} foi interceptada`);
                        Reflect.apply(target[prop],target, arguments);
                        return acao(target);
                    }
                }
                
                return Reflect.get(target,prop,receiver);
            },
            //Cria uma interceptacao do metodo set para Mensagens pois a propriedade texto nao é uma function
            set: function(target, prop, value, receiver){
                if(props.includes(prop)){
                    console.log('entrou');
                    target[prop] = value;
                    acao(target);
                }
                return Reflect.set(target, prop, value,receiver);
            }
        });
            
    }
}