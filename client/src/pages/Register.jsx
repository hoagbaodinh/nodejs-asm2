import { Form, redirect } from "react-router-dom";
import "./login.scss";
import axios from "axios";

const RegisterPage = () => {
  return (
    <Form className="loginForm" method="post">
      <h2>Sign up</h2>
      <input
        type="text"
        name="username"
        className="form-input"
        placeholder="username"
      />
      <input
        type="password"
        name="password"
        className="form-input"
        placeholder="password"
      />
      <button type="submit" className="btn-primary">
        Create Account
      </button>
    </Form>
  );
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  try {
    await axios.post("http://localhost:5050/api/auth/register", data);
    window.alert("Create account successfully");
    return redirect("/login");
  } catch (error) {
    if (error.response) {
      window.alert(error.response.data);
      return redirect("/register");
    }
  }
};

export default RegisterPage;
