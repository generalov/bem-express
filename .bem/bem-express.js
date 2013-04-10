var BEM = require('bem'),
    Q = BEM.require('q'),
    VM = require('vm');


var bemDriver = function() {

    var getBemhtml = function(str) {

        var path = str;

        return BEM.util.readFile(path)
            .then(function(c) {
                /** @name BEMHTML variable appears after runInThisContext() call */
                VM.runInThisContext(c, path);
                return BEMHTML;
            });

    };

    var getBemjson = function(str, options) {

        var path,
            pathArr = str.replace('bemhtml', 'priv').split('/');

        pathArr[pathArr.length - 1] = '_' + pathArr[pathArr.length - 1];
        path = pathArr.join('/');

        return BEM.util.readFile(path)
            .then(function(c) {
                var blocks = {},
                    res;

                try {
                    eval(c);
                    res = blocks['b-page'] ? blocks['b-page'](options) : { block: 'b-page', content: ["blocks['b-page'] not found in ", path] };
                } catch (err) {
                    res = { block: 'b-page', content: ['Exception in ', path, err.toString()] };
                }

                return res;
            });

    };

    var getHtml = function(bemhtml, bemjson) {

        return Q.all([bemhtml, bemjson])
            .spread(function(bemhtml, bemjson) {
                return bemhtml.apply(bemjson);
            });

    };

    var getCreateResult = function(str, options) {

        return getHtml(
            getBemhtml(str),
            getBemjson(str, options));

    };

    return {

        render: function(str, options, fn) {

            var app = options.app;

            if ('development' == app.get('env')) {
                BEM.api.make().then(function() {
                    return getCreateResult(str, options);
                }).then(function(data) {
                    fn(false, data);
                });
            } else {
                getCreateResult(str, options).then(function(data) {
                    fn(false, data);
                });
            }

        }

    };

};






exports.__express = bemDriver().render;
