var querystring = require('querystring');
var handle = require("./requestHandler.js").handle;

function route(pathname, query, response, postData) {
    console.log("[handle request] : " + pathname + " " + query + " " + response + " " + postData);
    if (handle[pathname]) {
        handle[pathname](pathname, query, response, postData);
    } else {
        handle['getPath'](pathname, query, response, postData);
    }
}

exports.route = route;