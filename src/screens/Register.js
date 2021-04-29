import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { REGISTER_USER } from "../util/graphql";
import { useForm } from "../util/hooks";

const Register = (props) => {
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // custom hook
  const { values, handleChange, handleSubmit } = useForm(
    addUserCallback,
    initialState
  );

  // https://www.apollographql.com/docs/react/data/mutations/
  // const [addTodo, { data }] = useMutation(ADD_TODO);
  // ========================================================
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      // console.log(proxy);
      // console.log(result);
      props.history.push("/");
    },
    onError(err) {
      // console.log(err.graphQLErrors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });
  /* 
  variables: {
    username: values.username,
    email: values.email,
    password: values.password,
    confirmPassword: values.confirmPassword,
  },
  */

  function addUserCallback() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? "loading" : undefined}
      >
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={values.email}
          error={errors.email}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
