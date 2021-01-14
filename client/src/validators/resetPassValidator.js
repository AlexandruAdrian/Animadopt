import * as Yup from 'yup';

const passResetValidationSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, 'Minim 6 caractere')
    .required('Parola este necesara'),
  passwordConfirmation: Yup.string()
    .oneOf(
      [Yup.ref('newPassword'), null],
      'Cele doua parole trebuie sa fie identice'
    )
    .required('Parola este necesara'),
});

export default passResetValidationSchema;
