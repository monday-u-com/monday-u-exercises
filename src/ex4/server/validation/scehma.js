export const SCHEMA_ID = {
    id: {
        in: ['params', 'query'],
        errorMessage: 'ID is wrong',
        isInt: true
    }
};

export const SCHEMA_TASK = {
    task: {
        in: ['params', 'query'],
        errorMessage: 'Task is wrong',
        isLength: {
            errorMessage: `Task cant be empty`,
            options: { min: 1 }
        }
    }
}
