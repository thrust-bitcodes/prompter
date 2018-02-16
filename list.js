const terminal = require('./terminal');
const escapeCodes = require('ansi-escape-codes');
const KEYCODES = require('./keycodes.js');

var markSelected = escapeCodes.make(escapeCodes.COLORS.BLUE);
var green = escapeCodes.make(escapeCodes.COLORS.GREEN);
var bold  = escapeCodes.make(escapeCodes.COLORS.BOLD);

function create(opts) {
    const listOptions = opts.list || ['None'];
    var selected = 0;

    terminal.writeln('');

    return {
        prompt: function() {
            this.draw();

            while (true) {
                var draw = false;
                var key = terminal.readKey();

                switch (key) {
                    case KEYCODES.UP_ARROW: 
                        selected--;
                        draw = true;
                        break;
            
                    case KEYCODES.DOWN_ARROW: 
                        selected++;
                        draw = true;
                        break;
            
                    case KEYCODES.CARRIAGE_RETURN:
                    case KEYCODES.ENTER:
                        terminal.gotoY(terminal.getY() + listOptions.length);
                        return selected;
                }

                if (draw) {
                    if (selected < 0) {
                        selected = listOptions.length - 1;
                    } else {
                        selected = selected % listOptions.length;
                    }
    
                    this.draw();
                }
            }
        },

        draw: function() {
            terminal.saveY();

            var buffer = '';

            listOptions.forEach(function(ele, i) {
                buffer += escapeCodes.clearLine() + (i == selected ? markSelected('> ' + ele) : ('  ' + ele)) + "\n";
            });
        
            terminal.writeln(buffer);
            terminal.restoreY();
        }
    };
}

// var lst = create({
//     question: 'Selecione o sexo',

//     list: ['Masculino', 'Feminino']
// });

// lst.prompt();

exports = {
    type: 'list',

    create: create
};