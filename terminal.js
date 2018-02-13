const proc = require('./process.js');
const stdin = require('./stdin.js');
const KEYCODES = require('./keycodes.js');
const escapeCodes = require('./escape-codes.js');

const STTY_DEFAULT = proc.exec('stty -g < /dev/tty');

const STTY_MODES = {
    KEY: 1,
    LINE: 2
};

var lines   = 0;
var columns = 0;
var maxColumns = 0;

var mode = -1;

setMode(STTY_MODES.KEY);

function setMode(newMode) {
    if (mode != STTY_MODES.KEY && newMode == STTY_MODES.KEY) {
        proc.exec('stty -icanon min 1 < /dev/tty');
        proc.exec('stty -echo < /dev/tty');
    } 
    
    if (mode != STTY_MODES.LINE && newMode == STTY_MODES.LINE) {
        proc.exec('stty sane < /dev/tty');
        proc.exec('stty "' + STTY_DEFAULT + '" < /dev/tty');
    }

    mode = newMode;

    return mode;
}

function readKey() {
    setMode(STTY_MODES.KEY);

    return stdin.readKey();
}

function readLine() {
    setMode(STTY_MODES.LINE);

    return stdin.readLine();
}

function write(msg) {
    var values = msg.split(/\n/);

    lines += values.length - 1;
    columns = values[values.length - 1].length;
    maxColumns = Math.max(maxColumns, columns);

    stdin.print(msg);
}

function writeln(msg) {
    write(msg + "\n");
}

function reset(newLine) {
    write(escapeCodes.moveUp(lines - newLine) + '');
    
    lines = newLine;

    if (lines < 0) {
        lines = 0;
    }
}

exports = {
    reset: reset,

    readKey: readKey,

    write: write,

    writeln: writeln,

    getLines: function () { return lines; },

    getColuns: function() { return columns; }
};

// setMode(STTY_MODES.KEY);

// console.log('Key: ', readKey());

// setMode(STTY_MODES.LINE);

// console.log('Line: ', readLine());

// write('olaaa');
// write('xxx');

// console.log('column', columns);
// console.log('column', maxColumns);

// write('Qual é seu nome? ');
// readLine();