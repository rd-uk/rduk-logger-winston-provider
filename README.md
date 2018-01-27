# RDUK - Winston logger provider

[![Greenkeeper badge](https://badges.greenkeeper.io/rd-uk/rduk-logger-winston-provider.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/rd-uk/rduk-logger-winston-provider.svg?branch=master)](https://travis-ci.org/rd-uk/rduk-logger-winston-provider)
[![Coverage Status](https://coveralls.io/repos/github/rd-uk/rduk-logger-winston-provider/badge.svg?branch=master)](https://coveralls.io/github/rd-uk/rduk-logger-winston-provider?branch=master)
[![bitHound Overall Score](https://www.bithound.io/github/rd-uk/rduk-logger-winston-provider/badges/score.svg)](https://www.bithound.io/github/rd-uk/rduk-logger-winston-provider)


this module is a [Winston](https://www.npmjs.com/package/winston) implementation of the [RDUK base logger provider](https://www.npmjs.com/package/@rduk/logger)

## Installation

```sh
npm i --save --save-exact @rduk/logger @rduk/logger-winston-provider
```

## Configuration

```yaml
# config.yml (see @rduk/configuration for detail)
---
logger:
  default: winston
  providers:
    -
      name: winston
      type: '@rduk/logger-winston-provider'
      level: debug
      transports:
        files:
          - 
            filename: out.log
        console: true
```

## Usage

```js
const logger = require('@rduk/logger');
logger.error('error'); 
logger.warn('warn'); 
logger.info('info'); 
logger.verbose('verbose'); 
logger.debug('debug'); 
```

## Transports
By default, only the winston core transports are available (`file`, `console`, `http`).

If you need another transport, you can create a factory.

### Example (winston logstash)

```js
const winston = require('winston');
require('winston-logstash');

module.exports = {
    create: function(options) {
        return [new winston.transports.Logstash(options)];
    }
};
```

```yaml
logger:
  default: winston
  providers:
    -
      name: winston
      type: '@rduk/logger-winston-provider'
      factories:
        logstash: '~/path/to/factory'
      level: info
      transports:
        logstash:
          host: 'example.com'
          port: 11111
          node_name: myapp
```

## License and copyright

See [LICENSE](LICENSE) file