const terminal = require('./terminal');
const escapeCodes = require('./escape-codes.js');
const KEYCODES = require('./keycodes.js');

var markSelected = escapeCodes.make(escapeCodes.COLORS.BLUE);
var green = escapeCodes.make(escapeCodes.COLORS.GREEN);
var bold  = escapeCodes.make(escapeCodes.COLORS.BOLD);

function create(opts) {
    return {
        prompt: function() {
            return terminal.readLine();
        },

        draw: function() {
        }
    };
}

exports = {
    type: 'question',

    create: create
};