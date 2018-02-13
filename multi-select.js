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
    var marked = {};

    terminal.writeln(green(' ? ') + bold(question + ':'));
    terminal.writeln(' ');

    const lines = terminal.getLines();

    function nop(msg) {
        return msg;
    }

    function drawOption(ele, i) {
        var line = (marked[i] ? '[X] ' : '[ ] ') + ele;

        return i == selected ? markSelected(line) : line;
    }

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
                        return Object.keys(marked).filter(function(ele) {
                            return ele;
                        }).map(Number);
 
                    case KEYCODES.SPACEBAR:
                        marked[selected] = !marked[selected];
                        draw = true;
                        break;
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
                buffer += escapeCodes.clearLine() + drawOption(ele, i) + "\n";
            });
        
            terminal.writeln(buffer);
        }
    };
}

exports = {
    type: 'multi-select',

    create: create
};