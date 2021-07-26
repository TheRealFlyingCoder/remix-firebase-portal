import * as yup from 'yup';
import { yupConfirmPassword, yupPassword } from '../../utils/yup';

const resetPasswordSchema = yup.object().shape({
    password:  yupPassword(),
    confirm: yupConfirmPassword('password')
});

export default resetPasswordSchema;