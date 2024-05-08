const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ?? 500;
    let title = 'Not Found'
    const { constants } = require('../constants')

    switch (statusCode) {
        case constants.VALIDATION_ERROR: title = 'Validation Failed'; break;
        case constants.NOT_FOUND: title = 'Not Found'; break;
        case constants.FORBIDDEN: title = 'Forbidden'; break;
        case constants.UNAUTHORIZED: title = 'Unauthorized'; break;
        case constants.SERVER_ERROR: title = 'Internal Server Error'; break;
        default: console.log('no error'); break;
    }

    res.json({ title: title, message: err.message, stackTrace: err.strack })
}

module.exports = errorHandler;