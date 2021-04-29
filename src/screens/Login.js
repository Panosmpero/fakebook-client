import { useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { LOGIN_USER } from "../util/graphql";
import { useForm } from "../util/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/auth";

const Login = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    password: "",
  };

  // custom hook
  const { values, handleChange, handleSubmit } = useForm(
    loginUserCallback,
    initialState
  );

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      // console.log(result.data)
      context.login(result.data.login);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  useEffect(() => {
    const toastError = (text) => toast.error(text);
    
    if (Object.keys(errors).length > 0)
      Object.values(errors).map((err) => toastError(err));
  }, [errors]);

  return (
    <div className="form-container">
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        rtl={false}
        draggable={false}
      />
      <Form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? "loading" : undefined}
      >
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
          error={errors.username}
          onChange={handleChange}
        />

        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
