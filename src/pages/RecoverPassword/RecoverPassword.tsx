import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import InputMask from 'react-input-mask';
import { recoveryValidationSchema } from './validations/recoveryPasswordValidator';
import './styles/recoverPassword.css';

const RecoverPassword = () => {

  const handleSubmit = (values: { contact: string; contactType: string }, { setSubmitting }: any) => {
    console.log('Recovery Request Submitted:', values);
    setSubmitting(false);
  };

  return (
    <div className="recovery-container">
      <div className="recovery-card">
        <h2 className="recovery-title">Recover Password</h2>

        <Formik
          initialValues={{ contact: '', contactType: 'email' }}
          validationSchema={recoveryValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue, setFieldError, setFieldTouched }) => (
            <Form className="space-y-4">
              <div className="flex items-center space-x-4 mb-4">

                <label>
                  <Field
                    type="radio"
                    name="contactType"
                    value="email"
                    checked={values.contactType === 'email'}
                    onChange={() => {
                      setFieldValue('contactType', 'email');
                      setFieldValue('contact', '');
                      setFieldError('contact', '');
                      setFieldTouched('contact', false);
                    }}
                    className="text-orange-500"
                  />
                  <span className="ml-2">Email</span>
                </label>

                <label>
                  <Field
                    type="radio"
                    name="contactType"
                    value="phone"
                    checked={values.contactType === 'phone'}
                    onChange={() => {
                      setFieldValue('contactType', 'phone');
                      setFieldValue('contact', '');
                      setFieldError('contact', '');
                      setFieldTouched('contact', false);
                    }}
                    className="text-orange-500"
                  />
                  <span className="ml-2">Phone</span>
                </label>
                
              </div>

              {values.contactType === 'email' ? (
                <div>
                  <Field
                    type="email"
                    name="contact"
                    placeholder="Enter your email"
                    className="form-input"
                  />
                  <ErrorMessage name="contact" component="div" className="error-message" />
                </div>
              ) : (
                <div>
                  <InputMask
                    mask="(99) 99999-9999"
                    value={values.contact}
                    onChange={(e: any) => setFieldValue('contact', e.target.value)}
                    >
                    {(inputProps: any) => (
                      <Field
                        {...inputProps}
                        name="contact"
                        placeholder="Enter your phone number"
                        className="form-input"
                      />
                    )}
                  </InputMask>
                  <ErrorMessage name="contact" component="div" className="error-message" />
                </div>
              )}

              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting || !values.contact} >
                Send Recovery Link
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

export default RecoverPassword;