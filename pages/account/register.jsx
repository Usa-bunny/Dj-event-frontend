import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContex";
import styles from "@/styles/AuthForm.module.css";

export default function RegisterPage() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { register, error } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(values).some((el) => el === "")) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (values.password !== values.passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }

    register(values);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Registration">
      <ToastContainer />
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={values.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={values.passwordConfirm}
              onChange={handleInputChange}
            />
          </div>

          <input type="submit" value="Register" className="btn" />
        </form>

        <p>
          Already have an account?
          <Link href={"/account/login"}> Login</Link>
        </p>
      </div>
    </Layout>
  );
}
