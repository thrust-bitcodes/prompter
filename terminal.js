const proc = require('process');
const std = require('std');
const KEYCODES = require('./keycodes.js');
const escapeCodes = require('./escape-codes.js');

const STTY_DEFAULT = proc.exec('stty -g < /dev/tty');

const STTY_MODES = {
    KEY: 1,
    LINE: 2
};

var savedPosY = [];
var savedPosX = [];
var maxY = 1;
var posY = 1; 

var maxX = 1;
var posX = 1;

var mode = -1;

setMode(STTY_MODES.KEY);

function setMode(newMode) {
    if (mode != STTY_MODES.KEY && newMode == STTY_MODES.KEY) {
        proc.exec('stty -icanon min 1 < /dev/tty');
        proc.exec('stty -echo < /dev/tty');
        write(escapeCodes.hideCursor());
    } 
    
    if (mode != STTY_MODES.LINE && newMode == STTY_MODES.LINE) {
        proc.exec('stty sane < /dev/tty');
        proc.exec('stty "' + STTY_DEFAULT + '" < /dev/tty');
        write(escapeCodes.showCursor());
    }

    mode = newMode;

    return mode;
}

function readKey() {
    setMode(STTY_MODES.KEY);

    return std.readKey();
}

function readLine() {
    setMode(STTY_MODES.LINE);

    return std.readLine();
}

function write(msg) {
    var values = msg.split(/\n/);

    posY += values.length - 1;
    maxY = Math.max(maxY, posY);

    if (values.length > 1) {
        posX = 1;
    }

    posX += escapeCodes.stripAnsi(values[values.length - 1]).length;

    values.forEach(function(row) {
        maxX = Math.max(maxX, escapeCodes.stripAnsi(row).length);
    });

    std.print(msg);
}

function writeln(msg) {
    write(msg + "\n");
}

function gotoY(y) {
    if (y < 0) {
        return;
    }

    var offset = posY - y;

    posY -= offset;

    if (posY <= 1) {
        posY = 1;
    }

    if (offset < 0) {
        write(escapeCodes.moveDown(Math.abs(offset)));
    } else {
        write(escapeCodes.moveUp(offset));
    }
}

function gotoX(x) {
    if (x < 0) {
        return;
    }

    var offset = posX - x;

    posX -= offset;

    if (posX <= 1) {
        posX = 1;
    }

    if (offset < 0) {
        write(escapeCodes.moveRight(Math.abs(offset)));
    } else {
        write(escapeCodes.moveLeft(offset));
    }
}

function saveX() {
    savedPosX.push(posX);
}

function clearX() {
    savedPosX = [];
}

function restoreX() {
    if (!savedPosX.length) {
        return;
    }

    var newPosX = savedPosX.pop();

    gotoY(newPosX);
}

function saveY() {
    savedPosY.push(posY);
}

function clearY() {
    savedPosY = [];
}

function restoreY() {
    if (!savedPosY.length) {
        return;
    }

    var newPosY = savedPosY.pop();

    gotoY(newPosY);
}

function restore() {
    setMode(STTY_MODES.LINE);
}

function saveXY() {
    saveX();
    saveY();
}

function restoreXY() {
    restoreY();
    restoreX();
}

function clear() {
    maxY = posY;
    write(escapeCodes.clearLine());
}

exports = {
    readKey: readKey,
    readLine: readLine,
    write: write,
    writeln: writeln,
    restore: restore,

    gotoY: gotoY,
    getY: function() { return posY; },
    saveY: saveY,
    clearY: clearY,
    restoreY: restoreY,

    gotoX: gotoX,
    getX: function() { return posX; },
    saveX: saveX,
    clearX: clearX,
    restoreX: restoreX,

    saveXY: saveXY,
    restoreXY: restoreXY,
    clear: clear
};


// writeln('1x');
// writeln('2xx');
// writeln('3xxx');
// writeln('4xxxx');
// writeln('5xxxxx');
// gotoY(2);
// gotoX(2);
// write('xxxxxxxxxxxxxxxxxx');
// readKey();
// clear();
// // write(escapeCodes.clearLine());
// readKey();