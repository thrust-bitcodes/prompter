const COLORS = {
    BLACK: '\u001B[30m',
    RED: '\u001B[31m',
    GREEN: '\u001B[32m',
    YELLOW: '\u001B[33m',
    BLUE: '\u001B[34m',
    MAGENTA: '\u001B[35m',
    CYAM: '\u001B[36m',
    WHITE: '\u001B[37m',
    BRIGHT_BLACK: '\u001B[30;1m',
    BRIGHT_RED: '\u001B[31;1m',
    BRIGHT_GREEN: '\u001B[32;1m',
    BRIGHT_YELLOW: '\u001B[33;1m',
    BRIGHT_BLUE: '\u001B[34;1m',
    BRIGHT_MAGENTA: '\u001B[35;1m',
    BRIGHT_CYAN: '\u001B[36;1m',
    BRIGHT_WHITE: '\u001B[37;1m',

    BACKGROUND_BLACK: '\u001B[40m',
    BACKGROUND_RED: '\u001B[41m',
    BACKGROUND_GREEN: '\u001B[42m',
    BACKGROUND_YELLOW: '\u001B[43m',
    BACKGROUND_BLUE: '\u001B[44m',
    BACKGROUND_MAGENTA: '\u001B[45m',
    BACKGROUND_CYAN: '\u001B[46m',
    BACKGROUND_WHITE: '\u001B[47m',
    BACKGROUND_BRIGHT_BLACK: '\u001B[40;1m',
    BACKGROUND_BRIGHT_RED: '\u001B[41;1m',
    BACKGROUND_BRIGHT_GREEN: '\u001B[42;1m',
    BACKGROUND_BRIGHT_YELLOW: '\u001B[43;1m',
    BACKGROUND_BRIGHT_BLUE: '\u001B[44;1m',
    BACKGROUND_BRIGHT_MAGENTA: '\u001B[45;1m',
    BACKGROUND_BRIGHT_CYAN: '\u001B[46;1m',

    BOLD: '\u001B[1m',
    UNDERLINE: '\u001B[4m',
    REVERSED: '\u001B[7m',

    RESET: '\u001B[0m'
};

function esc(code) {
    return '\u001b[' + code;
}

function gotoxy(x, y) {
    return esc(y + ';' + x + 'f');
}

function moveUp(n) {
    return esc(n + 'A');
}

function moveDown(n) {
    return esc(n + 'B');
}

function moveLeft(n) {
    return esc(n + 'D');
}

function moveRight(n) {
    return esc(n + 'C');
}

function clearLine() {
    return esc('K');
}

function cls() {
    return esc('2J');
}

function saveCursor() {
    return esc('s');
}

function restoreCursor() {
    return esc('u')
}

function reportCursor(x, y) {
    return esc(y + ';' + x + 'R');
}

function showCursor() {
    return esc('?25h');
}

function hideCursor() {
    return esc('?25l')
}

function wrap(wrap, text) {
    return wrap + text + COLORS.RESET;
}

function make(colors) {
    var colors = Array.prototype.slice.call(arguments);

    return function(text) {
        return wrap(colors.join(''), text);
    }
}

exports = {
    moveDown: moveDown,
    moveLeft: moveLeft,
    moveRight: moveRight,
    moveUp: moveUp,
    clearLine: clearLine,
    showCursor: showCursor,
    hideCursor: hideCursor,

    COLORS: COLORS,

    make: make
};


// console.log(saveCursor() + "<");
// console.log(moveUp(1) + 'xxxxxxxxxxxxxxxxxx' + clearLine());
// console.log(reportCursor(5, 3));
// console.log(restoreCursor() + "WWW");
// console.log(gotoxy(10, 20) + 'xxx');
// console.log('yyyy');
// console.log(gotoxy(5, 3) + 'o');
// console.log('+');