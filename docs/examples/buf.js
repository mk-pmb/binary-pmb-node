var buf = new Buffer([ 97, 98, 99, 100, 101, 102, 0 ]);

var binary = require('binary-pmb');
binary(buf)
    .word16ls('ab')
    .word32bu('cf')
    .word8('x')
    .tap(function (vars) {
        console.dir(vars);
        // output: { ab: 25185, cf: 1667523942, x: 0 }
    })
;
