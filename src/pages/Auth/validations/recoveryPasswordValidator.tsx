import * as Yup from 'yup';

export const recoveryValidationSchema = Yup.object().shape({
  contact: Yup.string()
    .when('contactType', {
      is: (contactType: string) => contactType === 'email',
      then: () => Yup.string()
          .email('Invalid email address')
          .required('Email is required'),
      otherwise: () => Yup.string()
          .matches(
            /^\(\d{2}\) \d{5}-\d{4}$/,
            'Phone number must be in the format (99) 99999-9999'
          )
          .required('Phone number is required'),
    }),
  contactType: Yup.string()
    .oneOf(['email', 'phone'], 'Please select a valid contact type')
    .required('Please choose a contact type'),
});