const terminal = require('./terminal.js');

var prompts = [
    require('./list.js'),
    require('./multi-select.js')
];

var REG_PROMPTS = {};

prompts.forEach(function(ele) {
    REG_PROMPTS[ele.type] = ele;
});

exports = {
    prompt: function(options) {
        var results = {};

        for (var i = 0; i < options.length; i++) {
            var opt = options[i];

            var prompt =  REG_PROMPTS[opt.type];

            var comp = prompt.create(opt.options);

            results[opt.name] = comp.prompt();
        }

        terminal.restore();

        return results;
    }
}