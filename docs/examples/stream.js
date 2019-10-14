var binary = require('binary-pmb');
var stm = process.stdin;

function hint(hint) { if (stm.isTTY) { console.info(hint); } }
hint('Now reading data from stdin. (How about "abcdefgh" + newline?)');

var ws = binary()
    .word32lu('x')
    .word16bs('y')
    .word16bu('z')
    .tap(function (vars) {
        console.dir(vars);
        // output for "abcdefgh": { x: 1684234849, y: 25958, z: 26472 }
        hint('Waiting for end-of-file on stdin. (Usually Ctrl-D.)');
    });
process.stdin.pipe(ws);
process.stdin.resume();
