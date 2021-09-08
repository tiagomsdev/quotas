class HttpService{
    get(url){

        return new Promise((resolve, reject) => {
            
            const xhr = new XMLHttpRequest();

            xhr.open('GET',url);

            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        //Pega a resposta e transforma em objeto / gera o callback com o array de negociacoes como resposta
                        resolve(JSON.parse(xhr.responseText))
                    }else{
                        console.log(xhr.responseText)
                        reject(xhr.responseText);
                    }
                }
            };

            xhr.send();
        })
    }
}