var prompter = require('./prompter.js');

var ret = prompter.prompt([{
    type: 'multi-select',
    name: 'many',
    message: 'Selecione pelo menos uma ou várias opções',
    options: {
        list: ["Opação A", "Opção B", "Opção C"]
    }
}, {
    type: 'question',
    name: 'nome',
    message: 'Nome'
}, {
    type: 'list',
    name: 'one',
    message: 'Selecione uma opção',
    options: {
        list: ["Opação A", "Opção B", "Opção C"]
    }
}]);

console.log(ret);