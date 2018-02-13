var prompter = require('./prompter.js');

var ret = prompter.prompt([/*{
    type: 'list',
    name: 'sexo',
    options: {
        question: 'Selecione o sexo',
        list: ['Masculino', 'Feminino']
    }
}*/ {
    type: 'multi-select',
    name: 'selecionadas',
    options: {
        question: 'Multiplica escolhas',
        list: ["Opação A", "Opção B", "Opção C"]
    }
}]);

console.log(ret);