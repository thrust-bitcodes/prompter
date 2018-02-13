# PROMPTER
Bitcode similiar ao Inquirer (que é escrito em Nodejs).

## Plugins
* list
* question
* yn

## Utilização

```js
var prompter = require('./prompter.js');

var ret = prompter.prompt([{
    type: 'list',
    name: 'sexo',
    options: {
        question: 'Selecione o sexo',
        list: ['Masculino', 'Feminino']
    }
}]);

console.log(ret); // {sexo: 0 ou 1}
```

## Ainda em desenvolvimento.
