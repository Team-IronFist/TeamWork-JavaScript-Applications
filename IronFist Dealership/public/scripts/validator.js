import { users } from './data.js'

var validator = (function () {
    'use strict';

    function isUserLogged() {
        const promise = new Promise(function (resolve, reject) {
            users.getCurrentUser()
                .then((data) => {
                    if (data.result) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                });
        });
        return promise;
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
