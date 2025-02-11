import { Formik, Field, Form, ErrorMessage } from 'formik';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';
import { registerValidationSchema } from './validations/registerValidator';
import './styles/register.css';

const Register = () => {

  const handleSubmit = (values: { username: string; user: string; password: string; phone: string }, { setSubmitting }: any) => {
    console.log('Recovery Request Submitted:', values);
    setSubmitting(false);
  };

  return (
    <div className="recovery-container">
      <div className="recovery-card">
        <h2 className="recovery-title">Create an Account</h2>

        <Formik
          initialValues={{
            username: '',
            user: '',
            password: '',
            repeatPassword: '',
            phone: '',
          }}
          validationSchema={registerValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => (
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
                  mask="(11) 99999-9999"
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
                disabled={isSubmitting}
                className="submit-button"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>

        <div className="link-container">
          <Link to="/" className="link">
            Go back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;