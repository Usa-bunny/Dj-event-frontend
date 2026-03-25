import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContex";
import styles from "@/styles/AuthForm.module.css";

export default function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { login, error } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
    } 
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(values);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Login">
      <ToastContainer />
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log in
        </h1>

        <form onSubmit={handleSubmit}>
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

          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          Don't have an account?
          <Link href={"/account/register"}> Register</Link>
        </p>
      </div>
    </Layout>
  );
}
