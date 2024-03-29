import React, { useState } from "react";
import { Container, Row, Col, FormGroup, Form } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* -------------------------------- firebase -------------------------------- */
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

/* ------------------------------- components ------------------------------- */
import Helmet from "../components/Helmet/Helmet";

import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("user", user);

      toast.success("Successfully logged in");
      navigate("/checkout");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          {loading ? (
            <Col lg="12" className="text-center">
              <h6 className="fw-bold">Loading.......</h6>
            </Col>
          ) : (
            <Row>
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Login</h3>

                <Form className="auth__form" onSubmit={signIn}>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>

                  <button type="submit" className="buy__btn auth__btn">
                    Login
                  </button>

                  <p>
                    Don't have an account?
                    <Link to="/signup"> Create an account</Link>
                  </p>
                </Form>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
