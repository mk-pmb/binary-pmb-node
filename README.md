
<!--#echo json="package.json" key="name" underline="=" -->
binary-pmb
==========
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Unpack multibyte binary values from buffers and streams. (Maintenance fork of
substack&#39;s `binary`)
<!--/#echo -->



You can specify the endianness and signedness of the fields to be unpacked too.

This module is a cleaner and more complete version of
[bufferlist](https://github.com/substack/node-bufferlist)'s binary module that
runs on pre-allocated buffers instead of a linked list.

[![build status](https://secure.travis-ci.org/mk-pmb/binary-pmb-node.png)](http://travis-ci.org/mk-pmb/binary-pmb-node)


Installation
============

```bash
npm install binary
```



Examples
========

See the [docs/examples/](docs/examples/) directory.



API
===

```javascript
var binary = require('binary-pmb')
```


<!--#toc cap-end=" &amp;nbsp;&#0;, rxu." -->
  * [var b = binary()](#toc-var-b-binary)
  * [binary.parse(buf)](#toc-binary-parse-buf)
  * [b.vars](#toc-b-vars)
  * [b.word{8,16,24,32,64}{l,b}{e,u,s}(key)](#toc-b-word-8-16-24-32-64-l-b-e-u-s-key)
  * [b.buffer(key, size)](#toc-b-buffer-key-size)
  * [b.str(key, size&#x5B;, encoding&#x5D;)](#toc-b-str-key-size-encoding)
  * [b.utf8(key, size)](#toc-b-utf8-key-size)
  * [b.skip(dist)](#toc-b-skip-dist)
  * [b.scan(key, buffer)](#toc-b-scan-key-buffer)
  * [b.tap(cb)](#toc-b-tap-cb)
  * [b.into(key, cb)](#toc-b-into-key-cb)
  * [b.loop(cb)](#toc-b-loop-cb)
  * [b.flush()](#toc-b-flush)

<!--/#toc -->

<a class="readme-ssi-toc-target" id="toc-var-b-binary" name="toc-var-b-binary"></a>
### var b = binary()

Return a new writable stream `b` that has the chainable methods documented below
for buffering binary input.



<a class="readme-ssi-toc-target" id="toc-binary-parse-buf" name="toc-binary-parse-buf"></a>
### binary.parse(buf)

Parse a static buffer in one pass. Returns a chainable interface with the
methods below plus a `vars` field to get at the variable stash as the
last item in a chain.

In parse mode, methods will set their keys to `null` if the buffer isn't big
enough except `buffer()` and `scan()` which read up up to the end of the buffer
and stop.



<a class="readme-ssi-toc-target" id="toc-b-vars" name="toc-b-vars"></a>
### b.vars

See `binary.parse`.



<a class="readme-ssi-toc-target" id="toc-b-word-8-16-24-32-64-l-b-e-u-s-key" name="toc-b-word-8-16-24-32-64-l-b-e-u-s-key"></a>
### b.word{8,16,24,32,64}{l,b}{e,u,s}(key)

Parse bytes in the buffer or stream given:

* number of bits
* endianness ( l : little, b : big ),
* signedness ( u and e : unsigned, s : signed )

These functions won't start parsing until all previous parser functions have run
and the data is available.

The result of the parse goes into the variable stash at `key`.
If `key` has dots (`.`s), it refers to a nested address. If parent container
values don't exist they will be created automatically, so for instance you can
assign into `dst.addr` and `dst.port` and the `dst` key in the variable stash
will be `{ addr : x, port : y }` afterwards.



<a class="readme-ssi-toc-target" id="toc-b-buffer-key-size" name="toc-b-buffer-key-size"></a>
### b.buffer(key, size)

Take `size` bytes directly off the buffer stream, putting the resulting buffer
slice in the variable stash at `key`.

__vars lookup:__ If `size` is a string, use the value at `vars[size]`.
The key follows the same dotted address rules as the word functions.



<a class="readme-ssi-toc-target" id="toc-b-str-key-size-encoding" name="toc-b-str-key-size-encoding"></a>
### b.str(key, size[, encoding])

Same as `.buffer` but decode the data as a string.
Default `encoding` is `latin1`.



<a class="readme-ssi-toc-target" id="toc-b-utf8-key-size" name="toc-b-utf8-key-size"></a>
### b.utf8(key, size)

Same as `.buffer` but decode the data as a UTF-8 string.



<a class="readme-ssi-toc-target" id="toc-b-skip-dist" name="toc-b-skip-dist"></a>
### b.skip(dist)

Jump `dist` bytes ahead.
The "vars lookup" feature from `.buffer` applies to `dist`.



<a class="readme-ssi-toc-target" id="toc-b-scan-key-buffer" name="toc-b-scan-key-buffer"></a>
### b.scan(key, buffer)

Search for `buffer` in the stream and store all the intervening data in the
stash at at `key`, excluding the search buffer. If `buffer` passed as a string,
it will be converted into a Buffer internally.

For example, to read in a line you can just do:

```javascript
var b = binary()
    .scan('line', new Buffer('\r\n'))
    .tap(function (vars) {
        console.log(vars.line)
    })
;
stream.pipe(b);
```



<a class="readme-ssi-toc-target" id="toc-b-tap-cb" name="toc-b-tap-cb"></a>
### b.tap(cb)

The callback `cb` is provided with the variable stash from all the previous
actions once they've all finished.

You can nest additional actions onto `this` inside the callback.



<a class="readme-ssi-toc-target" id="toc-b-into-key-cb" name="toc-b-into-key-cb"></a>
### b.into(key, cb)

Like `.tap()`, except all nested actions will assign into a `key` in the `vars`
stash.



<a class="readme-ssi-toc-target" id="toc-b-loop-cb" name="toc-b-loop-cb"></a>
### b.loop(cb)

Loop, each time calling `cb(end, vars)` for function `end` and the variable
stash with `this` set to a new chain for nested parsing. The loop terminates
once `end` is called.



<a class="readme-ssi-toc-target" id="toc-b-flush" name="toc-b-flush"></a>
### b.flush()

Clear the variable stash entirely.



<!--#toc stop="scan" -->


Known issues
------------

* The word64 functions will only return approximations since javascript
  uses IEEE floating point for all number types. Mind the loss of precision.



&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
MIT
<!--/#echo -->
