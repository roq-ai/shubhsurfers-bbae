import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  customer_name: yup.string().required(),
  customer_email: yup.string().required(),
  status: yup.string().required(),
  sales_representative_id: yup.string().nullable().required(),
});
