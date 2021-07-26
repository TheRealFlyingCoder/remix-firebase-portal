import * as yup from 'yup';

const forgotPasswordSchema = yup.object().shape({
    email:  yup.string().email('Please enter a valid email').required('Required'),
});

export default forgotPasswordSchema;