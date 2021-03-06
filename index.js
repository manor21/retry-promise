'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var retry = function retry() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var getPromise = arguments[1];

    if (typeof opts === 'function') {
        return retry({}, opts);
    }

    opts.max = opts.max || 10;
    opts.backoff = opts.backoff || 1000;

    return new Promise(function (resolve, reject) {
        var attempt = function attempt(i) {
            getPromise(i).then(resolve).catch(function (err) {
                if (i >= opts.max) {
                    return reject(err);
                }
                setTimeout(function () {
                    return attempt(i + 1);
                }, opts.increaseInterval ? i * opts.backoff : opts.backoff);
            });
        };
        attempt(1);
    });
};

exports.default = retry;