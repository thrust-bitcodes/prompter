var prompter = require('./prompter.js');

var ret = prompter.prompt([{
    type: 'list',
    name: 'sexo',
    options: {
        question: 'Selecione o sexo',
        list: ['Masculino', 'Feminino']
    }
}]);

console.log(ret);