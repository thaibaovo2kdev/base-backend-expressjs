var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'textContent.json'),
    jsErrorData = null;

let undefined_error = {
    "code": "ERROR",
    "message": "Undefined Error"
};

function getContent(errorCode, lcode) {
    try {
        lcode = lcode || 'en'
        if (jsErrorData === null) {
            let rawdata = fs.readFileSync(filePath);
            jsErrorData = JSON.parse(rawdata);
        }
        let resultReturn = JSON.parse(JSON.stringify(undefined_error));
        if (jsErrorData?.[errorCode]?.[lcode]) resultReturn = { code: errorCode, message: jsErrorData?.[errorCode]?.[lcode] };
        else resultReturn.message = errorCode;
        return resultReturn;
    } catch (error) {
        return undefined_error;
    }
}

exports.default = getContent;