import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { loginValidationSchema } from './validations/loginValidator';
import { useAuth } from './hooks/loginHook';

import './styles/login.css';


const Login = () => {
  const { handleLogin, loading, error } = useAuth();

  const handleSubmit = async (values: { email: string; password: string }, { setSubmitting }: any) => {
    try {
      const result = await handleLogin(values.email, values.password);
      console.log(result)
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
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleSubmit}>
          
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
                disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="link-container">
                <Link to="/register" className="link">Don't have an account? Register</Link>
                <Link to="/recover-password" className="link">Forgot password? Recover</Link>
              </div>
            </Form>

        </Formik>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;