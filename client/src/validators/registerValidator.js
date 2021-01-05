import * as Yup from 'yup';

const registerValidationSchema = Yup.object({
  email: Yup.string()
    .email('Adresa de email este invalida')
    .required('Email-ul este necesar'),
  lastName: Yup.string().required('Numele este necesar'),
  firstName: Yup.string().required('Prenumele este necesar'),
  password: Yup.string()
    .min(6, 'Minim 6 caractere')
    .required('Parola este necesara'),
  passwordConfirmation: Yup.string()
    .oneOf(
      [Yup.ref('password'), null],
      'Cele doua parole trebuie sa fie identice'
    )
    .required('Parola este necesara'),
  phone: Yup.string()
    .length(10, 'Numarul de telefon este invalid')
    .matches(
      /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|)?([0-9]{3}(\s|)){2}$/gim,
      'Numarul de telefon este invalid'
    )
    .required('Numarul de telefon este necesar'),
  gender: Yup.string().oneOf(['M', 'F']).required('Acest camp este necesar'),
});

export default registerValidationSchema;
