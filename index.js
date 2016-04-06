var prod = false;
var argprod = false;
var argdev = false;

var env = process.env['RUNMODE'];

if ( env != undefined && 
	(env.toLowerCase instanceof Function) && 
	(env.toLowerCase() === 'prod') ) prod = true;


var args = process.argv.slice(2);

args.forEach( function(arg) {
	if (arg === '--prod') argprod = true;
	if (arg === '--dev') argdev = true;
});

if (argdev) prod = false;
if (argprod) prod = true;

module.exports = prod;
