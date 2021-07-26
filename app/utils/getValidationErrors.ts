import type { ObjectSchema, ValidationError } from 'yup';

function getValidationErrors<T extends ActionForm>(schema: ObjectSchema<any>, values: T, stringify: true): string | void;
function getValidationErrors<T extends ActionForm>(schema: ObjectSchema<any>, values: T, stringify: false): Partial<T> | void;
function getValidationErrors<T extends ActionForm>(schema: ObjectSchema<any>, values: T, stringify = false): string | Partial<T> | void {
    try {
        schema.validateSync(values, { abortEarly: false });
        return;
    } catch (e) {
        let validationErrors: Partial<T> = {};
        (e as ValidationError).inner?.forEach(({ path, message}) => { 
            if (!!path) {
                const key = path as keyof T;
                validationErrors = {
                    ...validationErrors,
                    [key]: message
                }; 
            }
        });

        return stringify ? JSON.stringify(validationErrors) : validationErrors;
    }
}

export default getValidationErrors;