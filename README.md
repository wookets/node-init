
A bootstrapper for node. Will run a recursive require on the specified directory. Helpful if you have
a 'server' directory with all your files that need to be registered or loaded (routes / models / etc).

## Install

In package.json, under dependencies, you can do...

```"init": "https://github.com/wookets/node-init/0.1.0"```

## Usage

```
require('init')('./server');

```


