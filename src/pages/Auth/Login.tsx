import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useAuth } from './hooks/authHook';
import { loginValidationSchema } from './validations/loginValidator';
// import { Persist } from 'formik-persist'; not used beucase save data in localstorage and sessionStorage.
import { useFormContext } from './contexts/loginFormContext';
import { LoginFormValues } from './types/auth';
import './styles/login.css';

const Login = () => {
  const { handleLogin, loading, error } = useAuth();
  const { formValues, updateFormValues, resetForm } = useFormContext();

  const handleSubmit = async (values: LoginFormValues, { setSubmitting }: any) => {
    try {
      const result = await handleLogin(values.email, values.password);
      console.log(result);
      resetForm('login');
    } catch (err) {
      alert(err);
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <Formik
          initialValues={formValues.login}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}
          validateOnMount>
           {({ isSubmitting, isValid, values }) => (
            <Form className="space-y-4">

              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-input" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>

              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-input" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>

              <button 
                type="submit"
                className="submit-button"
                disabled={isSubmitting || !isValid}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="link-container">
                <Link to="/register" className="link" onClick={() => updateFormValues('login', values)}>Don't have an account? Register</Link>
                <Link to="/recovery-password" className="link" onClick={() => updateFormValues('login', values)}>Forgot password? Recover</Link>
              </div>
            </Form>
            )}
            {/* <Persist name="form-name" /> not used beucase save data in localstorage and sessionStorage */}
        </Formik>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;