import { ErrorMessage, Field, Form, Formik } from "formik";
import InputMask from 'react-input-mask';
import { Link } from "react-router-dom";
import { useFormContext } from './contexts/loginFormContext';
import { RecoveryFormValues } from "./types/auth";
import { recoveryValidationSchema } from './validations/recoveryPasswordValidator';
import { useAuth } from "./hooks/authHook";
import { useNavigate } from "react-router-dom";
import './styles/recoverPassword.css';

const RecoveryPassword = () => {
  const { handleRecovery, loading, error } = useAuth();
  const { formValues, updateFormValues, resetForm } = useFormContext();
  const navigate = useNavigate();
  
  const handleSubmit = async (values: RecoveryFormValues, { setSubmitting }: any) => {

    try {
      const result = await handleRecovery(values);
      updateFormValues('recoveryPassword', { contact: '' });
      console.log(result);
      navigate('/');
    } catch (err: any) {
      alert(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="recovery-container">
      <div className="recovery-card">
        <h2 className="recovery-title">Recover Password</h2>

        <Formik
          initialValues={formValues.recoveryPassword}
          validationSchema={recoveryValidationSchema}
          onSubmit={handleSubmit}
          validateOnMount>
          {({ isSubmitting, isValid, values, setFieldValue, setFieldError, setFieldTouched }) => (
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
                disabled={isSubmitting || !isValid} >
                 {loading ? "Recovering..." : "Send Recovery Link"}
              </button>
              {/* {isSubmitting.toString()} */}
              <div className="link-container">
                <Link to="/" className="link" onClick={() => updateFormValues('recoveryPassword', values)}>Go back to Login</Link>
              </div>
            </Form>
          )}
        </Formik>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default RecoveryPassword;