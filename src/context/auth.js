import jwtDecode from "jwt-decode";
const { createContext, useReducer } = require("react");

const initialState = { user: null };

const defaultValues = {
  user: null,
  login: (userData) => {},
  logout: () => {},
};

// check local storage for user
if (localStorage.getItem("fakebook-token")) {
  const token = jwtDecode(localStorage.getItem("fakebook-token"));
  const tokenExpired = token.exp * 1000 < Date.now();

  if (tokenExpired) {
    localStorage.removeItem("fakebook-token");
    initialState.user = null;
  } else {
    initialState.user = token;
  }
}

const AuthContext = createContext(defaultValues);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("fakebook-token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("fakebook-token");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
