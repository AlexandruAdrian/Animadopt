// System
import * as Yup from 'yup';
// Constants
import { FILE_SIZE, SUPPORTED_FORMATS } from '../containers/Settings/constants';

const avatarValidationSchema = Yup.object().shape({
  file: Yup.mixed()
    .test('fileSize', 'Dimensiunea este prea mare', (value) => {
      return value && value.size <= FILE_SIZE;
    })
    .test('fileFormat', 'Formatul este invalid', (value) =>
      SUPPORTED_FORMATS.includes(value.type)
    ),
});

export default avatarValidationSchema;
