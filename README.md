# wasmrust-addon

A web-extension written with Rust, WebAssembly and so on. This project is based
on the
[rust-webpack-template](https://github.com/rustwasm/rust-webpack-template). I
also took inspiration in the wonderful [Rust and WebAssembly
book](https://rustwasm.github.io/book/introduction.html).

:warning: There is a [bug with `wasm-bindgen` >
0.2.34](https://github.com/rustwasm/wasm-bindgen/issues/1246), make sure you
have `wasm-bindgen` and `wasm-bindgen-cli` 0.2.34 installed. I am not actually
sure how I did that but if you are a Rust user, you should be able to figure it
out. Sorry.

## Getting started

After having cloned the repository, install the dependencies:

```
$ npm i
```

Compile the project in dev mode (with watch mode enabled):

```
$ npm dev
```

You can use [web-ext](https://github.com/mozilla/web-ext) to see the extension
in action (with watch mode):

```
$ npm run web-ext-run
```
