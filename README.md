## Install

```sh
npm install --save isprod
```

## Usage

``` sh
RUNMODE=prod app # set runmode via env
app --prod # set runmode via args
```

```js
var is_prod = require('isprod');
```

## Example

Config.js

```js
var common = {
    appName: "App Name",
    mailSender: {
        displayName: 'Notify',
        service: 'QQ',
        auth: {
            user: 'xxxxxx@qq.com',
            pass: 'xxxxxxxxxxxxx'
        }
    }
};

var dev = {
    server: {
        domain: 'http://localhost:8080',
        port: 8080,
        httpsPort: 8443
    },
    mongodb: {
        url: "mongodb://localhost/test",
        options: {
            server: {
                poolSize: 5,
                socketOptions: {
                    keepAlive: 300
                }
            }
        }
    },
    redis: {
        host: "localhost",
        port: 6379
    }
};

var prod = {
    server: {
        domain: 'http://should.set.it.in.config.js',
        port: 8083
    }
};

Object.assign = require('object-assign');

if (require('isprod')) {
    module.exports = Object.assign({}, common, prod);
} else {
    module.exports = Object.assign({}, common, dev);
}
```

Server.js

```js
...

server.listen(require('./Config.js').server, callback);

...
```
