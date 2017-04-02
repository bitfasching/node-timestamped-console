# Timestamped Console

Returns a new console class adding a timestamp to the beginning of each line.
Does not patch any existing console, but modify the console's output streams.
Written for node.js in ES2015.

## Usage

Call the factory function returned by `require` with your preferred timestamp format.
You can use your console locally as `console` without changing the global console object for other modules.
The console's internals have not been changed, any method will work [as expected](https://nodejs.org/api/console.html).

```javascript
// get new console
const console = require( 'timestamped-console' )( 'yyyy-mm-dd HH:MM' )

// say hello
console.log( "This will be logged to stdout." )
console.error( new Error("This is sent to stderr.") )

// 2017-03-03 13:37 This will be logged to stdout.
// 2017-03-03 13:37 Error: This is sent to stderr.
// 2017-03-03 13:37     at Object.<anonymous> (…/test.js:6:16)
// 2017-03-03 13:37     at Module._compile (module.js:571:32)
// 2017-03-03 13:37     at Object.Module._extensions..js (module.js:580:10)
// 2017-03-03 13:37     at Module.load (module.js:488:32)
// 2017-03-03 13:37     at tryModuleLoad (module.js:447:12)
// 2017-03-03 13:37     at Function.Module._load (module.js:439:3)
// 2017-03-03 13:37     at Module.runMain (module.js:605:10)
// 2017-03-03 13:37     at run (bootstrap_node.js:423:7)
// 2017-03-03 13:37     at startup (bootstrap_node.js:147:9)
// 2017-03-03 13:37     at bootstrap_node.js:538:3
```

## Reference

### require( 'timestamped-console' )( timestampFormat, prefixPattern )

- **timestampFormat** `String` Optional. Date format as used by [dateformat](https://www.npmjs.com/package/dateformat) and specified by [Steven Levithan](http://blog.stevenlevithan.com/archives/date-time-format). Set to something falsy to disable prepending anything. Defaults to "isoDateTime".
- **prefixPattern** `String` Optional. The pattern to prepend to each console line, where the percent sign `%` denotes the timestamp. Defaults to "% ", which separates the timestamp from the log output by a space.
