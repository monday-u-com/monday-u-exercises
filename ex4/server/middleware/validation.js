const { validationResult, checkSchema } = require('express-validator');

function validateSchema(schema) {
	const validationMiddleware = checkSchema(schema);
	return async (req, res, next) => {
		await validationMiddleware.run(req);
		const result = validationResult(req);
		if (result.isEmpty()) {
			next();
			return;
		}
		const error = Error(
			result
				.array()
				.map((value) => value.msg)
				.join()
		);
		error.statusCode = 400;
		next(error);
	};
}

const todoSchema = {
	value: {
		isLength: {
			errorMessage: 'Value should not be empty',
			options: { min: 1 },
		},
	},
};

module.exports = {
	validateSchema,
	todoSchema,
};
