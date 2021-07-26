import * as yup from 'yup';

const requiredMessage = 'Required';

export const yupEmail = () => yup.string().email('Please enter a valid email').required(requiredMessage);
export const yupPassword = () => yup.string().required(requiredMessage).min(8, 'Password must be at least 8 characters');
export const yupRequiredString = () => yup.string().required(requiredMessage);
export const yupConfirmPassword = (field: string) => yup.string().required(requiredMessage).test('passwords-match', 'Passwords do not match', function(val) {
    return this.parent[field] === val;
})
