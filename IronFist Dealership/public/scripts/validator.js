import { getCurrentUser } from './data.js'

var validator = (function () {
    'use strict';

    function isUserLogged() {
        return new Promise(function (resolve, reject) {
            getCurrentUser()
                .then(resolve)
                .catch(reject);
        });
    }

    function isBasicType(value, type) {
        return (typeof value === type)
    }

    function isEmptyString(value) {
        return value === '';
    }

    return {
        isUserLogged,
        isBasicType,
        isEmptyString
    };
}());

export {validator}