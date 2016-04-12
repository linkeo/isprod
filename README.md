## Install

```sh
npm install --save isprod
```

## Usage

```
env.prod:   RUNMODE=prod|product|production
        or  NODE_ENV=prod|product|production

env.dev:    RUNMODE=dev|develop|development
        or  NODE_ENV=dev|develop|development

arg.prod:   --prod|--product|--production

arg.dev:    --dev|--develop|--development

priority:   arg.prod > arg.dev > env.prod > env.dev
```


arg.prod    | arg.dev   | env.prod  | env.dev   |    | result
------------|-----------|-----------|-----------|----|-------
no          | no        | no        | no        |    | false
no          | no        | no        | yes       |    | false
no          | no        | yes       | no        |    | true
no          | no        | yes       | yes       |    | true
no          | yes       | no        | no        |    | false
no          | yes       | no        | yes       |    | false
no          | yes       | yes       | no        |    | false
no          | yes       | yes       | yes       |    | false
yes         | no        | no        | no        |    | true
yes         | no        | no        | yes       |    | true
yes         | no        | yes       | no        |    | true
yes         | no        | yes       | yes       |    | true
yes         | yes       | no        | no        |    | true
yes         | yes       | no        | yes       |    | true
yes         | yes       | yes       | no        |    | true
yes         | yes       | yes       | yes       |    | true


```js
var is_prod = require('isprod'); // boolean
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
