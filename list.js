const terminal = require('./terminal');
const escapeCodes = require('./escape-codes.js');
const KEYCODES = require('./keycodes.js');

var markSelected = escapeCodes.make(escapeCodes.COLORS.BLUE);
var green = escapeCodes.make(escapeCodes.COLORS.GREEN);
var bold  = escapeCodes.make(escapeCodes.COLORS.BOLD);

function create(opts) {
    const listOptions = opts.list || ['None'];
    const question = opts.question || 'None';
    var selected = 0;

    terminal.writeln(green(' ? ') + bold(question + ':'));
    terminal.writeln(' ');

    const lines = terminal.getLines();

    return {
        prompt: function() {
            this.draw();

            while (true) {
                var draw = false;

                switch (terminal.readKey()) {
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
            terminal.reset(lines);

            var buffer = '';

            listOptions.forEach(function(ele, i) {
                buffer += escapeCodes.clearLine() + (i == selected ? markSelected('> ' + ele) : ('  ' + ele)) + "\n";
            });
        
            terminal.writeln(buffer);
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