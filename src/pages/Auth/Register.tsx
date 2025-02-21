import { ErrorMessage, Field, Form, Formik } from 'formik';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import { useFormContext } from './contexts/loginFormContext';
import { registerValidationSchema } from './validations/registerValidator';
import { useAuth } from './hooks/authHook';
import { useNavigate } from 'react-router-dom';
import { RegisterFormValues } from './types/auth';
import './styles/register.css';

const Register = () => {
  const { handleRegister, loading, error } = useAuth();
  const { formValues, updateFormValues, resetForm } = useFormContext();
  const navigate = useNavigate();
  const handleSubmit = async (values: RegisterFormValues, { setSubmitting }: any) => {

    try {
      const result = await handleRegister(values);
      console.log(result);
      resetForm('register');
      navigate('/');
    } catch (err: any) {
      alert(err);
    } finally {
      setSubmitting(false);
    }
    console.log('Recovery Request Submitted:', values);
  };

  return (
    <div className="recovery-container">
      <div className="recovery-card">
        <h2 className="recovery-title">Create an Account</h2>

        <Formik
          initialValues={formValues.register}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
          validateOnMount>
          {({ isSubmitting, isValid, values, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="form-input"
                />
                <ErrorMessage name="username" component="div" className="error-message" />
              </div>

              <div>
                <Field
                  type="email"
                  name="user"
                  placeholder="User (Email)"
                  className="form-input"
                />
                <ErrorMessage name="user" component="div" className="error-message" />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-input"
                />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <div>
                <Field
                  type="password"
                  name="repeatPassword"
                  placeholder="Repeat Password"
                  className="form-input"
                />
                <ErrorMessage name="repeatPassword" component="div" className="error-message" />
              </div>

              <div>
                <InputMask
                  mask="(99) 99999-9999"
                  value={values.phone}
                  onChange={(e: any) => setFieldValue('phone', e.target.value)}
                >
                  {(inputProps: any) => (
                    <Field
                      {...inputProps}
                      name="phone"
                      placeholder="Phone Number"
                      className="form-input"
                    />
                  )}
                </InputMask>
                <ErrorMessage name="phone" component="div" className="error-message" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="submit-button">
                  {loading ? "Registering..." : "Register"}
              </button>

              <div className="link-container">
                <Link to="/" className="link" onClick={() => updateFormValues('register', values)}>Go back to Login</Link>
              </div>
            </Form>
          )}
        </Formik>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Register;