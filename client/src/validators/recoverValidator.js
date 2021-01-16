import * as Yup from 'yup';

const recoverValidatorSchema = Yup.object({
  email: Yup.string()
    .email('Adresa de email este invalida')
    .required('Email-ul este necesar'),
});

export default recoverValidatorSchema;
