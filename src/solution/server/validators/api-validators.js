const { validationResult, checkSchema } = require('express-validator');

const allowedSortBy = ['A-Z', 'Z-A']

const validateIdSchema = {
    id: {
        isString: true,
        isLength: {
            errorMessage: 'ID should be 9 characters long.',
            options: { min: 9, max: 9 },
        },
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