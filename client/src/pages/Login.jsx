import { Form, redirect } from "react-router-dom";
import "./login.scss";
import axios from "axios";

const LoginPage = () => {
  return (
    <Form className="loginForm" method="post">
      <h2>Login</h2>
      <input type="text" name="username" placeholder="username" />
      <input type="password" name="password" placeholder="password" />
      <button type="submit" className="btn-primary">
        Login
      </button>
    </Form>
  );
};

// Action
export const action = async ({ request }) => {
  // Lấy Data từ Form
  const formData = await request.formData();
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  try {
    const res = await axios.post(
      "https://booking-app-mern-taupe.vercel.app/api/auth/login",
      data
    );
    window.alert("Login successfully");
    localStorage.setItem("currentUser", JSON.stringify(res.data));
    return redirect("../");
  } catch (error) {
    if (error.response) {
      window.alert(error.response.data);
      return redirect("/login");
    }
  }
};
export default LoginPage;
