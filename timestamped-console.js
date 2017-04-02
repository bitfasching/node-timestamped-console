/**
 * Timestamped Console
 *
 * Returns a new console class adding a timestamp to the beginning of each line.
 * Does not patch any existing console, but modify the console's output streams.
 * Written for node.js in ES2015.
 *
 * Nick Schwarzenberg
 * nick@bitfasching.de
 * v0.1.0, 04/2017
 *
 * License: MIT
 */

'use strict'


// external module dependencies
const LineTransformStream = require( 'line-transform-stream' )
const dateformat = require( 'dateformat' )

// built-in module dependency
const Console = require( 'console' ).Console


// export console factory function
module.exports = function TimestampedConsole( timestampFormat='isoDateTime', prefixPattern='% ', stdout=process.stdout, stderr=process.stderr )
{
    // transform function to prefix log lines
    function prefixLines( line )
    {
        // timestamp enabled?
        if ( timestampFormat )
        {
            // prepend timestamp in desired format and prefix pattern
            line = prefixPattern.replace( '%', dateformat( timestampFormat ) ) + line
        }

        return line
    }

    // create a line transform stream for each console output
    const transformStdOut = new LineTransformStream( prefixLines )
    const transformStdErr = new LineTransformStream( prefixLines )

    // connect transform streams to outputs
    transformStdOut.pipe( stdout )
    transformStdErr.pipe( stderr )

    // return console with custom outputs
    return new Console( transformStdOut, transformStdErr )
}
