import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getProductOrderById, updateProductOrderById } from 'apiSdk/product-orders';
import { Error } from 'components/error';
import { productOrderValidationSchema } from 'validationSchema/product-orders';
import { ProductOrderInterface } from 'interfaces/product-order';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ProductInterface } from 'interfaces/product';
import { OrderInterface } from 'interfaces/order';
import { getProducts } from 'apiSdk/products';
import { getOrders } from 'apiSdk/orders';

function ProductOrderEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ProductOrderInterface>(
    () => (id ? `/product-orders/${id}` : null),
    () => getProductOrderById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ProductOrderInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateProductOrderById(id, values);
      mutate(updated);
      resetForm();
      router.push('/product-orders');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ProductOrderInterface>({
    initialValues: data,
    validationSchema: productOrderValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Product Order
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="quantity" mb="4" isInvalid={!!formik.errors?.quantity}>
              <FormLabel>Quantity</FormLabel>
              <NumberInput
                name="quantity"
                value={formik.values?.quantity}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('quantity', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.quantity && <FormErrorMessage>{formik.errors?.quantity}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<ProductInterface>
              formik={formik}
              name={'product_id'}
              label={'Select Product'}
              placeholder={'Select Product'}
              fetcher={getProducts}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<OrderInterface>
              formik={formik}
              name={'order_id'}
              label={'Select Order'}
              placeholder={'Select Order'}
              fetcher={getOrders}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.customer_name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'product_order',
  operation: AccessOperationEnum.UPDATE,
})(ProductOrderEditPage);
