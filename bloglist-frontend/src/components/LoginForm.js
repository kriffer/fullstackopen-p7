
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doLogin } from "../reducers/userReducer";


const LoginForm = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(doLogin(username, password))
      setUsername("");
      setPassword("");
      navigate('/')
    } catch (exception) {
      setMessage({ text: "Wrong username or password", type: "error" });
    
    }
  };


  return (
    <div>
      <h5>Login</h5>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input value={username} onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" className="btn" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

 

export default LoginForm;
