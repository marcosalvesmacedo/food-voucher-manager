
import * as Yup from 'yup';

export const registerValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .matches(/^\S+(\s+\S+)+$/, 'Username must contain more than one word and each word must have more than two letters')
    .min(5, 'Username must be at least 5 characters long'),
  user: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Repeat password is required'),
  phone: Yup.string()
    .matches(
      /^\(\d{2}\) \d{5}-\d{4}$/,
      'Phone number must be in the format (99) 99999-9999'
    )
    .required('Phone number is required'),
});