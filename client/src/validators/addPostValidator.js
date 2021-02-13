import * as Yup from 'yup';

const addPostValidationSchema = Yup.object().shape({
  title: Yup.string().required('Titlul este obligatoriu'),
  description: Yup.string().required('Descrierea este obligatorie'),
  breed: Yup.string().required('Rasa este obligatorie'),
  category: Yup.string().required('Categoria este obligatorie'),
  location: Yup.string().required('Localitatea este obligatorie'),
});

export default addPostValidationSchema;
