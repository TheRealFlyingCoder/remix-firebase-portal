import * as yup from 'yup';

const basicInfoSchema = yup.object().shape({
    firstName: yup.string().required('Required'),
    lastName:  yup.string().required('Required'),
});

export default basicInfoSchema;