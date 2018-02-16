const terminal = require('./terminal.js');
const escapeCodes = require('ansi-escape-codes');

var prompts = [
    require('./list.js'),
    require('./multi-select.js'),
    require('./question.js')
];

var REG_PROMPTS = {};

prompts.forEach(function(ele) {
    REG_PROMPTS[ele.type] = ele;
});

const green = escapeCodes.make(escapeCodes.COLORS.GREEN);
const bold  = escapeCodes.make(escapeCodes.COLORS.BOLD);

function createComponent(opt) {
    var prompt =  REG_PROMPTS[opt.type];

    return prompt.create(opt.options);
}

exports = {
    prompt: function(options) {
        var results = {};

        for (var i = 0; i < options.length; i++) {
            var opt = options[i];

            terminal.write(green('? ') + bold(opt.message + ': '));
            //terminal.saveXY();

            var comp = createComponent(opt);

            results[opt.name] = comp.prompt();

            //terminal.restoreXY();
            //terminal.clear();

            //comp.drawResponse();

            // terminal.readLine();
        }

        terminal.restore();

        return results;
    }
}