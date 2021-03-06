// extend.js
// Written by Andrew Dupont, optimized by Addy Osmani

function extend(source, destination) {
    "use strict";
    var toString = Object.prototype.toString,
        objTest = toString.call({}),
        property;

    for (property in source) {
        if (source.hasOwnProperty(property)) {
            if (objTest === toString.call(source[property])) {
                destination[property] = destination[property] || {};
                extend(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
    }
    return destination;
}