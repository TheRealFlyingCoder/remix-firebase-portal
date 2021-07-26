import * as yup from 'yup';

const createAccountSchema = yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName:  yup.string().required('Required'),
    email:  yup.string().email('Please enter a valid email').required('Required'),
    password:  yup.string().required('Required').min(8, 'Password must be at least 8 characters'),
});

export default createAccountSchema;