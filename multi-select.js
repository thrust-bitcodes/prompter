const terminal = require('./terminal');
const escapeCodes = require('./escape-codes.js');
const KEYCODES = require('./keycodes.js');

var markSelected = escapeCodes.make(escapeCodes.COLORS.BLUE);

function create(opts) {
    const listOptions = opts.list || ['None'];
    var selected = 0;
    var marked = {};

    terminal.writeln('');

    function nop(msg) {
        return msg;
    }

    function drawOption(ele, i) {
        var line = (marked[i] ? '[X] ' : '[ ] ') + ele;

        return i == selected ? markSelected(line) : line;
    }

    function getResponse() {
        return Object.keys(marked).filter(function(ele) {
            return ele;
        }).map(Number);
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
                        terminal.gotoY(terminal.getY() + listOptions.length);
                        return getResponse();
 
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
            terminal.saveY();

            var buffer = '';

            listOptions.forEach(function(ele, i) {
                buffer += escapeCodes.clearLine() + drawOption(ele, i) + "\n";
            });
        
            terminal.writeln(buffer);

            terminal.restoreY();
        },

        drawResponse: function() {
            var response = getResponse();

            var resp = [];

            response.forEach(function(ele) {
                if (marked[ele]) {
                    resp.push(listOptions[ele]);
                }
            });

            terminal.writeln(resp.join(","));
        }
    };
}

exports = {
    type: 'multi-select',

    create: create
};