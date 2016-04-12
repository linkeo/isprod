var regexp_prod = /^(--?)?prod(uct(ion)?)?$/i
var regexp_dev = /^(--?)?dev(elop(ment)?)?$/i

var env = process.env['RUNMODE'];
var env_node = process.env['NODE_ENV'];
var args = process.argv.slice(2);

var or = function(a,b){return a||b;}

var env_prod = regexp_prod.test(env) || regexp_prod.test(env_node);
var arg_prod = args.map(function(arg){return regexp_prod.test(arg)}).reduce(or, false);
var arg_dev = args.map(function(arg){return regexp_dev.test(arg)}).reduce(or, false);

module.exports = arg_prod?true:(arg_dev?false:env_prod);
