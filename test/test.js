var assert = require('assert');
var exec = function(script, args, env) {
    return require('child_process').execSync(script + ' ' + args.join(' '), {cwd: require('path').join(__dirname, '..'), env: env, encoding: 'utf-8'}).trim();
}

var script = 'node echo.js';

var args_dev = [
    'dev', 'develop', 'development',
    '-dev', '-develop', '-development',
    '--dev', '--develop', '--development'
];
var args_prod = [
    'prod', 'product', 'production',
    '-prod', '-product', '-production',
    '--prod', '--product', '--production'
];
var env_dev = [
    ['RUNMODE', 'dev'],
    ['RUNMODE', 'develop'],
    ['RUNMODE', 'development'],
    ['NODE_ENV', 'dev'],
    ['NODE_ENV', 'develop'],
    ['NODE_ENV', 'development'],
];
var env_prod = [
    ['RUNMODE', 'prod'],
    ['RUNMODE', 'product'],
    ['RUNMODE', 'production'],
    ['NODE_ENV', 'prod'],
    ['NODE_ENV', 'product'],
    ['NODE_ENV', 'production'],
];

describe('no defines', function(){
    it('should be false', function(){
        assert.equal('false', exec(script, [], {}));
    });
});

describe('only env', function(){
    describe('env=dev', function(){
        env_dev.forEach(function(env){
            it('should be false if '+env[0]+'='+env[1], function(){
                var obj = {};
                obj[env[0]] = env[1];
                assert.equal('false', exec(script, [], obj));
            });
        });
    });
    describe('env=prod', function(){
        env_prod.forEach(function(env){
            it('should be true if '+env[0]+'='+env[1], function(){
                var obj = {};
                obj[env[0]] = env[1];
                assert.equal('true', exec(script, [], obj));
            });
        });
    });
});

describe('only args', function(){
    describe('arg=dev', function(){
        args_dev.forEach(function(arg){
            it('should be false if with arg '+arg, function(){
                assert.equal('false', exec(script, [arg], {}));
            });
        });
    });
    describe('arg=prod', function(){
        args_prod.forEach(function(arg){
            it('should be true if with arg '+arg, function(){
                assert.equal('true', exec(script, [arg], {}));
            });
        });
    });
    describe('arg=prod && arg=dev', function(){
        it('should be true if with arg '+args_prod[0]+' and '+args_dev[0], function(){
            assert.equal('true', exec(script, [args_prod[0], args_dev[0]], {}));
        });
    });
});

describe('dev and args', function(){

    describe('env=dev', function(){
        var env = env_dev;
        var obj = {};
        obj[env[0]] = env[1];
        describe('arg=dev', function(){
            var arg = args_dev[0];
            it('should be false if '+env[0]+'='+env[1]+' with arg '+arg, function(){
                assert.equal('false', exec(script, [arg], obj));
            });
        });
        describe('arg=prod', function(){
            var arg = args_prod[0];
            it('should be true if '+env[0]+'='+env[1]+' with arg '+arg, function(){
                assert.equal('true', exec(script, [arg], obj));
            });
        });
        describe('arg=prod && arg=dev', function(){

            var prod = args_prod[0];
            var dev = args_dev[0];
            it('should be true if '+env[0]+'='+env[1]+' with arg '+prod+' and '+dev, function(){
                assert.equal('true', exec(script, [prod, dev], obj));
            });
        });
    });
    describe('env=prod', function(){
        var env = env_prod;
        var obj = {};
        obj[env[0]] = env[1];
        describe('arg=dev', function(){
            var arg = args_dev[0];
            it('should be false if '+env[0]+'='+env[1]+' with arg '+arg, function(){
                assert.equal('false', exec(script, [arg], obj));
            });
        });
        describe('arg=prod', function(){
            var arg = args_prod[0];
            it('should be true if '+env[0]+'='+env[1]+' with arg '+arg, function(){
                assert.equal('true', exec(script, [arg], obj));
            });
        });
        describe('arg=prod && arg=dev', function(){

            var prod = args_prod[0];
            var dev = args_dev[0];
            it('should be true if '+env[0]+'='+env[1]+' with arg '+prod+' and '+dev, function(){
                assert.equal('true', exec(script, [prod, dev], obj));
            });
        });
    });
});
