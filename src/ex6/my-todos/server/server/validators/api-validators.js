const { validationResult, checkSchema } = require('express-validator');

const allowedSortBy = ['ASC', 'DESC']

const validateIdSchema = {
    id: {
        isInteger: true,
        in: ['params']
    }
};

const todoSchema = {
    todo: {
        isString: true,
        errorMessage: 'Missing paramater todo',
        in: ['body']
    },
};

const getTodosSchema = {
    sortBy: {
        isString: true,
        optional: true,
        isIn: { options: [allowedSortBy] },
        errorMessage: `Bad paramater sortBy, expected one of ${allowedSortBy.join(',')}`,
        in: ['query']
    },
};

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
module.exports = {
    validateIdSchema,
    todoSchema,
    getTodosSchema,
    validateSchema
}