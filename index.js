var prompter = require('./prompter.js');

var ret = prompter.prompt([{
    type: 'multi-select',
    name: 'many',
    message: 'Selecione a(s) opção(ões)',
    options: {
        list: ["Opção A", "Opção B", "Opção C"]
    }
}, {
    type: 'question',
    name: 'nome',
    message: 'Informe seu nome'
}, {
    type: 'list',
    name: 'one',
    message: 'Selecione uma opção',
    options: {
        list: ["Opação A", "Opção B", "Opção C"]
    }
}]);

console.log(ret);