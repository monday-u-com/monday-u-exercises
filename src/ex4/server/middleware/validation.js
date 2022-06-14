const {body, validationResult, checkSchema} = require('express-validator');


function validate() {
    return [
        body('id', 'id not valid number').exists().isNumeric(),
        (req, res, next) => {
            try {
                validationResult(req).throw();
                next();
            } catch (err) {
                console.log(err);
                res.status(400).json({
                    status: 400,
                    error: err.errors.map(value => value.msg).join()
                });
            }
        }
    ];
}


function validateSchema(schema) {
    const validationMiddleware = checkSchema(schema);
    return async (req, res, next) => {
        await validationMiddleware.run(req);
        const result = validationResult(req);
        if (result.isEmpty()) {
            next();
            return;
        }
        const error = Error(result.array().map(value => value.msg).join());
        error.statusCode = 400;
        next(error);
    };
}

const itemSchema = {
    id: {
        isInt: true,
        errorMessage: 'ID is wrong',
        in: ['body']
    },
   
};

module.exports = {
    validateSchema,
    itemSchema
};