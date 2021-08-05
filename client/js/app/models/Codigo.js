class Codigo {
    
    _validaCodigo(codigo){
        if(!/\D{3}-\D{2}-\d{2}/.test(codigo)){
            throw Error('O codigo é invalido');
        }
        return codigo;
    }

    exibeNoConsole(lista1,lista2) {
        let listas = lista1.concat(lista2);
        listas.forEach(listas => console.log(listas));
    }

    CalculaNumeros(numeros){
        let resultado = numeros.reduce(function(total,num) {
            return total * num;
        }, 1); 
        console.log(resultado);
    }
    CalculaNumerosArrow(numeros){
        let resultado = numeros.reduce((total, num) => total *= num,1);
        console.log(resultado);
    }

    MapCalcula(numeros){
        let dobro = numeros.map(function(num) {
            return num * 2;
        });
        let metade = numeros.map(function(num) {
            return num/2;
        });
        let raiz = numeros.map(function(num) {
            return Math.sqrt(num);
        });

        console.log(dobro);
        console.log(metade);
        console.log(raiz);
    }

    MapCalculaArrow(numeros){
        let dobro = numeros.map(num => num * 2);
        let metade = numeros.map(num => num/2);
        let raiz = numeros.map(num => Math.sqrt(num));

        console.log(dobro);
        console.log(metade);
        console.log(raiz);
    }
}