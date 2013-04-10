exports.baseTechName = 'js-i';

exports.techMixin = {

    getDependencies: function() {
        return ['bemhtml'];
    },

    getSuffixes: function() {
        return ['priv.js'];
    },

    getBuildResult: function(prefixes, suffix, outputDir, outputName) {

        var _this = this;
        return this.__base.apply(this, arguments)
            .then(function(res) {
                // добавляем в результат билда, скомпилированный `.bemhtml.js`
                res.unshift(_this.getBuildResultChunk(_this.getPath(outputName, 'bemhtml.js')));
                return res;
            });

    }

};
