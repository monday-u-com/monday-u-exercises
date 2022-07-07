const {validationResult, checkSchema} = require('express-validator');

const allowedSortBy = ['ASC', 'DESC']
const allowedStatus = ['done', 'pending']

const validateIdSchema = {
    id: {
        isInt: true,
        in: ['params']
    }
};

const todoSchema = {
    todo: {
        isString: true,
        errorMessage: 'Missing paramater todo-page',
        in: ['body']
    },
};

const getTodosSchema = {
    sort: {
        isString: true,
        optional: true,
        isIn: {options: [allowedSortBy]},
        errorMessage: `Bad parameter sort, expected one of ${allowedSortBy.join(',')}`,
        in: ['query']
    },

    search: {
        isString: true,
        optional: true,
        in: ['query']
    },

    status: {
        isString: true,
        optional: true,
        isIn: {options: [allowedStatus]},
        errorMessage: `Bad parameter status, expected one of ${allowedStatus.join(',')}`,
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