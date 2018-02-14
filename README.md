# PROMPTER
Bitcode similiar ao Inquirer (que é escrito em Nodejs).

## Plugins
* list
* question
* multi-select

## Utilização

```js
var prompter = require('./prompter.js');

var ret = prompter.prompt([{
    type: 'list',
    name: 'sexo',
    message: 'Selecione o sexo'
    options: {
        list: ['Masculino', 'Feminino']
    }
}]);

console.log(ret); // {sexo: 0 ou 1}
```

## Ainda em desenvolvimento.
- [ ] Suporte para Win e Mac.
- [ ] Componente de Sim/Não (ou outras letras).
- [ ] Melhorar as cores apresentadas.