import * as yup from 'yup';

export const userProductValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  product_id: yup.string().nullable().required(),
});
