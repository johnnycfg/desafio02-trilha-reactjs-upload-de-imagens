import * as yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

export const schemaValidation = yup.object().shape({
  image: yup
    .mixed()
    .required('Arquivo obrigatório')
    .test('required', 'You need to provide a file', value => {
      return value && value.length;
    })
    .test('lessThan10MB', 'O arquivo deve ser menor que 10MB', value => {
      return value && value[0] && value[0].size > 10000;
    })
    .test(
      'acceptedFormats',
      'Somente são aceitos arquivos PNG, JPEG e GIF',
      value => {
        return value && value[0] && SUPPORTED_FORMATS.includes(value[0].type);
      }
    ),
  title: yup
    .string()
    .required('Título obrigatório')
    .min(2, 'Mínimo de 2 caracteres')
    .max(20, 'Máximo de 20 caracteres'),
  description: yup
    .string()
    .required('Descrição obrigatória')
    .max(65, 'Máximo de 65 caracteres'),
});
