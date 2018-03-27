
# jsonp

A simple JSONP implementation.

## API

### jsonp(url, callback, opts)

- `url` (`String`) url to fetch
- `callback` callback
- `opts` (`Object`), optional
  - `param` (`String`) name of the query string parameter to specify
    the callback (defaults to `callback`)
  - `timeout` (`Number`) how long after a timeout error is emitted. `0` to
    disable (defaults to `10000`)
  - `prefix` (`String`) prefix for the global callback functions that
    handle jsonp responses (defaults to `__jp`)
  - `name` (`String`) name of the global callback functions that
    handle jsonp responses (defaults to `prefix` + incremented counter)
Returns a function that, when called, will cancel the in-progress jsonp request
(`fn` won't be called).

The callback is called with `err, data` parameters.

If it times out, the `err` will be an `Error` object whose `message` is
`Timeout`.


## Usage|Example 
```
var jsonp = require('jsonp')  
jsonp(url, function(err, data) {    
    if (err) {    
        console.log(err)    
    } else {    
        console.log(data)   
    }   
}
```

## License

MIT
