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

    function parseDate(data) {
        for(let result of data) {
            let parsedDate = result.CreatedAt + '';
            let indexOfGMT = parsedDate.indexOf("GMT");
            result.CreatedAt = parsedDate.substring(0, indexOfGMT);

            parsedDate = result.ModifiedAt + '';
            indexOfGMT = parsedDate.indexOf("GMT");
            result.ModifiedAt = parsedDate.substring(0, indexOfGMT);
        }
        return data;
    }

    return {
        isUserLogged,
        isBasicType,
        isEmptyString,
        parseDate
    };
}());

export {validator}